import React from 'react'
import { UserButton } from '@clerk/nextjs'

function DashboardHeader() {
  return (
    <div className='p-5 shadow-sm border-b flex justify-between'>
        <h1 className='text-xl font-mono text-amber-900'>DashBoard</h1>
        <UserButton />
    </div>
  )
}

export default DashboardHeader
