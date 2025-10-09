import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg bg-slate-800 '>
      <div className="mycontainer flex justify-between items-center px-4 h-20 py-5">

        <div className="logo font-bold text-white text-2xl">
          <span className='text-2xl text-green-500'>&lt;</span>
          Passop
          <span className='text-2xl text-green-500'>OP/&gt;</span>
        </div>
        <ul>
            <li className='flex gap-6 text-lg text-white'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">Content</a>
            </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar