import axios from 'axios'

async function tryGoogleTranslate(text, targetLanguage) {
	const host = 'google-translate1.p.rapidapi.com'
	const url = `https://${host}/language/translate/v2`
	const params = new URLSearchParams()
	params.append('q', text)
	params.append('target', targetLanguage)
	params.append('source', 'en')
	const response = await axios.post(url, params, {
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
			'X-RapidAPI-Host': host,
			'Accept-Encoding': 'application/gzip',
		},
	})
	return response?.data?.data?.translations?.[0]?.translatedText
}

async function tryTextTranslator(text, targetLanguage) {
	const host = 'text-translator2.p.rapidapi.com'
	const url = `https://${host}/translate`
	const params = new URLSearchParams()
	params.append('source_language', 'en')
	params.append('target_language', targetLanguage)
	params.append('text', text)
	const response = await axios.post(url, params, {
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
			'X-RapidAPI-Host': host,
			'Accept-Encoding': 'application/gzip',
		},
	})
	return response?.data?.data?.translatedText
}

async function tryLibreTranslateHost(host, text, targetLanguage) {
	const url = `https://${host}/translate`
	const response = await axios.post(url, {
		q: text,
		source: 'en',
		target: targetLanguage,
		format: 'text',
	})
	return response?.data?.translatedText
}

async function tryLibreTranslate(text, targetLanguage) {
	const hosts = ['libretranslate.com', 'libretranslate.de']
	for (const host of hosts) {
		try {
			const res = await tryLibreTranslateHost(host, text, targetLanguage)
			if (res) return res
		} catch (_) {
			// try next host
		}
	}
	return null
}

async function tryMyMemory(text, targetLanguage) {
	const url = 'https://api.mymemory.translated.net/get'
	const response = await axios.get(url, {
		params: { q: text, langpair: `en|${targetLanguage}` },
	})
	return response?.data?.responseData?.translatedText
}

export async function translateText(text, targetLanguage) {
	const apiKey = import.meta.env.VITE_RAPIDAPI_KEY
	const hasValidKey = Boolean(apiKey && !/your_rapidapi_key_here/i.test(String(apiKey)))

	const errors = []

	// If a valid key is present, try RapidAPI providers first
	if (hasValidKey) {
		try {
			const res = await tryGoogleTranslate(text, targetLanguage)
			if (res) return res
			errors.push('Google Translate response missing translated text')
		} catch (err) {
			errors.push(`Google Translate failed: ${err?.response?.status || ''} ${err?.response?.statusText || err?.message || ''}`)
		}

		try {
			const res = await tryTextTranslator(text, targetLanguage)
			if (res) return res
			errors.push('Text Translator response missing translated text')
		} catch (err) {
			errors.push(`Text Translator failed: ${err?.response?.status || ''} ${err?.response?.statusText || err?.message || ''}`)
		}
	}

	// Free, no-key fallbacks
	try {
		const res = await tryLibreTranslate(text, targetLanguage)
		if (res) return res
		errors.push('LibreTranslate response missing translated text')
	} catch (err) {
		errors.push(`LibreTranslate failed: ${err?.response?.status || ''} ${err?.response?.statusText || err?.message || ''}`)
	}

	try {
		const res = await tryMyMemory(text, targetLanguage)
		if (res) return res
		errors.push('MyMemory response missing translated text')
	} catch (err) {
		errors.push(`MyMemory failed: ${err?.response?.status || ''} ${err?.response?.statusText || err?.message || ''}`)
	}

	// Last resort: mock translation so UI remains usable
	return `[demo] (${targetLanguage}) ${text}`
}


