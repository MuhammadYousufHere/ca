import { store } from '@/features'
import { IData, populateCustomers } from '@/features/customers/customerSlice'
import { Values } from '@/pages/Customers/AddCustomer'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/',
})

type Meta = { message: string; statusCode: number }

type Customer = {
  id: string
  profilePic: string | ArrayBuffer
  name: string
  email: string
}
interface ResponseType extends Meta {
  data: Customer[]
}

interface MutationResponse extends Meta {
  data: Pick<Customer, 'id' | 'name'>
}
interface UpdateCustomer extends Partial<Values> {
  id: string | number
}
export const customerService = createApi({
  baseQuery,
  keepUnusedDataFor: 60 * 60,
  tagTypes: ['Customers', 'Customer'],
  endpoints: (build) => ({
    addCustomer: build.mutation<MutationResponse, Values>({
      query: (body) => ({ url: 'customers', body, method: 'POST' }),
      invalidatesTags: ['Customers'],
    }),
    updateCustomer: build.mutation<MutationResponse, UpdateCustomer>({
      query: ({ id, ...patch }) => {
        return {
          url: `customers/${id}`,
          body: patch,
          method: 'PATCH',
        }
      },
      invalidatesTags: ['Customers'],
    }),
    getCustomer: build.query({
      query: (id) => ({ url: `customers/${id}` }),
      providesTags: ['Customers'],
    }),
    getCustomers: build.query<Omit<IData, 'actions'>[], void>({
      query: () => ({ url: `customers` }),
      transformResponse: (res: ResponseType): Omit<IData, 'actions'>[] => {
        const customers = res.data.map(({ profilePic, ...customer }) => {
          return {
            ...customer,
            profilePic: profilePic,
          }
        })
        store.dispatch(populateCustomers(customers))
        return customers
      },
      providesTags: ['Customers'],
    }),
    deleteCustomer: build.mutation<MutationResponse, { id: string | number }>({
      query: ({ id }) => ({ url: `customers/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Customers'],
    }),
  }),
})
export const {
  useGetCustomersQuery,
  useGetCustomerQuery,
  useAddCustomerMutation,
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
} = customerService
