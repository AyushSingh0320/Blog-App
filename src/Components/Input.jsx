 import React, {useId , forwardRef} from 'react'
 
const Input = forwardRef(({
    label,
    type = "text",
    className = "",
    ...props
} , ref) => {
    const ID = useId();
    return (
        <div className='w-full px-1 sm:px-0'>
       {label && <label
       className='inline-block mb-1 pl-1'
       htmlFor={ID}>
        {label}
        </label>}
        <input
        type = {type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full text-sm sm:text-base ${className}`}
        ref = {ref}
        {...props}
        id ={ID}>
        </input>
        </div>
    )
})
 
 export default Input;