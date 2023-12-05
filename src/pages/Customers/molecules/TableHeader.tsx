import { IColumnType } from './Table'
import styles from './styles.module.css'
import { IData } from '@/features/customers/customerSlice'

interface Props<T> {
  columns: IColumnType<T>[]
}
export default function TableHeader({ columns }: Props<IData>): JSX.Element {
  return (
    <tr>
      {columns.map((column, columnIndex) => (
        <th
          className={styles.th}
          key={`table-head-cell-${columnIndex}`}
          style={{ width: column.width }}
        >
          {column.title} {column.Icon}
        </th>
      ))}
    </tr>
  )
}
