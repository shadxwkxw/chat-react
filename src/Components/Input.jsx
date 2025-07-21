import React, { useState } from 'react';
import { useChat } from '../Context/Context';
import { sendMessageToOpenAI } from '../Services/Openai';
import cl from '../styles/input.module.css';
import { SyncLoader } from 'react-spinners';

const Input = ({chatId}) => {
	const [text, setText] = useState('')
	const [loading, setLoading] = useState(false)
	const {addMessage, chats} = useChat()

	const handleSubmit = async (e) => {
		e.preventDefault()
		const trimmed = text.trim()
		if (!trimmed || loading) return

		const userMessage = {
			id: Date.now().toString(),
			role: 'user',
			content: trimmed,
		}

		const currentChat = chats.find(chat => chat.id === chatId)
		const oldMessages = currentChat?.messages || []

		const messagesForOpenAI = [...oldMessages, userMessage].map(msg => ({
			role: msg.role,
			content: msg.content,
		}))

		addMessage(chatId, userMessage)
		setText('')
		setLoading(true)

		try {
			const botReply = await sendMessageToOpenAI(messagesForOpenAI)
			addMessage(chatId, {
				id: Date.now().toString() + '-bot',
				role: 'bot',
				content: botReply,
			})
		} catch (err) {
			addMessage(chatId, {
				id: Date.now().toString() + '-error',
				role: 'bot',
				content: 'Произошла ошибка при запросе к OpenAI',
			})
		}

		setLoading(false)
	}

	return (
		<form onSubmit={handleSubmit} className={cl.form}>
			<input
				type="text"
				value={text}
				disabled={loading}
				onChange={(e) => setText(e.target.value)}
				placeholder={loading ? 'Ожидание ответа...' : 'Введите сообщение...'}
				className={cl.input}
			/>
			<button type="submit" className={cl.button} disabled={loading}>
				{loading ? <SyncLoader color="#ffffff" /> : 'Отправить'}
			</button>
		</form>
	)
}

export default Input