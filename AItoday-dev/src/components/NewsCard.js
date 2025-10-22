export default function NewsCard({ article }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 transition hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
      <p className="text-gray-600 text-sm mb-2">{article.summary}</p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 text-sm"
      >
        Read more →
      </a>
    </div>
  );
}
