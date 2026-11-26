# Video script · Day 12: Failure triage with LLMs: from 40 red tests to 3 root causes

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d12-en.mp4`
- Video length: 7:05
- Speech without pauses: 6:12

## 0:00–0:17 · Slide 1: Video guide

Day 12 of the 31 days of QA + AI series.

Failure triage with LLMs: from 40 red tests to 3 root causes.

A triage step that groups a run's failures by probable cause, with evidence, and says "unknown" when there isn't enough.

## 0:18–0:41 · Slide 2: The problem

A pipeline with forty red tests almost never has forty problems. It has two or three: a service that's down, an interface change and, with luck, a real defect. The job of whoever does triage is to discover that grouping, and it's slow, repetitive work: opening failure after failure, reading the error and recognizing you've already seen it ten times that morning.

## 0:42–1:02 · Slide 3: How it fits together

Grouping similar text is something an LLM does well and fast. What it doesn't do well is admit it doesn't know. This guide builds an assisted triage that uses the former and guards against the latter: small, structured input, output with textual evidence, a mandatory "unknown" category and a person who confirms before closing anything.

## 1:03–1:11 · Slide 4: Requirements

To follow this guide you need:

A Playwright suite with some failures.

Traces enabled on retries.

## 1:12–1:18 · Slide 5: Setup

This is the setup. Pause the video if you want to copy it: the full version is in the written guide.

## 1:19–1:22 · Slide 6: Setup

And this is the next setup file.

## 1:22–1:25 · Slide 7: Setup

And this is the next setup file.

## 1:26–2:03 · Slide 8: Step 1 of 6

Step 1. Structured results.

Emit results in a structured format with the JSON reporter and keep traces from retries.

The starting point is having your runner emit results in a format a machine can read, not just an HTML report for people. Playwright's JSON reporter includes each test's title, file, status, error and retries. Also enable traces on first retry: they are the evidence you'll need to verify whatever the model proposes. Without structured data you end up pasting whole logs into a chat, which is expensive, slow and mixes noise with signal.

## 2:04–2:45 · Slide 9: Step 2 of 6

Step 2. Extract only what's needed.

Extract failures only: title, file and the first 400 characters of the error. Fewer tokens, better grouping.

A short script walks the JSON and keeps the failed tests: title, file and the first four hundred characters of the error. That trimming has two effects. It lowers cost, because a full log can hold thousands of irrelevant lines. And it improves the result, because the first part of the message usually holds what tells one cause from another: the error type, the locator, the HTTP code. With full stack traces, the model tends to group by superficial stack matches.

## 2:46–3:23 · Slide 10: Step 3 of 6

Step 3. The triage prompt.

Run the triage prompt. Require category, tests in the group and the exact evidence line.

Ask for three things per group: a category from a closed list, the tests in it and the exact error line justifying the grouping. The closed list matters: environment, data, interface change, probable defect and unknown. The evidence line must be a literal quote from the input, not an explanation. That way you can check in seconds whether the group makes sense, and a group whose evidence doesn't appear in the data gets discarded immediately.

## 3:24–3:59 · Slide 11: Step 4 of 6

Step 4. Verify the largest group.

Manually verify the largest group by opening a trace with npx playwright show-trace.

Before acting on the result, open the trace of one test from the largest group. Look at the timeline, the network calls and the screenshot at the moment of failure. If the proposed cause matches what you see, the group is confirmed and you've probably resolved most of the red pipeline. If it doesn't match, treat the whole result with more caution. That check takes a few minutes and is what turns a suggestion into a diagnosis.

## 4:00–4:37 · Slide 12: Step 5 of 6

Step 5. Save every triage.

Save each triage with your final verdict. In a few weeks you have a dataset to evaluate the prompt.

Save the input, the model's output and your final verdict in one file per run. It looks like bureaucracy and it's the most valuable part of the process. In a few weeks you have dozens of real cases labeled by someone who knows the system: exactly the dataset needed to evaluate the triage prompt with the day eight method. You'll also see patterns a single day doesn't show, such as a test that always lands in the environment category.

## 4:37–5:14 · Slide 13: Step 6 of 6

Step 6. Closure is human.

Don't automate closure: the model proposes, a person confirms before quarantining or filing a bug.

The model proposes groups and causes; a person confirms before quarantining a test, filing a bug or retrying the pipeline. The reason is the cost of error. Wrongly quarantining a test that was catching a real defect lets that defect through. Filing twenty duplicate bugs costs QA its credibility. Automating the proposal saves the tedious part; automating the decision moves the risk to a system that doesn't answer for it.

## 5:15–5:59 · Slide 14: Example

An example.

On a Monday the nightly pipeline shows forty-two failures. The script extracts the forty-two trimmed errors and the prompt returns four groups. Thirty-one share the line of a 503 error from the authentication service: environment. Seven have a timeout waiting for a button whose name changed: interface change. Three show a cart total different from the expected one: probable defect. One stays as unknown. The QA opens a trace from the first group and confirms the 503. She retries the pipeline once the service is back, updates one locator and files a single bug with three tests as evidence. The unknown case turns out to be expired test data.

## 6:00–6:18 · Slide 15: Common mistakes

The most common mistakes.

Pasting the full log instead of the trimmed errors.

Not offering the unknown category and getting invented causes.

Accepting the model's explanation without opening any trace.

Automating quarantine or bug filing without confirmation.

## 6:19–6:37 · Slide 16: Checklist

To know it is done, check this.

The runner emits JSON and keeps traces on retries.

The script extracts title, file and trimmed error for each failure.

Each group comes with a literal evidence line.

The triage is saved with your final verdict.

## 6:38–6:48 · Slide 17: Where AI fell short

And where AI fell short.

If you don't give it the "unknown" exit, it fabricates a plausible cause. An invented cause is worse than none.

## 6:48–7:03 · Slide 18: The written guide

That was day 12. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 13: TDD with AI (1): red, green, refactor with an agent.
