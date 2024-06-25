import React, { useState } from 'react'
import "./Login.css"
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {login} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(username, password)
    }

  return (
    <div className='login'>
        <div className="loginbox">
            <h1 className='loginheading'>Login <span className='chatApp'>ChatApp</span> </h1>
            <form onSubmit={handleSubmit}>
                <div className="formbox">
                    <label className='label1'>
                        <span className='username'>Username</span>
                    </label>
                    <input type="text" placeholder='Enter username' className='entryuser' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>

                <div className="formbox2">
                    <label className='label1'>
                        <span className='username'>Password</span>
                    </label>
                    <input type="password" placeholder='Enter Password' className='entryuser' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <Link to='/signup' className='noAccount'>{"Don't"} have an account?</Link>

                <div>
                    <button className='loginbtn'>Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login