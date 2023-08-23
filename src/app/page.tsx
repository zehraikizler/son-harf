import React from 'react'
import Answers from '@/components/answers'
import Count from '@/components/count'
import GamingBox from '@/components/say-name'
import Score from '@/components/score'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className='game-page bg-white mx-auto py-6 sm:px-6 lg:px-8 grid grid-cols-8'>
    <div className='col-span-2 p-3'>
      <Score />
    </div>
    <div className='col-span-4 p-3 flex flex-col'>
      <div className='border rounded-xl h-60 p-8'>
      <Answers />
      </div>
      <div className='mt-auto'>
      <GamingBox />
      </div>
    </div>
    <div className='col-span-2 p-3'>
      <Count />
    </div>
  </div>
  )
}
