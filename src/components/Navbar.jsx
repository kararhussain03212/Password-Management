import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg bg-purple-200 flex justify-around items-center px-4 h-20'>
        <div className="logo font-bold">Passop</div>
        <ul>
            <li className='flex gap-6 text-lg'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">Content</a>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar