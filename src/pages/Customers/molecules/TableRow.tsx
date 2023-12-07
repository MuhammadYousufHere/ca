import { IColumnType } from './Table'

import styles from './styles.module.css'
import TableRowCell from './TableCell'
import { motion } from 'framer-motion'
import { Fragment } from 'react'
import { IData } from '@/features/customers/customerSlice'

interface Props<T> {
  data: T[]
  columns: IColumnType<T>[]
}
export default function TableRow({ data, columns }: Props<IData>): JSX.Element {
  return (
    <>
      {data.map((item, itemIndex) => (
        <Fragment key={`table-body-${itemIndex}`}>
          <tr className={styles.seperator}>
            <td style={{ background: 'transparent' }}></td>
          </tr>
          <motion.tr
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.tr}
          >
            {columns.map((column, columnIndex) => (
              <TableRowCell
                key={`table-row-cell-${columnIndex}`}
                item={item}
                column={column}
              />
            ))}
          </motion.tr>
        </Fragment>
      ))}
    </>
  )
}
