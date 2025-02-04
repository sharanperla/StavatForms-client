import React from 'react'

function Form1() {
  return (
    <div className='min-h-screen  flex flex-col justify-center items-center gap-2'>
      <input type="text"  placeholder='field1' className='border border-black/10 px-3 py-2'/>
      <input type="text"  placeholder='field2' className='border border-black/10 px-3 py-2' />
      <button type='submit' className='py-2 px-4 bg-blue-500 rounded-md' >
         Submit
      </button>
    </div>
  )
}

export default Form1
