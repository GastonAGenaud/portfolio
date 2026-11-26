# Video script · Day 4: Your AI QA lab: full setup in 30 minutes

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d04-en.mp4`
- Video length: 6:47
- Speech without pauses: 5:55

## 0:00–0:15 · Slide 1: Video guide

Day 4 of the 31 days of QA + AI series.

Your AI QA lab: full setup in 30 minutes.

The lab repo used for the rest of the series: local model, eval tool, Playwright and secrets handling.

## 0:16–0:36 · Slide 2: The problem

Most tutorials on AI applied to testing assume you already have a working environment, an API key with credit and time to wrestle with versions. In practice, that start is where many people give up. This guide solves the starting point: a small, reproducible, free repository you will reuse on every day that follows.

## 0:36–0:56 · Slide 3: How it fits together

The central decision is to work with a local model. It isn't the most capable, but it has three advantages for learning: it costs nothing, no data leaves your machine and its errors are frequent, which is ideal for practicing how to measure them. When you need more quality, switching to a cloud model is one configuration line.

## 0:57–1:11 · Slide 4: Requirements

To follow this guide you need:

Node.js 22+ and Python 3.10+.

Git.

Ollama, to run a local model at no cost.

Optional: a provider API key.

## 1:12–1:18 · Slide 5: Setup

This is the setup. Pause the video if you want to copy it: the full version is in the written guide.

## 1:19–1:22 · Slide 6: Setup

And this is the next setup file.

## 1:23–1:26 · Slide 7: Setup

And this is the next setup file.

## 1:26–2:02 · Slide 8: Step 1 of 6

Step 1. Versions first.

Check Node, Python and Git versions. If Node is below 22, upgrade first.

Run the three version commands before installing anything. Eval tools and coding agents ask for recent Node versions, and a good share of odd install errors come from an old Node. If you use a version manager, pin the version in a file such as .nvmrc so anyone cloning the repo uses the same one. You will need Python later for RAG evals and for measuring performance, so it's worth verifying now.

## 2:02–2:43 · Slide 9: Step 2 of 6

Step 2. A local model.

Install Ollama, pull llama3.2 and confirm it replies. You now have a free model with no data leaving your machine.

Ollama runs models on your machine and exposes an OpenAI-compatible API on port 11434. That means almost any tool that can talk to a cloud provider can talk to your local model by changing the URL. A small model is enough to start and runs without a dedicated graphics card, only slower. Confirm it replies from the terminal before moving on: if that step fails, everything else will fail with less clear errors.

## 2:44–3:21 · Slide 10: Step 3 of 6

Step 3. Repo structure.

Create the qa-ai-lab repo with evals, tests, data and prompts folders.

Four folders with one purpose each. evals holds evaluation configs. tests, the Playwright tests. data, datasets and schemas. prompts, prompt templates as text files. Keeping prompts apart from code has a practical reason: they can be versioned, compared across versions and reviewed in a pull request like any other change. A prompt embedded in a string inside code never gets reviewed.

## 3:21–3:56 · Slide 11: Step 4 of 6

Step 4. Development dependencies.

Install promptfoo and Playwright as dev dependencies so versions travel with the repo.

Install promptfoo and Playwright as project dev dependencies, not globally. That way versions are recorded in the lockfile and two people with the same repo get the same result. With tools that change every few weeks, a different global install on each machine is a constant source of unexplained differences. Install only Chromium for now: what follows doesn't need the other browsers and the download is much lighter.

## 3:57–4:32 · Slide 12: Step 5 of 6

Step 5. Secrets out of the repo.

Secrets: API keys go in .env, and .env goes in .gitignore before the first commit.

Even if today you only work with a local model, settle secrets handling before the first commit. API keys go in a .env file listed in .gitignore. Commit a .env.example instead, with variable names and no values, to document what is needed. A key that reaches a repository, even a private one, must be considered compromised and rotated; preventing it costs one line.

## 4:33–5:07 · Slide 13: Step 6 of 6

Step 6. The smoke eval.

Run the smoke eval. One green case in the table and in the web viewer means the lab is ready.

The sample file has a prompt with one variable, a local provider and a test with a case-insensitive assert. Running it verifies the whole chain: the tool installed, the model answering and the assert evaluating. The web viewer shows each case with its input, output and result. Keep it as the first step of any work session: if the smoke eval fails, the problem is the environment and not whatever you are testing.

## 5:08–5:44 · Slide 14: Example

An example.

A tester follows the steps on a work laptop with no graphics card. Node was on version 18 and the promptfoo install showed warnings; she upgrades to 22 and they disappear. She pulls the local model and the first reply takes several seconds, which is expected on that machine. She creates the repo, adds .env to .gitignore and runs the smoke eval: one green case. Then she adds a second test with another country and runs it again. In half an hour she has an environment she can clone on another machine and get the same result.

## 5:45–6:03 · Slide 15: Common mistakes

The most common mistakes.

Installing tools globally and losing control of versions.

Making the first commit before adding .env to .gitignore.

Skipping the terminal check of the model and debugging confusing errors later.

Leaving prompts as strings inside code.

## 6:04–6:21 · Slide 16: Checklist

To know it is done, check this.

Node 22 or later, Python and Git verified.

The local model replies from the terminal.

The repo has the four folders and .env ignored.

The smoke eval shows two green cases in the viewer.

## 6:22–6:31 · Slide 17: Where AI fell short

And where AI fell short.

Assistants suggest outdated flags and versions. A command you haven't run is a hypothesis.

## 6:32–6:46 · Slide 18: The written guide

That was day 4. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 5: Test cases from user stories: the prompt that actually works.
