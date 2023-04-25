import { useTranslation } from "react-i18next";
import { ProjectDescriptionCard, ProjectDescriptionStepper } from "@components";
import {
  DefaultAvatar as Avatar,
  DefaultBox as Box,
  DefaultGrid as Grid,
  DefaultTypography as Typography,
} from "@common/components";

/**
 * ProjectDescriptionForm presents a form for the project description.
 * It can be used as a standalone component on a page.
 * @returns {JSX.Element} The Form component of the project description.
 * @category Components
 */
const ProjectDescriptionForm = () => {
  // Translation
  const { t } = useTranslation();

  return (
    <div data-testid="projectDescriptionForm">
      <ProjectDescriptionCard
        header={t("components.ProjectDescriptionForm.introductionHeader") || ""}
        body={t("components.ProjectDescriptionForm.introductionBody") || ""}
      >
        <Box
          component="img"
          sx={{
            maxHeight: { xs: 100, md: 300 },
            maxWidth: { xs: 100, md: 300 },
          }}
          src="/LogoPng.png"
        />
      </ProjectDescriptionCard>
      <ProjectDescriptionStepper
        header={t("components.ProjectDescriptionForm.approachesHeader") || ""}
        body={
          t<string>("components.ProjectDescriptionForm.approachesBody", {
            returnObjects: true,
          }) as string[]
        }
      />
      <ProjectDescriptionCard
        header={
          t("components.ProjectDescriptionForm.advantagesTeachingHeader") || ""
        }
        body={
          t("components.ProjectDescriptionForm.advantagesTeachingBody") || ""
        }
      >
        <Avatar
          alt="Advantages Teaching 1"
          src="/ProjectDescriptionImage01.jpg"
          sx={{
            height: { xs: 150, md: 300 },
            width: { xs: 150, md: 300 },
          }}
        />
      </ProjectDescriptionCard>
      <ProjectDescriptionCard
        header={
          t("components.ProjectDescriptionForm.advantagesTeachingHeader2") || ""
        }
        body={
          t("components.ProjectDescriptionForm.advantagesTeachingBody2") || ""
        }
      >
        <Avatar
          alt="Advantages Teaching 2"
          src="/ProjectDescriptionImage02.jpg"
          sx={{
            height: { xs: 150, md: 300 },
            width: { xs: 150, md: 300 },
          }}
        />
      </ProjectDescriptionCard>
      <ProjectDescriptionCard
        header={
          t("components.ProjectDescriptionForm.advantagesLearningHeader") || ""
        }
        body={
          t("components.ProjectDescriptionForm.advantagesLearningBody") || ""
        }
      >
        <Avatar
          alt="Advantages Learning 1"
          src="/ProjectDescriptionImage03.jpg"
          sx={{
            height: { xs: 150, md: 300 },
            width: { xs: 150, md: 300 },
          }}
        />
      </ProjectDescriptionCard>
      <ProjectDescriptionCard
        header={
          t("components.ProjectDescriptionForm.advantagesLearningHeader2") || ""
        }
        body={
          t("components.ProjectDescriptionForm.advantagesLearningBody2") || ""
        }
      >
        <Avatar
          alt="Advantages Learning 2"
          src="/ProjectDescriptionImage04.jpg"
          sx={{
            height: { xs: 150, md: 300 },
            width: { xs: 150, md: 300 },
          }}
        />
      </ProjectDescriptionCard>
      <ProjectDescriptionStepper
        header={t("components.ProjectDescriptionForm.goalsHeader") || ""}
        body={
          t<string>("components.ProjectDescriptionForm.goalsBody", {
            returnObjects: true,
          }) as string[]
        }
      />
      <Grid container justifyContent="center" xs={12}>
        <Typography sx={{ pt: "1rem", pb: "1rem" }} variant="subtitle1">
          {t("components.ProjectDescriptionForm.imageSources") +
            t("universityKempten") +
            ", "}
          <a href="https://de.freepik.com/fotos-kostenlos/close-up-der-studentin-schreiben-auf-laptop-am-tisch_1147740.htm">
            {t("components.ProjectDescriptionForm.imageSource1")}
          </a>
          {", "}
          <a href="https://www.freepik.com/free-photo/cloud-upload-icon-line-connection-circuit-board_1198390.htm">
            {t("components.ProjectDescriptionForm.imageSource2")}
          </a>
        </Typography>
      </Grid>
    </div>
  );
};

export default ProjectDescriptionForm;
