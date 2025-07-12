import React from 'react'

function Button({
    children,
    type = "button",
    bgcolor = "bg-blue-600",
    textcolor = "text-white",
    className = "",
    ...props
}) {
  return (
    < button  className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${bgcolor} ${textcolor } ${className} `} 
    type = {type}  
    {...props}>
        {children}
    </button>
  )
}

export default Button