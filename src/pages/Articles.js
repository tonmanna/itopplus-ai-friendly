import React from "react";

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
    <div className="articles-container">
      <div className="articles-header">
        <h2 className="articles-title">Latest Articles</h2>
        <p className="articles-subtitle">
          Learn about AI-friendly web development and optimization techniques.
        </p>
      </div>

      <div className="articles-grid">
        {articles.map((article) => (
          <article key={article.id} className="article-card">
            <div className="article-image-container">
              <img src={article.imageUrl} alt="" className="article-image" />
              <div className="article-image-overlay" />
            </div>

            <div className="article-content">
              <div className="article-meta">
                <time dateTime={article.date} className="article-date">
                  {article.date}
                </time>
                <span className="article-read-time">{article.readTime}</span>
              </div>

              <div className="article-title-container">
                <h3 className="article-card-title">{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>
              </div>

              <div className="article-author">
                <span className="author-name">{article.author}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
