import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [userData, setuserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setuserData({
      username: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    });

    setemail("");
    setfirstName("");
    setlastName("");
    setpassword("");
  };
  return (
    <div className="py-5 px-5 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-2"
          src="https://pngimg.com/d/uber_PNG24.png"
          alt="Uber logo"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your Name?</h3>
          <div className="flex gap-4 mb-6">
            <input
              value={firstName}
              onChange={(e) => {
                setfirstName(e.target.value);
              }}
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              required
              type="text"
              placeholder="First Name"
            />
            <input
              value={lastName}
              onChange={(e) => {
                setlastName(e.target.value);
              }}
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Last Name"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your Email?</h3>
          <input
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="email"
            placeholder="Email"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="Password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login Here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup