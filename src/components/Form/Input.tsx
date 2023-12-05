import { HTMLProps } from 'react'
import styles from './styles.module.css'

interface Props extends HTMLProps<HTMLInputElement> {}
export default function Input({
  name,
  placeholder,
  value,
  onChange,
  type = 'text',
}: Props) {
  return (
    <input
      name={name}
      placeholder={placeholder}
      type={type}
      className={styles.input}
      value={value}
      onChange={onChange}
    />
  )
}
export { Input }
