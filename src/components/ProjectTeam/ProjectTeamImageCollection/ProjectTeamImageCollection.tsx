import { Fade, Box } from '@common/components'
import React, { memo } from 'react'
import './ProjectTeamImageCollection.css'
import Slide from '@mui/material/Slide'

/**
 * @prop img1Url - Image location for left picture.
 * @prop img1Url - Image location for center picture.
 * @prop img1Url - Image location for right picture.
 * @prop img1Url - Image location for left picture.
 * @prop img1Url - Image location for center picture.
 * @prop img1Url - Image location for right picture.
 * @interface
 */
interface ImageCollectionProps {
  img1Url?: string
  img2Url?: string
  img3Url?: string
}

const container_style = {
    top: '-4.25rem',
    left: '2.5rem',
    marginBottom: '-8.5rem',
    width: {xl:'29rem', lg:'25rem', md:'15rem', sm:'15rem', xs:'10rem'},
    height: {xl:'17rem', lg:'10rem', md:'5rem', sm:'5rem', xs:'2.5rem'},
}

const view_style = {
    bottom: 0,
    left: 'inherit',
    position: 'relative',
    right: 'inherit',
    top: 'inherit',
    transform: 'skew(-10deg)',
    width: 'inherit',
    height: 'inherit',
}

const divider_style = {
    bgcolor: 'primary.main',
    borderLeft: 'solid 2px #000',
    borderRight: 'solid 2px #000',
    bottom: 0,
    position: 'absolute',
    top: 0,
    zIndex: 1,
}

const image_style = { 
    bottom:'-5%',
    top:'-15%',
    position:'absolute',
    transform:'skew(10deg)',
    backgroundPosition: 'center center',
    backgroundSize:'cover',
}
/**
 * ImageCollection component.
 *
 * @param props - Props containing image locations for three pictures.
 *
 * @remarks
 * ImageCollection presents a component that displays an image collection of three, split by a tilted vertical separator line.
 * Just used as visual effect, nothing useful to find here.
 *
 * @category Components
 */
const ImageCollection: React.FC<ImageCollectionProps> = ({ img1Url, img2Url, img3Url }) => {
  if (!img1Url || !img2Url || !img3Url) {
    return <div data-testid="NoImageCollection" />
  }

  return (
    <Fade in={true} easing="linear" timeout={2000}>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={1000}>
        <Box sx={{...container_style}} data-testid="ImageCollection">
          <Box sx={view_style}>
            <Box sx={{bottom: 0, overflow: 'hidden', position: 'absolute', top:0, left:'-5%', right:'66%'}}>
              <Box sx={{...image_style, left:'-5%', right:'-10%', backgroundImage: `url(${img1Url})` }} role="img"></Box>
            </Box>
            <Box sx={{...divider_style, left:'66%', right:'31.5%'}} data-testid="divider2"></Box>
            <Box sx={{bottom: 0, overflow: 'hidden', position: 'absolute', top:0, left:'33%', right:'33%'}}>
              <Box sx={{...image_style, left:'-15%', right:'-15%', backgroundImage: `url(${img2Url})` }} role="img"></Box>
            </Box>
            <Box sx={{...divider_style, left:'30.5%', right:'67%'}} data-testid="divider1"></Box>
            <Box sx={{bottom: 0, overflow: 'hidden', position: 'absolute', top:0, left:'67%', right:'-5%'}}>
              <Box sx={{...image_style, left:'-15%', right:'-5%', backgroundImage: `url(${img3Url})` }} role="img"></Box>
            </Box>
          </Box>
        </Box>
      </Slide>
    </Fade>
  )
}



export default memo(ImageCollection)
