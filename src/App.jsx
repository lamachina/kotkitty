import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '/src/contexts/ThemeContext.jsx'
import Header from '/src/components/sections/Header'
import Home from '/src/components/sections/Home'
import Work from '/src/components/sections/Work'
import Stack from '/src/components/sections/Stack'
import Contact from '/src/components/sections/Contact'
import Footer from '/src/components/sections/Footer'
import ScrollToTop from '/src/components/elements/ScrollToTop'
import '/src/App.css'
import '/src/stylesheets/theme/theme.css'
import { Typography } from '@mui/material'
import Press from './components/sections/Press'



function App() {

	const { theme } = useContext(ThemeContext)
	const [device, setdevice] = useState("")

	useEffect(() => {
		if (window.innerWidth < 845) {
			setdevice("mobile")
		}
		else {
			setdevice("pc")
		}

	}, [])

	return (
		<div className='App' id='top' data-theme={theme}>
			<Header />
			<Home />
			{
				device === "pc" ?
					<>
						<Work />
						<Stack />
					</>
					:
					<Press />

			}

			<Contact />
			<Footer />
			<ScrollToTop />
		</div>
	)
}

export default App
