import s from './file-input.module.css';
import { ChangeEvent, FC, memo } from 'react';
import classNames from 'classnames';

interface Props {
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  select?: boolean;
  required?: boolean;
}

export const FileInput: FC<Props> = memo(({ onChange, select, label, required }) => {
  return (
    <label className={s.input_file}>
      <input type="file" name="file" onChange={onChange} required={required} />
      <span className={classNames(s.input_file_btn, select && s.img_select)}>{label}</span>
    </label>
  );
});
