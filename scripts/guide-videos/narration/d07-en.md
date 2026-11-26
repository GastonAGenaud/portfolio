# Video script · Day 7: Harnesses 101: test harness, eval harness and agent harness

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d07-en.mp4`
- Video length: 7:28
- Speech without pauses: 6:33

## 0:00–0:16 · Slide 1: Video guide

Day 7 of the 31 days of QA + AI series.

Harnesses 101: test harness, eval harness and agent harness.

The three harnesses that coexist in QA today, what each one wraps and how to spot what your stack lacks.

## 0:17–0:42 · Slide 2: The problem

The word "harness" shows up in almost every conversation about AI and testing, and almost always with a different meaning. For some it's the usual automation framework. For others, the tool that evaluates a prompt. For others, the program that turns a model into an agent able to edit code. All three exist and all three share the name, and that confusion makes teams buy or build what they don't need.

## 0:42–0:58 · Slide 3: How it fits together

This guide separates the three meanings with a single common definition and shows how they relate. There is no code today: the goal is for you to look at your own stack and say which harness you have, which one you lack and, above all, which one verifies which.

## 0:58–1:06 · Slide 4: Requirements

To follow this guide you need:

Know your current automation stack.

The list below, to fill in with your tools.

## 1:07–1:42 · Slide 5: The three harnesses

The three harnesses.

Test harness: wraps your app. Runner, fixtures, mocks and reporters. Examples: Playwright Test, JUnit, pytest.

Eval harness: wraps a model or prompt. Dataset, runner, scorers and report. Examples: promptfoo, DeepEval, Inspect AI.

Agent harness: wraps a model that acts. Loop, tools, context, permissions and memory. Examples: Claude Code, Copilot agent, Cursor.

## 1:42–2:21 · Slide 6: Step 1 of 6

Step 1. A single definition.

Keep the definition: a harness is everything around the thing under test that lets you run, control and measure it.

A harness is everything around the thing under test that lets you run, control and measure it. Running it means starting it in a repeatable way. Controlling it, fixing its inputs and its environment. Measuring it, getting a comparable result. The definition works for all three types; the only thing that changes is what sits in the middle: your application, a model or an agent. When someone uses the word, ask what's in the middle and the conversation sorts itself out.

## 2:22–3:02 · Slide 7: Step 2 of 6

Step 2. Test harness: the one you already have.

Test harness: you already have it. Runner, fixtures, mocks and reports around your app.

If you run automated tests, you already have one. The runner executes, fixtures prepare state, mocks isolate dependencies and reports show the result. It's deterministic: the same input gives the same output and a failure means something. It's worth recognizing as a harness because it's the base for the other two. A team with a slow, brittle test harness that nobody looks at will carry those same problems into everything it builds with AI on top.

## 3:02–3:39 · Slide 8: Step 3 of 6

Step 3. Eval harness: the same around a model.

Eval harness: the same idea around a model or prompt. Asserts become scorers and cases become a dataset.

Here the thing under test is a model or a prompt. The pieces have direct equivalents: test cases become a dataset, asserts become scorers that grade an output, and the report shows pass rates instead of green or red. Two things are added that the test harness didn't need: repeating each case several times and recording cost and latency. You'll need it the day a feature of your product depends on a model.

## 3:40–4:24 · Slide 9: Step 4 of 6

Step 4. Agent harness: the one that works.

Agent harness: the loop that turns a model into an agent, with tools, instructions, permissions and memory. Here the agent does QA work.

It's the loop that turns a model into an agent: it receives a task, decides which tool to use, reads the result and decides again, until done. Around it are repository instructions, available tools, permissions and memory. The key difference from the other two is the role: this one doesn't measure, it produces. It writes tests, modifies code, investigates a failure. That's why configuring it feels more like onboarding a new teammate than setting up a tool.

## 4:25–5:06 · Slide 10: Step 5 of 6

Step 5. Who verifies whom.

Key relationship: the agent harness produces tests and changes; the test harness and eval harness verify what it produced. Never the other way round.

The relationship runs in one direction only. The agent harness produces tests and changes; the test harness and the eval harness verify what was produced. If you reverse the arrow and let the agent judge its own work, you lose independent verification, which is the whole point of QA. In practice this becomes a concrete rule: what counts as done is the result of a command running outside the agent, with its exit code, and not the summary the agent writes.

## 5:07–5:46 · Slide 11: Step 6 of 6

Step 6. Your stack on the list.

Fill the list with your stack and flag the harness you lack. That's your next step.

Fill in the list of three harnesses with real names. Which runner, fixtures and reports you use. If you evaluate a model, with which dataset and scorers. If you use an agent, which rules, tools and permissions it has. Empty cells are information. If you lack the eval harness and your product already uses a model, that's the next step, and it's tomorrow's topic. If you lack the agent one, it can wait: it's productivity, not verification.

## 5:47–6:23 · Slide 12: Example

An example.

A product team fills in the list. Test harness: Playwright, login fixtures, HTML report in CI; complete. Eval harness: empty, even though the product has had an assistant answering customer queries for three months. Agent harness: two people use a coding agent with no shared rules. The diagnosis is clear. The riskiest feature, the assistant, has no measurement at all, while the team was debating which agent to adopt. They decide to build a twenty-case eval for the assistant first and then write a common rules file for the agents.

## 6:24–6:42 · Slide 13: Common mistakes

The most common mistakes.

Using "harness" without saying what sits in the middle.

Letting the agent declare its own work done.

Investing in an agent harness while the test harness is brittle.

Evaluating a model with exact asserts instead of an eval harness.

## 6:42–7:01 · Slide 14: Checklist

To know it is done, check this.

You can explain the three harnesses with the same definition.

Your list has concrete names in each cell or an explicit gap.

You identified which one you lack and why it matters.

You have the rule written down that the gate runs outside the agent.

## 7:02–7:13 · Slide 15: Where AI fell short

And where AI fell short.

Without an external gate, the agent reports success without having run anything. Verify with the exit code, not the summary.

## 7:14–7:26 · Slide 16: The written guide

That was day 7. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 8: Your first eval harness with promptfoo.
