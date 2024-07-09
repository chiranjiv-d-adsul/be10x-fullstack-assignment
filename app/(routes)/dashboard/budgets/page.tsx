import React from 'react'
import BudgetList from './_components/BudgetList'

function Budget() {
  return (
    <div className='p-5'>
      <h1 className='font-bold text-3xl'>Your Budgets</h1>
      <BudgetList/>
    </div>
  )
}

export default Budget
