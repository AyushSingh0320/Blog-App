import React from 'react'

function Logo({width = "100px"}) {
  return (
    <div className={` text-black font-bold text-2xl pt-1 hover:underline ${width}`} >BLOG</div>
  )
}

export default Logo;