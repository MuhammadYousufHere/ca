import { motion, AnimatePresence } from 'framer-motion'
import styles from './styles.module.css'
import { BsCheckCircleFill } from 'react-icons/bs'
import { MdOutlineError } from 'react-icons/md'
import { GrClose } from 'react-icons/gr'
import cn from 'classnames'
import { useAppDispatch, useAppSelector } from '..'
import { toaster } from './selectors'
import { SyntheticEvent } from 'react'
import { clearToastMessage } from './toastSlice'

export function Alert() {
  const dispatch = useAppDispatch()

  const { message, severity, isVisible } = useAppSelector(toaster)

  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return

    dispatch(clearToastMessage())
  }
  return (
    isVisible && (
      <div className={styles.main_wrapper}>
        <AnimatePresence>
          <motion.div
            className={cn(styles.alert_container, {
              [styles.success]: severity === 'success',
              [styles.error]: severity === 'error',
            })}
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            exit={{ opacity: 0, x: 200 }}
          >
            <div
              className={cn(styles.alert_container_icon, {
                [styles.alert_container_error]: severity === 'error',
              })}
            >
              {severity === 'error' ? (
                <MdOutlineError />
              ) : (
                <BsCheckCircleFill />
              )}
            </div>
            <p>{message}</p>

            <GrClose
              onClick={handleClose}
              className={styles.close}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    )
  )
}
