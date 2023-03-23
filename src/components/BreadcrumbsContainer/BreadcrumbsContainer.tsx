import { Breadcrumbs, Link } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const BreadcrumbsContainer = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    return <Breadcrumbs aria-label="breadcrumb">
        {location.pathname.split('/').map((path, index) => {
            if (path === '')
                return <Link
                    key={index}
                    underline="hover"
                    component={index === location.pathname.split('/').length - 1 ? 'span' : 'button'}
                    color={index === location.pathname.split('/').length - 1 ? 'text.primary' : 'inherit'}
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    {t('pages.Home')}
                </Link>;

            return <Link
                key={index}
                underline="hover"
                component={index === location.pathname.split('/').length - 1 ? 'span' : 'button'}
                color={index === location.pathname.split('/').length - 1 ? 'text.primary' : 'inherit'}
                onClick={() => {
                    navigate(location.pathname.split('/').slice(0, index + 1).join('/'));
                }}
            >
                {t(`pages.${path}`)}
            </Link>;
        })}
    </Breadcrumbs>;
};
