"use client"
import { useAnswersContext } from '@/context';
import React , {useEffect} from 'react'

const Answers = () => {
  const {answers} = useAnswersContext();
  useEffect(() => {
    console.log(answers)
  }, [answers])
  return (
    <div className='mt-auto'>
      <ul className='flex flex-col gap-2'>
        {
          answers?.map((item, index) => (
            <li key={index} className={item.sentBy == "chatGpt" ? 'bg-pink-200 px-3 py-2 rounded-3xl rounded-tl-none mr-auto' : 'bg-purple-200 px-3 py-2 rounded-3xl rounded-tr-none ml-auto'}>
              {item.name}
            </li>
          ))
        }
        {/* <li className='bg-pink-200 px-3 py-2 rounded-3xl rounded-tl-none mr-auto'>Furkan</li>
        <li className='bg-purple-200 px-3 py-2 rounded-3xl rounded-tr-none ml-auto'>Nergis</li>
        <li className='bg-pink-200 px-3 py-2 rounded-3xl rounded-tl-none mr-auto'>Serkan</li>
        <li className='bg-purple-200 px-3 py-2 rounded-3xl rounded-tr-none ml-auto'>Nadire</li> */}
      </ul>
    </div>
  )
}

export default Answers