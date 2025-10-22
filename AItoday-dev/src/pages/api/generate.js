import { fetchNews } from "../../lib/fetchNews";
import OpenAI from "openai";
import fs from "fs";

export default async function handler(req, res) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const articles = await fetchNews();

  const summarized = [];
  for (const article of articles) {
    const summaryPrompt = `Summarize the following news in 2 concise sentences:\n\n${article.content}`;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: summaryPrompt }]
    });
    summarized.push({
      title: article.title,
      url: article.url,
      summary: completion.choices[0].message.content.trim()
    });
  }

  fs.writeFileSync("data/news.json", JSON.stringify(summarized, null, 2));
  res.status(200).json({ success: true, count: summarized.length });
}
