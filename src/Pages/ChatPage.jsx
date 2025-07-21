import React from 'react';
import Sidebar from '../components/Sidebar';
import Input from '../components/Input';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import { useChat } from '../Context/Context';
import cl from '../styles/chatpage.module.css';

const ChatPage = () => {
	const {id} = useParams()
	const {chats} = useChat()

	const currentChat = chats.find(chat => chat.id === id)

	return (
		<div className={cl.container}>
			<Sidebar />
			<div className={cl.chatSection}>
				<div className={cl.messagesContainer}>
					{currentChat ? (
						currentChat.messages.length > 0 ? (
							currentChat.messages.map((msg, i) => (
								<Message key={i} message={msg} />
							))
						) : (
							<div className={cl.centerText}>Введите свой запрос.</div>
						)
					) : (
						<div className={cl.centerText}>
							Привет! Я чат-бот, который поможет Вам в любом вопросе. Выберите или создайте чат.
						</div>
					)}
				</div>
				{currentChat && <Input chatId={currentChat.id} />}
			</div>
		</div>
	)
}

export default ChatPage