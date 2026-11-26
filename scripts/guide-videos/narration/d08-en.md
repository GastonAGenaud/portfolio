# Video script · Day 8: Your first eval harness with promptfoo

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d08-en.mp4`
- Video length: 7:09
- Speech without pauses: 6:15

## 0:00–0:15 · Slide 1: Video guide

Day 8 of the 31 days of QA + AI series.

Your first eval harness with promptfoo.

A real eval harness for a bug classifier: versioned prompt, dataset, asserts, repeated runs and a two-model comparison.

## 0:16–0:38 · Slide 2: The problem

So far we've talked about evals as an idea. Today you build one that works, end to end, on a problem any QA team recognizes: classifying bug reports by severity. It's a good first case because the output is small, the criteria are debatable and mistakes have clear consequences: a critical bug classified as low gets lost in the backlog.

## 0:39–0:57 · Slide 3: How it fits together

You will write the prompt as a file, build the config, label ten cases with your own judgment, run everything several times and read the failures. The part that teaches the most isn't the tool but reading failures: that's where you find out whether the problem lies in the model, in the prompt or in your own labels.

## 0:57–1:08 · Slide 4: Requirements

To follow this guide you need:

The qa-ai-lab repo with promptfoo (day 4).

Ollama with llama3.2; optionally a second model.

## 1:09–1:15 · Slide 5: Setup

This is the setup. Pause the video if you want to copy it: the full version is in the written guide.

## 1:16–1:18 · Slide 6: Setup

And this is the next setup file.

## 1:19–1:22 · Slide 7: Setup

And this is the next setup file.

## 1:23–2:02 · Slide 8: Step 1 of 6

Step 1. The prompt as a file.

Write the prompt in its own file, with classification rules and output format. The prompt is code: version it.

Write the prompt under prompts/ in three parts: the role, the classification rules and the exact output format. The rules must be yours, written the way you'd explain them to someone new: what makes a bug critical, what makes it low. The more explicit they are, the less the model interprets. The output format is written down too, with the allowed values. Keeping it in a separate file lets you see in a diff which word changed when quality goes up or down.

## 2:03–2:42 · Slide 9: Step 2 of 6

Step 2. The minimal config.

Create the config: prompt, provider and a defaultTest with the format assert that applies to every case.

The config joins three things: which prompt, against which provider and with which cases. The defaultTest block is the most useful piece to start with: it holds the format assert that applies to every case without repeating it. If the output isn't valid JSON with an allowed severity, the case fails there and nothing else is evaluated. Keep the config short. A file that fits on one screen gets read by the whole team; a three-hundred-line one, by nobody.

## 2:42–3:24 · Slide 10: Step 3 of 6

Step 3. Ten cases labeled by you.

Load at least 10 cases labeled by you: 3 critical, 3 low and 4 ambiguous. The ambiguous ones teach the most.

Pick ten real or realistic reports and write the expected severity before running anything. The mix matters: three clearly critical, three clearly low and four ambiguous. The clear ones verify that the basics work. The ambiguous ones discriminate: a report saying "the app closes" without saying in which flow, or a cosmetic one on the payment screen. If labeling a case is hard, note why. That doubt is usually a rule missing from the prompt.

## 3:24–4:03 · Slide 11: Step 4 of 6

Step 4. Three runs per case.

Run with --repeat 3. A case that passes one out of three times is not passing.

A single run says nothing about a system that varies. With three repetitions each case lands in one of three situations: always passes, always fails or is unstable. The unstable ones are the most interesting, because they show where the prompt leaves room for interpretation. Treat a case that passes one time in three as failed: in production that case will be misclassified a good part of the time. Note the total time and cost of the run, which you will need later.

## 4:04–4:45 · Slide 12: Step 5 of 6

Step 5. Reading failures one by one.

Open the viewer and read failures one by one. Classify them: model error, prompt error or labeling error.

Open the viewer and read each failure with its full input and output. Classify it under one of three causes. Model error: the rules were clear and it didn't follow them. Prompt error: the rule was missing or ambiguous. Labeling error: on rereading, the model's answer is defensible and your label isn't. The third cause shows up more than you'd expect, and finding it improves your judgment. Fix the prompt and the labels first, and only then think about changing models.

## 4:46–5:22 · Slide 13: Step 6 of 6

Step 6. A second provider.

Add a second provider and compare quality, latency and cost side by side.

Add another model to the providers list and run again. The viewer shows both side by side on the same cases. Compare three things: pass rate, latency and cost per run. Often the larger model wins by a little on quality and loses by a lot on the other two. Ten cases aren't enough for a final decision, but they are enough to rule options out and to have, for the first time, a comparison based on your data and not on a public leaderboard.

## 5:23–6:02 · Slide 14: Example

An example.

A QA lead builds the eval with ten reports from her backlog. In the first run, with three repetitions, seven cases always pass, one always fails and two are unstable. The one that always fails is a labeling error: she had marked it low, but it affects login and the model marked it critical with good reason. The two unstable ones are reports with no reproduction steps. She adds a rule to the prompt: "if data is missing to decide, classify as medium and ask for the steps". In the second run, all ten cases pass three times. The change was one prompt line and one label.

## 6:03–6:20 · Slide 15: Common mistakes

The most common mistakes.

Labeling cases after seeing the model's answer.

Using only easy cases and concluding the prompt works.

Evaluating content when the format already failed.

Switching models before reviewing the prompt and the labels.

## 6:21–6:40 · Slide 16: Checklist

To know it is done, check this.

The prompt is in a file with rules and output format.

There are ten labeled cases, four of them ambiguous.

Each case ran three times and you know which are unstable.

Each failure has an assigned cause: model, prompt or label.

## 6:41–6:51 · Slide 17: Where AI fell short

And where AI fell short.

Small models wrap JSON in extra text. Validate format before content or you'll misdiagnose.

## 6:52–7:07 · Slide 18: The written guide

That was day 8. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 9: Agent harness for QA: rules, skills and MCP in your automation repo.
