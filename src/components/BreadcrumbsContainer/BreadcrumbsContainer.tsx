import {
  DefaultBox as Box,
  DefaultBreadcrumbs as Breadcrumbs,
  DefaultLink as Link,
  DefaultTypography as Typography,
} from "@common/components";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * Breadcrumbs container component.
 *
 * @remarks
 * It contains the breadcrumbs of the application and is used in the main frame. *
 *
 * @category Components
 */
const BreadcrumbsContainer = () => {
  // UX Logic
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {/** Center */}
      <Breadcrumbs aria-label="breadcrumb">
        {location.pathname !== "/" ? (
          location.pathname.split("/").map((path, index) => {
            if (path === "")
              return (
                <Link
                  key={path}
                  underline="hover"
                  color="text.primary"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  {t("pages.home")}
                </Link>
              );

            return (
              <Link
                key={path}
                underline="hover"
                component={
                  index === location.pathname.split("/").length - 1
                    ? "span"
                    : "button"
                }
                color={
                  index === location.pathname.split("/").length - 1
                    ? "text.primary"
                    : "inherit"
                }
                onClick={() => {
                  navigate(
                    location.pathname
                      .split("/")
                      .slice(0, index + 1)
                      .join("/")
                  );
                }}
              >
                {t(`pages.${path}`)}
              </Link>
            );
          })
        ) : (
          <Box display="flex">
            <Link
              color="text.primary"
              onClick={() => {
                navigate("/");
              }}
            >
              {t("pages.home")}
            </Link>
            <Typography ml="0.3rem" color="text.primary">
              /
            </Typography>
          </Box>
        )}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbsContainer;
