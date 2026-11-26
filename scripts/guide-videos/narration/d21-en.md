# Video script · Day 21: Testing RAG: retrieval, faithfulness and answer, separately

What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.

- Video: `public/publications/qa-ai/videos/d21-en.mp4`
- Video length: 7:21
- Speech without pauses: 6:28

## 0:00–0:19 · Slide 1: Video guide

Day 21 of the 31 days of QA + AI series.

Testing RAG: retrieval, faithfulness and answer, separately.

How to test a RAG system in three layers so that, when it fails, you know whether the problem is retrieval, generation or the knowledge base.

## 0:19–0:40 · Slide 2: The problem

A RAG system answers questions by first searching your documents and then generating an answer with what it found. When it answers badly, the usual reaction is to tweak the prompt. Sometimes that works. Often it doesn't, because the problem came earlier: the right document never reached the model, and no instruction can make up for that.

## 0:41–1:03 · Slide 3: How it fits together

Testing a RAG end to end, with a single metric, mixes two different systems: a search engine and a generator. This guide splits them into three layers measured separately, and adds negative cases, where the correct answer is admitting the information isn't there. The result is a diagnosis that says where to fix things, not just that something is wrong.

## 1:04–1:24 · Slide 4: Requirements

To follow this guide you need:

Python 3.10+ and a RAG app exposing the answer and the retrieved chunks.

20 questions with expected answer and source document.

DeepEval defaults to an OpenAI model as judge (needs OPENAI_API_KEY); its docs explain how to use another.

## 1:25–1:31 · Slide 5: Setup

This is the setup. Pause the video if you want to copy it: the full version is in the written guide.

## 1:32–1:35 · Slide 6: Setup

And this is the next setup file.

## 1:35–2:17 · Slide 7: Step 1 of 6

Step 1. Layer one: retrieval.

Layer 1, retrieval: for each question, check whether the right document shows up among the retrieved chunks. It's deterministic and needs no model.

For each question in the dataset, note which document holds the answer. The test checks whether that document shows up among the retrieved chunks. No model is needed to evaluate it: it's a comparison of identifiers, deterministic and fast. This metric is the system's ceiling. If the right chunk shows up for seven questions in ten, the final answer can't be right with grounding in more than seven. Starting here avoids weeks of adjustments in the wrong place.

## 2:17–2:59 · Slide 8: Step 2 of 6

Step 2. Layer two: faithfulness.

Layer 2, faithfulness: every claim in the answer must be supported by the retrieved chunks. This is where fabrications get caught.

Faithfulness asks whether every claim in the answer is supported by the retrieved chunks. It doesn't evaluate whether the answer is true in general, but whether it comes from the context the system had. This is where fabrications get caught: a fact the model added from prior knowledge, an altered figure, a condition the document doesn't mention. It's measured with a judge that breaks the answer into claims and verifies each one. For figures and dates, add deterministic checks.

## 2:59–3:36 · Slide 9: Step 3 of 6

Step 3. Layer three: answer.

Layer 3, answer: does it answer what was asked and match what's expected?

Only in the third layer do you evaluate whether the answer addresses what was asked and matches what's expected. An answer can be faithful to the context and still useless: it talks about the topic, quotes the document well and doesn't answer the specific question. Or it can answer correctly from general knowledge without relying on your documents, which is a different risk. That's why the three layers are read together: each combination of results points to a different problem.

## 3:37–4:13 · Slide 10: Step 4 of 6

Step 4. Negative cases.

Add negative cases: questions whose answer isn't in the knowledge base. The system must say it doesn't know.

Add questions whose answer isn't in the knowledge base. The expected behavior is for the system to say so, instead of assembling a plausible answer from vaguely related chunks. It's the case that does the most damage in production and the least tested, because datasets tend to be built from existing documents. Also include nearly covered questions: the document discusses the topic but doesn't carry the specific fact being asked for.

## 4:14–4:55 · Slide 11: Step 5 of 6

Step 5. Diagnose per layer.

Diagnose per layer: low retrieval is fixed in chunking, index or search; low faithfulness is fixed in prompt or model. Changing the prompt doesn't fix bad retrieval.

With the three metrics separated, each fix has its place. Low retrieval is fixed in chunk size, the index or the search. Low faithfulness with good retrieval is fixed in the prompt or by changing models. A low answer score with the other two high is usually a format or instructions problem. The practical rule is not to touch the prompt until you've confirmed retrieval works: changing the prompt doesn't fix a search that doesn't find.

## 4:56–5:29 · Slide 12: Step 6 of 6

Step 6. Metrics in CI.

Bring the three metrics into CI with thresholds and track them on every document change.

Bring the three metrics into the pipeline with a threshold for each, and run the eval every time documents change, not just code. In a RAG, the knowledge base is part of the system. A new document contradicting another, or a folder reorganization, can lower retrieval without anyone having touched a line. Record how the metrics evolve with each content change so you can locate when a drop began.

## 5:30–6:15 · Slide 13: Example

An example.

An internal assistant answers questions about company policies. The team builds forty questions with their source document and ten negatives. First measurement, with illustrative figures: retrieval 65%, faithfulness 92%, answer 60%. The team had been tuning the prompt for two weeks. The numbers show the generator is faithful to what it receives and that the problem lies in search. They check and find chunks were cutting tables in half. They change the chunking strategy and retrieval rises to 90%; the answer score, to 84%, without touching the prompt. On the negatives, three out of ten still make things up. That one does get fixed with an instruction.

## 6:16–6:33 · Slide 14: Common mistakes

The most common mistakes.

Measuring only the final answer and not knowing which layer fails.

Tuning the prompt when the problem is retrieval.

Not including questions with no answer in the knowledge base.

Running the eval only when code changes and not documents.

## 6:34–6:52 · Slide 15: Checklist

To know it is done, check this.

Each question has its source document noted.

Retrieval, faithfulness and answer are measured separately.

The dataset includes negative and nearly covered cases.

The eval runs in CI on document changes.

## 6:52–7:02 · Slide 16: Where AI fell short

And where AI fell short.

With the right source in context, it still alters figures. Faithfulness is measured, not assumed.

## 7:02–7:19 · Slide 17: The written guide

That was day 21. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.

Continue with day 22: A model for security testing (1): threat modeling with the OWASP LLM and Agentic Top 10.
