---
layout: post
title: The Shadow Crew
description: Promoting Yourself to Manager of Silicon
date: 2026-02-06 10:11:31 +0200
tags: ai career management agents
---

# The Shadow Crew: Promoting Yourself to Manager of Silicon

For the last few years, we've called AI a "copilot." A helpful assistant sitting in the passenger seat while *we* drove. Looking at the latest news, with OpenAI launching [Frontier](https://openai.com/index/introducing-openai-frontier/) and "digital employees" becoming a corporate line item, the dynamic shifted once again.

The industry has moved beyond selling us a better spellchecker; they are now marketing a "digital workforce" that can be hired, onboarded, and performance-reviewed.

It's easy to look at this and see a threat. But there is a massive, overlooked opportunity for those willing to seize it. The same technology that corporations are buying to optimize workers *out* can be used by to optimize ourselves *up*.

## The Rise of the Shadow Crew

![Shadow Crew](/assets/images/shadow-crew-bg.jpg){: style="max-width: 75%; display: block; margin-left: auto; margin-right: auto;"}

While enterprises are navigating procurement cycles to buy "AI Agents", a different movement is happening in the terminal windows of pragmatic (and very [risk inclined](https://www.crowdstrike.com/en-us/blog/what-security-teams-need-to-know-about-openclaw-ai-super-agent/)) engineers. We are seeing the rise of the **Shadow Crew**.

Operating far from the approved corporate vendor list, this is "Guerilla AI".

It's the locally hosted [OpenClaw](https://openclaw.ai/) instance that manages your calendar, email and your computer. It's the shell script wrapping an orchestrated team of three agents that triages your bug reports before you even open Jira. It's the personal infrastructure you build on your machine that turns you from an **Individual Contributor** into a **Department of One**.

The toxic myth of the *10x Engineer* is being replaced by a more tangible baseline: the *Engineer with 10 Agents*.

## The Uncomfortable Promotion

To build and run a Shadow Crew, we have to accept an uncomfortable promotion. The role requires us to evolve from "builders" into **managers**.

Managing an agent crew requires pretty much the exact same skills as managing humans, with one crucial difference: the "employees" have infinite patience, a "you're absolutely right syndrome" and zero common sense.

To wield this force multiplier effectively, we have to master the soft skills we thought we could ignore:
- **Extreme Clarity of Intent:** Agents don't "get the gist." If we can't articulate the *definition of done* precisely, the agent will endlessly spin its wheels.
-  **Decomposition:** We can't just say "build this feature." We have to break the feature down into research, architecture, implementation, and testing tasks, and assign them to the right specialized agent.
-  **Review and Feedback:** Just like with a junior engineer, we have to review the output, provide corrective feedback, and iterate.

We cannot just let our agents go wild and choose what to implement. Let's remember that we should be building for real people, fellow humans that want to solve their problems. If we build just to be impressed by how much code the agent hallucinated on its own, we could have as well saved the tokens, energy and money.

We may even become better leaders as a side effect.

## Don't Wait for Permission (Build the Lab)

I operate in a [consultancy](https://nebulab.com) where I have significant freedom to experiment. I treat my workflow as a laboratory, and my finding is this: you need a strategy that balances speed with sovereignty.

The corporate "Digital Employees" ([Frontier](https://openai.com/index/introducing-openai-frontier/), [Agentforce](https://www.salesforce.com/agentforce/)) or sleek SaaS wrappers (like [LangDock](https://langdock.com/)) are tempting. They offer the "80%" solution: polished UI, quick setup, immediate value. I use some. I test them constantly. They are great for moving fast.

Companies naturally maximize revenue through ecosystem lock-in. Once committed, the opportunity cost of switching tools skyrockets, turning a helpful - now fundamental - service into a cage.

### The 80/20 of the Shadow Stack

My personal strategy follows a simple rule: **Use the SaaS for speed, but keep the "Brain" in plain text.**

I experiment with custom harnesses (connecting to Gemini, Copilot, etc, or local models) that reads from a structured set of Markdown files (`AGENTS.md`) in my project directories.
- **The Brain:** The instructions, context, and project knowledge live in local Markdown files I own.
- **The Hands:** The AI tool (CLI or SaaS) is just an interchangeable execution layer.
- **The Tools:** Simple scripts or MCP servers that connect to my actual work (Linear, GitHub), not the vendor's walled garden.

This is the "Shadow Crew": it sails with me.

If a model vendor becomes too expensive, the inference engine can be changed. If a SaaS tool shuts down, my `AGENTS.md` files still hold all the onboarding and context my crew needs. I haven't lost my *crew*; we just changed some parts of the ship and set sail again.

## The New Seniority

Seniority used to be defined by how much complexity you could hold in your head. It was about being the smartest person in the room.

The new seniority is defined by how much complexity you can effectively offload while remaining fully accountable for the quality. It requires us to stop viewing these tools as competitors for our tasks, and start viewing them as the junior team we are responsible for mentoring.

We are entering the era of the **Manager of Inanimate Objects**. It sounds less technical than "Staff Engineer," but it is the most robust way to future-proof a career. When we promote the AI from "threat" to "ally," we stop fighting for survival and start designing for scale.

[The wave is here](https://nirebu.com/2026/01/29/the-wave-is-coming.html). Don't just ride it—bring your own crew. Assume command.

