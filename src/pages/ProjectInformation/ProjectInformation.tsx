import { DefaultButton as Button } from "@common/components"
import { Link } from "react-router-dom";

export const ProjectInformation = () => {
    return (
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