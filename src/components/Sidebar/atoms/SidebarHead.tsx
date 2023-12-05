import React from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import cn from 'classnames'

export default function SidebarHead({ expended }: { expended: boolean }) {
  return (
    <div className={styles.sidebar_head}>
      <Link to='/'>
        <img
          className={cn(styles.logo)}
          src={!expended ? 'logo-mobile.png' : '/logo.png'}
          alt='logo'
        />
      </Link>
    </div>
  )
}

export { SidebarHead }
