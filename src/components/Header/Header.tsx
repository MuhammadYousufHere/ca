import { AiOutlineMenuFold } from 'react-icons/ai'
import { AiOutlineMenuUnfold } from 'react-icons/ai'
import styles from './styles.module.css'

type Props = { open: boolean; setOpen: () => void }
export default function Header({ open, setOpen }: Props) {
  return (
    <header className={styles.header_container}>
      <button
        className={styles.burger_menu}
        onClick={setOpen}
      >
        {open ? (
          <AiOutlineMenuFold className={styles.burger} />
        ) : (
          <AiOutlineMenuUnfold className={styles.burger} />
        )}
      </button>
      <h4>{window.location.pathname.slice(1).toUpperCase()}</h4>
    </header>
  )
}
export { Header }
