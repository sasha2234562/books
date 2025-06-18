import { FC, memo } from 'react';
import s from './card-book.module.css';
import { Link } from 'react-router';
import { BOOK_PAGE } from '../../../../shared/constants/path.ts';
import { Book } from '../../../../api/fetch-books.ts';

interface Props {
  book: Book;
}

export const CardBook: FC<Props> = memo(({ book }) => {
  const onClickBook = () => {
    localStorage.setItem('book', JSON.stringify(book));
  };

  return (
    <div className={s.book_card_container}>
      <Link to={BOOK_PAGE.replace(':id', `${book.id}`)} onClick={onClickBook}>
        <img src={book.cover} alt="book photo" className={s.book_photo} loading={'lazy'} />
      </Link>
      <h2 className={s.book_title}>{book.title}</h2>
      <div className={s.book_info_wrapper}>
        <p className={s.book_info}>
          <span>Автор:</span>
          <span>{book.author}</span>
        </p>
        <p className={s.book_info}>
          <span>Жанр:</span>
          <span>{book.genre}</span>
        </p>
        <p className={s.book_info}>
          <span>Количество страниц:</span>
          <span>{book.pages}</span>
        </p>
        <p className={s.book_info}>
          <span>Рейтинг:</span>
          <span>{book.rating}</span>
        </p>
      </div>
    </div>
  );
});
