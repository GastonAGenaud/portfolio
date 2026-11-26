# Video script · Day 16: LLM-as-a-judge: rubrics and calibration against humans

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d16-en.mp4`
- Video length: 6:58
- Speech without pauses: 6:06

## 0:00–0:16 · Slide 1: Video guide

Day 16 of the 31 days of QA + AI series.

LLM-as-a-judge: rubrics and calibration against humans.

How to write an observable rubric for a judge model and measure how much it agrees with your judgment before trusting it.

## 0:17–0:35 · Slide 2: The problem

Some qualities of an answer are captured by no rule: whether the explanation is clear, whether the tone fits, whether it answers what was asked. Reviewing them by hand doesn't scale beyond a few dozen cases. The usual solution is asking another model to grade them, known as LLM as a judge.

## 0:36–0:59 · Slide 3: How it fits together

The problem is that this judge is another non-deterministic system with its own errors, and its verdicts come with very convincing justifications. Using it uncalibrated is like measuring with an instrument you never compared against a standard. This guide shows how to write a rubric that can be verified, how to measure agreement between the judge and you, and when that agreement is enough to trust it with a gate.

## 1:00–1:15 · Slide 4: Requirements

To follow this guide you need:

An eval harness with a judge configured (days 8 and 15).

30 real outputs from the model under test.

A sheet with columns: id, human verdict, judge verdict, reason.

## 1:15–1:22 · Slide 5: Setup

This is the setup. Pause the video if you want to copy it: the full version is in the written guide.

## 1:22–2:02 · Slide 6: Step 1 of 6

Step 1. Observable criteria.

Write observable criteria. "Is the answer good?" doesn't work. "Mentions the component from the report" does.

A rubric works when two people reading it reach the same verdict on the same answer. "Is the answer good?" doesn't qualify. "Mentions the component named in the report" does, because it can be checked by looking at the text. Write few criteria, each verifiable, and define the result as pass or fail with all criteria met. Avoid one-to-five scales: nobody knows what separates a three from a four, and neither does the judge.

## 2:03–2:43 · Slide 7: Step 2 of 6

Step 2. Thirty labels of your own, first.

Hand-label 30 outputs yourself, pass or fail, with the reason. Do it before looking at what the judge says.

Take thirty real outputs from the system and label them by hand, pass or fail, noting the reason in one line. Do it before running the judge and without looking at what it would say. If you see its verdict first, your label gets contaminated and the agreement you measure afterwards will come out inflated. Thirty cases are a reasonable floor to start. Aim for passes and fails in similar proportions: with almost everything passing you won't know whether the judge detects the bad ones.

## 2:44–3:15 · Slide 8: Step 3 of 6

Step 3. Run the judge on the same cases.

Run the judge on the same 30.

Run the judge with the rubric on those same thirty outputs, with the stable configuration you defined yesterday. Save the verdict and justification for each case. If you can, run two or three times to see whether the judge is consistent with itself. A judge that changes its verdict on the same input between runs has a problem that comes before agreement with you: the rubric leaves too much room or the config isn't stable.

## 3:16–3:56 · Slide 9: Step 4 of 6

Step 4. Agreement and direction.

Compute agreement: matching cases divided by total. And check the direction of disagreement: is the judge more lenient or stricter than you?

The calculation is simple: matching cases divided by the total. But the number alone isn't enough. Look at the direction of disagreement. If the judge passes cases you failed, it's lenient and your gate will let defects through. If it fails cases you passed, it's strict and will block valid work. Those are different risks and they're fixed differently. Build the two-by-two table, you against the judge, and read the two disagreement cells separately.

## 3:57–4:35 · Slide 10: Step 5 of 6

Step 5. Fix the rubric.

Fix the rubric where you disagree: a sharper criterion or one pass and one fail example.

Read each disagreement and ask who is right. Sometimes it's the judge, and you correct your label. Most often the criterion was ambiguous. Two fixes work: rewriting the criterion to make it sharper, or adding to the rubric one example that passes and one that fails. Don't add ten examples, because the judge starts copying the examples instead of applying the criterion. And don't use as an example any of the thirty cases you'll measure afterwards.

## 4:35–5:13 · Slide 11: Step 6 of 6

Step 6. Measure again and set a minimum.

Measure again. Set a minimum agreement to use the judge in CI and recalibrate whenever you change the judge model.

Run again and recompute. Decide in advance which minimum agreement you need to use the judge in CI and write it down. If you don't reach it, the judge is useful for ordering what to review by hand, but not for blocking a merge. Calibration expires: every time you change the judge model, its version or the rubric, measure again against your labels. Keep those thirty labels as an asset, because they are your reference standard.

## 5:14–5:54 · Slide 12: Example

An example.

A team evaluates summaries of support tickets. They label thirty by hand: eighteen pass and twelve fail. The judge matches on twenty-three, an agreement of seventy-seven percent. Of the seven disagreements, six are cases the judge passed and they didn't: it's lenient. Reading them, they find the pattern. The criterion said "includes the customer's problem" and the judge accepted vague mentions. They rewrite it as "names the product and the concrete symptom" and add one example of each verdict. In the second measurement, twenty-eight out of thirty match. They set that level as the minimum for using it in the pipeline.

## 5:55–6:11 · Slide 13: Common mistakes

The most common mistakes.

Labeling after seeing the judge's verdict.

Using numeric scales instead of pass or fail.

Looking only at the agreement percentage and not its direction.

Changing the judge model without recalibrating.

## 6:12–6:32 · Slide 14: Checklist

To know it is done, check this.

The rubric has criteria that can be checked by looking at the text.

There are thirty cases labeled by hand before running the judge.

You computed agreement and know whether the judge is lenient or strict.

There is a written minimum agreement for using it in CI.

## 6:32–6:42 · Slide 15: Where AI fell short

And where AI fell short.

The judge explains wrong verdicts very well. Don't trust the justification: measure agreement.

## 6:42–6:57 · Slide 16: The written guide

That was day 16. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 17: Golden datasets: how to label, balance and version.
