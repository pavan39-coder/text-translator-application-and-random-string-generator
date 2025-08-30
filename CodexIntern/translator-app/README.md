# Translator App (React + Vite + Tailwind)

This app translates English text to your chosen language using RapidAPI and includes a Random String Generator using React hooks.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the project root with your RapidAPI key:
```bash
VITE_RAPIDAPI_KEY=your_rapidapi_key_here
```

3. Start the dev server:
```bash
npm run dev
```

- Translator page: enter English text, choose a target, and translate.
- Random String page: generates strings using `useState`, `useCallback`, and `useEffect`.

## Build
```bash
npm run build
npm run preview
```

