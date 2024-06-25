import React, { useState } from 'react'
import "./SignUp.css"
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup';

function SignUp() {

    const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});

    const {loading, signup} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(inputs)
        await signup(inputs)
    }

    const handleGenderChange = (gender) => {
        setInputs({...inputs, gender})
    }

  return (
    <div className='login'>
        <div className="loginbox">
            <h1 className='loginheading'>Sign Up <span className='chatApp'>ChatApp</span> </h1>

            <form onSubmit={handleSubmit}>
                <div className="formbox">
                    <label className='label1'>
                        <span className='username'>Full Name</span>
                    </label>
                    <input type="text" placeholder='Enter Full Name' value={inputs.fullName} onChange={(e) => setInputs({...inputs, fullName: e.target.value})} className='entryuser'/>
                </div>

                <div className="formbox2">
                    <label className='label1'>
                        <span className='username'>Username</span>
                    </label>
                    <input type="text" placeholder='Enter Username' value={inputs.username} onChange={(e) => setInputs({...inputs, username: e.target.value})} className='entryuser'/>
                </div>
                    
                <div className="formbox2">
                    <label className='label1'>
                        <span className='username'>Password</span>
                    </label>
                    <input type="password" placeholder='Enter Password' value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})} className='entryuser'/>
                </div>

                <div className="formbox2 aboveCheck">
                    <label className='label1'>
                        <span className='username '>Confirm Password</span>
                    </label>
                    <input type="password" placeholder='Confirm Password' value={inputs.confirmPassword} onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})} className='entryuser'/>
                </div>

                <GenderCheckBox onCheckboxChange = {handleGenderChange} selectedGender={inputs.gender} />

                <Link to='/login' className='noAccount'>Already have an account?</Link>

                <div>
                    <button className='loginbtn' disabled={loading}>Sign Up</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp