import React, {FC} from 'react'
import styles from './UsersPage.module.css'

type Props = {
  countUsers: number
  countUsersOnPage: number
  currentPageNumber: number
  onChangePage: (numberPage: number) => void
  sizePartPagination: number
}

const UsersPagination: FC<Props> = (props) => {
  const totalCountPages = Math.ceil(props.countUsers / props.countUsersOnPage)
  const arrayPages = []
  for (let pageNum = 1; pageNum <= totalCountPages; pageNum++) {
    arrayPages.push(pageNum)
  }

  const totalCountParts = Math.ceil(totalCountPages / props.sizePartPagination)
  const [partNumber, setPartNumber] = React.useState(1)
  const leftPartNumber = (partNumber - 1) * props.sizePartPagination + 1
  const rightPartNumber = partNumber * props.sizePartPagination


  return (
    <div className={styles.paginationUsers}>
      {partNumber > 1 && <button onClick={() => {
        setPartNumber(partNumber - 1)
      }}>PREV</button>}
      {
        arrayPages
          .filter(page => page >= leftPartNumber && page <= rightPartNumber)
          .map(numberPage => {
            return <span
              key={numberPage}
              onClick={() => {
                props.onChangePage(numberPage)
              }}
              className={props.currentPageNumber === numberPage ? styles.activePage : undefined}>{numberPage}</span>
          })
      }
      {totalCountParts > partNumber && <button onClick={() => {
        setPartNumber(partNumber + 1)
      }}>NEXT</button>}
    </div>
  )
}

export default UsersPagination
