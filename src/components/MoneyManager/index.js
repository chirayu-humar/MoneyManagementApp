import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]
const imgUrl1 =
  'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png'

const imgUrl2 =
  'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png'

const imgUrl3 =
  'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png'

// Write your code here
class MoneyManager extends Component {
  state = {
    balance: 0,
    income: 0,
    expenses: 0,
    incomeHistory: [],
    amount: '',
    title: '',
    type: 'INCOME',
  }

  createAnExpense = () => {
    this.setState(prevState => ({
      incomeHistory: [
        ...prevState.incomeHistory,
        {
          title: prevState.title,
          amount: prevState.amount,
          type: prevState.type,
          id: uuidv4(),
        },
      ],
      balance: prevState.balance - Number(prevState.amount),
      income: prevState.income,
      expenses: prevState.expenses + Number(prevState.amount),
      amount: '',
      type: 'INCOME',
      title: '',
    }))
  }

  createAnIncome = () => {
    this.setState(prevState => ({
      incomeHistory: [
        ...prevState.incomeHistory,
        {
          title: prevState.title,
          amount: prevState.amount,
          type: prevState.type,
          id: uuidv4(),
        },
      ],
      balance: prevState.balance + Number(prevState.amount),
      income: prevState.income + Number(prevState.amount),
      expenses: prevState.expenses,
      amount: '',
      type: 'INCOME',
      title: '',
    }))
  }

  createNewTransaction = event => {
    event.preventDefault()
    console.log('createNewTransaction')
    const {type} = this.state
    if (type === 'INCOME') {
      this.createAnIncome()
    } else {
      this.createAnExpense()
    }
  }

  onTitleInput = event => {
    const {value} = event.target
    console.log(value)
    this.setState(prevState => ({
      incomeHistory: prevState.incomeHistory,
      balance: prevState.balance,
      income: prevState.income,
      expenses: prevState.expenses,
      amount: prevState.amount,
      type: prevState.type,
      title: value,
    }))
  }

  onAmountInput = event => {
    const {value} = event.target
    console.log(value)
    this.setState(prevState => ({
      incomeHistory: prevState.incomeHistory,
      balance: prevState.balance,
      income: prevState.income,
      expenses: prevState.expenses,
      amount: value,
      type: prevState.type,
      title: prevState.title,
    }))
  }

  onTypeInput = event => {
    const {value} = event.target
    console.log(value)
    this.setState(prevState => ({
      incomeHistory: prevState.incomeHistory,
      balance: prevState.balance,
      income: prevState.income,
      expenses: prevState.expenses,
      amount: prevState.amount,
      type: value,
      title: prevState.title,
    }))
  }

  deletePerticularTransaction = id => {
    const {incomeHistory} = this.state
    const particularTransaction = incomeHistory.filter(
      eachItem => eachItem.id === id,
    )
    const {amount} = particularTransaction[0]
    if (particularTransaction[0].type === 'INCOME') {
      console.log('income')
      this.deleteAnIncome(id, amount)
    } else {
      console.log('expense')
      this.deleteAnExpense(id, amount)
    }
  }

  deleteAnIncome = (id, amount) => {
    this.setState(prevState => ({
      incomeHistory: prevState.incomeHistory.filter(
        eachItem => eachItem.id !== id,
      ),
      balance: prevState.balance - Number(amount),
      income: prevState.income - Number(amount),
      expenses: prevState.expenses,
      amount: prevState.amount,
      type: prevState.type,
      title: prevState.title,
    }))
  }

  deleteAnExpense = (id, amount) => {
    this.setState(prevState => ({
      incomeHistory: prevState.incomeHistory.filter(
        eachItem => eachItem.id !== id,
      ),
      balance: prevState.balance + Number(amount),
      income: prevState.income,
      expenses: prevState.expenses - Number(amount),
      amount: prevState.amount,
      type: prevState.type,
      title: prevState.title,
    }))
  }

  render() {
    const {
      balance,
      income,
      expenses,
      incomeHistory,
      title,
      amount,
      type,
    } = this.state
    return (
      <div className="bg-container">
        <div className="first">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <div className="second">
          {/* fist inner div */}
          <MoneyDetails
            appliedClass="secondInnerDiv1"
            imgUrl={imgUrl1}
            display={balance}
            displayText="Balance"
            altValue="balance"
            dataTestValue="balanceAmount"
          />
          {/* second inner div */}
          <MoneyDetails
            appliedClass="secondInnerDiv2"
            imgUrl={imgUrl2}
            display={income}
            displayText="Income"
            altValue="income"
            dataTestValue="incomeAmount"
          />
          {/* third inner div */}
          <MoneyDetails
            appliedClass="secondInnerDiv3"
            imgUrl={imgUrl3}
            display={expenses}
            displayText="Expenses"
            altValue="expenses"
            dataTestValue="expensesAmount"
          />
          {/* third inner div ended */}
        </div>
        <div className="third">
          <div className="innerThird1">
            <form onSubmit={this.createNewTransaction}>
              <h1>Add Transaction</h1>
              <label htmlFor="titleInput">Title</label>
              <input
                value={title}
                onChange={this.onTitleInput}
                id="titleInput"
                type="text"
              />
              <label htmlFor="InputAmount">Amount</label>
              <input
                value={amount}
                onChange={this.onAmountInput}
                id="InputAmount"
                type="text"
              />
              <label htmlFor="inputTransaction">Type</label>
              <select
                value={type}
                onChange={this.onTypeInput}
                id="inputTransaction"
              >
                <option value={transactionTypeOptions[0].optionId}>
                  Income
                </option>
                <option value={transactionTypeOptions[1].optionId}>
                  Expenses
                </option>
              </select>
              <div>
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
          <div className="innerThird2">
            <ul className="TransactionDisplay">
              <li className="transDisplayChild">
                <h1>History</h1>
              </li>
              {/* here list will come */}
              <li className="transactionHeading">
                <div className="transHeadingChild">
                  <p>Title</p>
                </div>
                <div className="transHeadingChild">
                  <p>Amount</p>
                </div>
                <div className="transHeadingChild">
                  <p>Type</p>
                </div>
                <div className="transHeadingChild" />
              </li>
              {incomeHistory.map(eachItem => (
                <TransactionItem
                  key={eachItem.id}
                  deleteFunction={this.deletePerticularTransaction}
                  details={eachItem}
                />
              ))}
              {/* here list ended */}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
