# Video script · Day 25: A model for performance testing (1): the metrics that matter for an LLM

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d25-en.mp4`
- Video length: 7:55
- Speech without pauses: 6:56

## 0:00–0:17 · Slide 1: Video guide

Day 25 of the 31 days of QA + AI series.

A model for performance testing (1): the metrics that matter for an LLM.

The performance model of an LLM feature: workload profile, text-generation-specific metrics and percentile targets.

## 0:18–0:40 · Slide 2: The problem

Someone coming from traditional performance testing arrives at an endpoint with a model and applies what they know: requests per second, average latency and error rate. The numbers come out, and they describe the system poorly. Two requests to the same endpoint can generate twenty tokens or two thousand, and take half a second or forty. Averaging them blends things that aren't alike.

## 0:41–1:03 · Slide 3: How it fits together

A model's unit of work is the token. The user's experience depends on when the first one arrives and on how smoothly the rest follow. This guide introduces the metrics that describe that, how to define targets per percentile and how to measure a single-user baseline. Without that baseline, any later load test is a number with no reference.

## 1:04–1:13 · Slide 4: Requirements

To follow this guide you need:

An OpenAI-compatible endpoint (local Ollama works).

Python 3.10+.

## 1:14–1:20 · Slide 5: Setup

This is the setup. Pause the video if you want to copy it: the full version is in the written guide.

## 1:21–1:24 · Slide 6: Setup

And this is the next setup file.

## 1:24–2:09 · Slide 7: The metrics

The metrics.

TTFT (time to first token): time until the first token. It's what the user feels as "it answered".

ITL (inter-token latency): time between tokens. It measures how smooth streaming text is.

Output tokens/s: generation speed. It's the system's real capacity.

Total latency p95 and p99: the tail is what generates complaints.

Error rate (429, 5xx, timeouts): quota limits and saturation.

Goodput: percentage of requests meeting all targets at once.

Cost per request: input and output tokens. Load is paid for too.

## 2:09–2:54 · Slide 8: Step 1 of 6

Step 1. Why classic metrics mislead.

Understand why classic metrics mislead: two requests to the same endpoint can generate 20 or 2,000 tokens. Requests per second and average latency blend different things.

In a traditional API, requests to the same endpoint cost roughly the same. With a model, each request's cost depends on how many tokens go in and, above all, how many come out, because generation is sequential. Ten requests per second with short answers and with long answers are two completely different loads for the same server. If you report only requests per second and average latency, two tests with the same result may have measured different things.

## 2:55–3:36 · Slide 9: Step 2 of 6

Step 2. The workload profile.

Define the workload profile: prompt sizes, expected output length, streaming or not, and peak concurrency.

Before measuring, describe the real load. Which prompt sizes arrive and in what proportion. What answer length is expected. Whether streaming is used or the full answer is awaited. What peak concurrency is. Take this from production logs if they exist, or estimate it with the product team if not. A profile with three or four request types and their proportions is enough. Without a profile you'll test with an arbitrary prompt and get numbers that predict nothing.

## 3:37–4:17 · Slide 10: Step 3 of 6

Step 3. Targets per percentile.

Set targets per percentile, not average: for example TTFT p95, total latency p95 and a maximum error rate.

An average hides the tail, and the tail is where the complaining users are. Define targets as percentiles: for example, time to first token at the ninety-fifth percentile, total latency at the ninety-fifth percentile and a maximum error rate. The values come from the experience the product needs, not from what the system delivers today. Write them before measuring. If you define them afterwards, they'll look suspiciously like what you measured.

## 4:17–4:56 · Slide 11: Step 4 of 6

Step 4. The single-user baseline.

Measure the single-user baseline with the script. If you miss targets with one user, there's no load test to run yet.

Run the script with a single user and no concurrency, several times for each request type in the profile. That gives you the best case: what the system does when competing with nobody. If you miss targets with one user, there's no load test to run yet, because the problem lies in the chosen model, the prompt size or the infrastructure, and load will only make it worse. The baseline is also the reference for reading everything that comes next.

## 4:57–5:32 · Slide 12: Step 5 of 6

Step 5. Goodput.

Add goodput: the percentage of requests meeting all targets at once.

Goodput is the percentage of requests meeting all targets at once: first token on time, total latency within the limit and no error. It matters because the separate metrics can look fine while the experience is poor. A system can sustain many requests per second and have low goodput if a good share of them arrive late. It's the number that best sums up whether load is being served acceptably, and it's useful for comparing configurations.

## 5:33–6:10 · Slide 13: Step 6 of 6

Step 6. Cost per request.

Record cost per request. A load test against a paid API consumes real budget.

Record each request's input and output tokens and convert them into cost. It has two uses. The first is product-related: knowing what it costs to serve a user at the expected load. The second is practical. A load test against a paid API consumes real budget, and a badly sized test can spend in an hour what was planned for a month. Estimate the test's cost before running it and use a key with a spending cap.

## 6:10–6:49 · Slide 14: Example

An example.

With illustrative values: a team defines three request types for its assistant, short, medium and long, in a sixty, thirty, ten proportion. The targets are first token in under a second and a half and total latency under twelve seconds, both at the ninety-fifth percentile. The single-user baseline shows the short and medium ones comply. The long ones take eighteen seconds in total, even though the first token arrives on time. Before any load test there's already a finding. They discuss it with product and agree to limit the length of those answers, which brings them to eleven seconds.

## 6:50–7:07 · Slide 15: Common mistakes

The most common mistakes.

Reporting only requests per second and average latency.

Testing with a single prompt that doesn't represent the real load.

Setting targets after seeing the measurements.

Launching a load test without estimating what it will cost.

## 7:08–7:26 · Slide 16: Checklist

To know it is done, check this.

The workload profile has request types and proportions.

Targets are written per percentile before measuring.

There is a single-user baseline for each request type.

Each measurement includes tokens and cost per request.

## 7:27–7:37 · Slide 17: Where AI fell short

And where AI fell short.

Assistants default to classic API metrics (RPS, averages). You have to explicitly ask for generation metrics.

## 7:38–7:53 · Slide 18: The written guide

That was day 25. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 26: Performance (2): load testing an LLM endpoint with k6.
