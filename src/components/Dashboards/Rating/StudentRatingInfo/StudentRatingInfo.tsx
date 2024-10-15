import { Typography } from '@common/components'

const StudentRatingInfo = () => {
  return (
    <>
      <Typography variant="h5">Studierenden-Rating</Typography>
      <Typography variant="body1">
        Dieses Dashboard gibt Ihnen Auskunft über Ihre aktuelle Wertung und stellt diese in verschiedenen Formen dar.
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Wertung
      </Typography>
      <Typography variant="body1">
        Ihre aktuelle Wertung wird oben links durch einen Wert und dessen Standardabweichung angezeigt. Sie gibt einen
        Überblick über Ihren aktuellen durchschnittlichen Wissensstand in allen Themenbereichen. Um die Wertung
        einschätzen zu können, wurde sie mit den aktuellen Maximalwerten normalisiert. Zusätzlich geben Tendenzen
        Auskunft über die aktuelle Entwicklung.
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Netzdiagramm
      </Typography>
      <Typography variant="body1">
        Das Netzdiagramm oben rechts zeigt Ihre durchschnittliche Wertung pro Thema an und ermöglicht so einen Vergleich
        Ihrer Kenntnisse in den verschiedenen Bereichen.
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Histogramm
      </Typography>
      <Typography variant="body1">
        Das Histogramm befindet sich in der Mitte. Es gibt einen Überblick über die Verteilung der durchschnittlichen
        Wertungen aller Studierenden und soll so einen Vergleich mit Ihrer Wertung ermöglichen. Ihre Einstufung ist
        dabei hervorgehoben.
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Liniendiagramm / Tabelle
      </Typography>
      <Typography variant="body1">
        Das Liniendiagramm und die Tabelle sind unten abgebildet. Sie zeigen Ihre durchschnittliche Wertung im Verlauf
        der Zeit und ermöglichen so einen Überblick über die Entwicklung Ihres Wissensstandes. Während das
        Liniendiagramm eine grafische Aufbereitung darstellt, bietet die Tabelle einen detaillierten Einblick in Ihre
        bisherigen Wertungen.
      </Typography>
    </>
  )
}

export default StudentRatingInfo
