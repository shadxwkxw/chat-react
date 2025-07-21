import React, { useState } from "react";
import { useChat } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import cl from '../styles/sidebar.module.css';

const Sidebar = () => {
	const {chats, createChat, setCurrentChatId, setChats} = useChat()
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(false)

	const handleNewChat = () => {
		const newChatId = createChat()
		navigate(`/chat/${newChatId}`)
		setIsOpen(false)
	}

	const handleSelectChat = (id) => {
		setCurrentChatId(id)
		navigate(`/chat/${id}`)
		setIsOpen(false)
	}

	const handleClear = () => {
		localStorage.clear()
		setChats([])
		setCurrentChatId(null)
		setIsOpen(false)
	}

	return (
		<>
			<button className={cl.menuButton} onClick={() => setIsOpen(!isOpen)}>
				☰
			</button>
			<div className={`${cl.sidebar} ${isOpen ? cl.open : ''}`}>
				<button className={cl.closeButton} onClick={() => setIsOpen(false)}>
					✕
				</button>
				<button className={cl.newChatButton} onClick={handleNewChat}>
					+ Новый чат
				</button>
				<button className={cl.clearButton} onClick={handleClear}>
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
		</>
	)
}

export default Sidebar