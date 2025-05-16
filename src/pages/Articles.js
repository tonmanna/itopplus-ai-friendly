// Mock article data
const articles = [
  {
    id: 1,
    title: "Understanding AI-Friendly Web Design",
    excerpt:
      "Learn the key principles of designing websites that are optimized for AI crawlers and machine learning systems.",
    date: "2025-05-16",
    readTime: "5 min read",
    author: "John Doe",
    imageUrl: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107",
  },
  {
    id: 2,
    title: "SEO Best Practices for AI Accessibility",
    excerpt:
      "Discover how to optimize your website content and structure for better AI understanding and indexing.",
    date: "2025-05-16",
    readTime: "7 min read",
    author: "Jane Smith",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  // Add more mock articles as needed
];

export default function Articles() {
  return (
    <div className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Latest Articles
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn about AI-friendly web development and optimization techniques.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article.id} className="flex flex-col items-start">
              <div className="relative w-full">
                <img
                  src={article.imageUrl}
                  alt=""
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={article.date} className="text-gray-500">
                    {article.date}
                  </time>
                  <span className="text-gray-500">{article.readTime}</span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <span className="absolute inset-0" />
                    {article.title}
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {article.excerpt}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <span className="absolute inset-0" />
                      {article.author}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
