import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, SetStateAction, PropsWithChildren, ReactNode } from 'react'
import styles from './styles.module.css'
import { IoClose } from 'react-icons/io5'
import { Button } from '..'

interface Props extends PropsWithChildren {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  label: string
  buttonLabel: string
  onClick: () => void
  isLoading: boolean
}
export default function Modal({
  isOpen,
  setIsOpen,
  label,
  buttonLabel,
  onClick,
  isLoading,
  children,
}: Props) {
  return (
    <BaseModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className={styles.modal_box}>
        <div className={styles.modal_head}>
          <button
            className={styles.close_icon}
            onClick={() => setIsOpen(false)}
          >
            <IoClose />
          </button>
          <h3 className={styles.modal_label}>{label}</h3>
        </div>
        <div className={styles.modal_body}>{children}</div>
        <div className={styles.actions_box}>
          <Button
            isLoading={isLoading}
            label={buttonLabel}
            onClick={onClick}
          />
        </div>
      </div>
    </BaseModal>
  )
}
export const BaseModal = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean
  children: ReactNode
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    isOpen && (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className={styles.modal}
          >
            <motion.div
              initial={{ scale: 0, rotate: '12.5deg' }}
              animate={{ scale: 1, rotate: '0deg' }}
              exit={{ scale: 0, rotate: '0deg' }}
              onClick={(e) => e.stopPropagation()}
              className={styles.modal_inner}
            >
              <div className={styles.modal_box}>{children}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  )
}
export { Modal }
