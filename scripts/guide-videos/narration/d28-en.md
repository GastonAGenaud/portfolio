# Video script · Day 28: Evals in CI: quality gates for AI features

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d28-en.mp4`
- Video length: 7:16
- Speech without pauses: 6:19

## 0:00–0:16 · Slide 1: Video guide

Day 28 of the 31 days of QA + AI series.

Evals in CI: quality gates for AI features.

How to bring evals into the pipeline at three tiers (PR, nightly and release) with a gate that blocks merges and controlled cost.

## 0:17–0:39 · Slide 2: The problem

An eval that runs only when someone remembers ends up not running. The way to sustain the quality of an AI feature over time is the same as for the rest of software: a gate in the pipeline that blocks the change when something gets worse. What changes are the constraints. Evals cost money per run, take longer than a unit test and their result varies.

## 0:39–1:00 · Slide 3: How it fits together

Putting every eval on every pull request makes the pipeline slow and expensive, and the team ends up skipping it. Putting in none lets regressions through. This guide organizes evals into three tiers, per PR, nightly and per release, each with a different scope, cost and consequence, and shows how to keep spending under control.

## 1:01–1:15 · Slide 4: Requirements

To follow this guide you need:

A repo with evals (day 8) and a golden dataset (day 17).

CI: GitHub Actions or Jenkins.

An API key stored as a CI secret, with a spending cap.

## 1:16–1:22 · Slide 5: Setup

This is the setup. Pause the video if you want to copy it: the full version is in the written guide.

## 1:23–1:25 · Slide 6: Setup

And this is the next setup file.

## 1:26–1:54 · Slide 7: The three tiers

The three tiers.

PR: runs when prompts, evals or AI code change. Reduced dev set, 3 runs, format and content checks. Blocks the merge.

Nightly: every night. Full test set x5, judge and red teaming. Alerts the team and shows the trend.

Release: before shipping. Full regression plus performance. A person signs off.

## 1:55–2:33 · Slide 8: Step 1 of 6

Step 1. The PR tier.

Start with the PR tier: a small, fast subset that runs only when prompts, evals or AI code change.

It's a small, fast subset designed to answer within a few minutes. It runs only when the change touches prompts, eval config or code that calls the model. For a frontend style change, spending tokens makes no sense. Include the deterministic format and content checks, and a reduced set of cases with few repetitions. Its job isn't measuring quality precisely, but catching obvious breakage before the merge.

## 2:34–3:07 · Slide 9: Step 2 of 6

Step 2. The exit code as the gate.

The eval command returns a non-zero exit code when cases fail. That's enough to block the merge.

The mechanism is the same as for any test. The eval command ends with a non-zero code when cases fail, and the pipeline marks the step red. That's enough to block the merge through branch protection rules. Nothing special needs building. You do need to verify it works: force a failure on purpose on a test branch and confirm the pull request ends up blocked.

## 3:08–3:43 · Slide 10: Step 3 of 6

Step 3. Artifacts always, on failure too.

Always save the result as an artifact, including on failure. Without the detail nobody can diagnose.

Configure the step that saves results to run even when the eval fails. It's a config detail often forgotten, and then the pipeline goes red with no information about which case failed or what the model answered. The artifact must include inputs, outputs and verdicts per case. With that file, whoever opened the PR can diagnose in minutes without rerunning everything on their machine.

## 3:44–4:20 · Slide 11: Step 4 of 6

Step 4. Controlling cost.

Control cost: path filters, response caching, a subset on PRs and a CI API key with a spending cap.

There are four levers. Path filters, so evals don't run on changes that don't affect them. Response caching, so you don't pay twice for the same input with the same prompt. A subset at the PR tier instead of the full set. And a CI-only API key with a spending cap, so a config error or a loop doesn't consume the month's budget. Publish each run's spend next to the result.

## 4:21–4:57 · Slide 12: Step 5 of 6

Step 5. The nightly tier.

Add the nightly tier with the full set, five runs, the judge and red teaming. That's where you watch the trend, not a single PR.

Once a day, with the full test set, five repetitions, the calibrated judge and red teaming. This is where you measure precisely. The result doesn't block a particular PR: it alerts the team and feeds a trend chart. It's where you'll detect problems no PR introduced, such as a silent provider update or gradual degradation. Since it runs at night, time and cost are more tolerable.

## 4:58–5:31 · Slide 13: Step 6 of 6

Step 6. The release tier.

At release run regression and performance, and leave the final call to a person with the report in front of them.

Before shipping, full regression and performance tests run. The difference from the other tiers is who decides. Here the result is a report a person reads and signs. Automatic gates cover what can be expressed as a threshold. The decision to ship with a metric at the limit or with a known risk is a business judgment, and someone has to take responsibility for it with the information in front of them.

## 5:32–6:11 · Slide 14: Example

An example.

A team sets up the three tiers. The PR one runs fifteen cases with three repetitions, only on changes to the prompts and evals folders, and takes four minutes. In the first week it blocks a pull request where a wording change broke the JSON format in two cases. The author opens the artifact, sees the two outputs and fixes it in ten minutes. The nightly tier runs one hundred and twenty cases with five repetitions. One Tuesday the pass rate drops four points with no PR merged. The run card shows the model that answered wasn't the expected one, because of an unpinned alias nobody had noticed.

## 6:12–6:29 · Slide 15: Common mistakes

The most common mistakes.

Running the full set on every pull request.

Not saving artifacts when the eval fails.

Using an API key with no spending cap in CI.

Treating a single green as proof that quality holds.

## 6:29–6:47 · Slide 16: Checklist

To know it is done, check this.

The PR tier runs only on relevant changes and within minutes.

A forced failure blocks the merge.

Results are saved as an artifact on failure too.

A nightly tier with a trend and a capped key exists.

## 6:48–6:58 · Slide 17: Where AI fell short

And where AI fell short.

The same code can pass a gate and fail hours later. With models, a single green doesn't replace the trend.

## 6:59–7:15 · Slide 18: The written guide

That was day 28. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 29: QA infra for AI: ephemeral runners, local models, secrets and cost.
