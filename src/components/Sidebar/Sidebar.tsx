import { SetStateAction, useState, Dispatch } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@/hooks'
import { menuItems } from './helper'
import { SidebarHead } from './atoms'
import styles from './styles.module.css'

type Props = {
  expanded: boolean
  mobileExpanded: boolean
  setExpended: Dispatch<SetStateAction<boolean>>
  setMobExpended: Dispatch<SetStateAction<boolean>>
}
export default function Sidebar({
  expanded,
  setExpended,
  mobileExpanded,
  setMobExpended,
}: Props) {
  const [hovered, setHovered] = useState<null | number>(null)

  const [active, setActive] = useState(1)
  const changeSmall = useMediaQuery('(max-height: 550px)')
  const isMobile = useMediaQuery('(max-width: 400px)')
  return isMobile ? (
    <div
      className={cn(styles.sidebar, {
        [styles.sidebar_mobile]: isMobile,
        [styles.mobileExpanded]: mobileExpanded,
      })}
    >
      <SidebarHead
        expended={expanded}
        setMobExpended={setMobExpended}
      />
      {menuItems.map((item, index) => {
        let middle = false
        if (!(index === 0 || index === menuItems.length - 1)) {
          middle = true
        }
        return (
          <div
            className={cn(styles.boxicon_container)}
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
              className={styles.boxicon_container_mobile}
            >
              <span className={cn(styles.not_shrinked)}>
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
              </span>
              <p
                className={cn(styles.description, {
                  [styles.show_description]: isMobile,
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
  ) : (
    <div
      className={cn(styles.sidebar, {
        [styles.expanded]: expanded,
        [styles.sidebar_small]: !expanded,
        [styles.isMobile]: isMobile,
      })}
    >
      <SidebarHead
        expended={expanded}
        setMobExpended={setExpended}
      />
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
              <span
                className={cn(styles.not_shrinked, {
                  [styles.shriked]: !expanded,
                })}
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
              </span>
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
