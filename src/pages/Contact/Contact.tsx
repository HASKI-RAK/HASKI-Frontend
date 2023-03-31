import { Contactform } from "@components";

//if a skeleton component is needed for the contact page add code below
/*function Contactskeleton(props: { loading?: boolean }) {
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
}*/

export const SendToBackend = () => {
  console.log("send to backend");
};

export const Contact = () => {

  return (
    <div>
      
      <Contactform width="50%" sendtoBackend={SendToBackend}/>
      
    </div>
  )
}
export default Contact; 