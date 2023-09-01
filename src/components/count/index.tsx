"use client"
import React, {  useState } from 'react'
const Count = () => {
  const [count, setCount] = useState(10);
  return (
    <div className='w-100 flex justify-center text-3xl font-extrabold my-5'>
      <div className='bg-gradient-to-r from-purple-200 to-indigo-200 text-indigo-500 flex justify-center items-center rounded-full w-14 h-14'>
      {count}
      </div>
      </div>
  )
}

export default Count