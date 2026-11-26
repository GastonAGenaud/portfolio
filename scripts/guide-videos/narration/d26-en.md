# Video script · Day 26: Performance (2): load testing an LLM endpoint with k6

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d26-en.mp4`
- Video length: 7:18
- Speech without pauses: 6:24

## 0:00–0:17 · Slide 1: Video guide

Day 26 of the 31 days of QA + AI series.

Performance (2): load testing an LLM endpoint with k6.

A staged load test against an LLM endpoint, with token and goodput metrics, to find the point where the system stops scaling.

## 0:17–0:34 · Slide 2: The problem

With yesterday's baseline and targets you can now ask the question that matters to whoever operates the system: how many users it supports before the experience degrades. The answer is a curve with a breaking point, and finding it requires loading gradually and watching the right metrics.

## 0:34–0:58 · Slide 3: How it fits together

k6 works well for this. Scripts are code, they run locally and in CI, and thresholds turn the test into a pass or fail criterion. But a load test against a model has traps of its own: caching that flatters the results, provider quota limits that look like saturation and default timeouts that cut long answers off. This guide builds the test while avoiding those three.

## 0:59–1:21 · Slide 4: Requirements

To follow this guide you need:

k6 installed.

An OpenAI-compatible endpoint and the day 25 targets.

Approved budget if the API is paid: cap max_tokens, duration and users.

k6 doesn't natively measure streaming: TTFT under load needs an SSE extension or an LLM-specific tool.

## 1:22–1:28 · Slide 5: Setup

This is the setup. Pause the video if you want to copy it: the full version is in the written guide.

## 1:29–1:31 · Slide 6: Setup

The same file continues here.

## 1:32–1:35 · Slide 7: Setup

And this is the next setup file.

## 1:36–2:14 · Slide 8: Step 1 of 6

Step 1. Thresholds from the targets.

Start from the day 25 baseline and written targets. The script's thresholds come from there.

The script's thresholds are the targets you wrote yesterday, translated into code: the ninety-fifth percentile of time to first token, that of total latency and the maximum error rate. Don't invent them while writing the script or accept whatever an example brings. A threshold with no origin is decoration: nobody knows what it means when it fails. With product targets as thresholds, a red result means users will have a worse experience than agreed.

## 2:14–2:54 · Slide 9: Step 2 of 6

Step 2. A realistic prompt mix.

Use a prompt mix similar to the real one. With a single repeated prompt, caching gives you numbers production won't see.

Load prompts from a file with the workload profile's mix: types and proportions. If you repeat a single prompt, two things happen. The provider's cache or your own application's answers far faster than in real use, and numbers come out better than production will see. Also, all answers have the same length, and you lose the variability that stresses the system. Use enough different prompts that they don't repeat during the test.

## 2:55–3:29 · Slide 10: Step 3 of 6

Step 3. Load in stages.

Load in stages: ramp, hold, ramp again. Plateaus are where you read behavior.

Raise load in steps: ramp to a level, hold it for a few minutes, ramp to the next. Plateaus are where you read behavior, because the system had time to stabilize. During ramps the numbers blend two states. Hold each plateau long enough to complete the profile's longest request several times. If a long answer takes forty seconds, a one-minute plateau barely manages to show one round.

## 3:30–4:07 · Slide 11: Step 4 of 6

Step 4. Finding the knee.

Look for the knee: the point where total tokens per second stop growing and latency starts climbing. That's your capacity.

Plot total tokens per second and latency for each plateau. At first, more users produce more tokens per second with stable latency. At some point tokens per second stop growing and latency starts climbing. That's the knee, and it marks the system's real capacity. Beyond that point each additional user only makes the others wait longer. Your usable capacity sits a little below it, with headroom for peaks.

## 4:08–4:49 · Slide 12: Step 5 of 6

Step 5. Separating errors.

Separate errors: 429 is the provider's rate limit; 5xx and timeouts are saturation. They get fixed differently.

Not all errors mean the same. A 429 is the provider's quota limit: you reached the maximum requests or tokens per minute your account allows, and it's solved by requesting more quota or adding a queue with retries. A 5xx or a timeout is saturation, of your infrastructure or the provider's, and it's solved with capacity or by reducing work per request. Count them separately in the script. Blended into a single error rate, they lead to the wrong fix.

## 4:50–5:27 · Slide 13: Step 6 of 6

Step 6. Thresholds as the criterion and scheduled runs.

Keep thresholds as the pass or fail criterion and run the test on a schedule, not on every PR.

Keep thresholds as the automatic pass or fail criterion, so the test can run without someone interpreting charts each time. Schedule it periodically or before each release, not on every pull request: it's slow, costs money if you use a paid API and needs a stable environment to be comparable. Save each run's summary. The trend of the knee over time warns you of a degradation before it becomes an incident.

## 5:28–6:10 · Slide 14: Example

An example.

With illustrative figures: a team loads its assistant in plateaus of five, ten, twenty and forty users, three minutes each, with fifty different prompts. Up to twenty users, tokens per second grow almost proportionally and the ninety-fifth percentile of latency holds at nine seconds. With forty, tokens per second stay the same as with twenty and latency rises to twenty-two seconds. The knee is around twenty. In the last plateau errors appear. Separating them, almost all are 429s. It isn't model saturation but the account's quota limit. The right action is managing quota and adding a queue, not adding servers.

## 6:10–6:30 · Slide 15: Common mistakes

The most common mistakes.

Repeating a single prompt and measuring the cache instead of the system.

Raising load in a single ramp with no plateaus.

Adding 429s and 5xxs into a single error rate.

Leaving the default timeout and cutting long answers off.

## 6:30–6:49 · Slide 16: Checklist

To know it is done, check this.

The script's thresholds match the written targets.

Prompts come from a file with the profile's mix.

The test has plateaus and you located the knee.

429 errors are counted apart from 5xxs and timeouts.

## 6:49–7:01 · Slide 17: Where AI fell short

And where AI fell short.

Generated scripts often come with no timeout, no prompt mix and made-up thresholds. Review them against your targets before running.

## 7:02–7:17 · Slide 18: The written guide

That was day 26. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 27: Performance (3): AI generating and analyzing load tests.
