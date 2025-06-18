import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from './layout/layout.tsx';
import { Suspense } from 'react';
import { Loader } from './components';
import { BOOK_PAGE, MAIN } from './shared/constants/path.ts';
import { MainPage } from './pages/main-page/main-page.tsx';
import { BookPage } from './pages/book-page/book-page.tsx';

export const AppRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={MAIN} element={<MainPage />} />
          <Route path={BOOK_PAGE} element={<BookPage />} />
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
);
