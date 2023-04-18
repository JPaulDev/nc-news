import { Route, Routes } from 'react-router-dom';
import Articles from './components/Articles';
import Header from './components/Header';

export default function App() {
  return (
    <>
      <Header />
      <main className="flex flex-1 justify-center sm:px-6 md:px-12">
        <div className="relative max-w-7xl flex-1 border border-stone-400 p-4">
          <Routes>
            <Route path="/" element={<Articles />} />
          </Routes>
        </div>
      </main>
    </>
  );
}
