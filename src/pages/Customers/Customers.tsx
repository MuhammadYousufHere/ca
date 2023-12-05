import { Button } from '@/components'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaSort } from 'react-icons/fa'

import Table, { IColumnType } from './molecules/Table'
import { useAppSelector } from '@/features'
import { IData, getCustomers } from '@/features/customers/customerSlice'
import { asThunkHook } from '@/hooks'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import AddCustomer from './AddCustomer'
import styles from './style.module.css'

const columns: IColumnType<IData>[] = [
  {
    key: 'profileUrl',
    title: '',
    width: 130,
  },
  {
    key: 'id',
    title: 'Customer ID',
    Icon: <FaSort />,
    width: 220,
  },
  {
    key: 'name',
    title: 'Customer Name',
    width: 400,
    Icon: <FaSort />,
  },
  {
    key: 'email',
    title: 'Email',
    Icon: <FaSort />,
    width: 450,
  },
  {
    key: 'actions',
    title: '',
    width: 150,
  },
]

const useCustomers = asThunkHook(getCustomers)

export type Customer = {
  id: string
  name: string
  profileUrl: string | ArrayBuffer
  email: string
}

const Customers = () => {
  const [fetchCustomer] = useCustomers()
  const { customers } = useAppSelector((state) => state.customers)
  const [addCustomer, setAddCustomer] = useState(false)

  useEffect(() => {
    fetchCustomer(1)
  }, [])
  return (
    <>
      <section>
        <Button
          label='ADD NEW CUSTOMER'
          Icon={<AiOutlinePlus />}
          onClick={() => setAddCustomer(true)}
        />
        <AnimatePresence>
          <div className={styles.customers_table}>
            <Table
              data={customers}
              columns={columns}
            />
          </div>
        </AnimatePresence>
      </section>
      <AddCustomer
        isOpen={addCustomer}
        setIsOpen={setAddCustomer}
      />
    </>
  )
}

export default Customers
