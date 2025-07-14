import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import gsap from 'gsap'

const CaptainHome = () => {

  const [ridePopupPanel, setridePopupPanel] = useState(true)
  const [confirmridePopupPanel, setconfirmridePopupPanel] = useState(false)
  const ridePopupPanelRef = useRef(null)
  const confirmridePopupPanelRef = useRef(null)

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmridePopupPanel) {
        gsap.to(confirmridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmridePopupPanel]
  );

  return (
    <div className="h-screen">
        <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
          <img className='w-16' src="https://pngimg.com/d/uber_PNG24.png" alt="" />
          <Link to='/captain-login' className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
            <i className="text-lg ri-logout-box-r-line"></i>
        </Link>
        </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      <div ref={ridePopupPanelRef} className="fixed w-full z-10 translate-y-full bg-white bottom-0 px-3 py-10 pt-12">
        <RidePopUp setridePopupPanel={setridePopupPanel} setconfirmridePopupPanel={setconfirmridePopupPanel} />
      </div>
      <div ref={confirmridePopupPanelRef} className="fixed w-full h-screen z-10 translate-y-full bg-white bottom-0 px-3 py-10 pt-12">
        <ConfirmRidePopUp setconfirmridePopupPanel={setconfirmridePopupPanel} setridePopupPanel={setridePopupPanel} />
      </div>
    </div>
  )
}

export default CaptainHome