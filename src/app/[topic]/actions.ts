'use server';

import { Sentiment } from "@/lib/interfaces";

export async function fetchSentiment(
  prevState: {
    sentiment: Sentiment | null;
  },
  formData: FormData
) {

  let sentiment: Sentiment = 'neutral';
  const text = formData.get('text') as string;
  if (!text) return { sentiment };

  const response = await fetch("https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: text }),
  });

  const result = await response.json();

  // Determine top sentiment based on the highest score
  const sentimentResult = result["0"];
  if (sentimentResult && Array.isArray(sentimentResult)) {
    const topSentiment = sentimentResult.reduce((prev, current) => (prev.score > current.score ? prev : current));
    sentiment = (() => {
      switch (topSentiment.label) {
        case "POSITIVE":
          return "positive";
        case "NEGATIVE":
          return "negative";
        default:
          return "neutral";
      }
    })();
  }

  return { sentiment };
}
