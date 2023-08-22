import React from 'react'
import Answers from '@/components/answers'
import Count from '@/components/count'
import GamingBox from '@/components/gaming-box'
import Score from '@/components/score'

const Game = () => {
  return (
    <div className='grid grid-cols-8'>
      <div className='bg-red-600 col-span-2'>
        <Score />
      </div>
      <div className='bg-green-600 col-span-4'>
        <Answers />
        <GamingBox />
      </div>
      <div className='bg-blue-600 col-span-2'>
        <Count />
      </div>
    </div>
  )
}

export default Game