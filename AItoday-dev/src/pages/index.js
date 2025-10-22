import fs from "fs";
import path from "path";
import NewsCard from "../components/NewsCard";

export default function Home({ news }) {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">📰 AI Today</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, index) => (
          <NewsCard key={index} article={item} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "news.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const news = JSON.parse(jsonData);
  return { props: { news } };
}
