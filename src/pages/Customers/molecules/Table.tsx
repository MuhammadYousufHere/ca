import styles from './table.module.css'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import { IData } from '@/features/customers/customerSlice'

export interface IColumnType<T> {
  key: string
  title: string
  width?: number
  Icon?: JSX.Element
  render?: (column: IColumnType<T>, item: T) => void
}
interface Props<T> {
  data: T[]
  columns: IColumnType<T>[]
}

export default function Table({ data, columns }: Props<IData>): JSX.Element {
  return (
    <table className={styles.table}>
      <thead>
        <TableHeader columns={columns} />
      </thead>
      <tbody>
        <TableRow
          data={data}
          columns={columns}
        />
      </tbody>
    </table>
  )
}
