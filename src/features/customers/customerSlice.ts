import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface IData {
  name: string
  id: string
  actions?: JSX.Element
  email: string
  profileUrl: string | ArrayBuffer
}

type Order = {
  order: 'asc' | 'desc'
}

type InitalState = {
  customers: IData[]
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  error: unknown
}
const initialState: InitalState = {
  customers: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
}

const URL = 'https://reqres.in/api/users'

type User = {
  id: string | number
  email: string
  first_name: string
  last_name: string
  avatar: string | ArrayBuffer
}
type UsersResponse = {
  data: User[]
  total: number
  per_page: number
  page: number
  total_page: number
  support: { url: string; text: string }
}

export const getCustomers = createAsyncThunk<UsersResponse, number>(
  'customers',
  async (page = 1, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${URL}?page=${page}`)
      if (res?.status === 200) {
        return res.data
      }
    } catch (ex) {
      rejectWithValue(ex)
    }
  }
)

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    addCustomer: (
      state,
      { payload }: PayloadAction<Omit<IData, 'actions'>>
    ) => {
      state.customers = state.customers.concat(payload)
    },
    deleteCustomer: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.customers = state.customers.filter(({ id }) => id !== payload.id)
    },
    editCustomer: (
      state,
      { payload }: PayloadAction<Omit<IData, 'actions'>>
    ) => {
      const idx = state.customers.findIndex(
        (customer) => customer.id === payload.id
      )
      if (idx !== -1) {
        state.customers[idx] = payload
      }
    },
    sortByName: (state, { payload }: PayloadAction<Order>) => {
      const order = payload.order

      state.customers.sort((a, b) => {
        if (order === 'asc') {
          return a.name.localeCompare(b.name)
        }
        return b.name.localeCompare(a.name)
      })
    },
    sortByEmail: (state, { payload }: PayloadAction<Order>) => {
      const order = payload.order

      state.customers.sort((a, b) => {
        if (order === 'asc') {
          return a.email.localeCompare(b.email)
        }
        return b.email.localeCompare(a.email)
      })
    },
    sortById: (state, { payload }: PayloadAction<Order>) => {
      const order = payload.order
      state.customers.sort((a, b) => {
        if (order === 'asc') {
          return parseInt(a.id) - parseInt(b.id)
        }
        return parseInt(b.id) - parseInt(a.id)
      })
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(getCustomers.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true

        state.customers = payload.data.map((user) => ({
          name: `${user.first_name} ${user.last_name}`,
          id: String(user.id),
          email: user.email,
          profileUrl: user.avatar,
        }))
      })
      .addCase(getCustomers.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.error = payload as Error
      })
  },
})

export const {
  addCustomer,
  deleteCustomer,
  editCustomer,
  sortByEmail,
  sortById,
  sortByName,
} = customerSlice.actions
export default customerSlice.reducer
