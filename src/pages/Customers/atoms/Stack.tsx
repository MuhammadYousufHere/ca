import styles from './styles.module.css'
import { FaSort } from 'react-icons/fa'

export default function Stack() {
  return (
    <div className={styles.stack}>
      <div></div>
      <div>
        <p>Customer ID</p>
        <FaSort />
      </div>
      <div>
        <p>Customer Name</p>

        <FaSort />
      </div>
      <div>
        <p>Email</p>

        <FaSort />
      </div>
      <div></div>
    </div>
  )
}
export { Stack }
