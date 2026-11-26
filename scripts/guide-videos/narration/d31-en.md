# Video script · Day 31: Capstone: the full AI quality pipeline and your 2027 roadmap

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d31-en.mp4`
- Video length: 7:52
- Speech without pauses: 6:53

## 0:00–0:18 · Slide 1: Video guide

Day 31 of the 31 days of QA + AI series.

Capstone: the full AI quality pipeline and your 2027 roadmap.

The previous 30 days tied into a single pipeline, a 12-point checklist to self-assess and a 90-day plan with public evidence.

## 0:19–0:38 · Slide 2: The problem

For thirty days you saw separate pieces: a rule for delegating, an eval, a configured agent, a threat model, a load test, a gate. Each solves a concrete problem. The greater value appears when they connect, because that's where they stop being experiments and become a quality system for software that uses AI.

## 0:39–1:01 · Slide 3: How it fits together

This last day adds no tools. It assembles the full map, asks you for an honest assessment of what you really have working and helps you choose what to build first. The series doesn't expect you to implement all twelve pieces. It expects you to know which ones matter to your product, in what order, and to be able to show evidence of progress three months from now.

## 1:02–1:11 · Slide 4: Requirements

To follow this guide you need:

The qa-ai-lab repo with whatever you built during the series.

The skills matrix from day 2.

## 1:12–2:13 · Slide 5: 12-piece checklist

12-piece checklist.

Delegation rule: verifiable, cheap to review, reversible (day 1).

Repo with rules for agents, tools and permissions (day 9).

Tests written by people, implementation by agents, with guardrails (days 13 and 14).

Playwright agents with plan and diff review (days 10 and 11).

Eval harness with a versioned prompt (day 8).

Pinned model versions and a calibrated judge (days 15 and 16).

Golden dataset with dev, test and regression (day 17).

Repeated runs, ranges and cost per call (days 18 and 19).

Prompt regression before every change (day 20).

Threat model, red teaming and injection tests (days 22 to 24).

Performance targets and tests with token metrics (days 25 to 27).

CI gates, reproducible infra and observability (days 28 to 30).

## 2:13–3:03 · Slide 6: Step 1 of 6

Step 1. The full journey.

Walk the diagram end to end: a change enters through the repo, produced by an agent or a person, and goes through tests, evals, security and performance before reaching production, where measuring continues.

Follow a change end to end on the diagram. It enters through the repository, written by a person or by an agent working with rules and permissions. It goes through deterministic tests and guardrails. If it touches anything related to a model, it goes through evals with their dataset and calibrated judge. Before release, through security and performance. In production it stays measured with traces and online evals, and every failure returns to the regression set. The closed loop is what makes the system improve with use.

## 3:03–3:42 · Slide 7: Step 2 of 6

Step 2. An honest checklist.

Fill in the checklist honestly. "I saw it in a video" doesn't count; what runs in a repo does.

Fill in the twelve-piece checklist with a strict rule: a piece counts only if it runs in a repository and someone uses it. Having read about it, seen it in a video or tried it one afternoon doesn't count. The rule is uncomfortable, and that's why it works. Most teams discover they have two or three real pieces and several half done. That isn't a bad result. It's a precise starting point, and it's what you need to plan without fooling yourself.

## 3:42–4:17 · Slide 8: Step 3 of 6

Step 3. Three pieces, by risk.

Pick three missing pieces and order them by your product's risk, not by what's most fun.

From the missing ones, pick three and order them by your product's risk, not by what you find most interesting. If your system has a tool-using agent and there are no injection tests, that goes before optimizing costs. If a feature with a model is in production with no eval at all, that goes first. Ask yourself which failure would hurt you most tomorrow and which piece would have caught it. That's the first one.

## 4:18–4:53 · Slide 9: Step 4 of 6

Step 4. A ninety-day plan.

Build the 90-day plan: one piece per month, each with a verifiable deliverable.

Assign one piece per month, each with a verifiable deliverable. "Learn about evals" isn't a deliverable. "A thirty-case eval for the classifier, running in the PR pipeline" is. One month per piece looks slow. It's realistic if you do it alongside your usual work. Put the dates on the calendar and tell someone on your team about the plan. A commitment another person knows about gets kept far more often than a private one.

## 4:54–5:33 · Slide 10: Step 5 of 6

Step 5. Publish evidence.

Publish evidence: the repo with a README explaining what each part measures, and a written case with your own numbers.

As you finish each piece, leave it visible. A repository with a README explaining what each part measures and how to run it. A written case with your own numbers: what the problem was, what you measured, what you decided and what happened next. Use your own or synthetic data, never a client's information. That evidence works inside your team, so others adopt what you built, and outside it, because it shows applied judgment and not just knowledge of tools.

## 5:34–6:06 · Slide 11: Step 6 of 6

Step 6. Back to the matrix.

Update the day 2 matrix and set a date to repeat the self-assessment.

Open the skills matrix from day two and update it with what you did this month. Rows that were at zero or one should now have linked evidence. Set a date to repeat the self-assessment three months from now, when the plan ends. The specific tools in this series will change, some within a few months. What holds is the method: define what correct means, measure it repeatably and decide with data.

## 6:07–6:48 · Slide 12: Example

An example.

An SDET fills in the checklist at the end of the series. Real pieces: the delegation rule, a repo with rules for agents and the TDD cycle with guardrails. Half done: an eval run by hand. Missing: everything else. Her product has an assistant with access to customer data and an email tool. She orders by risk. First month, injection tests on the agent's actions. Second month, the eval with a versioned dataset inside the pipeline. Third month, traces and a quality alert in production. She leaves cost and performance for the following quarter, and writes that down as a decision, not an oversight.

## 6:49–7:06 · Slide 13: Common mistakes

The most common mistakes.

Marking as done a piece you only saw or tried once.

Choosing what to build by interest and not by product risk.

Planning all twelve pieces for the same quarter.

Publishing evidence with a client's data or details.

## 7:07–7:25 · Slide 14: Checklist

To know it is done, check this.

The checklist is filled in under the rule that only what runs counts.

Three pieces are chosen and ordered by risk.

The ninety-day plan has one verifiable deliverable per month.

The day two matrix is updated and has a review date.

## 7:26–7:36 · Slide 15: Where AI fell short

And where AI fell short.

It summarizes well and doesn't prioritize. Deciding which risk comes first in your product is still a person's job.

## 7:37–7:51 · Slide 16: The written guide

That was day 31. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

This guide closes the series. Thanks for making it this far.
