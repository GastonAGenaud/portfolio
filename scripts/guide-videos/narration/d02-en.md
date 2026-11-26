# Video script · Day 2: How the SDET role is being reshaped by AI

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d02-en.mp4`
- Video length: 6:51
- Speech without pauses: 6:02

## 0:00–0:15 · Slide 1: Video guide

Day 2 of the 31 days of QA + AI series.

How the SDET role is being reshaped by AI.

What changes and what doesn't in the SDET role, and how to build your skills matrix for the next 30 days.

## 0:15–0:38 · Slide 2: The problem

The most repeated question in the testing community is whether AI will replace the SDET. It's the wrong question: the work doesn't disappear, it moves. Writing a test stopped being the scarce part, because an agent does it in seconds. What's scarce now is knowing what is worth testing, giving context to whoever writes it and being able to state that the result is trustworthy.

## 0:39–0:53 · Slide 3: How it fits together

This guide describes that shift with four new competencies and three that don't change, and ends with a matrix to measure yourself without self-deception. It isn't a list of trendy tools: it's a skills map with verifiable evidence for each one.

## 0:54–1:03 · Slide 4: Requirements

To follow this guide you need:

A spreadsheet or a notes page.

Your current job description.

30 honest minutes.

## 1:04–1:46 · Slide 5: Step 1 of 6

Step 1. Before and now, in writing.

Write what you did two years ago and what you do today. The core shift: from writing every test to designing, guiding, reviewing and validating systems that test.

Take your job description and your last ten tasks. For each one, ask which part was producing (writing test code, data, reports) and which part was deciding (what to cover, what risk to accept, which result to believe). Two years ago most of the time went into producing. Today that part gets cheaper and deciding weighs more. Seeing it written with your own tasks avoids arguing in the abstract and shows how much of your week has already changed.

## 1:47–2:34 · Slide 6: Step 2 of 6

Step 2. The four new competencies.

Add the four new competencies: context for agents (rules, skills, specs), evals for non-deterministic outputs, reviewing AI-generated tests, and cost and infrastructure (tokens, CI, runners).

Context for agents is writing rules, conventions and specifications an agent can follow without you beside it. Evals is measuring outputs that are never the same twice, with datasets and thresholds. Reviewing generated tests is spotting filler: weak assertions, duplicated cases, mocks of what should be tested. Cost and infrastructure is knowing what each run costs in tokens and CI minutes, and where each thing runs. None replaces classic automation: they build on it.

## 2:35–3:15 · Slide 7: Step 3 of 6

Step 3. What doesn't change.

Flag what doesn't change: risk thinking, good test design and knowing the system. That is what AI doesn't bring.

Risk thinking is deciding where a failure hurts the business and focusing effort there. Good test design is knowing techniques such as partitions, boundaries and decision tables, and when to apply each. Knowing the system is understanding its dependencies, its data and its fragile points. An agent without these three produces numeric coverage, not quality. They are also the skills that let you review what the agent produces, so their value goes up, not down.

## 3:16–3:52 · Slide 8: Step 4 of 6

Step 4. The skills matrix.

Build the matrix: one row per competency, columns Level today (0 to 3), Evidence and Next step.

Use one row per competency: the four new ones and the three unchanged. In the level column put a number from zero to three, where zero is never done it, one is tried it, two is use it on a real project and three is can teach it. Under evidence, a link or a concrete artifact: a repo, a pipeline, a report. With no evidence, the level can't be above one. That rule is what makes the matrix honest.

## 3:53–4:26 · Slide 9: Step 5 of 6

Step 5. Two focus areas, not seven.

Pick two competencies at level 0 or 1 and tie each to a day of this series.

Improving everything at once doesn't work. Pick the two lowest rows that also matter for your current job or the one you're after. Assign each a day from this series and a date: for example, evals with day eight and cost and infrastructure with day twenty-nine. The next step must be a small, visible deliverable, such as an eval harness with ten cases or a job that publishes tokens per run.

## 4:27–5:05 · Slide 10: Step 6 of 6

Step 6. Evidence on your profile.

Update your profile with concrete evidence: a repo with evals beats "experience with AI".

A profile saying "experience with AI applied to testing" is indistinguishable from a thousand others. One that links a repository with an eval harness, a pipeline with a quality gate and a written triage case is not. When you finish each deliverable, add it with one sentence saying what it measures and which decision it enabled. In interviews, that evidence lets you speak from your own experience instead of repeating theory, which is what a technical interviewer looks for.

## 5:06–5:46 · Slide 11: Example

An example.

An SDET with six years of experience fills in the matrix. For test design and system knowledge he gives himself a three, with plenty of evidence. For context for agents, a one: he has used an assistant but never wrote rules for the repo. For evals, zero. For reviewing generated tests, one. For cost, zero. He picks evals and context for agents as focus areas. In three weeks he builds an AGENTS.md for his automation repo and a ten-case eval for the team's bug classifier. His profile goes from one generic sentence to two links with one line of explanation each.

## 5:47–6:05 · Slide 12: Common mistakes

The most common mistakes.

Giving yourself a high level with no artifact to back it.

Picking the trendy tool as a focus instead of the competency you lack.

Dropping test design and risk because "AI does that".

Planning seven improvements in parallel and finishing none.

## 6:06–6:24 · Slide 13: Checklist

To know it is done, check this.

The matrix has seven rows with level, evidence and next step.

No level above one lacks linked evidence.

You picked two focus areas with a date and a deliverable.

Your profile links at least one verifiable artifact.

## 6:25–6:35 · Slide 14: Where AI fell short

And where AI fell short.

I asked a model to rate my level and it marked everything "advanced". It's useless for self-assessment: it flatters you.

## 6:36–6:50 · Slide 15: The written guide

That was day 2. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 3: The new ways of testing: from asserts to evals.
