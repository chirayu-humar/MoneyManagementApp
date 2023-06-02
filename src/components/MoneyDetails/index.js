// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {
    appliedClass,
    imgUrl,
    display,
    displayText,
    altValue,
    dataTestValue,
  } = props

  return (
    <div className={appliedClass}>
      <div className="iconContainer">
        <img alt={altValue} className="iconImage" src={imgUrl} />
      </div>
      <div className="mainContainer">
        <p>Your {displayText}</p>
        <p data-testid={dataTestValue}>Rs {display}</p>
      </div>
    </div>
  )
}

export default MoneyDetails
