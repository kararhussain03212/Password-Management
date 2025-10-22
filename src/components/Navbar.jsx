import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg bg-white '>
      <div className="mycontainer flex justify-between items-center px-4 h-20 py-5">

        <div className="logo font-bold text-black text-3xl">
          <span className='text-4xl text-[#C53678]'>&lt;</span>
          Pass
          <span className='text-4xl text-[#C53678] '>MGT/&gt;</span>
        </div>
        <button className='text-white bg-[#C53678] rounded-full py-2 px-5 flex gap-3 justify-center items-center cursor-pointer ring-white ring-1'>
          <img className='w-8 invert' src="icons/github.svg" alt="git" />
          <span className='font-bold'>GitHub</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar