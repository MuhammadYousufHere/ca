import { Modal } from '@/components/common'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import styles from './style.module.css'
import { FileInput, Input } from '@/components/Form'
import { Values } from './AddCustomer'
import { sleep } from '@/utils'
import { useUpdateCustomerMutation } from '@/api/customers'

/*local setup*/
// import { useAppDispatch } from '@/features'
// import { editCustomer } from '@/features/customers/customerSlice'

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
  /*local setup*/
  // const dispatch = useAppDispatch()

  const [updateCustomr, { isLoading: isUpdating }] = useUpdateCustomerMutation()
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
  async function handleEdit() {
    //
    setIsLoading(true)
    await sleep()
    /* local setup*/
    // dispatch(editCustomer({ ...values, id: userId }))

    try {
      await updateCustomr({ ...values, id: userId }).unwrap()
      setIsLoading(false)
      setIsOpen(false)
    } catch (error) {
      setIsLoading(false)
    }
  }
  return (
    <Modal
      // to simulate real loading as local server is fast
      isLoading={isLoading || isUpdating}
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
          name='profilePic'
          onFileChange={onFileChangeHandler}
        />
      </div>
    </Modal>
  )
}
