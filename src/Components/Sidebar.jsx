import React from "react";
import { useChat } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import cl from '../styles/sidebar.module.css';

const Sidebar = () => {
	const {chats, createChat, setCurrentChatId, setChats} = useChat()
	const navigate = useNavigate()

	const handleNewChat = () => {
		const newChatId = createChat()
		navigate(`/chat/${newChatId}`)
	}

	const handleSelectChat = (id) => {
		setCurrentChatId(id)
		navigate(`/chat/${id}`)
	}

	return (
		<div className={cl.sidebar}>
			<button className={cl.newChatButton} onClick={handleNewChat}>
				+ Новый чат
			</button>
			<button className={cl.clearButton} onClick={() => {
				localStorage.clear()
				setChats([])
				setCurrentChatId(null)
			}}>
				Очистить историю
			</button>

			<p className={cl.chatsList}>Чаты</p>

			<ul className={cl.chatList}>
				{chats.map((chat) => (
					<li key={chat.id}>
						<button
							className={cl.chatButton}
							onClick={() => handleSelectChat(chat.id)}
						>
							{chat.title}
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Sidebar