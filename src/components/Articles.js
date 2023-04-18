import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../api/api';
import LoadingSpinner from './LoadingSpinner';
import Heart from './icons/Heart';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { articles: fetchedArticles } = await getArticles();

      setArticles(fetchedArticles);
      setIsLoading(false);
    };

    fetchArticles();
  }, []);

  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {isLoading ? (
        <LoadingSpinner size={35} />
      ) : (
        <>
          {articles.map((article) => (
            <li
              key={article.article_id}
              className="border-t-2 border-sky-600 bg-neutral-100 p-6 hover:bg-neutral-200"
            >
              <Link to={`/articles/${article.article_id}`}>
                <article>
                  <div className="mb-1 text-lg font-semibold italic text-orange-600">
                    {article.author}
                  </div>
                  <h2 className="flex flex-col text-lg font-bold text-sky-700 after:mt-2 after:h-[0.125rem] after:bg-neutral-300">
                    {article.title}
                  </h2>
                  <time dateTime={article.created_at} className="my-2 block">
                    {format(new Date(article.created_at), 'MMM do, yyyy')}
                  </time>
                  <img
                    src={article.article_img_url}
                    alt=""
                    width="700"
                    height="700"
                  />
                  <div className="mt-4 flex justify-between font-medium">
                    <div className="rounded-md bg-orange-300 px-3 py-1">
                      {article.topic}
                    </div>
                    <div className="flex gap-2">
                      <Heart className="h-7 w-7 fill-pink-600" />
                      <div>{article.votes}</div>
                    </div>
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </>
      )}
    </ul>
  );
}
