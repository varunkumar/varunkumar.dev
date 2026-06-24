import { useEffect, useState } from 'react';

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/writing/feed.json')
      .then((r) => {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then((feed) => {
        setPosts(
          feed.items.map((item) => ({
            title: item.title,
            excerpt: item.summary,
            date: formatDate(item.date_published),
            url: item.url,
            tags: item.tags ?? [],
          }))
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { posts, loading };
}
