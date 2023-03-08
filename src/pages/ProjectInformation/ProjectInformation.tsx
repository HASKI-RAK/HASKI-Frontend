import { useContext } from "react"
import { AuthContext } from "@services"
import { DefaultButton as Button, DefaultSkeleton as Skeleton } from "@common/components"
import { Link } from "react-router-dom";

export const ProjectInformation = () => {
    const authcontext = useContext(AuthContext)

    return (
        authcontext.isAuth ? <Skeleton /> :
        <>
            <Link to="glossary">
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    fullWidth
                >
                    Glossar
                </Button>
            </Link>
        </>
    )
}

export default ProjectInformation