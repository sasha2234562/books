import { ChangeEvent, FC, memo } from 'react';
import { Modal } from '../../../../components/ul/modal/modal.tsx';
import s from './form-add-book.module.css';
import { Button, Input } from '../../../../components';
import { FieldValues, useForm } from 'react-hook-form';
import { FileInput } from '../../../../components/ul/file-input/file-input.tsx';
import { Book } from '../../../../api/fetch-books.ts';
import { Textarea } from '../../../../components/ul/textarea/textarea.tsx';
import { z } from 'zod';

interface Props {
  onClickClose: () => void;
  onClickAddBook: (value: Book) => void;
}

type FormNames = 'title' | 'author' | 'genre' | 'pages' | 'rating' | 'description';

interface FormInputs {
  name: FormNames;
  label: string;
  type: string;
}

const formInputs: FormInputs[] = [
  { name: 'title', label: 'Название книги', type: 'text' },
  { name: 'author', label: 'Автор', type: 'text' },
  { name: 'genre', label: 'Жанр', type: 'text' },
  { name: 'pages', label: 'Количество страниц', type: 'number' },
  { name: 'rating', label: 'Рейтинг', type: 'number' },
];
export const formSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  genre: z.string().min(1),
  pages: z.number().min(1),
  cover: z.string().min(1),
  rating: z.number().min(1).max(5),
  description: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

export const FormAddBook: FC<Props> = memo(({ onClickClose, onClickAddBook }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FieldValues) => {
    const generateId = Math.floor(Math.random() * 1_000_000_000);
    onClickAddBook({
      id: generateId,
      title: data.title,
      author: data.author,
      cover: data.cover,
      description: data.description,
      pages: data.pages,
      genre: data.genre,
      rating: data.rating,
    });
  };

  const onChangePhotoBook = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('cover', URL.createObjectURL(file));
    }
  };

  return (
    <Modal onClickClose={onClickClose}>
      <form className={s.form_container} onSubmit={handleSubmit(onSubmit)}>
        {formInputs.map((item, index) => {
          return (
            <Input
              key={index}
              {...register(item.name, { required: true })}
              type={item.type}
              label={item.label}
              aria-invalid={!!errors[item.name]}
            />
          );
        })}
        <FileInput
          onChange={onChangePhotoBook}
          label={watch('cover') ? 'Фото выбрано' : 'Фото книги'}
          select={!!watch('cover')}
          required
        />
        <Textarea
          {...register('description', { required: true })}
          placeholder={'Описание'}
          aria-invalid={!!errors.description}
        />
        <Button label={'Добавить'} className={s.submit_button} type={'submit'} />
      </form>
    </Modal>
  );
});
