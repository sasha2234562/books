import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import s from './main-page.module.css';
import { Button, CardBook, Input } from '../../components';
import { Book, fetchBooks } from '../../api/fetch-books.ts';
import { FormAddBook } from './components/form-add-book/form-add-book.tsx';
import classNames from 'classnames';

export const MainPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [booksFilter, setFilterBooks] = useState<Book[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [openModalFormAddBook, setOpenModalFormAddBook] = useState(false);

  useEffect(() => {
    fetchBooks()
      .then(res => {
        setBooks(res);
        setFilterBooks(res);
      })
      .catch(console.error);
  }, []);

  const onClickForm = useCallback(() => setOpenModalFormAddBook(prev => !prev), []);

  const onClickAddBook = useCallback(
    (value: Book) => {
      setBooks(prev => [value, ...prev]);
      setFilterBooks([value, ...books]);
      setOpenModalFormAddBook(false);
      setSearchValue('');
    },
    [books],
  );

  const onClickFilterBooks = useCallback(() => {
    if (!searchValue) {
      setFilterBooks(books);
    }
    const filtered = books.filter(
      item =>
        item.author.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        item.title.toLowerCase().startsWith(searchValue.toLowerCase()),
    );
    setFilterBooks(filtered);
  }, [searchValue, books]);

  const onChangeSearch = useCallback((value: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(value.target.value);
  }, []);

  return (
    <main className={s.main_container}>
      <Button label={'Добавить книгу'} className={s.button} onClick={onClickForm} />
      <form className={s.form_container}>
        <Input placeholder={'Поиск по имени автора или книги'} value={searchValue} onChange={onChangeSearch} />
        <Button label={'Поиск'} type={'button'} className={s.button} onClick={onClickFilterBooks} />
      </form>
      <section className={classNames(s.cards_section, booksFilter.length < 3 && s.cards_section_alone)}>
        {booksFilter.map(book => (
          <CardBook key={book.id} book={book} />
        ))}
      </section>
      {openModalFormAddBook && <FormAddBook onClickClose={onClickForm} onClickAddBook={onClickAddBook} />}
    </main>
  );
};
