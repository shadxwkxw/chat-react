import React, { createContext, useContext, useState, useEffect } from 'react';
import {summarizeMessage} from '../Services/summarizeMessage'

const ChatContext = createContext()

export const useChat = () => {
	const context = useContext(ChatContext)
	if (!context) throw new Error('useChat must be used inside ChatProvider')
	return context
}

export const ChatProvider = ({ children }) => {
	const [chats, setChats] = useState(() => {
		const stored = localStorage.getItem('chats')
		return stored ? JSON.parse(stored) : []
	})

	const [currentChatId, setCurrentChatId] = useState(() => {
		return localStorage.getItem('currentChatId') || null
	})

	useEffect(() => {
		localStorage.setItem('chats', JSON.stringify(chats))
	}, [chats])

	useEffect(() => {
		if (currentChatId !== null)
			localStorage.setItem('currentChatId', currentChatId)
	}, [currentChatId])

	const createChat = () => {
		const newChat = {
			id: Date.now().toString(),
			title: 'Новый чат',
			messages: [],
		}
		setChats(prev => [newChat, ...prev])
		setCurrentChatId(newChat.id)
		return newChat.id
	}

	const addMessage = (chatId, message) => {
		setChats(prev =>
			prev.map(chat => {
				if (chat.id !== chatId) return chat

				const isFirstUserMessage =
					chat.messages.length === 0 && message.role === 'user'

				const title = isFirstUserMessage
					? summarizeMessage(message.content)
					: chat.title

				return {
					...chat,
					messages: [...chat.messages, message],
					title,
				}
			})
		)
	}

	return (
		<ChatContext.Provider
			value={{
				chats,
				setChats,
				currentChatId,
				setCurrentChatId,
				createChat,
				addMessage,
			}}
		>
			{children}
		</ChatContext.Provider>
	)
}