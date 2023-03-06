// import { useContext } from "react"
// import { AuthContext } from "@services";
import { GlossaryForm } from "@components"
// import { DefaultSkeleton as Skeleton } from "@common/components"

export const Glossary = () => {


    
    // const authcontext = useContext(AuthContext);

    return(
        // authcontext.isAuth ? <Skeleton /> :
            <GlossaryForm/>
    );
}

export default Glossary

// TODO:
// URL aktualisieren Home/ProjectInformation/glossary