# Video script · Day 9: Agent harness for QA: rules, skills and MCP in your automation repo

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d09-en.mp4`
- Video length: 7:23
- Speech without pauses: 6:32

## 0:00–0:18 · Slide 1: Video guide

Day 9 of the 31 days of QA + AI series.

Agent harness for QA: rules, skills and MCP in your automation repo.

How to prepare an automation repo so any coding agent writes tests following your conventions, with scoped tools and permissions.

## 0:18–0:42 · Slide 2: The problem

Giving a coding agent access to your automation repository without configuring it is like adding someone to the team without telling them how you work. It will write tests, but with brittle CSS selectors, without your Page Objects, with fixed waits and without running them. The conclusion afterwards is usually that "the agent is no good", when the problem is that nobody gave it context.

## 0:43–1:02 · Slide 3: How it fits together

This guide builds that context in five pieces: rules, skills, tools, permissions and a gate. Each one answers a concrete failure you'll see when it's missing. The result is a repo where an agent can produce a test that follows your conventions, and where you can confirm it with a command instead of taking its word.

## 1:02–1:13 · Slide 4: Requirements

To follow this guide you need:

A repo with Playwright (day 4).

A coding agent: Claude Code, Copilot agent, Cursor or another.

## 1:13–1:20 · Slide 5: Setup

This is the setup. Pause the video if you want to copy it: the full version is in the written guide.

## 1:21–1:23 · Slide 6: Setup

And this is the next setup file.

## 1:24–2:09 · Slide 7: Step 1 of 6

Step 1. Rules at the repo root.

Rules: create AGENTS.md at the root with how to run, conventions and what "done" means. With Claude Code, the equivalent file is CLAUDE.md.

The rules file is the first thing the agent reads in every session, so it has to be short and concrete. Three sections are enough: how to run the tests, which conventions to follow and what done means. Under conventions, write what you would flag to a person in a code review: role-based locators, no fixed waits, one Page Object per screen. Avoid paragraphs of philosophy. Each line should be verifiable by looking at a diff, and each new rule should come from a mistake you've already seen.

## 2:10–2:48 · Slide 8: Step 2 of 6

Step 2. Skills for what repeats.

Skills: move repeated procedures into a file, for example "how to write a new test" with your Page Object structure.

Some procedures don't fit in a one-line rule: how to create a new test with its Page Object, how to add test data, how to investigate a CI failure. Write them as separate files, step by step, with a real example from the repo. The agent loads them when the task calls for it, without taking up context the rest of the time. A good sign that something deserves a skill is that you've already explained it twice, to a person or to an agent.

## 2:49–3:29 · Slide 9: Step 3 of 6

Step 3. Tools to see the application.

Tools: declare the Playwright MCP server in .mcp.json so the agent can open the app and look at the real page.

Without access to a browser, the agent writes selectors from memory, guessing the page structure. With the Playwright MCP server it can open the application, read the real roles and names of elements and write locators that exist. Declaring it in .mcp.json inside the repo gives the whole team the same setup. Always point it at a test environment: the tool gives the agent the ability to click, and that includes buttons you don't want it to touch.

## 3:30–4:14 · Slide 10: Step 4 of 6

Step 4. Permissions before first use.

Permissions: deny destructive actions (delete, push, touching .env) and require confirmation to install dependencies.

Define what it can't do before asking for anything. The minimum is denying destructive or irreversible actions: deleting files outside the tests folder, pushing, reading or modifying .env. Installing dependencies should ask for confirmation, because it changes the project for everyone. Permissions don't replace review, but they shrink the possible damage of a mistake. Think of it as the access of someone who just joined: free to propose anything and to execute few things without someone looking.

## 4:14–4:54 · Slide 11: Step 5 of 6

Step 5. The gate is a command.

Gate: "done" is verified with a command and its exit code, not with the agent's summary.

Write in the rules which command defines that the work is done, for example running the new test three times in a row with no failures. And verify it yourself, or have your pipeline do it, by looking at the exit code. An agent can write "all tests pass" without having run them, or having run them with a filter that excludes the failing one. It isn't bad intent, it's an optimistic summary. The difference between a trustworthy flow and one that isn't lies in who runs the final verification.

## 4:55–5:37 · Slide 12: Step 6 of 6

Step 6. Try it and feed back.

Try it: ask for a new test and check whether it honored locators, Page Objects and the three runs. Whatever it missed goes back into AGENTS.md as a clearer rule.

Ask for a new test for a simple flow and check the result against your rules: did it use role-based locators? did it create or reuse the Page Object? did it run three times? Whatever it skipped is an unclear or missing rule. Fix the file, not just the test, because the file is what improves the next session. After four or five iterations the rules reflect how your team really works, and they also help when onboarding people.

## 5:38–6:15 · Slide 13: Example

An example.

A team asks the agent for an "add product to cart" test with no setup at all. The result uses selectors such as div.card:nth-child(3) button, a two-second wait and no Page Object. They write a twenty-line rules file, a skill for new tests and declare the MCP server. They repeat the request. Now the test uses getByRole, reuses the cart Page Object and the agent runs it three times. It skips one thing: it doesn't add the test to the smoke tag. They add that line to the rules. The third time it comes out complete.

## 6:15–6:34 · Slide 14: Common mistakes

The most common mistakes.

Writing a long, generic rules file nobody can verify.

Fixing the test by hand without updating the missing rule.

Granting broad permissions "just to try" on a real repo.

Accepting the agent's summary as evidence that tests pass.

## 6:35–6:54 · Slide 15: Checklist

To know it is done, check this.

The rules file has how to run, conventions and a definition of done.

There is at least one skill with a real example from the repo.

The MCP server points to a test environment.

The generated test passed three times in a run you executed yourself.

## 6:55–7:05 · Slide 16: Where AI fell short

And where AI fell short.

Facing a red test, it tends to weaken the assertion instead of investigating. Forbid it in writing and check it in the diff.

## 7:06–7:21 · Slide 17: The written guide

That was day 9. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 10: Playwright MCP: an agent that browses your app and proposes tests.
