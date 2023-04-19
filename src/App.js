import { Route, Routes } from 'react-router-dom';
import Article from './components/Article';
import Articles from './components/Articles';
import Header from './components/Header';

export default function App() {
  return (
    <>
      <Header />
      <main className="flex flex-1 justify-center sm:px-6 xl:px-12">
        <div className="relative max-w-7xl flex-1 border border-stone-400 p-4">
          <Routes>
            <Route path="/" element={<Articles />} />
            <Route path="/articles/:id" element={<Article />} />
          </Routes>
        </div>
      </main>
    </>
  );
}
