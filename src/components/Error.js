import { Link } from 'react-router-dom';
import { useTopic } from '../contexts/TopicContext';

export default function Error({ error }) {
  const { msg, status } = error;
  const { handleChangeTopic } = useTopic();

  return (
    <section className="xs:flex-row flex h-full flex-col items-center justify-center gap-7">
      <div className="text-6xl font-bold text-sky-700">{status}</div>
      <div className="xs:block hidden h-48 w-[0.125rem] bg-sky-700" />
      <div className="xs:items-start flex flex-col items-center gap-3">
        <h2 className="text-center">{msg}</h2>
        <Link
          className="rounded-lg bg-sky-700 px-3 py-2 font-semibold text-white shadow-xl"
          to="/"
          onClick={() => handleChangeTopic('All')}
        >
          Go to homepage
        </Link>
      </div>
    </section>
  );
}
