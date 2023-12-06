import { Dispatch, SetStateAction } from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import { useMediaQuery } from '@/hooks'
import { FaTimes } from 'react-icons/fa'

export default function SidebarHead({
  expended,
  setMobExpended,
}: {
  expended: boolean
  setMobExpended: Dispatch<SetStateAction<boolean>>
}) {
  const isMobile = useMediaQuery('(max-width: 400px)')

  return (
    <div className={styles.sidebar_head}>
      <Link to='/'>
        <img
          className={cn(styles.logo)}
          src={!expended ? 'logo-mobile.png' : '/logo.png'}
          alt='logo'
        />
      </Link>
      {isMobile && (
        <button
          className={styles.mobile_close}
          onClick={() => setMobExpended(false)}
        >
          <FaTimes />
        </button>
      )}
    </div>
  )
}

export { SidebarHead }
