import clsx from 'clsx';
import { useId, useState } from 'react';
import { toast } from 'react-toastify';
import { postArticleComment } from '../api/api';
import LoadingSpinner from './LoadingSpinner';

export default function PostComment({
  setComments,
  setArticle,
  articleId,
  user,
}) {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const id = useId();

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return toast.error('You must be signed in to post a new comment.');
    }

    setIsSubmitting(true);

    try {
      const { comment: newComment } = await postArticleComment(articleId, {
        username: user.username,
        body: comment,
      });

      setArticle((article) => ({
        ...article,
        comment_count: article.comment_count + 1,
      }));
      setComments((previousComments) => [newComment, ...previousComments]);
      setComment('');

      toast.success('Success, you posted a new comment.');
    } catch (err) {
      toast.error(
        "Oops, we couldn't reach our servers. Please try again later."
      );
    }

    return setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={id} className="sr-only">
        Your Comment:
      </label>
      <textarea
        id={id}
        required
        name="comment"
        value={comment}
        disabled={isSubmitting}
        onChange={handleChangeComment}
        className="mb-1 h-28 w-full border border-stone-300 bg-neutral-100 px-5 py-3"
      />
      <button
        disabled={isSubmitting}
        className="relative rounded-md bg-sky-700 px-4 py-2 text-sm font-semibold text-white sm:text-base"
      >
        {isSubmitting && <LoadingSpinner size={25} />}
        <span className={clsx(isSubmitting && 'invisible')}>Add a comment</span>
      </button>
    </form>
  );
}
