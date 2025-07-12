import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const { captain, setCaptain } = React.useContext(CaptainDataContext)
    const navigate = useNavigate()
  
    const submitHandler = async (e) => {
      e.preventDefault()
      const captain = {
        email: email,
        password
      }
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)
      if(response.status === 200) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }
      setemail('')
      setpassword('')
    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div className="">
        <img className='w-20 mb-10' src="https://pngimg.com/d/uber_PNG24.png" alt="" />
      <form onSubmit={(e)=>submitHandler(e)}>
        <h3 className='text-lg font-medium mb-2'>Email</h3>
        <input value={email} onChange={(e)=>setemail(e.target.value)} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" required placeholder='Enter email id' />
        <h3 className='text-lg font-medium mb-2'>Password</h3>
        <input value={password} onChange={(e)=>setpassword(e.target.value)} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="password" required placeholder='Enter password' />
        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
      </form>
      <p className='text-center'>New Here? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
      </div>
      <div className="">
        <Link to='/login' className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin