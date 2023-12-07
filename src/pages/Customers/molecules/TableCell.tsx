import { Actions, Avatar } from '@/pages/Customers/atoms'
import { IColumnType } from './Table'
import styles from './styles.module.css'
import get from 'lodash.get'
import { useState } from 'react'
import { IData } from '@/features/customers/customerSlice'
import EditCustomer from '../EditCustomer'
import DeleteCustomer from '../DeleteCustomer'

interface Props<T> {
  item: T
  column: IColumnType<T>
}
export default function TableRowCell({
  item,
  column,
}: Props<IData>): JSX.Element {
  const [deleteCustomer, setDeleteCustomer] = useState(false)
  const [editCustomer, setEditCustomer] = useState(false)

  // eslint-disable-next-line
  const { actions, id, ...rest } = item

  function handleDelete() {
    setDeleteCustomer(true)
  }
  function handleEdit() {
    setEditCustomer(true)
  }
  const value = get(item, column.key)
  const Cells = () => {
    switch (column.key) {
      case 'profilePic':
        return (
          <td className={styles.td}>
            <Avatar src={item.profilePic} />
          </td>
        )
      case 'actions':
        return (
          <td className={styles.td}>
            <Actions
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </td>
        )

      default:
        return (
          <td className={styles.td}>
            {column.render ? column.render(column, item) : value}
          </td>
        )
    }
  }
  return (
    <>
      <Cells />
      <EditCustomer
        initialValues={rest}
        isOpen={editCustomer}
        setIsOpen={setEditCustomer}
        userId={id}
      />
      <DeleteCustomer
        userId={id}
        isOpen={deleteCustomer}
        setIsOpen={setDeleteCustomer}
      />
    </>
  )
}
