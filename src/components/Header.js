import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopics } from '../api/api';
import formatTopics from '../utils/formatTopics';
import LoadingSpinner from './LoadingSpinner';
import SignIn from './SignIn';

const TOPIC_COLORS = [
  'after:bg-[#ff5943]',
  'after:bg-[#ff852a]',
  'after:bg-[#14aefc]',
  'after:bg-[#ffacda]',
];

const INITIAL_TOPIC = 'All';

export default function Header() {
  const [activeTopic, setActiveTopic] = useState(INITIAL_TOPIC);
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([]);

  const handleChangeTopic = (topic) => setActiveTopic(topic);

  useEffect(() => {
    const fetchTopics = async () => {
      const { topics: allTopics } = await getTopics();
      const formattedTopics = formatTopics(allTopics);

      setTopics([
        { topic: 'All', slug: '/', description: 'All available articles' },
        ...formattedTopics,
      ]);
      setIsLoading(false);
    };

    fetchTopics();
  }, []);

  return (
    <header className="bg-[#052962] pt-6 font-bold text-white sm:px-6 xl:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between px-4 sm:px-0">
          <h1>
            <div className="xs:text-4xl text-3xl sm:text-5xl">Northcoders</div>
            <div className="xs:text-2xl ml-8 sm:text-3xl">News</div>
          </h1>
          <SignIn />
        </div>
        <nav className="relative min-h-[3rem] border border-slate-500">
          {isLoading ? (
            <LoadingSpinner size={30} />
          ) : (
            <ul className="flex flex-wrap pb-3 sm:text-xl">
              {topics.map(({ topic, slug }, i) => (
                <li
                  key={topic}
                  className={clsx(
                    `relative border-r border-r-slate-500 px-5 pt-2 after:absolute after:left-0 after:top-0 after:w-full ${TOPIC_COLORS[i]} after:transition-all after:duration-300 hover:after:h-1`,
                    topic === activeTopic ? 'after:h-1' : 'after:h-0'
                  )}
                >
                  <Link to={slug} onClick={() => handleChangeTopic(topic)}>
                    {topic}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}
