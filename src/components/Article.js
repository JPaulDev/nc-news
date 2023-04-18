import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../api/api';
import capitaliseString from '../utils/capitaliseString';
import Divider from './Divider';
import LoadingSpinner from './LoadingSpinner';

export default function Article() {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      const { article: fetchedArticle } = await getArticleById(id);

      setArticle(fetchedArticle);
      setIsLoading(false);
    };

    fetchArticle();
  }, [id]);

  const time = article ? (
    <time dateTime={article.created_at} className="text-stone-500">
      {format(new Date(article.created_at), 'E MMM do yyyy h:mmbbb')}
    </time>
  ) : null;

  return isLoading ? (
    <LoadingSpinner size={35} />
  ) : (
    <article className="grid h-full gap-4 sm:grid-cols-[8rem_0.063rem_1fr] lg:grid-cols-[14rem_0.063rem_1fr]">
      <aside className="hidden sm:block">
        <div className="mb-20 text-2xl font-bold text-red-600">
          {capitaliseString(article.topic)}
        </div>
        <Divider />
        <div className="mt-3 flex flex-col gap-3 text-lg font-bold text-red-600 after:mb-2 after:h-px after:bg-stone-300">
          {article.author}
        </div>
        {time}
      </aside>
      <div className="hidden bg-stone-300 sm:block" />
      <div className="w-[min(700px,100%)]">
        <h2 className="mb-6 text-2xl font-medium text-sky-700 sm:text-3xl">
          {article.title}
        </h2>
        <img src={article.article_img_url} alt="" width="700" height="700" />
        <div className="mt-2 sm:hidden">
          <div className="text-lg font-bold text-red-600">{article.author}</div>
          {time}
          <Divider className="mt-2" />
        </div>
        <p className="mt-4 text-stone-700">{article.body}</p>
      </div>
    </article>
  );
}
