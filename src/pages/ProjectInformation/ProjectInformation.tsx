import { useContext } from "react";
import { AuthContext } from "@services";
import { useTranslation } from 'react-i18next'
import {
  DefaultButton as Button,
  DefaultSkeleton as Skeleton,
  DefaultTypography as Typography,
} from "@common/components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// TODO: Added unfinished projectinformation page for routing purposes
export const ProjectInformation = () => {
  const authcontext = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation()

  return authcontext.isAuth ? (
    <Skeleton />
  ) : (
    <>
      <Button sx={{ mt: '2rem', color: 'black' }} onClick={() => navigate('/projectinformation/projectdescription')}>
        <Typography>{t('pages.projectdescription')}</Typography>
      </Button>
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
