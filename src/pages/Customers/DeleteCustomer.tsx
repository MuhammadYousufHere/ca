import { BaseModal, Loader } from '@/components/common'
import { Dispatch, SetStateAction, useState } from 'react'
import { IoTrashOutline, IoClose } from 'react-icons/io5'
import styles from './style.module.css'
import { useAppDispatch } from '@/features'
import { sleep } from '@/utils'
import { deleteCustomer } from '@/features/customers/customerSlice'

type Props = {
  userId: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
export default function DeleteCustomer({ isOpen, setIsOpen, userId }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  async function handleDelete() {
    setIsLoading(true)
    await sleep()
    dispatch(deleteCustomer({ id: userId }))
    setIsLoading(false)
    setIsOpen(false)
  }
  return (
    <BaseModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <section className={styles.delete_container}>
        <div className={styles.delete_modal_close}>
          <button onClick={() => setIsOpen(false)}>
            <IoClose />
          </button>
        </div>
        <div className={styles.delete_body}>
          <IoTrashOutline style={{ color: '#d4000a' }} />
          <h4>Are you sure?</h4>
          <p>Do you really want to delete this customer?</p>
          <p>This process can not be undone.</p>
        </div>
        <div className={styles.delete_actions}>
          <button onClick={() => setIsOpen(false)}>CANCEL</button>
          <button onClick={handleDelete}>
            {isLoading ? <Loader /> : 'DELETE'}
          </button>
        </div>
      </section>
    </BaseModal>
  )
}
