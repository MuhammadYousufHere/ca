import { Loader } from '.'
import styles from './styles.module.css'

interface Props {
  label: string
  Icon?: JSX.Element
  isLoading?: boolean
  onClick: () => void
}
export default function Button({
  Icon,
  isLoading,
  onClick,
  label = 'label',
}: Props) {
  return (
    <button
      className={styles.app_button}
      role='button'
      onClick={onClick}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {Icon}
          <p>{label}</p>
        </>
      )}
    </button>
  )
}

export { Button }
