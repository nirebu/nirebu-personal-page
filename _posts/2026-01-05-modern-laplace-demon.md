---
layout: post
title: The Modern Laplace Demon
description: Can LLMs be a modern implementation of the Demon theorised by Laplace?
date: 2026-01-05 21:23:44 +0200
tags: ai llm philosophy
---

Of course, this post is about AI.

During a recent 1:1 at work, I discussed the possibility of LLMs acting as a modern implementation of **Laplace’s Demon**: a tool capable of navigating complex decisions by simply knowing *everything*.

![Laplace's Demon](/assets/images/laplace-demon.jpg){: style="max-width: 75%; display: block; margin-left: auto; margin-right: auto;"}

For context, here is the formal definition given by Pierre Simon Laplace:

> We may regard the present state of the universe as the effect of its past and the cause of its future. An intellect which at a certain moment would know all forces that set nature in motion, and all positions of all items of which nature is composed, if this intellect were also vast enough to submit these data to analysis, it would embrace in a single formula the movements of the greatest bodies of the universe and those of the tiniest atom; for such an intellect nothing would be uncertain and the future just like the past could be present before its eyes.

Pierre Simon Laplace, _A Philosophical Essay on Probabilities_ [(Wikipedia)](https://en.wikipedia.org/wiki/Laplace%27s_demon)

I like to summarise the concept like this:

Given an accurate enough context of every single element of a system at **T0**, the next "tick of the clock" (**T1**) appears obvious to the observer as a mere consequence of the present state and forces at play. Every successive interaction (**T2+**) is just a matter of computation.

At the smallest scales, we have the laws of physics. At the other end of the spectrum, we have human interactions and complex social behaviours. If an omniscient entity knew every neural connection inside someone's brain and every condition of their environment, nothing would be hidden. Every behaviour crystal clear. Our current state is the result of past interactions; our future is just that same configuration applied to a new environment.

Because humans are not omniscient (and for the good of humanity, arguably shouldn't be), we view our actions as unpredictable. We perceive "free will" where the Demon would simply see a missing dataset.

Even if a human *could* cram every bit of information into their head, they would struggle to correlate the parameters. Luckily, we have built systems specifically designed to ingest absurdly large inputs and find the correlations we miss.

### The dominance of Context over Intellect

Laplace's requirement was an intellect "vast enough to submit these data to analysis." We often confuse "vast" with "smart" or "creative." But in the context of the Demon, "vast" primarily means capable of holding the state of the universe in working memory.

An LLM doesn't need to be a super-intelligence to act as this Demon; it just needs a context window large enough to hold the current state (T0). If the context is excellent (meaning: the "positions of all items" are accurately fed into the prompt) the prediction of the next token (T1) becomes a trivial consequence of the input. 

This suggests that **Context is orders of magnitude more valuable than raw reasoning power.** A mediocre model with perfect information about the system will always outperform a genius model with partial information. The "Demon" isn't the model itself; it's the combination of the Model (the brain) and the Context (the data).

I've seen this consistently in my own work with AI-assisted coding and content writing: even small, local models running on a measly laptop often match the output of SOTA commercial giants humming in datacenters, provided they are given the right amount of context.

### Managing Complexity

At the lowest levels, prediction is relatively easy. If `x` is going in a specific direction at a known velocity, we know exactly where it will be in `t` time. We don't need AI for that; we have physics equations.

The true utility of the Demon lies where equations fail: in large, interdependent systems like economies, battlefields, codebases, or social groups. Here, potentially billions of elements interact, and "keeping track of everything" is the bottleneck. Humans handle this complexity by **abstracting**: we ignore the micro-interactions to focus on the macro-trends because our brains can't track the position of every atom.

A Modern Laplace Demon doesn't need to abstract. It can theoretically ingest every commit, every Slack message, and every server log to see the "macro" failure not as a random event, but as the inevitable mathematical sum of a thousand "micro" interactions that happened weeks ago.

We are building the Demon, piece by piece. Not to predict the motion of every atom in the universe, but to understand the complex systems we have built that are no longer understandable by unaided human minds.

In fact, multiple of these "Demons" are already rising. We see it in systems like Anduril's **Lattice**, designed to make sense of the chaos of war, or in the **Palantir** ecosystem, which exists to synthesize the disparate data of massive institutions. These are society-encompassing systems analyzing vast amounts of raw data to model the future—proving that the Demon is no longer just a thought experiment.

### The Architect and the Calculator

For those of us building the future, the lesson is clear: stop waiting for a smarter model. The "vast intellect" Laplace described is already here; it is just hungry for data. As we feed these systems more context, the fog of uncertainty lifts, revealing that much of our "intuition" was simply a coping mechanism for a lack of information. This doesn't make us obsolete; it frees us to be architects rather than calculators. The most powerful Demons of the next decade won't be the ones with the highest IQ, but the ones with the most complete memory. We define the destination; the Context provides the path.