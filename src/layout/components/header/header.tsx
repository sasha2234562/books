import s from './header.module.css';
import icon_book from '../../../assets/icon-book.svg';
import { Link } from 'react-router';
import { MAIN } from '../../../shared/constants/path.ts';
import { memo } from 'react';

export const Header = memo(() => {
  return (
    <div className={s.container_header}>
      <div>
        <img src={icon_book} className={s.logo} alt="логотип" />
      </div>
      <h2 className={s.title_header}>В нашем приложении вы можете найти информацию о вашей любимой книге</h2>
      <Link to={MAIN}>
        <span className={s.link}>На главную</span>
      </Link>
    </div>
  );
});
