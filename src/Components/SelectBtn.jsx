
import React , {useId} from 'react'

function SelectBtn({
    options = [],
    label,
    className ="",
    ...props
} , ref) {
    const id = useId()
  return (
    <div className='w-full px-1 sm:px-0'>
        {label && <label htmlFor= {id} className=''></label>}
        <select
        {...props}
        id = {id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full text-sm sm:text-base ${className}`}
        >
        {options?.map((option)=>(
            <option key = {option} value={option}>
              {option}
            </option>
        ))}
        </select>
    </div>
  )
}

export default React.forwardRef(SelectBtn);