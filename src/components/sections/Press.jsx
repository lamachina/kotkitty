import { work } from '/src/data.js'
import '/src/stylesheets/sections/Work.css'
import { Box, ImageList, ImageListItem } from '@mui/material'



const Press = () => {

    return (
        <section className='Work section' id='work'>
            <div className='container'>
                <h2 className='Work-h2 section-head'>Kotkitty.</h2>
                <Box>
                    <ImageList variant="masonry" gap={"1rem"} sx={{ display: 'flex' }}>
                        {work.map((item) => (
                            <ImageListItem sx={{ width: '100%', height: '40rem', p: 0 }} key={item.img}>
                                <img className='mansoryimg'
                                    src={`${item.url}?w=248&fit=crop&auto=format`}
                                    srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.name}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>

            </div>
        </section>
    )
}

export default Press
