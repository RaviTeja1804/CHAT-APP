import React, { useState } from 'react'
import "./SearchInput.css"
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from 'react-hot-toast';

function SearchInput() {

  const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const [loading, conversations ] = useGetConversations();

  const handleSubmit = (e) => {
		e.preventDefault();

		if (!search) 
      return;

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) 
    {
			setSelectedConversation(conversation);
			setSearch("");
		} 
    else
    {
      toast.error("No such user found!");
    }
	};

  return (  
    <form className='searchForm' onSubmit={handleSubmit}>
        <input type="text" placeholder='Search..' className='searchInput' value={search} onChange={(e) => {setSearch(e.target.value)}}/>
        <button className='searchBtn'>
            <IoSearchSharp />
        </button>
    </form>
  )
}

export default SearchInput