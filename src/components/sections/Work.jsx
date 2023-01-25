import { v4 as uuidv4 } from 'uuid'
import { work } from '/src/data.js'
import Card from '/src/components/elements/Card'
import '/src/stylesheets/sections/Work.css'
import Slider from 'react-slick'
import { Box } from '@mui/system'


function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "flex", background: "red" }}
			onClick={onClick}
		/>
	);
}

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block", background: "green" }}
			onClick={onClick}
		/>
	);
}

const Work = () => {

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		autoplay: true,
		autoplaySpeed: 4400,
		appendDots: dots => (
			<Box display="flex" justifyContent="center" borderColor="#123" border="1rem"
				sx={{
					backgroundColor: "#ddd",
				}}
			>
				<ul style={{ margin: "0px" }}>  </ul>
			</Box>
		),
	};


	return (
		<section className='Work section' id='work'>
			<div className='container'>
				<h2 className='Work-h2 section-head'>Kotkitty.</h2>
				<div className='Work-wrapper'>
					<Slider {...settings} className="Work-slider">
						{work.map((c) => (
							<div>
								<Card
									name={c.name}
									description={c.description}
									url={c.url}
									stack={c.stack}
									linkProject={c.linkProject}
									linkGithub={c.linkGithub}
									key={uuidv4()}
								/>
							</div>
						))}
					</Slider>
				</div>
			</div>
		</section>
	)
}

export default Work
