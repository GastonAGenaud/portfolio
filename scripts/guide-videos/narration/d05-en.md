# Video script · Day 5: Test cases from user stories: the prompt that actually works

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d05-en.mp4`
- Video length: 6:53
- Speech without pauses: 6:03

## 0:00–0:15 · Slide 1: Video guide

Day 5 of the 31 days of QA + AI series.

Test cases from user stories: the prompt that actually works.

A versioned prompt template that generates cases by design technique and tells you what it didn't cover.

## 0:16–0:34 · Slide 2: The problem

Asking a model to "generate test cases for this story" always returns the same thing: a long, even list with repeated cases and two or three rules nobody defined. It isn't a model capability problem. The request doesn't say which rules to work against, which technique to use or when to stop.

## 0:35–0:52 · Slide 3: How it fits together

This guide replaces that request with a three-step flow that mirrors how a good analyst works: ask first, then design with technique and finally declare what was left out. The result isn't a longer list but a shorter, defensible one, where each case has a reason and you know which gaps remain.

## 0:53–1:05 · Slide 4: Requirements

To follow this guide you need:

The qa-ai-lab repo from day 4.

A user story with acceptance criteria.

Business rules in writing, even five lines.

## 1:06–1:12 · Slide 5: Setup

This is the setup. Pause the video if you want to copy it: the full version is in the written guide.

## 1:13–1:50 · Slide 6: Step 1 of 6

Step 1. Business rules as the source of truth.

Write the business rules first. They are the source of truth; without them the model invents some.

Before opening the chat, write the rules governing the feature, even if it's five lines: limits, possible states, who can do what. If they don't exist in writing, that's your first finding and it's worth more than any case. In the prompt, say explicitly that those rules are the only source of truth and that it must not invent others. Without that sentence the model fills gaps with what's common in other systems, not yours.

## 1:51–2:24 · Slide 7: Step 2 of 6

Step 2. The template in the repo.

Save the template in prompts/test-design.md.

Save the prompt as a file with variables for the rules and the story. Having it versioned lets you improve it gradually: every time the result fails in a new way, you add an instruction and the whole team gets it. It also makes work comparable across people, because everyone starts from the same request. It works the same in Spanish; what matters is that the three stages are separate and the first one ends with an order to wait.

## 2:25–3:04 · Slide 8: Step 3 of 6

Step 3. Step one: questions.

Step 1: ask only for ambiguities and questions. You or the PO answer them before moving on.

This stage delivers the most value and almost everyone skips it. Ask for ambiguities, contradictions between criteria and missing data, and nothing else. Take the real questions to the product owner before continuing. Every ambiguity resolved here is a defect that never gets written. If the model finds no questions in a story you know is incomplete, that signals missing context, and the cases it generates afterwards will be shallow.

## 3:05–3:42 · Slide 9: Step 4 of 6

Step 4. Step two: cases by technique.

Step 2: ask for cases by technique (partitions, boundaries, decision table, error states) in a table with risk.

With answers in hand, ask for cases naming the techniques: equivalence partitioning, boundary values, decision table and error states. Require a table with the technique for each case. That lets you see at a glance whether one is missing: a table with no boundaries or no error states is incomplete. It also reduces duplicates, because two cases from the same partition stand out when labeled.

## 3:43–4:21 · Slide 10: Step 5 of 6

Step 5. Step three: what it didn't cover.

Step 3: ask for the not-covered list. It's the most useful part for your review.

Ask for a list of what was left out and why. Concurrency, accessibility, performance, permissions and migration of existing data usually show up. That isn't a flaw in the result: it's information for deciding. Some things you'll cover with another kind of test and others you'll accept as risk, but the decision becomes explicit. This list is also the best input for the team conversation about what gets tested and what doesn't.

## 4:22–5:05 · Slide 11: Step 6 of 6

Step 6. The three-question review.

Review with three questions: any duplicates? any invented rule? any missing negatives? Whatever survives goes to your test management tool.

Review the table looking for three things. Duplicates: cases exercising the same partition with another value. Invented rules: any expected result you can't trace to a written rule. Missing negatives: invalid inputs, insufficient permissions, impossible states. Discarding a third is normal. Priority is yours to set as well, because the model tends to mark everything as high risk. What survives goes into your test management tool under your name.

## 5:06–5:47 · Slide 12: Example

An example.

The story says: "as a customer I want to transfer money to another account". There are four written rules: minimum amount, daily cap, active destination account and sufficient balance. In step one the model asks what happens if the daily cap is reached in the middle of a scheduled transfer and whether the cap is per customer or per account; nobody had defined it. In step two it returns twenty-two labeled cases. In review, five duplicates from the "valid amount" partition and two assuming a nonexistent fee are discarded. Fifteen remain. Step three declares it didn't cover concurrency between two sessions, and the team decides to test that separately.

## 5:48–6:07 · Slide 13: Common mistakes

The most common mistakes.

Asking for cases without passing the business rules.

Merging the three steps into one request and losing the questions stage.

Loading cases into the tool without checking duplicates or invented rules.

Accepting the priority the model assigns.

## 6:08–6:25 · Slide 14: Checklist

To know it is done, check this.

The template is versioned under prompts/.

At least one real ambiguity reached the product owner.

Each final case has a technique and traces to a written rule.

There is a discard list with the reason for each.

## 6:26–6:35 · Slide 15: Where AI fell short

And where AI fell short.

It assigns high risk to almost everything. Prioritizing is a business decision, not a writing task.

## 6:36–6:52 · Slide 16: The written guide

That was day 5. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 6: Synthetic test data with LLMs: realistic, valid and PII-free.
