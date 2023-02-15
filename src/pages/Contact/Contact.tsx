import { Contactform } from "@components";
import { Skeleton } from "@mui/material";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
//Testing useState
/*const defaultValues = {
  name: "",
  age: 0,
  gender: "",
  os: "",
  favoriteNumber: 0,
};
const Form = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  
  const handleSubmit = (event:any) => {
    event.preventDefault();
    console.log(formValues);
  };
  return (
    <form onSubmit={handleSubmit}>

          <DefaultTextField
            id="name-input"
            name="name"
            label="Name"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
          />
   
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      
    </form>
  );
};*/

function Contactskeleton(props: { loading?: boolean }) {
  const { loading = false } = props;
  return (
    <div>
      <Box sx={{ width: '50%', height: 400 }}>
      {loading?(
        <Skeleton id="loadingSkeleton_contact" variant="rectangular" width='100%' height='100%'/>
      ):(
        <Contactform width='100%'/>
        
      )}
      </Box>
    </div>
  );
}
export const Contact = ({ld=false}) => {
  return (
    <div>
      
      <Contactskeleton loading={ld}/>
      
    </div>
  )
}
export default Contact; 