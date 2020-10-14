import { useField, useFormik } from 'formik';

interface InputProps {
  id: string;
  label: string;
}

export function Input({ id, label }: InputProps) {
  const [field] = useField(id);
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} onChange={field.onChange} value={field.value}></input>
    </>
  );
}
