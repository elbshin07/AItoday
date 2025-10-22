import axios from "axios";
import Parser from "rss-parser";

export async function fetchNews() {
  const parser = new Parser();
  const rssFeed = await parser.parseURL("https://news.google.com/rss/search?q=artificial+intelligence&hl=en-US&gl=US&ceid=US:en");
  const apiUrl = `https://newsapi.org/v2/top-headlines?category=technology&apiKey=${process.env.NEWS_API_KEY}`;
  const apiResponse = await axios.get(apiUrl);
  const rssArticles = rssFeed.items.slice(0, 5).map(item => ({
    title: item.title,
    url: item.link,
    content: item.contentSnippet
  }));
  const apiArticles = apiResponse.data.articles.slice(0, 5).map(a => ({
    title: a.title,
    url: a.url,
    content: a.description
  }));
  return [...rssArticles, ...apiArticles];
}
