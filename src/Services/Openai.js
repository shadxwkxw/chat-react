import axios from 'axios';

export async function sendMessageToOpenAI(messages) {
	try {
		const response = await axios.post(
			'https://openrouter.ai/api/v1/chat/completions',
			{
				model: 'mistralai/mistral-7b-instruct',
				messages,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
				},
			}
		)

		return response.data.choices?.[0]?.message?.content || 'Ошибка от OpenRouter'
	} catch (error) {
		console.error('Ошибка при запросе к OpenRouter:', error)
		return 'Ошибка от OpenRouter'
	}
}