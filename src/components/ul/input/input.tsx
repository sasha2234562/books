import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';
import s from './input.module.css';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(({ label, ...restProps }, ref) => {
  return (
    <div className={s.container}>
      {label && <label className={s.label}>{label}</label>}
      <input ref={ref} {...restProps} className={s.input} />
    </div>
  );
});
