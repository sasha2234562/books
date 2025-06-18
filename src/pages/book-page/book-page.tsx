import s from './book-page.module.css';

export const BookPage = () => {
  const getBook = localStorage.getItem('book');
  const book = getBook ? JSON.parse(getBook) : null;

  if (!book) {
    return;
  }

  return (
    <main className={s.book_page_container}>
      <div className={s.book_section}>
        <div className={s.book_section_info}>
          <img src={book.cover} alt={`photo ${book.title}`} className={s.book_photo} />
        </div>
        <div className={s.book_section_info}>
          <h2 className={s.actor_name}>{book.title}</h2>
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
      <p>{book.description}</p>
    </main>
  );
};
