import { FileInput, Input } from '@/components/Form'
import { Modal } from '@/components/common'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import styles from './style.module.css'
import { sleep } from '@/utils'
import { useAddCustomerMutation } from '@/api/customers'
// import { useAppDispatch } from '@/features'
// import { addCustomer } from '@/features/customers/customerSlice'

type Props = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
export type Values = {
  name: string
  email: string
  profilePic: string | ArrayBuffer
}
const initialValues = { name: '', email: '', profilePic: '/avatar-default.jpg' }

export default function AddCustomer({ isOpen, setIsOpen }: Props) {
  // const dispatch = useAppDispatch()

  // with server
  const [addUser, { isLoading: isAddingUser }] = useAddCustomerMutation()
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
        setValues((p) => ({ ...p, profilePic: e.target?.result }))
      }
      reader.readAsDataURL(file)
    }
  }
  async function handleSubmit() {
    setIsLoading(true)
    await sleep()

    /* if using local */
    // dispatch(addCustomer({ ...values, id: String(++lastUserId) }))

    /* using server */
    await addUser(values).unwrap()
    setValues(initialValues)

    /* uncommit also this when using local setup*/
    // setIsLoading(false)
    setIsOpen(false)
  }
  return (
    <Modal
      buttonLabel='ADD CUSTOMER'
      label='Add New Customer'
      isOpen={isOpen}
      setIsOpen={() => setIsOpen(!isOpen)}
      onClick={handleSubmit}
      // to simulate real loading as local server is fast
      isLoading={isAddingUser || isLoading}
    >
      <div className={styles.addcustomer_wrapper}>
        <Input
          name='name'
          value={values.name}
          required
          onChange={handleChange}
          autoFocus
          placeholder='Customer Name'
        />
        <Input
          name='email'
          value={values.email}
          required
          onChange={handleChange}
          placeholder='Email'
        />

        <FileInput
          name='profilePic'
          onFileChange={onFileChangeHandler}
        />
      </div>
    </Modal>
  )
}
