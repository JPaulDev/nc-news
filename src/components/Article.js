import clsx from 'clsx';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getArticleById,
  getArticleComments,
  updateArticleLikes,
} from '../api/api';
import { useAuth } from '../contexts/AuthContext';
import useError from '../hooks/useError';
import capitaliseString from '../utils/capitaliseString';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';
import Divider from './Divider';
import Error from './Error';
import LoadingSpinner from './LoadingSpinner';
import { Comment, Heart } from './icons';

export default function Article() {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();
  const { handleError, error } = useError();

  const handleLikeArticle = async () => {
    if (!user) return toast.error('You must be signed in to like articles.');

    try {
      setArticle((previousArticle) => {
        const newVotes = previousArticle.votes + 1;
        return { ...previousArticle, votes: newVotes };
      });
      setIsLiked(true);
      toast.success('Success, you liked this article.');

      await updateArticleLikes(id, { inc_votes: 1 });
    } catch (err) {
      setArticle((previousArticle) => {
        const newVotes = previousArticle.votes - 1;
        return { ...previousArticle, votes: newVotes };
      });
      setIsLiked(false);

      toast.error(
        "Oops, we couldn't reach our servers. Please try again later."
      );
    }

    return undefined;
  };

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const { article: fetchedArticle } = await getArticleById(id);
        const { comments: fetchedComments } = await getArticleComments(id);
        setArticle(fetchedArticle);
        setComments(fetchedComments);
      } catch (err) {
        handleError(err);
      }

      setIsLoading(false);
    };

    fetchArticleData();
  }, [id]);

  const time = article ? (
    <time dateTime={article.created_at} className="text-stone-500">
      {format(new Date(article.created_at), 'E MMM do yyyy h:mmbbb')}
    </time>
  ) : null;

  if (error) {
    return <Error error={error} />;
  }

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
        <div className="flex items-center gap-3 text-left">
          <button
            onClick={handleLikeArticle}
            disabled={isLiked}
            aria-label="Like article."
          >
            <Heart
              className={clsx(
                'h-8 w-8 stroke-pink-600 stroke-[1rem] sm:h-10 sm:w-10',
                isLiked ? 'fill-pink-600' : 'fill-transparent'
              )}
            />
          </button>
          <div>
            <h3 className="text-lg font-semibold">Likes: {article.votes}</h3>
            <div className="text-sm text-stone-600 sm:text-base">
              Like this article
            </div>
          </div>
        </div>
      </div>
      <section className="flex flex-col gap-3 sm:col-start-3 sm:col-end-4">
        <Divider />
        <div className="flex gap-4">
          <Comment className="h-12 w-12 fill-sky-700 sm:h-14 sm:w-14" />
          <div>
            <h3 className="text-lg font-semibold sm:text-xl">
              Comments: {article.comment_count}
            </h3>
            <div className="text-sm text-stone-600 sm:text-base">
              Share what you think
            </div>
          </div>
        </div>
        <CommentForm
          setComments={setComments}
          setArticle={setArticle}
          articleId={id}
          user={user}
        />
        {comments.map((comment) => (
          <CommentCard
            key={comment.comment_id}
            comment={comment}
            setComments={setComments}
            setArticle={setArticle}
          />
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
