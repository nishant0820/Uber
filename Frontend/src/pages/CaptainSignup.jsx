import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {
  const navigate = useNavigate()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData ={
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
    if(response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('captain', data.token)
      navigate('/captain-home')
    }
    setemail('')
    setfirstName('')
    setlastName('')
    setpassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }

  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div className="">
        <img className='w-20 mb-10' src="https://pngimg.com/d/uber_PNG24.png" alt="" />
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
        <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
        <div className="flex gap-4 mb-6">
          <input
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
            type="text"
            required
            placeholder='Vehicle Color'
          />
          <input
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
            type="text"
            required
            placeholder='Plate Number'
          />
        </div>
        <div className="flex gap-4 mb-6">
          <input
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
            type="number"
            min="1"
            required
            placeholder='Capacity'
          />
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
            required
          >
            <option value="" disabled>Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="auto">Auto</option>
            <option value="moto">Moto</option>
          </select>
        </div>
        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Create Captain Account</button>
      </form>
      <p className='text-center'>Already have an account? <Link to='/captain-login' className='text-blue-600'>Login Here</Link></p>
      </div>
      <div className="">
        <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply.</p>
      </div>
    </div>
  )
}

export default CaptainSignup