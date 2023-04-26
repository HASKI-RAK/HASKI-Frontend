import {DefaultTypography as Typography} from "@common/components";
import { DefaultLink as Link } from "@common/components";
import {useTranslation} from "react-i18next";
export const Imprint = () => {
    const { t } = useTranslation();
    return (
        <div>
            <Typography variant='h4'>{t("components.Imprint.Imprint")}</Typography>
            <p></p>
            <Typography variant='h6'>{t("components.Imprint.Imprint.Subtitle")}</Typography>
            <Typography variant='body2'>{t("components.Imprint.Imprint.AsOf")} 26.04.2023</Typography>
            <p></p>
            <Typography variant='body2'>Hochschule Kempten</Typography>
            <Typography variant='body2'>Bahnhofstraße 61</Typography>
            <Typography variant='body2'>D - 87435 Kempten</Typography>
            <p></p>
            <Typography variant='h6'>{t("components.Imprint.Imprint.AuthorisedRepresentative")}</Typography>
            <Typography variant='body2'>{t("components.Imprint.Imprint.AuthorisedRepresentative.Title")} Prof. Dr. Georg Hagel</Typography>
            <Typography variant='body2'><Typography sx={{fontWeight:'bold', display: 'inline'}}>Tel.:</Typography> +49 (0) 831 2523-471</Typography>
            <Typography variant='body2'><Typography sx={{fontWeight:'bold', display: 'inline'}}>E-Mail:</Typography> <Link href="mailto:georg.hagel@hs-kempten.de">georg.hagel@hs-kempten.de</Link></Typography>
            <p></p>
            <hr />
            <Typography variant='h4'>{t("components.Imprint.Imprint.Disclaimer")}</Typography>
            <p></p>
            <Typography variant='h6'>1. {t("components.Imprint.Imprint.Disclaimer.OnlineContent")}</Typography>
            <Typography variant='body2'> {t("components.Imprint.Imprint.Disclaimer.OnlineContent.Text")}</Typography>
            <p></p>
            <Typography variant='h6'>2. {t("components.Imprint.Imprint.Disclaimer.ReferencesAndLinks")}</Typography>
            <Typography variant='body2'> {t("components.Imprint.Imprint.Disclaimer.ReferencesAndLinks.Text")}</Typography>
            <p></p>
            <Typography variant='h6'>3. {t("components.Imprint.Imprint.Disclaimer.CopyrightAndTrademarkLaw")}</Typography>
            <Typography variant='body2'> {t("components.Imprint.Imprint.Disclaimer.CopyrightAndTrademarkLaw.Text")}</Typography>
            <p></p>
            <Typography variant='h6'>4. {t("components.Imprint.Imprint.Disclaimer.DataProtection")}</Typography>
            <Typography variant='body2'> {t("components.Imprint.Imprint.Disclaimer.DataProtection.Text")}</Typography>
            <p></p>
            <Typography variant='h6'>5. {t("components.Imprint.Imprint.Disclaimer.LegalValidityOfDisclaimer")}</Typography>
            <Typography variant='body2'> {t("components.Imprint.Imprint.Disclaimer.LegalValidityOfDisclaimer.Text")}</Typography>
            <p></p>
        </div>
    )
}