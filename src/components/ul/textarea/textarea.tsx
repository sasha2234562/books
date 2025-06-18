import { DetailedHTMLProps, forwardRef, TextareaHTMLAttributes } from 'react';
import s from './textarea.module.css';

interface Props extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(({ label, ...restProps }, ref) => {
  return (
    <div className={s.container}>
      {label && <label className={s.label}>{label}</label>}
      <textarea ref={ref} {...restProps} className={s.textarea} />
    </div>
  );
});
