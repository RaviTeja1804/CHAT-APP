import { useContext } from "react"
import toast from "react-hot-toast"
import AuthContext from "../context/AuthContext"
import { useState } from "react"

function useLogin() {
    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useContext(AuthContext)

    const login = async(username, password) => {
        try {
            if(!username || !password)
            {
                toast.error("Please fill all the fields")
                return
            }
            setLoading(true)
            await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, password})
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

    return {login, loading}
}

export default useLogin




