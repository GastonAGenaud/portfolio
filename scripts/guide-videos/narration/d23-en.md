# Video script · Day 23: A model for security testing (2): automated red teaming

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d23-en.mp4`
- Video length: 7:32
- Speech without pauses: 6:38

## 0:00–0:17 · Slide 1: Video guide

Day 23 of the 31 days of QA + AI series.

A model for security testing (2): automated red teaming.

A three-model scheme (attacker, target and grader) that generates adversarial tests from your threat model and reports the success rate per category.

## 0:18–0:37 · Slide 2: The problem

With yesterday's threat model you have a list of abuse cases. Testing them by hand, writing attack variants one at a time, works for five cases and not for five hundred. And real attacks don't come one at a time: they come rephrased, translated, spread over several messages or disguised as something else.

## 0:38–1:04 · Slide 3: How it fits together

Automated red teaming uses a model to generate those variants in volume, sends them against your application and uses another model to decide whether the attack succeeded. It's powerful and has clear limits: it costs money, it generates adversarial content and its verdict is also wrong at times. This guide shows how to configure it from your threat model, how to read the report without taking it as truth and where to place it in your testing cycle.

## 1:05–1:24 · Slide 4: Requirements

To follow this guide you need:

Only against systems you own or have written authorization for, in test environments.

The threat model from day 22.

Your assistant running locally or in staging with an HTTP endpoint.

Node.js 22+ and promptfoo.

## 1:25–1:31 · Slide 5: Setup

This is the setup. Pause the video if you want to copy it: the full version is in the written guide.

## 1:32–1:35 · Slide 6: Setup

And this is the next setup file.

## 1:35–2:15 · Slide 7: Step 1 of 6

Step 1. Authorization and environment.

Confirm authorization and environment. Red teaming generates adversarial content: it targets staging, with test data.

Before running anything, confirm in writing that you're authorized to attack that system, and target a staging environment with test data. Red teaming generates adversarial content on purpose and can trigger real actions if the system has tools connected. Against production it can send messages, modify records or trip the provider's abuse alerts. Also tell the team operating the environment. A run nobody expected looks a lot like an incident.

## 2:16–2:57 · Slide 8: Step 2 of 6

Step 2. Three roles.

Understand the scheme: an attacker model generates adversarial inputs, your app is the target, and a grader decides whether the attack succeeded.

The scheme has three pieces. An attacker model generates adversarial inputs. Your application is the target and receives them as if they came from a user. A grader decides, for each exchange, whether the attack achieved what it sought. Understanding this helps interpret results, because two of the three pieces are models, with their own errors. An attack success rate depends as much on your application as on how creative the attacker was and how strict the grader was.

## 2:58–3:39 · Slide 9: Step 3 of 6

Step 3. The purpose, with its limits.

Describe the system's purpose precisely, including what it must not do. Attacks are generated relative to that description.

The config asks for a description of the system. Of the whole file, it's the field with the most influence on attack quality. Write what the application does, for whom and, above all, what it must never do: reveal other customers' data, give medical advice, execute actions without confirmation. Attacks are generated relative to that description. With a vague purpose you get generic attacks, and a report that says little about your risks.

## 3:40–4:24 · Slide 10: Step 4 of 6

Step 4. Plugins and strategies from the threat model.

Pick plugins from your threat model, not all of them. Each plugin is a risk category; each strategy, a way of delivering the attack. Names change between versions: redteam init offers the current ones.

Each plugin represents a risk category and each strategy, a way of delivering the attack. The temptation is to enable everything. That's expensive, slow and produces an unreadable report. Choose the plugins matching the risks you marked as applicable yesterday, and two or three strategies. Names change between versions of the tool, so use the init command to see the current ones instead of copying them from an old tutorial.

## 4:25–5:07 · Slide 11: Step 5 of 6

Step 5. Read the report and the conversations.

Run and read the report per category: attack success rate. Then open the conversations: the grader produces false positives too.

The report shows an attack success rate per category. It tells you where to look, not what to conclude. Open the conversations flagged as successful and read them. You'll find real findings, and false positives too: cases where the application refused correctly and the grader still counted it as a failure. Also review a sample of those flagged as resisted, because false negatives exist. A finding is a conversation a person read and confirmed.

## 5:08–5:43 · Slide 12: Step 6 of 6

Step 6. Fix, repeat and schedule.

Fix, rerun and schedule it: nightly or per release. Cost makes it a poor fit for every PR.

For each confirmed finding, decide the fix, which may be a prompt change, a filter or a design control, and rerun the same config. Save the attacks that succeeded as deterministic regression cases, so you can test them on every change without generating anything. The full red teaming run goes on a schedule, nightly or per release. Because of cost and duration it isn't a good fit for every pull request.

## 5:44–6:24 · Slide 13: Example

An example.

A team runs red teaming against yesterday's support assistant, in staging, with four plugins chosen from their threat model. The report flags twelve successful attacks out of two hundred. Reading the conversations, five are false positives: the assistant refused and offered to hand over to a person. Seven real ones remain. Four get it to reveal part of its internal instructions and three obtain data from an order by changing the number in a rephrased message. The second group is serious. They fix it by validating in code that the order belongs to the user, not in the prompt. In the second run that group is at zero.

## 6:25–6:44 · Slide 14: Common mistakes

The most common mistakes.

Running against production or without written authorization.

Enabling every plugin instead of those from the threat model.

Reporting the success rate without having read the conversations.

Fixing with a sentence in the prompt what requires a control in code.

## 6:45–7:03 · Slide 15: Checklist

To know it is done, check this.

There is written authorization and the target is staging with test data.

The purpose describes what the system must not do.

The plugins come from the previous day's applicable risks.

Each reported finding was read and confirmed by a person.

## 7:04–7:14 · Slide 16: Where AI fell short

And where AI fell short.

The grader model produces false positives and false negatives. A red teaming report with no human review isn't a finding.

## 7:15–7:31 · Slide 17: The written guide

That was day 23. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 24: Security (3): prompt injection in tool-using agents and how to test the controls.
