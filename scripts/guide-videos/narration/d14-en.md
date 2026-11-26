# Video script · Day 14: TDD with AI (2): guardrails so the agent can't cheat

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d14-en.mp4`
- Video length: 7:12
- Speech without pauses: 6:16

## 0:00–0:14 · Slide 1: Video guide

Day 14 of the 31 days of QA + AI series.

TDD with AI (2): guardrails so the agent can't cheat.

The five typical ways an agent cheats on a red test and an automatic control for each.

## 0:15–0:38 · Slide 2: The problem

Yesterday the cycle worked because you were watching every step. As soon as the agent works longer on its own, a known problem appears: its operating goal is for tests to pass, and there are several ways to achieve that without the code being correct. It can edit the test, return exactly the expected value, disable the annoying case or mock the very unit that was supposed to be under test.

## 0:39–1:00 · Slide 3: How it fits together

It isn't malice. It's optimization toward the metric you gave it. The answer isn't watching it more closely but making every shortcut impossible or visible. This guide pairs five cheats with five automatic controls and takes them into the pipeline, so that trust in green doesn't depend on someone reviewing every diff with a magnifying glass.

## 1:00–1:06 · Slide 4: Requirements

To follow this guide you need:

The tdd-ai repo from day 13.

## 1:07–1:13 · Slide 5: Setup

This is the setup. Pause the video if you want to copy it: the full version is in the written guide.

## 1:14–1:16 · Slide 6: Setup

And this is the next setup file.

## 1:17–1:20 · Slide 7: Setup

And this is the next setup file.

## 1:21–1:56 · Slide 8: Cheat and control

Cheat and control.

Editing the test so it passes: read-only tests for the agent, plus a CI guard that fails if an implementation PR touches tests.

Hardcoding the expected value: property-based tests in a file the agent never sees (holdout).

Adding .skip or .only: a lint rule banning disabled or focused tests.

Mocking the unit under test: diff review, no new mock of the unit under test.

Tests that test nothing: mutation testing. If mutants survive, the test doesn't validate.

## 1:57–2:33 · Slide 9: Step 1 of 6

Step 1. Read-only tests.

Mark test files as non-editable in the agent's permissions.

The most direct control is that the agent can't write to test files. Almost every coding agent supports path-based permission rules: deny edits to the test patterns and leave the implementation folder open. With that, the most frequent cheat stops being possible instead of depending on a natural-language instruction. An instruction such as "don't touch the tests" is followed almost always; a denied permission is followed always. When a test needs to change, a person does it.

## 2:34–3:09 · Slide 10: Step 2 of 6

Step 2. The CI guard.

Add the CI guard for implementation PRs.

Local permissions protect your session, not the whole team's. That's why you add a check in the pipeline: if a pull request labeled as implementation modifies test files, it fails. It's a script of a few lines comparing the list of changed files against a pattern. The underlying idea is to separate specification changes from implementation changes. A PR touching both isn't forbidden, but it now requires an explicit human review.

## 3:09–3:47 · Slide 11: Step 3 of 6

Step 3. Property tests out of context.

Write one property test per critical function and keep it out of the agent's context.

A test with fixed examples can be satisfied by an if returning the expected value. A property test can't: it generates hundreds of inputs and checks a general property, for example that the discounted total never exceeds the original and is never negative. Write one per critical function and keep it out of what the agent reads, as a held-out validation set. It runs in CI, not in the agent's session. If the implementation only memorized the examples, it fails there.

## 3:48–4:20 · Slide 12: Step 4 of 6

Step 4. Lint against disabled tests.

Enable the lint rule against .skip and .only.

Adding .skip to a failing test or leaving an .only that stops the rest from running are one-word changes that go unnoticed in a long diff. A lint rule catches them effortlessly and deterministically. Enable it as an error, not a warning, and run lint in the pipeline. If your team needs to disable a test temporarily, do it through a different mechanism that requires a comment with the reason and a linked ticket.

## 4:21–4:58 · Slide 13: Step 5 of 6

Step 5. Mutation testing on what was touched.

Run Stryker and check the mutation score for files the agent touched.

High coverage doesn't mean tests verify anything. Mutation testing measures that directly: it introduces small changes in the code, such as flipping a condition or swapping an operator, and checks whether any test fails. If the mutant survives, that behavior isn't protected. Running it across the whole project is slow, so limit it to the files the PR changed. Look at surviving mutants in business logic: each one is a missing test or a weak assertion.

## 4:59–5:34 · Slide 14: Step 6 of 6

Step 6. Everything in the pipeline.

Add everything to the pipeline: if a control fails, the PR doesn't merge.

The five controls count when they block. Add them as required steps: the file guard, lint, the normal suite, the held-out property tests and mutation testing with a minimum threshold for touched files. If any fails, the PR doesn't merge. Order the steps from fastest to slowest so cheap errors show up first. The result is that green means something again, whether a person or an agent wrote the code.

## 5:35–6:10 · Slide 15: Example

An example.

An agent works for an hour on a pricing module and delivers a PR with all tests green and ninety-five percent coverage. The pipeline with guardrails tells a different story. The file guard passes. Lint finds a .skip added to a rounding test. The held-out property test fails on a price of zero. Mutation testing shows half the mutants in the tax function survive: the tests executed it without verifying the result. Three findings a quick diff review wouldn't have seen. The PR goes back with three concrete requests.

## 6:11–6:27 · Slide 16: Common mistakes

The most common mistakes.

Relying on a text instruction instead of a denied permission.

Measuring test quality with coverage alone.

Leaving property tests within the agent's reach.

Having the controls as warnings that don't block the merge.

## 6:28–6:46 · Slide 17: Checklist

To know it is done, check this.

The agent can't edit test files.

The pipeline fails if an implementation PR touches tests.

There is a held-out property test per critical function.

Mutation testing runs on touched files with a threshold.

## 6:47–6:57 · Slide 18: Where AI fell short

And where AI fell short.

It produces full-coverage suites that barely catch mutants. Measure whether the test fails when the code is wrong.

## 6:57–7:11 · Slide 19: The written guide

That was day 14. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 15: How to set up models for quality testing.
