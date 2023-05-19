import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
export const PrivacyPolicy = () => {
  // Translation
  const { t } = useTranslation()
  const paragraph = t('pages.privacypolicy.paragraphs', {
    returnObjects: true
  }) as tsd[]

  type tsd = {
    header: string
    content: string
  }

  return (
    <>
      <Typography variant="h4">{t('pages.privacypolicy.consent')}</Typography>
      <Typography variant="h5">{t('pages.privacypolicy.contenttable')}</Typography>
      <Typography>{t('pages.privacypolicy.consent.webpage')}</Typography>
      {paragraph.map((type) => (
        <>
          <Typography variant="h6" key={type.header}>
            {type.header}
          </Typography>
          <Typography key={type.content}>{type.content}</Typography>
        </>
      ))}
    </>
  )
}

export default PrivacyPolicy
