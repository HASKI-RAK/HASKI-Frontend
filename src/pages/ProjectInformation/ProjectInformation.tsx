import { useContext } from "react";
import { AuthContext } from "@services";
import {
  DefaultButton as Button,
  DefaultSkeleton as Skeleton,
  DefaultTypography as Typography,
} from "@common/components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const ProjectInformation = () => {
  const authcontext = useContext(AuthContext);
  const navigate = useNavigate();

  return authcontext.isAuth ? (
    <Skeleton />
  ) : (
    <>
      <Link to="glossary">
        <Typography>
          {"pages.projectdescription"}
          <Button
            variant="outlined"
            color="primary"
            size="large"
            fullWidth
            onClick={() => navigate("/projectinformation/projectdescription")}
          >
            Glossar
          </Button>
        </Typography>
      </Link>
    </>
  );
};

export default ProjectInformation;
