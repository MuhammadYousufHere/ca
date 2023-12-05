import { useState } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@/hooks'
import { menuItems } from './helper'
import { SidebarHead } from './atoms'
import styles from './styles.module.css'

type Props = {
  expanded: boolean
}
export default function Sidebar({ expanded }: Props) {
  const [hovered, setHovered] = useState<null | number>(null)
  const [active, setActive] = useState(1)
  const changeSmall = useMediaQuery('(max-height: 550px)')

  return (
    <div
      className={cn(styles.sidebar, {
        [styles.expanded]: expanded,
        [styles.sidebar_small]: !expanded,
      })}
    >
      <SidebarHead expended={expanded} />
      {menuItems.map((item, index) => {
        let middle = false
        if (!(index === 0 || index === menuItems.length - 1)) {
          middle = true
        }
        return (
          <div
            className={cn(styles.boxicon_container, {
              [styles.expanded_boxicon_container]: expanded,
            })}
            onMouseEnter={() => {
              if (middle) {
                setHovered(index)
              }
            }}
            onMouseLeave={() => {
              if (middle) {
                setHovered(null)
              }
            }}
            onClick={() => {
              if (middle) {
                setActive(index)
              }
            }}
            key={index}
          >
            <Link
              to={item.to}
              className={styles.boxicon_container}
            >
              <item.Icon
                className={cn(styles.boxicon, {
                  [styles.first_and_last_trash_fix]: !middle,
                  [styles.active]: active === index,
                })}
                styles={{ fontSize: changeSmall ? '1rem' : '2rem' }}
                color={
                  hovered === index || active === index ? '#c6c6cb' : 'white'
                }
              ></item.Icon>
              <p
                className={cn(styles.description, {
                  [styles.show_description]: expanded,
                  [styles.active_description]: active === index,
                })}
              >
                {item.name}
              </p>
            </Link>
          </div>
        )
      })}
    </div>
  )
}
export { Sidebar }
