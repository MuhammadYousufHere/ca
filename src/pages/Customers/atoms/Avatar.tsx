import styles from './styles.module.css'

type Props = {
  src: string | ArrayBuffer
  alt?: string
}
export default function Avatar({ alt, src }: Props) {
  return (
    <figure className={styles.avatar_figure}>
      <img
        src={src as string}
        alt='avatar'
        {...(alt && { alt })}
      />
    </figure>
  )
}
export { Avatar }
