import { Typography } from '@common/components'

const LearningElementRatingInfo = () => {
  return (
    <>
      <Typography variant="h5">Lernelement-Rating</Typography>
      <Typography variant="body1">
        Dieses Dashboard gibt Auskunft über die aktuelle Wertung von Lernelementen und bereitet diese in verschiedenen
        Formen auf.
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Wertung
      </Typography>
      <Typography variant="body1">
        Die aktuelle Wertung aller Lernelemente wird durch einen Wert und dessen Standardabweichung in der linken oberen
        Ecke angezeigt. Sie gibt einen Überblick über den aktuellen durchschnittlichen Schwierigkeitsgrad aller
        Lernelemente in allen Themenbereichen. Um die Wertung einschätzen zu können, wurde sie mit den aktuellen
        Maximalwerten normalisiert. Zusätzlich geben Tendenzen Auskunft über die aktuelle Entwicklung.
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Netzdiagramm
      </Typography>
      <Typography variant="body1">
        Das Netzdiagramm oben rechts zeigt die durchschnittliche Wertung aller Lernelemente pro Thema und ermöglicht so
        einen Vergleich der Schwierigkeit von verschiedenen Bereichen.
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Liniendiagramm / Tabelle
      </Typography>
      <Typography variant="body1">
        Das Liniendiagramm und die Tabelle sind unten abgebildet. Sie zeigen die durchschnittlichen Wertungen aller
        Lernelemente über die Zeit und ermöglichen so einen Überblick über die Entwicklung des Schwierigkeitsgrades.
        Während das Liniendiagramm eine grafische Aufbereitung darstellt, bietet die Tabelle einen detaillierten
        Einblick in die bisherigen Wertungen.
      </Typography>
    </>
  )
}

export default LearningElementRatingInfo
