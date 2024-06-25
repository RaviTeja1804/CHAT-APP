import { useContext, useState } from "react"
import toast from "react-hot-toast"
import AuthContext from "../context/AuthContext"

function useSignup() {
  const [loading, setLoading] = useState(false)
  const {setAuthUser} = useContext(AuthContext)

  const signup = async({fullName, username, password, confirmPassword, gender}) => {
    if(!fullName || !username || !password || !confirmPassword || !gender)
    {
        toast.error("Please fill all the fields")
        return
    }

    if(password !== confirmPassword)
    {
        toast.error("Passwords do not match")
        return 
    }

    if(password.length < 6)
    {
        toast.error("Passwords must be atleast 6 characters")
        return 
    }

    setLoading(true)
    try {
        await fetch("http://localhost:4000/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({fullName, username, password, confirmPassword, gender})
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            if(data.error)
            {
                toast.error(data.error)
                return
            }
            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthUser(data)
        })
    } catch (error) {
        toast.error(error.message)
    } finally {
        setLoading(false)
    }
  }

  return {signup, loading}
}

export default useSignup