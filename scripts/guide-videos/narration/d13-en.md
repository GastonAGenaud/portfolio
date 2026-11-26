# Video script · Day 13: TDD with AI (1): red, green, refactor with an agent

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d13-en.mp4`
- Video length: 7:04
- Speech without pauses: 6:10

## 0:00–0:16 · Slide 1: Video guide

Day 13 of the 31 days of QA + AI series.

TDD with AI (1): red, green, refactor with an agent.

Three TDD cycles where you write the test and the agent writes the minimal implementation, without touching the test.

## 0:17–0:38 · Slide 2: The problem

TDD always had a discipline cost: writing the test first when the solution is already in your head is hard. With an agent that writes the implementation in seconds, the temptation flips. The easy thing is to ask "implement this function with its tests" and get everything together, with tests that pass because they were written while looking at the code they had to verify.

## 0:39–1:01 · Slide 3: How it fits together

The red, green, refactor cycle orders that relationship with an authorship rule: the test is yours and the implementation is the agent's. The test becomes the executable specification and also the quality control for what the agent produces. This guide walks the full cycle with a small function, so the habit sticks before you apply it to something big.

## 1:01–1:08 · Slide 4: Requirements

To follow this guide you need:

Node.js 22+, a coding agent and an empty repo.

## 1:09–1:15 · Slide 5: Setup

This is the setup. Pause the video if you want to copy it: the full version is in the written guide.

## 1:16–1:19 · Slide 6: Setup

And this is the next setup file.

## 1:20–1:23 · Slide 7: Setup

And this is the next setup file.

## 1:23–2:01 · Slide 8: Step 1 of 6

Step 1. Red: one test, written by you.

Red: you write a single test. The test is the specification and it's yours.

Write a single test describing a concrete behavior, with a name that reads like a business rule. One only, not the full suite. While writing it you make design decisions that shouldn't be delegated: what the function is called, what it takes, what it returns and what happens with invalid input. That is the thinking work. If you ask the agent for the test, it makes those decisions, and afterwards you'll be reviewing a specification you didn't write.

## 2:02–2:39 · Slide 9: Step 2 of 6

Step 2. Failing for the right reason.

Run npx vitest run and confirm it fails for the right reason (the function doesn't exist or returns something else), not an import error.

Run the test and read the message. It must fail because the function doesn't exist or returns something else, not because of an import, configuration or syntax error. It's a step often skipped and it prevents a classic problem: a test that could never fail for the reason that matters. If the error message is confusing, improve it now. That same message is what the agent will read to know what it has to build.

## 2:40–3:21 · Slide 10: Step 3 of 6

Step 3. Green: the minimum, without touching tests.

Green: ask the agent for the minimum code to pass that test, explicitly instructing it not to modify tests.

Ask the agent for the minimum code to pass that test, with two explicit instructions: don't modify test files and don't add anything the test doesn't ask for. The word minimum matters. Without it you'll receive validations, cases and optional parameters nobody specified and no test covers. It's code that looks useful and ends up ownerless: nobody knows whether it works or whether it should exist. If it's needed later, you add it with its own test.

## 3:22–3:58 · Slide 11: Step 4 of 6

Step 4. Verify the green yourself.

Verify the green yourself by running the command. Review the diff: only src/discount.ts should have changed.

Run the command yourself and look at the result. Then review the diff. In this exercise only the implementation file should have changed. If the test changed, or the config, or a new file appeared, ask yourself why before going on. Those thirty seconds hold up the whole method: the green counts because it came from a test the agent couldn't adjust and because you confirmed it outside its summary.

## 3:59–4:37 · Slide 12: Step 5 of 6

Step 5. Refactor with the net in place.

Refactor: ask for a readability improvement keeping tests green. Commit.

With the test green, ask for a readability improvement with no change in behavior: clearer names, a constant instead of a loose number, an extracted function. Run the tests again. This is the step where the agent contributes the most with the least risk, because any error is caught by the test instantly. Commit when done. If the refactor breaks something and it isn't obvious why, discarding it costs one command, and you're back to a known state.

## 4:38–5:15 · Slide 13: Step 6 of 6

Step 6. One cycle, one commit.

Repeat with the second and third tests. One commit per cycle leaves an auditable history.

Repeat the cycle with the second and third behaviors, and make one commit per cycle. The history becomes a sequence of rules added one at a time, each with its test and its implementation. That helps with reviewing and auditing: whoever reads the history can see what was asked, what was built and in what order. It also gives you cheap return points if a cycle goes wrong, something you don't have with large changes generated all at once.

## 5:16–6:01 · Slide 14: Example

An example.

The function to build applies discounts. First test, written by hand: a ten percent coupon on one hundred returns ninety. It fails because the function doesn't exist. The agent writes four lines and the test passes; the diff touches a single file. Refactor: it extracts the percentage calculation. Commit. Second test: a discount above one hundred percent throws an error. The agent adds the validation. Third test: the result is rounded to two decimals. In the second cycle the agent had also added support for fixed-amount coupons nobody asked for. It gets removed, because no test demands it. Three commits and three rules remain.

## 6:02–6:18 · Slide 15: Common mistakes

The most common mistakes.

Asking for implementation and tests in the same request.

Not confirming the test fails before implementing.

Leaving extra code no test demands.

Squashing several cycles into a single commit.

## 6:19–6:35 · Slide 16: Checklist

To know it is done, check this.

Each test was written by you before its implementation.

You saw each test fail for the expected reason.

No implementation diff touched test files.

The history has one commit per cycle.

## 6:36–6:47 · Slide 17: Where AI fell short

And where AI fell short.

It tends to overbuild: functions and cases no test asks for. Code no test demands is code with no owner.

## 6:48–7:02 · Slide 18: The written guide

That was day 13. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 14: TDD with AI (2): guardrails so the agent can't cheat.
