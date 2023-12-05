import { useState } from 'react'
import { Header } from '../Header'
import { Sidebar } from '..'
import styles from './styles.module.css'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  const [expanded, setExpanded] = useState(false)

  return (
    <main className={styles.layout_wrapper}>
      <Sidebar expanded={expanded} />

      <div className={styles.app_container}>
        <Header
          open={expanded}
          setOpen={() => setExpanded(!expanded)}
        />
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </main>
  )
}

export { Layout }
