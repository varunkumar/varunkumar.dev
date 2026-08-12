import { useEffect, useState } from 'react';

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export function formatDate(iso, now = Date.now()) {
  const diff = (new Date(iso) - now) / 1000;
  const abs = Math.abs(diff);
  if (abs < 3600) return rtf.format(Math.round(diff / 60), 'minute');
  if (abs < 86400) return rtf.format(Math.round(diff / 3600), 'hour');
  if (abs < 7 * 86400) return rtf.format(Math.round(diff / 86400), 'day');
  if (abs < 30 * 86400)
    return rtf.format(Math.round(diff / (7 * 86400)), 'week');
  if (abs < 365 * 86400)
    return rtf.format(Math.round(diff / (30 * 86400)), 'month');
  return rtf.format(Math.round(diff / (365 * 86400)), 'year');
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
            rawDate: new Date(item.date_published).toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            }),
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
