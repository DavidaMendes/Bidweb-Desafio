import "../../../src/styles/components.css"

const Input = ({ label, error, type = "text", className = "", ...props }) => {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input type={type} className={`input ${error ? "input-error" : ""} ${className}`} {...props} />
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default Input