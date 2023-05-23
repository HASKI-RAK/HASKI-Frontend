import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
  Radio,
  Select,
  MenuItem,
  Link,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material'
import { Container } from '@mui/system'
const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
)
const card = (
  <>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button variant="contained" size="small">
        Learn More
      </Button>
    </CardActions>
  </>
)

export const ThemePresentation = () => {
  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h3" component="div" gutterBottom>
          Theme Presentation
        </Typography>
        <Typography variant="body1" gutterBottom>
          This site demonstrates the individual elements used in the HASKI UI. It serves as a reference, as well as a
          documentation.
        </Typography>
        <Typography variant="h4" component="div" gutterBottom>
          Buttons
        </Typography>
        <Typography variant="h6" component="div" gutterBottom>
          Text Buttons
        </Typography>
        <Stack spacing={2} sx={{ height: '100%' }} direction="row">
          <Button color="primary">Primary</Button>
          <Button color="secondary" size="large">
            Other
          </Button>
          <Button color="info">Info</Button>
          <Button color="success">Success</Button>
          <Button color="warning">Warning</Button>
          <Button color="error">Error</Button>
        </Stack>
        <Typography variant="h6" component="div" gutterBottom>
          Contained Buttons
        </Typography>
        <Stack spacing={2} sx={{ height: '100%' }} direction="row">
          <Button variant="contained" color="primary">
            Primary
          </Button>
          <Button variant="contained" color="secondary">
            Other
          </Button>
          <Button variant="contained" color="info">
            Info
          </Button>
          <Button variant="contained" color="success">
            Success
          </Button>
          <Button variant="contained" color="warning">
            Warning
          </Button>
          <Button variant="contained" color="error">
            Error
          </Button>
        </Stack>
        <Typography variant="h6" component="div" gutterBottom>
          Outlined Buttons
        </Typography>
        <Stack spacing={2} sx={{ height: '100%' }} direction="row">
          <Button variant="outlined" color="primary">
            Primary
          </Button>
          <Button variant="outlined" color="secondary">
            Other
          </Button>
          <Button variant="outlined" color="info">
            Info
          </Button>
          <Button variant="outlined" color="success">
            Success
          </Button>
          <Button variant="outlined" color="warning">
            Warning
          </Button>
          <Button variant="outlined" color="error">
            Error
          </Button>
        </Stack>

        <Typography marginTop={5} variant="h4" component="div" gutterBottom>
          Card
        </Typography>
        <Stack spacing={2} sx={{ height: '100%' }} direction="row">
          <Stack spacing={2}>
            <Typography variant="h6" component="div" gutterBottom>
              Simple
            </Typography>
            <Card variant="elevation">{card}</Card>
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h6" component="div" gutterBottom>
              Outlined
            </Typography>
            <Card variant="outlined">{card}</Card>
          </Stack>
        </Stack>
        <Typography marginTop={5} variant="h4" component="div" gutterBottom>
          Loading
        </Typography>
        <Typography variant="h6" component="div" gutterBottom>
          Bar
        </Typography>
        <LinearProgress />
        <Typography marginTop={5} variant="h4" component="div" gutterBottom>
          Custom UI Elements
        </Typography>
        <Typography variant="h6" component="div" gutterBottom>
          Link
        </Typography>
        <Link href="/">Go back to the Homepage</Link>

        <Typography marginTop={5} variant="h6" component="div" gutterBottom>
          RadioButtons
        </Typography>
        <FormControl>
          <FormLabel>Radio Button example </FormLabel>
          <RadioGroup row name="radio-buttons-group" defaultValue={'default'}>
            <FormControlLabel value="default" control={<Radio />} label="default" />
            <FormControlLabel value="unchecked" control={<Radio />} label="unchecked" />
            <FormControlLabel value="disabled" control={<Radio />} label="disabled" disabled />
          </RadioGroup>
        </FormControl>
        <Typography marginTop={5} variant="h6" component="div" gutterBottom>
          Select
        </Typography>
        <FormControl>
          <Select name="Select" labelId="select_label_theme" label="Thema" defaultValue={1}>
            <MenuItem value={1}>Option1</MenuItem>
            <MenuItem value={2}>Option2</MenuItem>
            <MenuItem value={3}>Option3</MenuItem>
          </Select>
        </FormControl>
      </Container>
    </>
  )
}

export default ThemePresentation
