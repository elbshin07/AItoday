import fs from "fs";
import path from "path";
import Link from "next/link";

export default function HomePage() {
  const filePath = path.join(process.cwd(), "data/news.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const news = JSON.parse(fileData);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">📰 AI Today</h1>
      <p className="text-gray-600 mb-8">
        ChatGPT가 요약한 최신 인공지능 뉴스
      </p>
      <div className="space-y-6">
        {news.map((item: any, i: number) => (
          <div key={i} className="p-5 bg-white shadow rounded-2xl">
            <Link href={item.url} target="_blank" className="text-xl font-semibold text-blue-600">
              {item.title}
            </Link>
            <p className="mt-2 text-gray-800">{item.summary}</p>
            <div className="mt-2 text-sm text-gray-500">
              {item.source} · {new Date(item.publishedAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}