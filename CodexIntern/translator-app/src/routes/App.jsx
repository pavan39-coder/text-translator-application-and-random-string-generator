import { Link, NavLink, Outlet } from 'react-router-dom'

export default function App() {
	return (
		<div className="min-h-full flex flex-col">
			<header className="border-b bg-white">
				<div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
					<Link to="/" className="text-xl font-semibold">Text Translator</Link>
					<nav className="flex gap-4">
						<NavLink to="/" end className={({ isActive }) => `px-3 py-1 rounded ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>Translator</NavLink>
						<NavLink to="/random" className={({ isActive }) => `px-3 py-1 rounded ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>Random String</NavLink>
					</nav>
				</div>
			</header>
			<main className="flex-1">
				<div className="max-w-5xl mx-auto px-4 py-8">
					<Outlet />
				</div>
			</main>
			<footer className="border-t text-center text-sm py-4 text-gray-500">Built with React, Tailwind, and RapidAPI</footer>
		</div>
	)
}


