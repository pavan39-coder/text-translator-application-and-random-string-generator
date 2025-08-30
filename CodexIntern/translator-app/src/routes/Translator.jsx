import { useCallback, useEffect, useMemo, useState } from 'react'
import { translateText } from '../services/translate'

const DEFAULT_TARGET = 'hi'

export default function Translator() {
	const [inputText, setInputText] = useState('Hello, how are you?')
	const [targetLang, setTargetLang] = useState(DEFAULT_TARGET)
	const [translated, setTranslated] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const canTranslate = useMemo(() => inputText.trim().length > 0 && targetLang, [inputText, targetLang])

	const handleTranslate = useCallback(async () => {
		if (!canTranslate) return
		setIsLoading(true)
		setError('')
		try {
			const result = await translateText(inputText, targetLang)
			setTranslated(result)
		} catch (err) {
			setError(err?.message || 'Translation failed')
		} finally {
			setIsLoading(false)
		}
	}, [canTranslate, inputText, targetLang])

	useEffect(() => {
		setTranslated('')
		setError('')
	}, [inputText, targetLang])

	return (
		<div className="grid md:grid-cols-2 gap-6">
			<div className="space-y-3">
				<label className="block text-sm font-medium">English Text</label>
				<textarea
					className="w-full h-44 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
					placeholder="Type text in English"
				/>

				<div className="flex items-center gap-3">
					<label className="text-sm font-medium">Target language</label>
					<select
						className="border rounded px-2 py-1"
						value={targetLang}
						onChange={(e) => setTargetLang(e.target.value)}
					>
						<option value="hi">Hindi</option>
						<option value="es">Spanish</option>
						<option value="fr">French</option>
						<option value="de">German</option>
						<option value="zh">Chinese (Simplified)</option>
						<option value="ja">Japanese</option>
					</select>
					<button
						onClick={handleTranslate}
						disabled={!canTranslate || isLoading}
						className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
					>
						{isLoading ? 'Translating…' : 'Translate'}
					</button>
				</div>
				{error && <p className="text-sm text-red-600">{error}</p>}
			</div>

			<div>
				<label className="block text-sm font-medium">Translated Text</label>
				<textarea
					className="w-full h-44 p-3 border rounded bg-gray-100"
					readOnly
					value={translated}
					placeholder="Translation will appear here"
				/>
				<p className="text-xs text-gray-500 mt-2">Powered by RapidAPI</p>
			</div>
		</div>
	)
}


