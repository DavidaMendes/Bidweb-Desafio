"use client"

import "../../../src/styles/components.css"

const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  type = "button",
  className = "",
  ...props
}) => {
  const classes = ["btn", `btn-${variant}`, size !== "md" ? `btn-${size}` : "", className].filter(Boolean).join(" ")

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
