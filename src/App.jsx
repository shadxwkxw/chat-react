import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChatProvider } from './Context/Context';
import ChatPage from './Pages/ChatPage';
import ErrorPage from './Pages/ErrorPage';

const App = () => {
	return (
		<ChatProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Navigate to="/chat" />} />
					<Route path="/chat/:id?" element={<ChatPage />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</Router>
		</ChatProvider>
	)
}

export default App