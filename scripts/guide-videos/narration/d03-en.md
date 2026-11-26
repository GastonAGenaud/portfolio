# Video script · Day 3: The new ways of testing: from asserts to evals

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d03-en.mp4`
- Video length: 6:46
- Speech without pauses: 5:56

## 0:00–0:14 · Slide 1: Video guide

Day 3 of the 31 days of QA + AI series.

The new ways of testing: from asserts to evals.

How to turn a test with an exact assert on an AI output into a three-layer eval that isn't brittle.

## 0:15–0:35 · Slide 2: The problem

When a feature includes a model, the classic test stops working as is. An assert comparing against exact text fails even when the answer is right, because the model words it differently every time. The usual reaction is to mark the test as flaky, add retries and move on. That hides the problem: the test stopped measuring.

## 0:36–0:55 · Slide 3: How it fits together

The way out isn't abandoning automation but changing the question. Instead of "is it equal to this?", we ask "does it meet these criteria, most of the time?". That is an eval. This guide shows how to build one in three layers, from the cheapest and most deterministic to the most expensive, and how to choose a threshold.

## 0:56–1:08 · Slide 4: Requirements

To follow this guide you need:

Node.js 22 or later.

One of your tests that compares exact text.

Optional: Ollama with a local model.

## 1:08–1:15 · Slide 5: Setup

This is the setup. Pause the video if you want to copy it: the full version is in the written guide.

## 1:16–1:57 · Slide 6: Step 1 of 6

Step 1. Assert versus eval.

Understand the difference: an assert compares against an exact value; an eval measures whether the output meets criteria, several times, and yields a percentage.

An assert has one input, one expected output and a binary result. An eval has a set of inputs, criteria instead of a single output, several runs per input and a percentage result compared against a threshold. How you read a failure changes too: in an assert, red means bug; in an eval, one bad run may be noise and five in a row are a regression. That is why you need to record the pass rate over time and not just the latest result.

## 1:58–2:35 · Slide 7: Step 2 of 6

Step 2. Layer one: format.

Layer 1, format: validate structure with deterministic checks (valid JSON, required fields, length).

It's the cheapest layer and the one that catches the most. Check that the output is valid JSON, that required fields exist with the right type, that maximum lengths hold and that no text sits outside the structure. All of that is solved with a schema and no model call. If this layer fails, evaluating the next ones is pointless: an answer your application can't parse is already a defect, whatever it says.

## 2:36–3:14 · Slide 8: Step 3 of 6

Step 3. Layer two: content.

Layer 2, content: verify key facts with contains or regex, without demanding the exact sentence.

Here you verify facts, not wording. If the answer must mention an amount, a date and a status, look for those three with contains or a regular expression. Checking the opposite also helps: that information which shouldn't be there doesn't appear, such as another customer's data or a nonexistent step. This layer is still deterministic and cheap. The practical rule is that every hard fact gets validated here, never by another model's opinion.

## 3:15–3:51 · Slide 9: Step 4 of 6

Step 4. Layer three: judgment.

Layer 3, judgment: use a rubric graded by another model for what rules can't express (tone, completeness).

What remains is what rules can't express: whether the tone fits, whether the explanation is complete, whether the answer really addresses the question. For that you use a rubric graded by another model, with observable criteria and a pass or fail result. It's the most expensive and least reliable layer, so keep it small. Day sixteen shows how to calibrate that judge against your own judgment before trusting it.

## 3:51–4:27 · Slide 10: Step 5 of 6

Step 5. Runs and threshold.

Run N times and set a threshold: for example, pass if 9 of 10 runs satisfy all three layers.

Run each case several times: three for daily work, five or ten when you're about to make a decision. The threshold depends on risk. For the format layer, demand one hundred percent, because broken JSON breaks the application. For judgment, ninety percent can be reasonable. What matters is setting the number before looking at results and writing down why, so you don't adjust it afterwards to whatever came out.

## 4:27–5:03 · Slide 11: Step 6 of 6

Step 6. Its place in the pyramid.

Place it in your pyramid: unit and contract stay deterministic; evals are an extra layer for anything that touches a model.

Evals replace nothing you already have. Unit and contract tests stay deterministic and keep running on every commit. Evals are an extra layer covering only what touches a model, and they usually run at a different frequency because they cost more. A common mistake is trying to cover logic that doesn't depend on the model with evals: that is tested better, faster and cheaper with a classic test.

## 5:04–5:42 · Slide 12: Example

An example.

A team has a test comparing an order summary against fixed text, failing one run in three. They rewrite it like this. Layer one: the output is JSON with summary and status fields, and the summary stays within 280 characters. Layer two: the summary contains the order number and the total amount. Layer three: a rubric checks that it adds no steps the order doesn't have. They run it ten times. Layer one passes ten out of ten, so does layer two, layer three nine out of ten. With a ninety percent threshold it passes, and the failed run is saved for review.

## 5:43–6:01 · Slide 13: Common mistakes

The most common mistakes.

Covering an exact assert with retries instead of changing what is measured.

Using a judge model to validate hard facts such as amounts or dates.

Setting the threshold after seeing the results.

Drawing conclusions from a single run.

## 6:02–6:20 · Slide 14: Checklist

To know it is done, check this.

The original test is rewritten into three separate layers.

Format and content are validated without calling a model.

There is a written threshold with its justification.

You saved and reviewed at least one failed run.

## 6:20–6:30 · Slide 15: Where AI fell short

And where AI fell short.

The judge model approved an answer with a wrong fact. Facts get validated with rules, not with another model.

## 6:31–6:44 · Slide 16: The written guide

That was day 3. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 4: Your AI QA lab: full setup in 30 minutes.
