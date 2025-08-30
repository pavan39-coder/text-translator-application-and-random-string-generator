# CodexIntern - Translator App

A React-based translation application built with Vite, Tailwind CSS, and React Router.

## Project Structure

```
CodexIntern/
├── package.json
├── README.md
└── translator-app/
    ├── package.json
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── README.md
    └── src/
        ├── main.jsx
        ├── index.css
        ├── routes/
        │   ├── App.jsx
        │   ├── Translator.jsx
        │   └── RandomString.jsx
        └── services/
            └── translate.js
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd CodexIntern
   ```

2. **Install dependencies**
   ```bash
   cd translator-app
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Features

- **Translator**: Translate text between different languages
- **Random String Generator**: Generate random strings for testing
- **Modern UI**: Built with Tailwind CSS for a beautiful, responsive design
- **React Router**: Client-side routing for smooth navigation

## Dependencies

- React 18
- React Router DOM
- Vite
- Tailwind CSS
- Axios for API calls

## Notes

- This repository contains only the source code (15 files total)
- Dependencies are not included to keep the repository lightweight
- Run `npm install` in the `translator-app` directory to restore dependencies
- The build output (`dist/` folder) is not included and will be generated when running `npm run build`
