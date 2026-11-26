# Video script · Day 27: Performance (3): AI generating and analyzing load tests

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d27-en.mp4`
- Video length: 7:33
- Speech without pauses: 6:39

## 0:00–0:17 · Slide 1: Video guide

Day 27 of the 31 days of QA + AI series.

Performance (3): AI generating and analyzing load tests.

How to use an LLM to write a load script from a specification and to propose hypotheses about the results, with a method to verify each.

## 0:18–0:36 · Slide 2: The problem

Writing a load script from scratch and later reading a summary with hundreds of metrics are the two slowest parts of performance testing, and both are text. A model can speed both up. What it can't do is know what your traffic looks like, what your targets are or what was happening on your servers during the test.

## 0:37–1:03 · Slide 3: How it fits together

If you don't give it that information, it fills it in with reasonable values and presents them confidently. The resulting script runs, and tests a load that isn't yours. The resulting analysis sounds expert, and describes generic bottlenecks. This guide shows which inputs make AI useful in performance, how to review what it generates before spending a run and how to turn its analysis into hypotheses that get verified.

## 1:03–1:18 · Slide 4: Requirements

To follow this guide you need:

k6 and a practice API with an OpenAPI spec.

An aggregated traffic profile (percentage per endpoint), never raw logs with personal data.

Written service targets.

## 1:19–1:25 · Slide 5: Setup

This is the setup. Pause the video if you want to copy it: the full version is in the written guide.

## 1:26–1:29 · Slide 6: Setup

And this is the next setup file.

## 1:29–1:32 · Slide 7: Setup

And this is the next setup file.

## 1:33–2:15 · Slide 8: Step 1 of 6

Step 1. Three required inputs.

Give the model three inputs: the API spec, the aggregated traffic mix and the targets. Without them it invents all three.

The model needs three things to write a useful script. The API spec, to know the real endpoints, parameters and formats. The aggregated traffic mix, meaning what percentage of calls goes to each operation, taken from your logs with no user data. And the latency and error targets. If any of the three is missing, it will invent it. And it will do so plausibly, which is worse than doing it badly: an invented traffic mix doesn't look different from a real one.

## 2:15–2:57 · Slide 9: Step 2 of 6

Step 2. Explicit requirements in the request.

Request the script with explicit requirements: scenarios, think time, data from a file, environment variables, thresholds and timeouts.

Ask for the script with a list of requirements, not a general description: scenarios split by operation type, think time between actions of the same user, data read from a file, URLs and keys through environment variables, thresholds with your targets and timeouts suited to answer length. Each requirement corresponds to a frequent defect in generated scripts. Save the request as a template in the repo, just like the prompts from earlier days.

## 2:58–3:44 · Slide 10: Step 3 of 6

Step 3. Review with a checklist.

Review it with a checklist before running: does the mix match? is there think time? is data non-repeating? zero secrets in code? are the thresholds yours?

Before running anything, review the script with five questions. Does the scenario mix match the one you passed? Is there think time between actions, or does each virtual user fire without pause? Does data vary, or is the same record repeated? Is any secret written in the code? Are the thresholds yours, or did others appear? That's five minutes of reading. Running a wrong script costs an hour of testing, API budget and, above all, conclusions drawn from data that represents nothing.

## 3:45–4:22 · Slide 11: Step 4 of 6

Step 4. Dry run and real run.

Dry run with one user and one iteration to confirm it works, then the real run exporting the summary.

Run first with one user and one iteration. It confirms the script works: that it authenticates, that responses are the expected ones and that checks pass. Finding an authentication error with a thousand virtual users is an expensive way to find out. Only then launch the real run and export the summary to a file. That file, together with the exact time window of the test, is the input for the next step.

## 4:23–5:04 · Slide 12: Step 5 of 6

Step 5. Analysis with server metrics.

For analysis, pass the summary along with server metrics from the same window. Ask for ranked hypotheses, with the supporting metric and how to confirm each.

For analysis, give the model the test summary together with server metrics from the same window: CPU, memory, database connections, queue length, GPU usage if applicable. Ask for hypotheses ranked by likelihood, each with the supporting metric and the way to confirm it. That format forces it to cite data instead of listing typical causes. A hypothesis that doesn't name a metric from your data gets discarded without further analysis.

## 5:05–5:42 · Slide 13: Step 6 of 6

Step 6. Verify the top hypothesis.

Verify the top hypothesis with a targeted measurement. An unconfirmed bottleneck is a suspicion.

Take the top-ranked hypothesis and design a targeted measurement to confirm or discard it. If it says the bottleneck is the connection pool, repeat the test with a larger pool and see whether the knee moves. If it doesn't move, the hypothesis was wrong and you move to the next. Until a measurement confirms it, a bottleneck is a suspicion. Reporting it as a finding without verifying gets the team optimizing something that wasn't the problem.

## 5:43–6:28 · Slide 14: Example

An example.

A team asks a model for a script for its API with the spec, the traffic mix and the targets. The checklist review finds two problems: there's no think time between actions and the latency threshold is five hundred milliseconds, when their target was two seconds. They fix both. The dry run passes. The real run shows a knee at one hundred and twenty users. For analysis they hand over the summary and the server metrics. The top hypothesis: the database connection pool is exhausted, because active connections hit the maximum exactly when latency rises. They enlarge the pool, repeat, and the knee moves to one hundred and eighty. Hypothesis confirmed, with illustrative figures.

## 6:29–6:47 · Slide 15: Common mistakes

The most common mistakes.

Asking for the script without spec, traffic mix or targets.

Running the generated script without reviewing it against the checklist.

Asking for analysis with only the load tool's summary.

Reporting an unverified hypothesis as the bottleneck.

## 6:48–7:05 · Slide 16: Checklist

To know it is done, check this.

The request includes spec, traffic mix and targets.

The script passed the five-question checklist.

There was a dry run before the real run.

The top hypothesis was confirmed or discarded with a measurement.

## 7:06–7:17 · Slide 17: Where AI fell short

And where AI fell short.

Without server metrics, it confidently diagnoses generic causes. The analysis is worth what the data you feed it is worth.

## 7:18–7:32 · Slide 18: The written guide

That was day 27. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 28: Evals in CI: quality gates for AI features.
