import { format } from 'date-fns';
import { useEffect, useId, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getArticles } from '../api/api';
import { useTopic } from '../contexts/TopicContext';
import capitaliseString from '../utils/capitaliseString';
import Divider from './Divider';
import LoadingSpinner from './LoadingSpinner';
import { Comment, Heart } from './icons';

const DEFAULT_SORT = 'created_at desc';
const VALID_SORTS = ['created_at', 'votes', 'comment_count'];
const VALID_ORDERS = ['desc', 'asc'];

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdown, setDropdown] = useState(DEFAULT_SORT);
  const [searchParams, setSearchParams] = useSearchParams();
  const { handleChangeTopic } = useTopic();
  const { topic } = useParams();
  const id = useId();

  const sortByQuery = searchParams.get('sort_by');
  const orderQuery = searchParams.get('order');
  const isValidSort = VALID_SORTS.includes(sortByQuery);
  const isValidOrder = VALID_ORDERS.includes(orderQuery);

  const handleChangeSortBy = (e) => {
    const { value } = e.target;
    const [sortBy, order] = value.split(' ');

    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort_by', sortBy);
    newParams.set('order', order);

    setDropdown(value);
    setSearchParams(newParams);
  };

  // If the user loads a topic page directly or refreshes the page, sets the
  // navbars active topic to the correct topic.
  useEffect(() => {
    if (topic) {
      const capitalisedTopic = capitaliseString(topic);
      handleChangeTopic(capitalisedTopic);
    }
  }, []);

  // On page load set the dropdown to the correct value if either of the query
  // parameters are already set e.g, if a user refreshes the page and when changing
  // topic reset sort by to the default value.
  useEffect(() => {
    if ((sortByQuery && !isValidSort) || (orderQuery && !isValidOrder)) return;

    if (sortByQuery && orderQuery) {
      setDropdown(`${sortByQuery} ${orderQuery}`);
    } else if (sortByQuery) {
      setDropdown(`${sortByQuery} desc`);
    } else if (orderQuery) {
      setDropdown(`created_at ${orderQuery}`);
    } else {
      setDropdown(DEFAULT_SORT);
    }
  }, [topic]);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      const { articles: fetchedArticles } = await getArticles({
        topic,
        sort_by: isValidSort ? sortByQuery : null,
        order: isValidOrder ? orderQuery : null,
      });

      setArticles(fetchedArticles);
      setIsLoading(false);
    };

    fetchArticles();
  }, [topic, sortByQuery, orderQuery]);

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="hidden text-2xl font-medium md:block">
            The latest and greatest breaking news.
          </h2>
        </div>
        <div>
          <label htmlFor={id} className="sr-only">
            Sort Articles By:
          </label>
          <select
            className="xs:p-2 rounded border border-stone-300 bg-neutral-100 p-1 hover:cursor-pointer"
            id={id}
            value={dropdown}
            name="sort-by"
            onChange={handleChangeSortBy}
          >
            <option value="created_at desc">Date (Newest First)</option>
            <option value="created_at asc">Date (Oldest First)</option>
            <option value="comment_count desc">Comments (Most First)</option>
            <option value="comment_count asc">Comments (Least First)</option>
            <option value="votes desc">Likes (Most First)</option>
            <option value="votes asc">Likes (Least First)</option>
          </select>
        </div>
      </div>
      <Divider />
      <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <LoadingSpinner size={35} />
        ) : (
          <>
            {articles.map((article) => (
              <li
                key={article.article_id}
                className="border-t-2 border-sky-600 bg-neutral-100 hover:bg-neutral-200"
              >
                <Link
                  className="block p-6"
                  to={`/article/${article.article_id}`}
                >
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
                      <div className="flex gap-3">
                        <div className="flex items-center gap-1">
                          <Heart className="h-7 w-7 fill-pink-600" />
                          <div>{article.votes}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Comment className="h-7 w-7 fill-sky-700" />
                          <div>{article.comment_count}</div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </>
        )}
      </ul>
    </section>
  );
}
