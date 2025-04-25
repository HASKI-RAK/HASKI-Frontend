import { Typography } from "@common/components"
import { useTranslation } from "react-i18next"

type RatingDashboardInfoProps = {
    selectedDashboard: 'StudentRatingDashboard' | 'LearningElementRatingDashboard'
}

const RatingDashboardInfo = (props: RatingDashboardInfoProps) => {
    const { t } = useTranslation()


    return (
        <>
            <Typography variant ="h5">{t(`components.${props.selectedDashboard}.dashboardTitle`)}</Typography>
            <Typography variant ="body1">{t(`components.${props.selectedDashboard}.dashboardText`)}</Typography>
            <Typography variant ="h5" sx={{ mt: 2 }}>
                {t(`components.${props.selectedDashboard}.ratingTitle`)}
            </Typography>
            <Typography variant ="body1">{t(`components.${props.selectedDashboard}.ratingText`)}</Typography>
            <Typography variant ="h5" sx={{ mt: 2 }}>
                {t(`components.${props.selectedDashboard}.spiderGraphTitle`)}
            </Typography>
            <Typography variant ="body1">{t(`components.${props.selectedDashboard}.spiderGraphText`)}</Typography>
            {
            props.selectedDashboard == 'StudentRatingDashboard' ? (
                <>
                    <Typography variant ="h5" sx={{ mt: 2 }}>
                        {t('components.StudentRatingDashboard.histogramTitle')}
                    </Typography>
                    <Typography variant ="body1">{t('components.StudentRatingDashboard.histogramText')}</Typography>
                </>
            ) : null
            }
            <Typography variant ="h5" sx={{ mt: 2 }}>
                {t(`components.${props.selectedDashboard}.lineGraphTitle`)}
            </Typography>
            <Typography variant ="body1">{t(`components.${props.selectedDashboard}.lineGraphText`)}</Typography>
        </>
    )
}