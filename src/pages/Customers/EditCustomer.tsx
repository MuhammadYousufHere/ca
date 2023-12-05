import { Modal } from '@/components/common'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import styles from './style.module.css'
import { FileInput, Input } from '@/components/Form'
import { Values } from './AddCustomer'
import { useAppDispatch } from '@/features'
import { editCustomer } from '@/features/customers/customerSlice'
import { sleep } from '@/utils'

type Props = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  initialValues: Values
  userId: string
}
export default function EditCustomer({
  isOpen,
  setIsOpen,
  initialValues,
  userId,
}: Props) {
  const dispatch = useAppDispatch()
  const [values, setValues] = useState<Values>(initialValues)
  const [isLoading, setIsLoading] = useState(false)
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValues((p) => ({ ...p, [e.target.name]: e.target.value }))
  }
  function onFileChangeHandler(file: File) {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (!e.target) return

        // @ts-expect-error iknow
        setValues((p) => ({ ...p, profileUrl: e.target?.result }))
      }
      reader.readAsDataURL(file)
    }
  }
  async function handleEdit() {
    setIsLoading(true)
    await sleep()
    dispatch(editCustomer({ ...values, id: userId }))
    setIsLoading(false)
    setIsOpen(false)
  }
  return (
    <Modal
      isLoading={isLoading}
      onClick={handleEdit}
      buttonLabel='EDIT CUSTOMER'
      label='Edit Customer'
      isOpen={isOpen}
      setIsOpen={() => setIsOpen(!isOpen)}
    >
      <div className={styles.addcustomer_wrapper}>
        <Input
          name='name'
          value={values.name}
          onChange={handleChange}
          placeholder='Customer Name'
        />
        <Input
          name='email'
          value={values.email}
          onChange={handleChange}
          placeholder='Email'
        />

        <FileInput
          name='profileUrl'
          onFileChange={onFileChangeHandler}
        />
      </div>
    </Modal>
  )
}
