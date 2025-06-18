import { Header } from './components/header/header.tsx';
import { Outlet } from 'react-router';
import s from './layout.module.css';
import { Loader } from '../components';
import { Suspense } from 'react';

export const Layout = () => {
  return (
    <div className={s.layout_container}>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
