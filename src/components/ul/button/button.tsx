import { ButtonHTMLAttributes, DetailedHTMLProps, FC, memo } from 'react';
import classNames from 'classnames';
import s from './button.module.css';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  label: string;
  className?: string;
}

export const Button: FC<Props> = memo(({ onClick, label, disabled, type, className, ...restProps }) => {
  return (
    <button
      className={classNames(s.container, className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...restProps}
    >
      {label}
    </button>
  );
});
