import { format } from 'date-fns';

export default function CommentCard({ comment }) {
  const { author, body, created_at } = comment;

  return (
    <article className="border border-stone-300 bg-neutral-100 px-5 py-3">
      <div className="text-lg font-medium text-sky-700">{author}</div>
      <time dateTime={created_at} className="text-stone-600">
        {format(new Date(created_at), 'MMM do yyyy h:mmaaa')}
      </time>
      <p className="my-2">{body}</p>
    </article>
  );
}
