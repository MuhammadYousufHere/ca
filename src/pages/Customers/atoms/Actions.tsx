import styles from './styles.module.css'

type Props = {
  onDelete: () => void
  onEdit: () => void
}
export default function Actions({ onDelete, onEdit }: Props) {
  return (
    <div className={styles.actions_container}>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  )
}

export { Actions }
