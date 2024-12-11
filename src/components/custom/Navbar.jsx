import React from 'react'
import { Button } from '../ui/button'
import Logo from './Logo'

const Navbar = () => {
  return (
    <div className='max-w-[1300px] mx-auto'>
       <nav className='flex justify-between items-center px-3 py-2'>
         
         <Logo/>
            <Button >Sign In</Button>
        </nav>
    </div>
  )
}

export default Navbar
