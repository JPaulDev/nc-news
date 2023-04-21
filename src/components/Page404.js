import { Link } from 'react-router-dom';
import image404 from '../images/404-error.webp';

export default function Page404() {
  return (
    <section className="flex h-full flex-col items-center justify-center text-center">
      <img src={image404} alt="" width="400" height="400" />
      <h2 className="xs:text-4xl mb-3 text-3xl font-semibold">Not Found</h2>
      <p className="mb-3">
        The requested page doesn&lsquo;t exist or you don&lsquo;t have access to
        it.
      </p>
      <Link
        className="rounded-lg bg-sky-700 px-3 py-2 font-semibold text-white shadow-xl"
        to="/"
      >
        Go to homepage
      </Link>
    </section>
  );
}
