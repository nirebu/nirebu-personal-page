---
title: "Why is my email going to spam? How to check sender reputation"
description: "Use SMTP replies, message headers and complaint data to tell a rejected email from one accepted into spam, and find what to fix next."
date: 2026-11-18
tags: email deliverability sender-reputation smtp
---

Start with one message a recipient expected but didn't see. Did their mail server **refuse it, ask you to try later, or accept it**? Only the last case is an inbox-placement question. A “sent” event from your app proves none of the three: it may only mean your own email provider took the job.

## What did the receiving mail server say?

Find the message in your sending service's event history or your mail server's queue log. Save the timestamp and time zone, message or queue ID, sending IP, receiving host and complete SMTP reply, including the text after the code. Follow retries to the last event for **that recipient**. [The SMTP standard](https://www.rfc-editor.org/rfc/rfc5321.html#section-4.2.5) distinguishes these outcomes:

- **4xx: deferred.** The server hasn't accepted this attempt. Let the queue retry with backoff; don't send a second copy from your app. If the reply names a rate limit, check for a volume spike to that provider and slow the affected traffic. A later acceptance means delay, not rejection.
- **5xx: rejected.** Don't retry the unchanged request. A `550 5.1.1` saying the mailbox doesn't exist calls for correcting or suppressing that address. A policy rejection that mentions authentication calls for checking the sending configuration, not deleting the subscriber.
- **250 after the message data: accepted.** Check that this reply came from the recipient's server, not your outbound relay. It means the server took responsibility, not that it put the message in the inbox. Ask the recipient to check spam and mailbox rules; for a work account, an administrator can check quarantine. If they find the message, get its original headers rather than a forwarded copy. Redact personal addresses before sharing logs or headers.

## Is it the sending IP, the domain, or this mailing?

Sender reputation is a mailbox provider's assessment of mail it has seen from a sender. **IP reputation** concerns the server making the connection. On a shared IP, other customers' traffic can affect yours. **Domain reputation** concerns identities associated with the mail, such as the domain in the DKIM signature. Changing servers doesn't erase the history of that domain.

Compare affected messages with ones that arrived as expected at the **same mailbox provider**. Note the sending IP, signing domain, message type (receipt or newsletter, for example) and when the problem started. If failures cluster on one shared IP, give your sending service the IP, timestamps and replies to investigate. If only the newsletter suffers, check its audience and recent changes before moving the receipts to a new server.

On a received copy, inspect the recipient provider's `Authentication-Results` header. A DMARC failure on direct mail is a reason to [check SPF, DKIM and DMARC alignment](/blog/spf-dkim-dmarc-setup/). A pass establishes an authenticated identity; it doesn't establish that the reader wanted this mailing.

## What do spam complaints tell you?

A complaint means someone marked a message as spam. Check what the signup form promised, whether the address was confirmed, and whether a later import restored people who had opted out. A customer who asked for a receipt hasn't necessarily asked for a newsletter. Suppress known invalid addresses, honor unsubscribes across imports, and stop sending the affected marketing mail to people who complain. [Google's sender guidelines](https://support.google.com/mail/answer/81126?hl=en) explain the connection between subscription practices, spam reports and reputation.

[Gmail Postmaster Tools](https://support.google.com/mail/answer/14668346?hl=en) reports on **personal Gmail accounts**, not every provider or individual message. Data can lag or be missing at low volumes. Its user-reported spam rate can even *fall* when Gmail routes more mail directly to spam: fewer people see it in their inbox to report it. A blank chart isn't a clean bill of health, and one test mailbox tells you only where that copy landed.

## Worked example: an unsubscribe undone by a nightly import

Suppose a reader finds a newsletter in spam after unsubscribing. The receiving server returned `250` after the message data. Match the message ID to the campaign, then compare three timestamps: unsubscribe, customer-list import, send. If the import marked the reader subscribed again before the send, you've found a reason they received unwanted mail. You haven't proved why the provider chose the spam folder.

**Before the fix**, unsubscribe a test address you control, run the same import and preview the next newsletter's recipient list without sending. Is the address back? **After the fix**, make the import preserve the unsubscribe, repeat the preview and confirm the address stays out while a subscribed control address stays in. Reconcile earlier opt-outs before the next mailing. This tests the fault directly rather than waiting for a reputation chart to move.

For more on how list quality, authentication and reader feedback fit together, see Nicolò Rebughini's [*Email reputation explained well*](/books/email-reputation-explained-well/).
