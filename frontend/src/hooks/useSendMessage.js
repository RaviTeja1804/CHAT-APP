import { useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

function useSendMessage() {
  const [loading, setLoading] = useState(false)
  const {messages, setMessages, selectedConversation} = useConversation()

  const sendMessage = async (message) => {
    setLoading(true)
    try {
        await fetch(`http://localhost:4000/api/messages/send/${JSON.parse(localStorage.getItem('chat-user'))._id}/${selectedConversation._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({message})
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            if(data.error)
            {
                toast.error(data.error)
                return
            }
            setMessages([...messages, data])
        })
    } catch (error) {
        toast.error(error.message)
    } finally {
        setLoading(false)
    }
  }

  return {sendMessage, loading}
}

export default useSendMessage
