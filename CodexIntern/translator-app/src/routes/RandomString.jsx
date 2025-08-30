import { useCallback, useEffect, useMemo, useState } from 'react'

function generateRandomString(length) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let result = ''
	for (let i = 0; i < length; i += 1) {
		const randomIndex = Math.floor(Math.random() * characters.length)
		result += characters[randomIndex]
	}
	return result
}

export default function RandomString() {
	const [length, setLength] = useState(12)
	const [randomString, setRandomString] = useState('')
	const [includeSymbols, setIncludeSymbols] = useState(false)

	const characters = useMemo(() => {
		const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		const symbols = '!@#$%^&*()_+[]{}|;:,.<>?'
		return includeSymbols ? base + symbols : base
	}, [includeSymbols])

	const regenerate = useCallback(() => {
		const chars = characters
		let str = ''
		for (let i = 0; i < Number(length); i += 1) {
			const idx = Math.floor(Math.random() * chars.length)
			str += chars[idx]
		}
		setRandomString(str)
	}, [characters, length])

	useEffect(() => {
		regenerate()
	}, [regenerate])

	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold">Random String Generator</h2>
			<div className="flex items-center gap-4">
				<label className="text-sm">Length</label>
				<input
					type="number"
					className="w-24 border rounded px-2 py-1"
					min={1}
					max={128}
					value={length}
					onChange={(e) => setLength(e.target.value)}
				/>
				<label className="text-sm flex items-center gap-2">
					<input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
					<span>Include symbols</span>
				</label>
				<button onClick={regenerate} className="px-3 py-1 rounded bg-blue-600 text-white">Regenerate</button>
			</div>
			<div>
				<label className="block text-sm font-medium">Output</label>
				<textarea className="w-full h-32 border rounded p-3" readOnly value={randomString} />
			</div>
		</div>
	)
}


