import React, { useState } from "react";
//import { defaultContactValues } from "../ContactValues";
const defaultContactValues={reporttype:"",reporttopic:"",description:""};



const handleInputChange = (e:any) => {
    const[ContactValues, setContactValues] = useState(defaultContactValues);
    const { description, value } = e.target;
    setContactValues({
        ...ContactValues,
        [description]: value,
      });
};
const handleSubmit = (event:any) => {
    const[ContactValues] = useState(defaultContactValues);
    event.preventDefault();
    console.log(ContactValues);
};
export { handleSubmit, handleInputChange };