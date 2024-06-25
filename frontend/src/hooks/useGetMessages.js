import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

function useGetMessages() {
  const [loading, setLoading] = useState(false)
  const {messages, setMessages, selectedConversation} = useConversation()

  useEffect(() => {
    const getMessages = async () => {
        setLoading(true)
        try {
            await fetch(`http://localhost:4000/api/messages/get/${JSON.parse(localStorage.getItem('chat-user'))._id}/${selectedConversation._id}`, {
                method: "GET"
            })
            .then(res => res.json())
            .then((data) => {
                if(data.error)
                {
                    toast.error(data.error)
                    return
                }
                setMessages(data)
            })
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
      }
      if(selectedConversation?._id) 
      {
        getMessages();
      }
        
  },[selectedConversation?._id])

  return {messages, loading}
}

export default useGetMessages
