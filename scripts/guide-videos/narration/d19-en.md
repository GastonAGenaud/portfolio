# Video script · Day 19: Cost as a quality metric: top-K prefiltering before the model

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d19-en.mp4`
- Video length: 7:01
- Speech without pauses: 6:10

## 0:00–0:16 · Slide 1: Video guide

Day 19 of the 31 days of QA + AI series.

Cost as a quality metric: top-K prefiltering before the model.

How to cut an agent's input tokens with a local candidate prefilter and prove with measurements that quality doesn't drop.

## 0:16–0:35 · Slide 2: The problem

In QA we're used to quality being measured in defects. With systems that use models, cost becomes an equally concrete quality dimension: a feature that gets it right but costs too much per call can't be sustained in production, and one that's cheap and fails is no good either. Someone has to measure both together.

## 0:36–0:57 · Slide 3: How it fits together

The most common case of unnecessary cost is sending the model all the available context, just in case. This guide shows a technique to avoid it: a local prefilter that picks the K most relevant candidates before calling the model. And it shows how to test it, because a badly measured prefilter lowers cost and quality alike without anyone noticing.

## 0:58–1:08 · Slide 4: Requirements

To follow this guide you need:

The day 18 case: names to map against a catalog.

A labeled set with the correct answer per name.

## 1:09–1:15 · Slide 5: Setup

This is the setup. Pause the video if you want to copy it: the full version is in the written guide.

## 1:16–1:54 · Slide 6: Step 1 of 6

Step 1. The baseline.

Measure the baseline: input tokens per call and how much is fixed context (for example, the whole catalog).

Before optimizing, measure. For a sample of calls, record how many input tokens each one uses and how many correspond to fixed context repeated every time, such as a whole catalog or a full document. In many systems that fixed part is most of the cost. Also note current quality with the eval you already have. Without those two numbers, tokens and quality, you won't be able to say afterwards whether the change was an improvement or merely a change.

## 1:55–2:34 · Slide 7: Step 2 of 6

Step 2. A simple local prefilter.

Build a local prefilter that picks the K most similar candidates. Start with a simple lexical one: it's free and calls no model.

The prefilter takes the input and the full candidate list, and returns the K most similar. Start with a lexical method, for example character trigram similarity: it takes a few lines to write, runs in milliseconds and calls no model. It's also deterministic, so it can be tested with classic tests. The temptation is to jump straight to something more sophisticated. Resist it until you have a number showing the simple approach falls short.

## 2:35–3:15 · Slide 8: Step 3 of 6

Step 3. Prefilter recall.

Measure prefilter recall: in how many labeled cases the correct answer is among the K. If it isn't there, the model can't get it right.

This is the central measurement. For each labeled case, check whether the correct answer is among the K candidates the prefilter returned. The percentage of cases where it is, is recall. It works as the ceiling for the whole system: if the correct answer doesn't reach the context, the model has no way of choosing it, however good it is. It's a deterministic, cheap, fast test, and it tells you whether the problem lies before the model or in the model.

## 3:16–3:52 · Slide 9: Step 4 of 6

Step 4. Compare methods and K values.

Compare methods (lexical versus embeddings) and K values on that same recall. Don't assume embeddings win.

With recall as the metric you can compare options fairly: lexical method against embeddings, and different K values for each. Build a table. Don't assume embeddings win. In tasks with proper names, codes or abbreviations, lexical similarity often performs as well or better, and it's free. Embeddings help when the relationship is one of meaning rather than spelling. Let your data decide.

## 3:53–4:35 · Slide 10: Step 5 of 6

Step 5. The full eval with each K.

Run the full eval, 5 times, with the full list and with each K. Compare accuracy, costly errors, tokens and cost.

Recall measures the prefilter, not the final result. Run the eval end to end, five times, with the full list and with each K value. Compare accuracy, costly errors, tokens and cost. You'll see something that tends to surprise: more context doesn't always give a better result. With many similar candidates in the prompt, the model gets confused more. There's a point beyond which adding candidates worsens quality and raises cost at the same time.

## 4:35–5:13 · Slide 11: Step 6 of 6

Step 6. Choose the smallest K that suffices.

Pick the smallest K that keeps recall and accuracy. More similar candidates can confuse the model and make results worse.

The decision rule is choosing the smallest K that keeps recall and accuracy within the baseline range. Document the full table and the chosen value. Add prefilter recall as a permanent test in CI: if someone changes the method or the catalog grows a lot, recall can drop without notice. That test takes seconds, and it protects a piece that, when it fails, makes everything after it fail.

## 5:14–5:58 · Slide 12: Example

An example.

With illustrative numbers: a system sends a catalog of two thousand records on every call, about sixty thousand input tokens. The team builds a trigram prefilter and measures recall on eighty labeled cases. With K equal to five, the correct answer is present in 90% of cases; with ten, in 97%; with twenty, in 99%; with fifty, also 99%. They try embeddings and with K equal to twenty get 98%: no improvement. In the full eval, K equal to twenty gives the same accuracy as the full list, with one fewer costly error per run and around three percent of the tokens. With fifty, accuracy drops two points.

## 5:58–6:14 · Slide 13: Common mistakes

The most common mistakes.

Shrinking context without measuring prefilter recall.

Assuming embeddings beat a lexical method.

Evaluating only cost and not end-to-end quality.

Choosing a large K "to be safe".

## 6:15–6:32 · Slide 14: Checklist

To know it is done, check this.

You have baseline input tokens and quality.

Prefilter recall is measured for several K values.

The full eval ran with the full list and with each K.

Prefilter recall runs as a test in CI.

## 6:33–6:44 · Slide 15: Where AI fell short

And where AI fell short.

With many similar candidates in context, the model picks wrong more often. Context is designed and measured, not piled up.

## 6:45–7:00 · Slide 16: The written guide

That was day 19. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 20: Prompt regression: version, compare and don't break what worked.
