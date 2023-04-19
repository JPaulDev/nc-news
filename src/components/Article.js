import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById, getArticleComments } from '../api/api';
import capitaliseString from '../utils/capitaliseString';
import CommentCard from './CommentCard';
import Divider from './Divider';
import LoadingSpinner from './LoadingSpinner';
import Comment from './icons/Comment';

export default function Article() {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchArticleData = async () => {
      const { article: fetchedArticle } = await getArticleById(id);
      const { comments: fetchedComments } = await getArticleComments(id);

      setArticle(fetchedArticle);
      setComments(fetchedComments);
      setIsLoading(false);
    };

    fetchArticleData();
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
      <aside className="row-start-1 row-end-3 hidden sm:block">
        <div className="mb-20 text-2xl font-bold text-red-600">
          {capitaliseString(article.topic)}
        </div>
        <Divider />
        <div className="mt-3 flex flex-col gap-3 text-lg font-bold text-red-600 after:mb-2 after:h-px after:bg-stone-300">
          {article.author}
        </div>
        {time}
      </aside>
      <div className="row-start-1 row-end-3 hidden bg-stone-300 sm:block" />
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
        <p className="my-4 text-stone-700">{article.body}</p>
      </div>
      <section className="flex flex-col gap-3 sm:col-start-3 sm:col-end-4">
        <Divider />
        <div className="flex gap-4">
          <Comment className="h-12 w-12 fill-sky-700 sm:h-14 sm:w-14" />
          <div>
            <h3 className="text-lg font-semibold sm:text-xl">
              Comments: {article.comment_count}
            </h3>
            <div className="text-stone-600">Share what you think</div>
          </div>
        </div>
        {comments.map((comment) => (
          <CommentCard key={comment.comment_id} comment={comment} />
        ))}

        {!comments.length && (
          <div className="text-stone-600">
            There is nothing here, be the first to comment.
          </div>
        )}
      </section>
    </article>
  );
}
