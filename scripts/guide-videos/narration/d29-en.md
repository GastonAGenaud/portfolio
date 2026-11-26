# Video script · Day 29: QA infra for AI: ephemeral runners, local models, secrets and cost

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d29-en.mp4`
- Video length: 8:02
- Speech without pauses: 7:06

## 0:00–0:16 · Slide 1: Video guide

Day 29 of the 31 days of QA + AI series.

QA infra for AI: ephemeral runners, local models, secrets and cost.

The five infrastructure decisions that keep AI testing reproducible, safe and affordable.

## 0:17–0:37 · Slide 2: The problem

The evals, agents and security tests from the last few days run on something: runners, containers, models, keys and data. That infrastructure is rarely designed. It gets assembled from whatever is at hand, and one day the pipeline costs three times as much, a result can't be reproduced or a key shows up in a log.

## 0:38–1:05 · Slide 3: How it fits together

Infrastructure decisions for QA with AI are few and have long consequences. Where the model runs defines cost and privacy. What runners are like defines reproducibility. Where an agent works defines how much damage a mistake can cause. This guide walks through those decisions with a practical rule for each, and with two metrics almost nobody publishes that are worth having from day one: tokens and spend per run.

## 1:06–1:12 · Slide 4: Requirements

To follow this guide you need:

The pipeline from day 28.

Docker on the runner.

## 1:13–1:19 · Slide 5: Setup

This is the setup. Pause the video if you want to copy it: the full version is in the written guide.

## 1:20–2:08 · Slide 6: The five decisions

The five decisions.

Where the model runs: cloud API (simple, pay per token, data leaves) or a local model on the runner (free, private, slower and less capable). My rule: local for smoke and format, cloud for judged evals.

Runners: persistent or ephemeral (a clean container per run). My rule: always ephemeral.

Where an agent works: on the runner with credentials or in a sandbox with no production credentials and limited network egress. My rule: sandbox.

Secrets: one shared key or one per environment, with least privilege and a spending cap. My rule: per environment.

Data: a production copy or synthetic and anonymized. My rule: never production.

## 2:09–2:54 · Slide 7: Step 1 of 6

Step 1. Where the model runs.

Decide where the model runs in CI. A local model as a service covers smoke and format checks at no cost; judged evals need a more capable model.

There are two options, and the usual thing is to combine them. A local model, started as a service inside the runner, has no per-token cost and takes no data out of your infrastructure, but it's slower and less capable. A cloud API offers more capable models, charges per use and receives your data. The rule that works best is assigning each job to the cheapest model that solves it: smoke and format checks with the local model, judged evals with a more capable one. Measure before assuming the small one is enough.

## 2:54–3:38 · Slide 8: Step 2 of 6

Step 2. Ephemeral runners.

Use ephemeral runners: every run starts clean. Leftover state from a previous run is a frequent cause of results you can't reproduce.

An ephemeral runner starts clean on every run: a new container, with no files, caches or processes from the previous run. Persistent runners accumulate state, such as a dependency installed by hand, a temporary file or a model someone updated. That state makes the same commit give different results depending on which machine it landed on. With models, which already bring their own variation, adding the environment's makes it impossible to know what changed. Always ephemeral, with versions pinned in the image.

## 3:39–4:22 · Slide 9: Step 3 of 6

Step 3. Sandbox for agents.

If an agent executes commands in CI, have it do so in a sandbox: a container with no production credentials and restricted network egress.

If an agent executes commands inside the pipeline, for example to repair a test or investigate a failure, it must do so in an isolated environment: a container with no production credentials, with the file system limited to the repository and with network egress restricted to the necessary destinations. The agent reads content that may carry malicious instructions, as we saw on day twenty-four. The sandbox guarantees that, if one of those instructions takes effect, nothing valuable is within its reach.

## 4:22–5:01 · Slide 10: Step 4 of 6

Step 4. Secrets.

Secrets: one API key per environment, with least privilege and a spending cap, and verify it doesn't show up in logs or artifacts.

Use one API key per environment: one for development, one for CI and one for production. Each with least privilege and a spending cap. That way a leaked key or a runaway loop in CI affects neither production nor the overall budget. Store them in the CI system's secrets manager, never in the repository. And actively verify they don't show up in logs or artifacts, because some tools print the full configuration when they fail.

## 5:02–5:39 · Slide 11: Step 5 of 6

Step 5. Cost as a metric.

Cost as a metric: report tokens and spend per run next to the pass rate. What isn't measured grows.

Publish tokens consumed and spend on every run, next to the pass rate. What isn't measured grows. A dataset that doubles, a judge that gets added or one more repetition are all reasonable changes nobody adds up. With the number in view, each change shows its cost and the team can decide whether it's worth it. It also lets you detect anomalies: a run costing ten times the usual tends to indicate an error, not more work.

## 5:40–6:16 · Slide 12: Step 6 of 6

Step 6. Reproducibility.

Reproducibility: pinned tool versions (lockfile) and model versions, and results archived with their run card.

Two things make a run reproducible. The first is pinning versions: tools through the lockfile and the container image, and models through their exact identifier. The second is archiving results with their run card, the one from day fifteen, for a defined period. When someone asks why a result changed between two dates, you'll be able to compare which version of each thing was used on each, instead of trying to remember.

## 6:17–6:54 · Slide 13: Example

An example.

A team reviews its eval pipeline after a month with higher spending than planned. On publishing tokens per run, they discover the format check, which runs on every pull request, uses the most expensive model. They move it to a local model started as a service on the runner. Format is validated just the same, and that step stops costing anything. Judged evals stay in the cloud. They also find that two of their three runners were persistent and had different versions of a tool, which explained different results for the same commit. They replace them with ephemeral containers with a pinned image.

## 6:55–7:12 · Slide 14: Common mistakes

The most common mistakes.

Using the most expensive model for checks a local one handles.

Keeping persistent runners with accumulated state.

Letting an agent run in CI with production credentials.

Sharing a single API key across all environments.

## 7:13–7:32 · Slide 15: Checklist

To know it is done, check this.

Each type of eval has an assigned model, with its justification.

Runners are ephemeral and the image pins versions.

Agents run in a sandbox with no production credentials.

Each run publishes tokens and spend next to the result.

## 7:33–7:44 · Slide 16: Where AI fell short

And where AI fell short.

A small local model is enough for smoke and format, not for judgment. Choosing a model on cost without measuring quality gets expensive.

## 7:44–8:00 · Slide 17: The written guide

That was day 29. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 30: LLM observability in production: traces, online evals and alerts.
