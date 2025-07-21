import React from "react";
import cl from '../styles/message.module.css';
import ReactMarkdown from 'react-markdown';

const Message = ({message}) => {
	const isBot = message.role !== 'user'
	const displayedText = message.content

	return (
		<div className={`${cl.messageContainerr} ${isBot ? cl.left : cl.right}`}>
			<div className={`${cl.bubble} ${isBot ? cl.botBubble : cl.userBubble}`}>
				<ReactMarkdown>{displayedText}</ReactMarkdown>
			</div>
		</div>
	)
}

export default Message