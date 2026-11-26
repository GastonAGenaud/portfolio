# Video script · Day 11: Playwright Test Agents: planner, generator and healer in action

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d11-en.mp4`
- Video length: 7:11
- Speech without pauses: 6:19

## 0:00–0:16 · Slide 1: Video guide

Day 11 of the 31 days of QA + AI series.

Playwright Test Agents: planner, generator and healer in action.

The full planner, generator and healer cycle in a real repo, and the two points where a person must step in.

## 0:17–0:37 · Slide 2: The problem

Yesterday you built the explore, plan and generate flow by hand, with your own prompts. Playwright ships that same flow packaged as three agents with separate responsibilities: one plans, one generates and one heals. The advantage isn't that they're smarter, but that each has narrow instructions and leaves an artifact the next one uses.

## 0:38–0:58 · Slide 3: How it fits together

The risk comes packaged too. A system that repairs tests on its own can leave the suite green for the wrong reason. This guide walks through the three agents and marks the two points where a person must step in no matter what: before generating and after healing. Without those two reviews, what you gain in speed you lose in trust.

## 0:59–1:11 · Slide 4: Requirements

To follow this guide you need:

Up-to-date Playwright (agents ship since version 1.56).

A coding agent: Claude Code, VS Code with Copilot or OpenCode.

## 1:11–1:18 · Slide 5: Setup

This is the setup. Pause the video if you want to copy it: the full version is in the written guide.

## 1:19–2:01 · Slide 6: Step 1 of 6

Step 1. Initialize and commit.

Upgrade Playwright and run init-agents with your agent's loop. It generates the three agent definitions, a seed.spec.ts, the specs/ folder and the test MCP server config. Commit everything.

The init command generates the three agent definitions for the loop you use, a seed test, the plans folder and the test MCP server config. Commit all of that together. The definitions are instructions in text: it's worth reading them once to understand what each agent will do and with which tools. Being in the repo, the whole team uses the same ones, and any adjustment you make stays in history just like a code change.

## 2:02–2:41 · Slide 7: Step 2 of 6

Step 2. The seed test.

Write the seed test: it leaves the page in the initial state every flow needs (for example, logged in as a test user).

The seed is an ordinary test that leaves the application in the state every flow starts from: session started, minimum data loaded, initial screen. The agents run it before exploring or generating, so it also serves as a style example: generated tests tend to resemble it. Write it with the same care as your best test. If it uses role-based locators and clear fixtures, whatever comes next inherits that. If it's sloppy, that too.

## 2:42–3:22 · Slide 8: Step 3 of 6

Step 3. Planner and the first intervention.

Planner: ask it to explore a flow and save the plan in specs/. Intervention 1: review the plan before generating anything.

The planner explores the application starting from the seed and writes a Markdown plan into the plans folder: scenarios, steps and expected results. This is the first human intervention, and it's the cheapest in the whole chain. Read the plan before generating anything. Remove scenarios that add nothing, add the ones that depend on business rules and fix expected results the planner assumed. Every error you let through gets multiplied in code.

## 3:23–4:02 · Slide 9: Step 4 of 6

Step 4. Generator.

Generator: ask for the tests from the approved plan. It checks selectors against the live page while writing.

The generator takes the approved plan and writes the tests. The difference from a classic generator is that it verifies against the live page: it executes the steps while writing and checks that each locator finds its element. That's why the result usually runs first time. Even so, review the assertions. A test can navigate the whole flow correctly and end up verifying something trivial, such as the URL having changed, instead of the rule the scenario meant to prove.

## 4:03–4:48 · Slide 10: Step 5 of 6

Step 5. Healer and the second intervention.

Healer: break a locator on purpose and run the healer. Intervention 2: review the diff. Fixing a locator is fine; changing an assertion is not.

Break a locator on purpose, for example by renaming a button, and run the healer. It will run the test, see the failure, inspect the page and propose a fix. This is the second intervention: reviewing the diff. There are two kinds of change. Updating a locator because the interface changed is legitimate maintenance. Modifying or removing an assertion so the test passes is hiding a possible defect. The first gets accepted; the second gets rejected and investigated.

## 4:49–5:24 · Slide 11: Step 6 of 6

Step 6. Regenerate on every upgrade.

On every Playwright upgrade, rerun init-agents in the same PR to regenerate the definitions.

The agent definitions are tied to the Playwright version: available tools and instructions change. When you upgrade, rerun the initialization in the same pull request and review what changed in the definitions. If you had made your own adjustments, you'll have to reapply them, so it's worth documenting them in a separate file. Leaving old definitions with a new version produces failures that are hard to diagnose.

## 5:24–6:03 · Slide 12: Example

An example.

A team tests the user sign-up flow. The planner proposes nine scenarios. In review they remove two repeated ones and add one it couldn't know: emails from a blocked domain must be rejected. The generator writes eight tests and seven pass first time. A week later a redesign changes a button's text and four fail. The healer fixes the four locators. In the diff, three changes are locator-only. The fourth also changed an assertion from "shows the error" to "the button is visible". They reject that change, investigate and discover the error message had disappeared in the redesign.

## 6:04–6:23 · Slide 13: Common mistakes

The most common mistakes.

Generating tests without having read and corrected the plan.

Accepting the healer's result because the suite turned green.

Writing a sloppy seed test that every later test imitates.

Upgrading Playwright without regenerating the agent definitions.

## 6:24–6:43 · Slide 14: Checklist

To know it is done, check this.

The definitions, the seed and the config are committed.

The plan was reviewed by a person before generating.

Each generated test has an assertion that proves a rule.

The healer's diff was reviewed separating locators from assertions.

## 6:43–6:54 · Slide 15: Where AI fell short

And where AI fell short.

The healer can turn a test green by modifying the assertion. A healed test with an unreviewed diff is a false green.

## 6:54–7:09 · Slide 16: The written guide

That was day 11. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 12: Failure triage with LLMs: from 40 red tests to 3 root causes.
