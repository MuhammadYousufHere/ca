import { useState } from 'react'
import styles from './styles.module.css'
import { Actions, Avatar } from '../atoms'
import EditCustomer from '../EditCustomer'
import DeleteCustomer from '../DeleteCustomer'
import { type Customer } from '../Customers'
import { motion } from 'framer-motion'

interface Props extends Customer {}
export default function CustomerItem({ email, id, name, profileUrl }: Props) {
  const [deleteCustomer, setDeleteCustomer] = useState(false)
  const [editCustomer, setEditCustomer] = useState(false)

  function handleDelete() {
    setDeleteCustomer(true)
  }
  function handleEdit() {
    setEditCustomer(true)
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.customer_item}>
        <Avatar src={profileUrl as string} />
        <div className={styles.item_box}>
          <p>{id}</p>
        </div>
        <div>
          <p className={styles.customer_name}>{name}</p>
        </div>
        <div>
          <p>{email}</p>
        </div>
        <Actions
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
      <EditCustomer
        initialValues={{ name, profileUrl, email }}
        isOpen={editCustomer}
        setIsOpen={setEditCustomer}
        userId={id}
      />
      <DeleteCustomer
        userId={id}
        isOpen={deleteCustomer}
        setIsOpen={setDeleteCustomer}
      />
    </motion.div>
  )
}
export { CustomerItem }
