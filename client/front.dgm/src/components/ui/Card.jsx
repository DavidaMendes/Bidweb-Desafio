import "../../../src/styles/components.css"

const Card = ({ children, className = "" }) => {
  return <div className={`card ${className}`}>{children}</div>
}

const CardHeader = ({ children, className = "" }) => {
  return <div className={`card-header ${className}`}>{children}</div>
}

const CardContent = ({ children, className = "" }) => {
  return <div className={`card-content ${className}`}>{children}</div>
}

const CardFooter = ({ children, className = "" }) => {
  return <div className={`card-footer ${className}`}>{children}</div>
}

Card.Header = CardHeader
Card.Content = CardContent
Card.Footer = CardFooter

export default Card
