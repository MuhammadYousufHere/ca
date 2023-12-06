import { AiOutlineMenuFold } from 'react-icons/ai'
import { AiOutlineMenuUnfold } from 'react-icons/ai'
import styles from './styles.module.css'
import { SetStateAction, Dispatch } from 'react'
import { useMediaQuery } from '@/hooks'

type Props = {
  open: boolean
  setOpen: () => void
  mobileExpanded: boolean
  setMobExpended: Dispatch<SetStateAction<boolean>>
}
export default function Header({
  open,
  setOpen,
  mobileExpanded,
  setMobExpended,
}: Props) {
  const isMobile = useMediaQuery('(max-width: 400px)')

  return (
    <header className={styles.header_container}>
      <button
        className={styles.burger_menu}
        onClick={isMobile ? () => setMobExpended(!mobileExpanded) : setOpen}
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
