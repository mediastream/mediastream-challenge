import React from 'react'

const Button = ({ label, action }) => {
  return (
    <button
      type="button"
      onClick={action}
    >
      {label}
    </button>
  )
}

export default Button