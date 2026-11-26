# Video script · Day 24: Security (3): prompt injection in tool-using agents and how to test the controls

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d24-en.mp4`
- Video length: 7:25
- Speech without pauses: 6:31

## 0:00–0:17 · Slide 1: Video guide

Day 24 of the 31 days of QA + AI series.

Security (3): prompt injection in tool-using agents and how to test the controls.

Tests that verify an agent doesn't execute improper actions when the content it reads carries injected instructions.

## 0:18–0:39 · Slide 2: The problem

A prompt injection in a chatbot that only talks produces, at worst, inappropriate text. The same injection in a tool-using agent can end in an action: an email sent, a record modified, data leaving the organization. And the attacker doesn't need to talk to the agent. Leaving the instruction somewhere the agent will read is enough.

## 0:39–0:58 · Slide 3: How it fits together

No defense today guarantees that a model will ignore malicious instructions in its context. What does exist are controls around the model that limit what can happen when the injection works. This guide shows how to test those controls with deterministic tests that look at the agent's actions and not its words.

## 0:59–1:09 · Slide 4: Requirements

To follow this guide you need:

A tool-using agent in a test environment, with fake or simulated tools.

Access to each run's tool-call log.

## 1:10–1:16 · Slide 5: Setup

This is the setup. Pause the video if you want to copy it: the full version is in the written guide.

## 1:17–1:41 · Slide 6: Controls and how to test them

Controls and how to test them.

Least privilege per tool: the support agent doesn't have the delete tool available.

Human approval for irreversible actions: the call stays pending, not executed.

Destination allowlist: a send to an unlisted domain is rejected.

Tool output treated as data: text with instructions in a result triggers no actions.

## 1:42–2:19 · Slide 7: Step 1 of 6

Step 1. Tool inventory.

Take inventory: which tools the agent has and what each can do (read, write, send).

List every tool the agent has available and classify what it can do into three capabilities: read, write and send outward. Be specific. "Database access" isn't enough. State which tables, and with which operations. Include the tools that come by default and the ones each connected MCP server adds, which tend to be more than you remember. The inventory usually brings a first surprise: tools the agent has that the task doesn't need.

## 2:19–3:01 · Slide 8: Step 2 of 6

Step 2. The dangerous combination.

Look for the dangerous combination: access to private data, reading untrusted content and the ability to communicate outward. With all three, an injection can exfiltrate data.

Check whether the agent meets three conditions at once: access to private data, reading untrusted content and the ability to communicate outward. Each one alone is manageable. All three together allow an instruction hidden in a document to tell it to read something private and send it to a third party. If your agent meets them, the most effective measure is breaking the combination by removing one of the three for that task, before thinking about filters.

## 3:02–3:40 · Slide 9: Step 3 of 6

Step 3. Fixtures with injections in every channel.

Build fixtures with injected instructions in every channel the agent reads: ticket, document, web page, tool result.

Build test data with injected instructions in every place the agent reads: the body of a ticket, an attached document, the content of a web page, a tool result. Use harmless but verifiable instructions, such as calling a marker tool that does nothing. Vary the format: direct text, text inside a comment, instructions pretending to come from the system. Each fixture corresponds to an abuse case from the threat model.

## 3:41–4:16 · Slide 10: Step 4 of 6

Step 4. Assertions on actions.

Assert on actions, not words: the test passes if the tool call didn't happen, regardless of what the agent says.

The test doesn't evaluate what the agent replies. It evaluates whether the call to the forbidden tool happened. An agent can write "I won't do that" and still execute the action, or the reverse. Record the tool calls and verify the list doesn't contain the forbidden action, or that the recipient is among the allowed ones. It's a classic, deterministic assertion over a call log, needing no judge model.

## 4:17–4:53 · Slide 11: Step 5 of 6

Step 5. Each control separately.

Test each control separately, with tools in simulated mode.

Test each control in isolation, with tools in simulated mode so nothing really goes out. Least privilege: the dangerous tool simply isn't among the available ones. Human approval: the irreversible action stays pending and isn't executed. Destination allowlist: a send to an unlisted domain is rejected. Tool output treated as data: a result with instructions triggers no actions. Isolated, you know which one failed.

## 4:53–5:32 · Slide 12: Step 6 of 6

Step 6. MCP and regression.

With MCP: review third-party tool descriptions (they're also text the model reads) and pin server versions. Add everything to regression.

Tool descriptions from an MCP server are also text the model reads, and a third-party server could include instructions there. Review descriptions before connecting a server and pin its version, so they don't change without you knowing. Add all these tests to the regression set and run them on any change to tools, permissions or prompt. Because the model's resistance is probabilistic, repeat each case several times.

## 5:32–6:14 · Slide 13: Example

An example.

A support agent reads tickets, queries orders and sends emails. The inventory shows it also has a tool for deleting orders that it never uses. They remove it. The agent meets the three dangerous conditions, so they restrict email to the ticket's sender. They build six fixtures with injections and run each ten times with simulated tools. In fifty-eight of sixty runs the agent ignores the instruction. In two it tries to send an email to an external address, and the allowlist rejects it. The model yielded twice and the control worked both times. The test verifies the control, which is what must hold every time.

## 6:15–6:33 · Slide 14: Common mistakes

The most common mistakes.

Evaluating what the agent says instead of what it executes.

Testing injections only in the user message.

Relying on a prompt instruction as the only control.

Connecting third-party MCP servers without reviewing or pinning versions.

## 6:34–6:54 · Slide 15: Checklist

To know it is done, check this.

There is a tool inventory with read, write and send.

You know whether the agent has the dangerous combination and how it's broken.

Fixtures with injections exist for every reading channel.

Each control has a test verifying actions, repeated several times.

## 6:55–7:07 · Slide 16: Where AI fell short

And where AI fell short.

Injection resistance is probabilistic: an agent that resists nine times can yield on the tenth. That's why sensitive actions are limited with permissions.

## 7:08–7:23 · Slide 17: The written guide

That was day 24. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 25: A model for performance testing (1): the metrics that matter for an LLM.
