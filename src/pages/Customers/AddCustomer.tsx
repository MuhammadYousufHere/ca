import { FileInput, Input } from '@/components/Form'
import { Modal } from '@/components/common'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import styles from './style.module.css'
import { sleep } from '@/utils'
import { useAppDispatch } from '@/features'
import { addCustomer } from '@/features/customers/customerSlice'

type Props = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
export type Values = {
  name: string
  email: string
  profileUrl: string | ArrayBuffer
}
const initialValues = { name: '', email: '', profileUrl: '/avatar.png' }

export default function AddCustomer({ isOpen, setIsOpen }: Props) {
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
  async function handleSubmit() {
    setIsLoading(true)
    await sleep()
    dispatch(addCustomer({ ...values, id: '003' }))
    setValues(initialValues)
    setIsLoading(false)
    setIsOpen(false)
    //
  }
  return (
    <Modal
      buttonLabel='ADD CUSTOMER'
      label='Add New Customer'
      isOpen={isOpen}
      setIsOpen={() => setIsOpen(!isOpen)}
      onClick={handleSubmit}
      isLoading={isLoading}
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
