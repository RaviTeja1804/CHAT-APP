import { useEffect, useState } from "react"
import toast from "react-hot-toast"

function useGetConversations() {
  const [loading, setLoading] = useState(false)
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    const getConversations = async () => {
        setLoading(true)
        try {
            const user = JSON.parse(localStorage.getItem("chat-user"));
            const userId = user._id;
            await fetch(`http://localhost:4000/api/users/${userId}`, {
                method: "GET"
            })
            .then(res => res.json())
            .then((data) => {
                if(data.error)
                {
                    toast.error(data.error)
                    return
                }
                setConversations(data)
            })
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    getConversations()
  }, [])

  return [loading, conversations]
}

export default useGetConversations