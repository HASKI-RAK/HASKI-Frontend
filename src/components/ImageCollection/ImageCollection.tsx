import { memo } from 'react'
import { Box, Fade } from '@common/components'

/**
 * @prop leftImgURL - Image location for left picture.
 * @prop middleImgURL - Image location for center picture.
 * @prop rightImgURL - Image location for right picture.
 * @interface
 */
type ImageCollectionProps = {
  leftImgURL?: string
  middleImgURL?: string
  rightImgURL?: string
}

/**
 * ImageCollection component.
 *
 * @param props - Props containing image locations for three pictures.
 *
 * @remarks
 * ImageCollection represents a component that displays an image collection of three images, split by tilted vertical separator lines.
 * It is a visual effect to showcase three images in one.
 * It can be used as a standalone component on a page.
 *
 * @category Components
 */
const ImageCollection = (props: ImageCollectionProps) => {
  return (
    <Fade in={true} easing="linear" timeout={2000}>
      <Box
        sx={{
          top: '-4.25rem',
          left: '2.5rem',
          marginBottom: '-8.5rem',
          width: { xxxl: '49rem', xxl: '39rem', xl: '29rem', lg: '21.5rem', md: '15rem', sm: '8rem', xs: '8rem' },
          height: { xxxl: '17rem', xxl: '17rem', xl: '17rem', lg: '10rem', md: '5rem', sm: '5rem', xs: '2.5rem' }
        }}>
        <Box
          sx={{
            bottom: 0,
            left: 'inherit',
            position: 'relative',
            right: 'inherit',
            top: 'inherit',
            transform: 'skew(-10deg)',
            width: 'inherit',
            height: 'inherit'
          }}>
          <Box sx={{ bottom: 0, overflow: 'hidden', position: 'absolute', top: 0, left: '-5%', right: '66%' }}>
            <Box
              sx={{
                bottom: '-5%',
                top: '-15%',
                position: 'absolute',
                transform: 'skew(10deg)',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                left: '-5%',
                right: '-10%',
                backgroundImage: `url(${props.leftImgURL})`
              }}
              role="img alt"
            />
          </Box>
          <Box
            sx={{
              bgcolor: 'background.paper',
              bottom: 0,
              position: 'absolute',
              top: 0,
              zIndex: 1,
              left: '66%',
              right: '31.5%'
            }}
          />
          <Box sx={{ bottom: 0, overflow: 'hidden', position: 'absolute', top: 0, left: '33%', right: '33%' }}>
            <Box
              sx={{
                bottom: '-5%',
                top: '-15%',
                position: 'absolute',
                transform: 'skew(10deg)',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                left: '-15%',
                right: '-15%',
                backgroundImage: `url(${props.middleImgURL})`
              }}
              role="img alt"
            />
          </Box>
          <Box
            sx={{
              bgcolor: 'background.paper',
              bottom: 0,
              position: 'absolute',
              top: 0,
              zIndex: 1,
              left: '30.5%',
              right: '67%'
            }}
          />
          <Box sx={{ bottom: 0, overflow: 'hidden', position: 'absolute', top: 0, left: '67%', right: '-5%' }}>
            <Box
              sx={{
                bottom: '-5%',
                top: '-15%',
                position: 'absolute',
                transform: 'skew(10deg)',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                left: '-15%',
                right: '-5%',
                backgroundImage: `url(${props.rightImgURL})`
              }}
              role="img alt"
            />
          </Box>
        </Box>
      </Box>
    </Fade>
  )
}

export default memo(ImageCollection)
