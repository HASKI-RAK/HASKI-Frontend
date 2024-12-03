import { Divider, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from '@common/components'
import { FiberManualRecord } from '@common/icons'

/**
 * # Privacy Policy Page
 * @remarks
 * Contains legal information about the privacy policy.
 * @category Pages
 */
const PrivacyPolicy = () => {
  return (
    <>
      <Typography variant="h4">Informationen und Einwilligungserklärung</Typography>
      <Typography paragraph variant="body2">
        HASKI-Fragebogenstudie: Erhebung für die erste Evaluation des HASKI Systems
      </Typography>
      <Divider />
      <Typography variant="h6">1. Informationen zur Studie</Typography>
      <Typography variant="body2">
        Im Rahmen des HASKI-Projekts beschäftigen sich die OTH Regensburg, Hochschule Kempten und die TH Aschaffenburg
        damit, wie künstliche Intelligenz zur Unterstützung von Studierenden beim Lernen eingesetzt werden kann. Ziel
        des Projekts ist es, ein adaptives Learning Management System zu erstellen, welches die Lernenden mit den für
        sie bestmöglichen Lernmaterialien versorgt.
      </Typography>
      <Typography variant="body2">
        Teil dieses Learning Management Systems ist ein Lernenden-Modell. Dieses soll in einem im Rahmen der ersten
        Evaluation über Fragebögen vorab erstellt werden. Als Teil dieser Studie werden Sie Fragen in folgenden
        Bereichen ausfüllen:
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary="Demografische Daten" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary="Fragebögen zu Lernstilen und Lernstrategie (übersetzte Version des ILS und LIST-K)" />
        </ListItem>
      </List>
      <Divider />
      <Typography variant="h6">2. Hinweise zum Datenschutz</Typography>
      <Typography variant="body2">
        Wir arbeiten nach den Vorschriften der Datenschutz-Grundverordnung und allen anderen datenschutzrechtlichen
        Bestimmungen. Im Rahmen dieser Studie werden folgende Daten erhoben:
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary="Vor- und Nachname" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary="Sozio-demografische Daten" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary="Informationen zu Lernstilen und Lernstrategie" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary="Learning Analytics" />
        </ListItem>
      </List>
      <Typography variant="body2">Diese Daten möchten wir wie im Folgenden dargelegt einsetzen:</Typography>
      <Typography paragraph variant="body2" />
      <Divider />
      <Typography variant="h6">3. Datenerhebung</Typography>
      <Typography variant="body2">
        Die Datenerhebungen werden von entsprechend geschulter Mitarbeiterinnen des HASKI-Projekts betreut und online
        mittels Moodle durchgeführt. Die erhobenen Daten werden ausschließlich vertraulich verarbeitet.
      </Typography>
      <Typography paragraph variant="body2" />
      <Divider />
      <Typography variant="h6">4. Datenverarbeitung</Typography>
      <Typography variant="body2">
        Nach Aufzeichnung werden die Daten durch wissenschaftliche MitarbeiterInnen anonymisiert ausgewertet. Es werden
        sämtliche Namen und Hinweise, die Rückschlüsse auf Personen ermöglichen könnten, entfernt.
      </Typography>
      <Typography paragraph variant="body2" />
      <Divider />
      <Typography variant="h6">5. Aufbewahrung und Zugriff</Typography>
      <Typography variant="body2">
        Die Daten werden in digitaler Form auf dem Moodle-Server der TH Aschaffenburg aufbewahrt und nur berechtigten
        MitarbeiterInnen zugänglich gemacht. Anonymisierte Daten können im Sinne guter wissenschaftlicher Praxis
        archiviert und für Lehre genutzt werden.
      </Typography>
      <Typography paragraph variant="body2" />
      <Divider />
      <Typography variant="h6">6. Veröffentlichung</Typography>
      <Typography variant="body2">
        Forschungsergebnisse werden ausschließlich anonymisiert veröffentlicht, ohne Rückschlüsse auf Personen
        zuzulassen.
      </Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">Ihre Rechte</Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary="Art. 7 Abs. 3 DSGVO - Recht auf Widerruf der Einwilligung" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary="Art. 15 DSGVO - Auskunftsrecht" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary="Art. 16 DSGVO - Recht auf Berichtigung" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary="Art. 17 DSGVO - Recht auf Löschung" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary="Art. 18 DSGVO - Recht auf Einschränkung der Verarbeitung" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary="Art. 21 DSGVO - Widerspruchsrecht" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary="Art. 77 DSGVO - Recht auf Beschwerde bei einer Aufsichtsbehörde" />
        </ListItem>
      </List>
      <Divider />
      <Typography variant="h6">Kontakt</Typography>
      <Typography variant="body2">Datenschutzbeauftragter der TH Aschaffenburg:</Typography>
      <Typography variant="body2">Prof. Dr. Eberhard Schott</Typography>
      <Typography variant="body2">Würzburger Straße 45, 63743 Aschaffenburg</Typography>
      <Typography variant="body2">
        E-Mail: <Link href="mailto:Eberhard.Schott@th-ab.de">Eberhard.Schott@th-ab.de</Link>
      </Typography>
      <Typography variant="body2">Tel.: 06021 4206 708</Typography>
    </>
  )
}

export default PrivacyPolicy
