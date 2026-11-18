---
title: 'How to set up and verify SPF, DKIM and DMARC'
description: 'Find the DNS names your senders actually use, verify SPF and DKIM alignment in a received message, and use DMARC reports to decide when to enforce a policy.'
date: 2026-11-18
tags: email dns spf dkim dmarc
---

Set up **SPF** (Sender Policy Framework) to say which servers may send for your envelope domain. Enable **DKIM** (DomainKeys Identified Mail) so your service signs each message. Then publish **DMARC** (Domain-based Message Authentication, Reporting, and Conformance) to tell receivers what to do when neither check ties the message to the domain the reader sees.

For mail from `billing@example.com`, DMARC passes if **either** SPF passes for an aligned envelope domain **or** DKIM passes for an aligned signing domain. Configure both paths where possible. Test with a message from your actual billing system to an independent mailbox, not just a green check in your DNS dashboard.

## 1. Find every service that sends as your domain

Include employee mailboxes, website forms, support desks, newsletters and infrequent jobs such as monthly invoices. Send a sample from each to an external mailbox you control. Open the original message and record:

- `From:` — the address the recipient sees. Its domain is the reference for DMARC.
- `Return-Path:` — on a direct delivery, this normally shows the envelope sender used for SPF. It can be a provider's domain even when `From:` is yours.
- `DKIM-Signature:` — record `d=` (signing domain) and `s=` (selector), or note that the signature is missing.

## 2. Publish SPF at the envelope sender's domain

If the provider uses `bounce.example.com` for returns, that is where the receiver looks for SPF; an SPF record at `example.com` does not cover it. Check what already exists with `dig +short TXT bounce.example.com`. If you manage the TXT policy there, combine all authorized sources in **one** `v=spf1` record, before its final `all` mechanism. A second SPF record at the same name is an error; unrelated TXT records can stay.

For a single server, `v=spf1 ip4:192.0.2.10 -all` illustrates the shape, not a value to copy: that is a documentation IP, and `-all` declares every other source unauthorized. For hosted mail, follow the provider's custom return-path instructions, including any DNS delegation it requires. Adding its `include:` to your root domain does nothing for a message still using the provider's own return-path domain. [RFC 7208 §4.6.4](https://www.rfc-editor.org/rfc/rfc7208#section-4.6.4) limits SPF evaluation to ten DNS-querying terms, **including nested** `include` and `redirect` processing; exceeding it yields `permerror`.

## 3. Enable DKIM signing for your domain

In each sending service, choose your signing domain and request its DKIM records. If `d=example.com` and `s=billing1`, the receiver queries `billing1._domainkey.example.com`. Publish the **exact** selector and TXT public key or CNAME target supplied by that service. Don't reuse another provider's selector, publish a private key, or add a TXT alongside a delegated CNAME. [DKIM selectors](https://www.rfc-editor.org/rfc/rfc6376#section-3.1) let several services sign for one domain without sharing a key.

Query the full name with `dig +short TXT billing1._domainkey.example.com` (use `CNAME` to check a delegation). Once the provider verifies DNS, enable signing and send a fresh message. A published key alone does not sign mail.

## 4. Start DMARC in monitoring mode and check a delivery

Create a mailbox for aggregate reports. For `From: billing@example.com`, publish one TXT record at `_dmarc.example.com`, substituting your own domain and monitored address:

```text
v=DMARC1; p=none; rua=mailto:dmarc-reports@example.com
```

Check it with `dig +short TXT _dmarc.example.com`. Then inspect the **receiving mailbox's** authentication summary or its own [Authentication-Results header](https://www.rfc-editor.org/rfc/rfc8601). Don't trust an identically named header supplied upstream. A direct delivery might show:

```text
Authentication-Results: mx.recipient.example;
    spf=pass smtp.mailfrom=bounce.example.com;
    dkim=pass header.d=example.com header.s=billing1;
    dmarc=pass header.from=example.com
```

Here SPF aligns because the envelope and visible From domains share an organizational domain (the default, relaxed alignment). DKIM aligns even under strict alignment because its domain matches exactly. If both passes instead name only an unrelated vendor domain, **neither aligns**: enable the vendor's custom DKIM domain or an aligned return path, then retest.

## 5. Decide where enforcement is safe

Review [DMARC aggregate reports](https://www.rfc-editor.org/rfc/rfc9990) from participating receivers. Compare source IPs, message counts and aligned results against your inventory over a full sending cycle. Investigate failures rather than authorizing every reported IP: forwarding changes the connecting server, so SPF may fail or pass for the forwarder's domain. An aligned DKIM signature can survive forwarding, but a list that adds a footer or changes a signed subject can break it.

Start enforcement on a well-understood stream, such as invoices with a dedicated **visible From subdomain**. Set that subdomain's own `_dmarc` record to `p=quarantine`, retain `rua`, and compare reports and support cases. Move to `p=reject` only when legitimate traffic is accounted for and signed with aligned DKIM. Don't copy a reject policy to the parent without checking mail from subdomains that inherit it. For domains whose users post to public mailing lists, [the current DMARC standard](https://www.rfc-editor.org/rfc/rfc9989#section-7.4) advises against `p=reject`.

DMARC authenticates use of the From domain; it doesn't award inbox placement. If your test passes but mail is delayed or lands in spam, [troubleshoot email delivery and sender reputation](/blog/email-delivery-sender-reputation/). For the broader picture of how receivers judge senders, see [Email reputation explained well](/books/email-reputation-explained-well/).
