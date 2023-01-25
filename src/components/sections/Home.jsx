import '/src/stylesheets/sections/Home.css'
import SocialLinks from '/src/components/elements/SocialLinks'
import { profile } from '/src/data.js'

const Home = () => {
	const { name, role, description } = profile

	return (
		<section className='Home section' id='home'>
			<div className='container'>
				<div className='Home-caption'>
					<span className='Home-hi'>-----</span>
					<h1 className='Home-h1'>{name}</h1>
					<h2 className='Home-h2'>{role}</h2>
					<p className='Home-description'>
						Kotka Corporation is a cutting-edge investment platform that gives members access to a wide range of <strong>investment opportunities.</strong>
						<br></br>

						Our approach is the emphasis on community and collaboration.<br></br>
						Members are encouraged to share their <strong>expertise and insights</strong>,
						creating a <strong>dynamic and supportive environment</strong> that helps to succeed.
						<br></br>

						Kotka's team of experts also takes care of risk management and diversification,
						to minimize the exposure to risk while <strong>maximizing</strong> the returns.

					</p>
					<SocialLinks />
				</div>
			</div>
		</section>
	)
}

export default Home
