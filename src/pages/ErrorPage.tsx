import React from 'react'

const ErrorPage = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='text-white flex flex-col gap-10'>
        <h1 className='text-4xl font-bold text-center'>OOPS!</h1>
        <h3 className='text-center'>Error 404 or something like that...</h3>
      </div>
    </div>
    
  )
}

export default ErrorPage