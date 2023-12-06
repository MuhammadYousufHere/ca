import { FaSort } from 'react-icons/fa'
import styles from './styles.module.css'

export function SortButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={styles.sort_button}
    >
      <FaSort />
    </button>
  )
}
