# Video script · Day 15: How to set up models for quality testing

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d15-en.mp4`
- Video length: 7:05
- Speech without pauses: 6:16

## 0:00–0:17 · Slide 1: Video guide

Day 15 of the 31 days of QA + AI series.

How to set up models for quality testing.

Configuring a model for testing reproducibly: pinned version, explicit parameters, structured output and a judge separate from the model under test.

## 0:18–0:39 · Slide 2: The problem

When a test involving a model gives different results from one day to the next, the first suspect is usually the model. The second should be the configuration. An alias pointing to the latest version, a temperature left at its default, a token limit that cuts the answer off or a judge that changed without notice explain a good share of the unexplained differences.

## 0:40–1:00 · Slide 3: How it fits together

Setting up a model for quality testing means treating it like any other dependency of a test environment: pinned version, explicit parameters and a record of what each thing ran with. This guide walks through the six decisions that make two runs comparable, and makes clear what reproducibility means when the system under test isn't deterministic.

## 1:01–1:10 · Slide 4: Requirements

To follow this guide you need:

The eval harness from day 8.

Optional: a provider API key for the second model and the judge.

## 1:11–1:17 · Slide 5: Setup

This is the setup. Pause the video if you want to copy it: the full version is in the written guide.

## 1:18–2:00 · Slide 6: Step 1 of 6

Step 1. The role defines the config.

Define the model's role in the test: system under test, generator (data or tests) or judge. Each role is configured differently.

The same model can play three roles in your process, and each asks for something different. As the system under test, it's configured the same as in production, because you want to measure what the user gets. As a generator of data or tests, it can use more temperature to produce variety. As a judge, it needs the most stable configuration possible. Mixing roles in a single config is a frequent mistake: you end up measuring the product with parameters the product doesn't use.

## 2:01–2:41 · Slide 7: Step 2 of 6

Step 2. Exact version, no aliases.

Pin the exact version. No "latest" aliases: if the provider updates the model, your results change without you touching anything.

Providers offer aliases pointing to a model's most recent version. They're convenient for development and bad for measuring: the day the alias moves, your results change without you touching anything, and you have no way of knowing why. Always use the full identifier with its version or date. When you want to upgrade, do it as a deliberate change: run the eval with the old and the new version, compare, and only then change the identifier.

## 2:42–3:25 · Slide 8: Step 3 of 6

Step 3. Parameters in plain sight.

Explicit parameters: low temperature for classifying and judging, an output token limit and a seed if the provider supports it. If a model doesn't expose a parameter, write that down.

Write into the config the parameters that affect the output, even when they match the defaults: temperature, output token limit and seed if the provider supports it. For classifying and judging, low temperature. The token limit deserves attention: an answer cut off halfway can look like a format failure when it's a badly set limit. Some models don't expose certain parameters or ignore them. Note that too, so you don't credit the config with control you don't have.

## 3:26–4:07 · Slide 9: Step 4 of 6

Step 4. Structured output.

Structured output: request JSON with a schema. It removes a good share of your format failures.

If your code is going to parse the answer, request it as JSON with a schema, using the provider's structured output mechanism where one exists. It reduces a whole class of failures: text before or after the JSON, fields with another name, values outside the allowed list. It doesn't replace validation on your side, which is still necessary, but it changes the proportion. You'll spend evals measuring whether content is correct, instead of spending cases discovering the format came back broken.

## 4:08–4:43 · Slide 10: Step 5 of 6

Step 5. A separate judge.

Separate judge: the grading model shouldn't be the one being graded, and should be equally or more capable.

The model that grades shouldn't be the one being graded, and it should be equally or more capable. A model evaluating its own output tends to find it reasonable, because it shares the same biases that produced it. Declare it as a separate provider, with its pinned version and its label. Changing the judge is changing the measuring instrument: after doing so, new metrics aren't comparable with earlier ones until you recalibrate.

## 4:44–5:22 · Slide 11: Step 6 of 6

Step 6. The run card.

Record a run card for each run: model and version, prompt version, parameters, date and dataset. No card, no valid comparison.

Each run should leave a record with model and version, prompt version, parameters, date, dataset and, if any, judge. It's a small file stored next to the results. Without that card, a comparison between two runs says nothing, because you don't know what else changed between them. With it you can answer the question that always arrives: why it scored ninety last week and eighty-four today.

## 5:23–5:59 · Slide 12: Example

An example.

A team notices their classification eval dropped five points with nobody touching the prompt. They look for the run cards and there are none. They reconstruct what they can: the provider used an alias and the vendor had released a new version that week. They pin the previous version, run again and the result returns to its original value. Then they run the new version on purpose: it's better on ambiguous cases and worse on two critical ones. They decide not to upgrade yet. From then on, every run stores its card and the model identifier includes the date.

## 6:00–6:18 · Slide 13: Common mistakes

The most common mistakes.

Using a version alias in evals or in CI.

Evaluating the product with parameters different from production.

Using the model under evaluation as its own judge.

Comparing two runs without knowing what changed between them.

## 6:19–6:36 · Slide 14: Checklist

To know it is done, check this.

Each provider has a role and a label that states it.

Every model is pinned to an exact version.

Temperature, token limit and seed are written down.

Each run stores its card next to the results.

## 6:36–6:48 · Slide 15: Where AI fell short

And where AI fell short.

Temperature zero doesn't guarantee the same answer. Reproducibility with LLMs is statistical: you measure it with repeated runs.

## 6:49–7:04 · Slide 16: The written guide

That was day 15. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 16: LLM-as-a-judge: rubrics and calibration against humans.
