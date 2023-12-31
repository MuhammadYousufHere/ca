import { Button } from '@/components'
import { AiOutlinePlus } from 'react-icons/ai'
import Table, { IColumnType } from './molecules/Table'
import { useAppDispatch, useAppSelector } from '@/features'
import { IData, sortById, sortByName } from '@/features/customers/customerSlice'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import AddCustomer from './AddCustomer'
import styles from './style.module.css'
import { SortButton, TableSkeleton } from './atoms'
import { useSearchParams } from 'react-router-dom'
import { useGetCustomersQuery } from '@/api/customers'

export type Customer = {
  id: string
  name: string
  profilePic: string | ArrayBuffer
  email: string
}

const Customers = () => {
  const dispatch = useAppDispatch()
  const { customers } = useAppSelector((state) => state.customers)
  const { data, isLoading, isFetching } = useGetCustomersQuery()

  const [params, setParams] = useSearchParams()
  const [addCustomer, setAddCustomer] = useState(false)

  function emailSortHandler() {
    if (params.has('sortby')) {
      if (params.get('order') !== 'asc') {
        setParams(`sortby=email&order=asc`)
        dispatch(sortByName({ order: 'asc' }))

        return
      }
      dispatch(sortByName({ order: 'desc' }))

      setParams('sortby=email&order=desc')
    } else {
      dispatch(sortByName({ order: 'asc' }))

      setParams(`sortby=email&order=asc`)
    }
  }
  function idSortHandler() {
    if (params.has('sortby')) {
      if (params.get('order') !== 'asc') {
        setParams(`sortby=id&order=asc`)
        dispatch(sortById({ order: 'asc' }))
      } else {
        setParams('sortby=id&order=desc')
        dispatch(sortById({ order: 'desc' }))
      }
    } else {
      setParams(`sortby=id&order=asc`)
      dispatch(sortById({ order: 'asc' }))
    }
  }
  function nameSortHandler() {
    if (params.has('sortby')) {
      if (params.get('order') !== 'asc') {
        setParams(`sortby=name&order=asc`)
        dispatch(sortByName({ order: 'asc' }))
      } else {
        setParams('sortby=name&order=desc')
        dispatch(sortByName({ order: 'desc' }))
      }
    } else {
      setParams(`sortby=name&order=asc`)
      dispatch(sortByName({ order: 'asc' }))
    }
  }
  const columns: IColumnType<IData>[] = [
    {
      key: 'profilePic',
      title: '',
      width: 130,
    },
    {
      key: 'id',
      title: 'Customer ID',
      Icon: <SortButton onClick={idSortHandler} />,
      width: 220,
    },
    {
      key: 'name',
      title: 'Customer Name',
      width: 470,
      Icon: <SortButton onClick={nameSortHandler} />,
    },
    {
      key: 'email',
      title: 'Email',
      Icon: <SortButton onClick={emailSortHandler} />,
      width: 450,
    },
    {
      key: 'actions',
      title: '',
      width: 150,
    },
  ]
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
            {isLoading || isFetching ? (
              <TableSkeleton />
            ) : data && data?.length > 0 ? (
              <Table
                data={customers}
                columns={columns}
              />
            ) : (
              <p className={styles.empty_list}>Nothing to see here!</p>
            )}
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
