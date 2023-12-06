import { Button } from '@/components'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className={styles.not_found}>
      <h1>404</h1>
      <h3>Page Not Found</h3>

      <Button
        label='Go Home'
        onClick={() => navigate('/customers?sortby=id&order=asc')}
      />
    </div>
  )
}
export { NotFound }
