import { v4 as uuidv4 } from 'uuid'
import { AiFillLock } from 'react-icons/ai'
import { RiArrowRightLine } from 'react-icons/ri'
import Icon from '/src/components/elements/Icon.jsx'
import '/src/stylesheets/elements/Card.css'
import { Paper } from '@mui/material'

const Card = ({ name, description, url, stack, linkProject, linkGithub }) => {
	console.log(url);
	return (
		<Paper sx={{
			boxShadow: "0",
			background: 'linear-gradient(135deg, rgba(84,72,56) 26%, rgba(212,211,220,0.9416141456582633) 55%)',
			"&:hover": {
				boxShadow: "0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)",
				background: 'linear-gradient(135deg, rgba(84,72,56) 27%, rgba(212,211,220,0.9416141456582633) 54%)'
			}
		}} elevation={16} className='Card'>
			<img src={url} />
			<div className='Card-tech'>
				{stack.map((s) => (
					<Icon icon={s.icon} key={uuidv4()} />
				))}
			</div>
			<p style={{ color: "#131620" }} className='Card-description'>{description}</p>

			<div className='Card-links'>
				<a href={linkProject} className='Card-link-project' target='_blank'>
					{name} <RiArrowRightLine className='Card-icon-arrow' />
				</a>
				<a href={linkGithub} className='Card-link-github' target='_blank'>
					<AiFillLock className='Card-icon-github' />
				</a>
			</div>
		</Paper>
	)
}

export default Card
