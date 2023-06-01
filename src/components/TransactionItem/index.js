// Write your code here
import './index.css'

const TransactionItem = props => {
  const {details, deleteFunction} = props
  const {title, amount, type, id} = details
  const typeIsIncome = type === 'INCOME'
  const onDeleteBtn = () => {
    deleteFunction(id)
  }

  return (
    <li className="transactionHeading">
      <div className="transHeadingChild">
        <p>{title}</p>
      </div>
      <div className="transHeadingChild">
        <p>Rs {amount}</p>
      </div>
      <div className="transHeadingChild">
        {typeIsIncome && <p>Income</p>}
        {!typeIsIncome && <p>Expenses</p>}
      </div>
      <div className="transHeadingChild">
        <div>
          <button onClick={onDeleteBtn} data-testid="delete" type="button">
            <img
              alt="delete"
              className="deleteIcon"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TransactionItem
