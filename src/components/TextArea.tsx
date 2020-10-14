import { useField, useFormik } from 'formik';
import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

interface TextAreaProps
  extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  id: string;
  label: string;
}

export function TextArea({ id, label, ...props }: TextAreaProps) {
  const [field] = useField(id);
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <textarea
        {...props}
        id={id}
        name={id}
        onChange={field.onChange}
        value={field.value}
      ></textarea>
    </>
  );
}
