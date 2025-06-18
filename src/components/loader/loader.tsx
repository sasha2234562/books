import s from './loader.module.css';
import { memo } from 'react';

export const Loader = memo(() => {
  return (
    <div className={s.container__loader}>
      <span className={s.loader}> </span>
    </div>
  );
});
