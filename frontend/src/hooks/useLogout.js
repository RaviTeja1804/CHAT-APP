import { useContext, useState } from "react"
import toast from "react-hot-toast"
import AuthContext from "../context/AuthContext"

function useLogout() {
  const [loading, setLoading] = useState(false)
  const {setAuthUser} = useContext(AuthContext)

  const logout = async() => {
    setLoading(true)
    try {
        await fetch("http://localhost:4000/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            if(data.error)
            {
                toast.error(data.error)
                return
            }
            localStorage.removeItem("chat-user")
            setAuthUser(null)
        })
    } catch (error) {
        toast.error(error.message)
    } finally {
        setLoading(false)
    }
  }

  return {logout, loading}
}

export default useLogout