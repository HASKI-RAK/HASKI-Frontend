import { DefaultTextField } from "@common/components";
import { DefaultButton as Button } from "@common/components";
import { handleSubmit, handleInputChange } from "src/common/services/ContactValues/CState/CState";
import { useState } from "react";
import { Contactform } from "@components";
import { Skeleton } from "@mui/material";
import { Box } from "@mui/material";

//Testing useState
const defaultValues = {
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
};
function Contactskeleton(props: { loading?: boolean }) {
  const { loading = false } = props;
  return (
    <div>
      <Box sx={{ width: '50%', height: 400 }}>
      {loading?(
        <Skeleton variant="rectangular" width='100%' height='100%'/>
      ):(
        <Contactform />
      )}
      </Box>
    </div>
  );
}
export const Contact = () => {
  return (
    <div>
      
      <Contactskeleton loading/>
      <Contactform/>
    </div>
  )
}
export default Contact; 