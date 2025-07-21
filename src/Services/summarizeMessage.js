export const summarizeMessage = (text) => {
	const words = text.trim().split(/\s+/)
	const summary = words.slice(0, 5).join(' ')
	return summary + (words.length > 5 ? '...' : '')
}