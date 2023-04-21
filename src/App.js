import { Route, Routes } from 'react-router-dom';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Article from './components/Article';
import Articles from './components/Articles';
import Header from './components/Header';
import Page404 from './components/Page404';

export default function App() {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        transition={Flip}
        hideProgressBar={true}
      />
      <Header />
      <main className="flex flex-1 justify-center sm:px-6 xl:px-12">
        <div className="relative max-w-7xl flex-1 border border-stone-400 p-4">
          <Routes>
            <Route path="/" element={<Articles />} />
            <Route path="/articles/:topic" element={<Articles />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </div>
      </main>
    </>
  );
}
