import fs from "fs";
import fetch from "node-fetch";
import OpenAI from "openai";

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

async function fetchLatestNews() {
  const url = `https://newsapi.org/v2/top-headlines?category=technology&q=AI&language=en&apiKey=${NEWS_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.articles.slice(0, 5);
}

async function summarizeArticle(article) {
  const prompt = `Summarize this AI-related article in 3 short sentences for a tech news website.
Include key facts and avoid fluff.
Title: ${article.title}
Description: ${article.description || ""}
Content: ${article.content || ""}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  return completion.choices[0].message.content.trim();
}

async function main() {
  const articles = await fetchLatestNews();
  const summarized = [];

  for (const article of articles) {
    console.log("Summarizing:", article.title);
    const summary = await summarizeArticle(article);
    summarized.push({
      title: article.title,
      url: article.url,
      source: article.source.name,
      summary,
      publishedAt: article.publishedAt
    });
  }

  fs.writeFileSync("data/news.json", JSON.stringify(summarized, null, 2));
  console.log("✅ News updated successfully!");
}

main().catch(console.error);