import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/userContext'

const UserSignup = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [userData, setuserData] = useState({})

  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)

  const submitHandler = async(e) => {
    e.preventDefault()
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
    if(response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
    setemail('')
    setfirstName('')
    setlastName('')
    setpassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div className="">
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <form onSubmit={(e)=>submitHandler(e)}>
        <h3 className='text-lg font-medium mb-2'>Name</h3>
        <div className="flex gap-4 mb-6">
          <input value={firstName} onChange={(e) => {setfirstName(e.target.value)}} className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base' type="text" required placeholder='First Name' />
          <input value={lastName} onChange={(e) => {setlastName(e.target.value)}} className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base' type="text" placeholder='Last Name' />
        </div>
        <h3 className='text-lg font-medium mb-2'>Email</h3>
        <input value={email} onChange={(e) => {setemail(e.target.value)}} className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" required placeholder='Enter email id' />
        <h3 className='text-lg font-medium mb-2'>Password</h3>
        <input value={password} onChange={(e) => {setpassword(e.target.value)}} className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="password" required placeholder='Enter password' />
        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Create Account</button>
      </form>
      <p className='text-center'>Already have an account? <Link to='/login' className='text-blue-600'>Login Here</Link></p>
      </div>
      <div className="">
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply.</p>
      </div>
    </div>
  )
}

export default UserSignup