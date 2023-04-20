import { format } from 'date-fns';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { deleteArticleComment } from '../api/api';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import { Delete } from './icons';

export default function CommentCard({ comment, setComments, setArticle }) {
  const [isSubmitting, setIsSubmitting] = useState();
  const { user } = useAuth();
  const { author, body, created_at, comment_id } = comment;

  const handleDeleteComment = async () => {
    setIsSubmitting(true);

    try {
      await deleteArticleComment(comment_id);
      setArticle((article) => ({
        ...article,
        comment_count: article.comment_count - 1,
      }));
      setComments((previousComments) =>
        previousComments.filter(
          (previousComment) => previousComment.comment_id !== comment_id
        )
      );

      toast.success('Your comment has been removed.');
    } catch (err) {
      toast.error(
        "Oops, we couldn't reach our servers. Please try again later."
      );
    }

    setIsSubmitting(false);
  };

  return (
    <article className="border border-stone-300 bg-neutral-100 px-5 py-3">
      <div className="font-medium text-sky-700 sm:text-lg">{author}</div>
      <time dateTime={created_at} className="text-sm text-stone-600">
        {format(new Date(created_at), 'MMM do yyyy h:mmaaa')}
      </time>
      <p className="my-2">{body}</p>
      {user && user.username === author && (
        <button
          disabled={isSubmitting}
          className="mt-3 flex items-center gap-1 text-sm hover:underline"
          onClick={handleDeleteComment}
        >
          <Delete className="h-5 w-5 fill-red-500" />
          {isSubmitting ? (
            <div className="relative ml-3">
              <LoadingSpinner size={18} />
            </div>
          ) : (
            'Delete comment'
          )}
        </button>
      )}
    </article>
  );
}
