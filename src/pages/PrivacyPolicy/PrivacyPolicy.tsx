import { useTranslation } from 'react-i18next'
import { Divider, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from '@common/components'
import { FiberManualRecord } from '@common/icons'

/**
 * # Privacy Policy Page
 * @remarks
 * Contains legal information about the privacy policy and study consent.
 * @category Pages
 */
export const PrivacyPolicy = () => {
  const { t } = useTranslation()
  return (
    <>
      {/* Existing Privacy Policy Content */}
      <Typography variant="h4">{t('pages.privacypolicy')}</Typography>
      <Typography paragraph variant="body2" />
      {/* ... previous sections omitted for brevity ... */}

      {/* New Study Information & Consent */}
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Informationen und Einwilligungserklärung</Typography>
      <Typography variant="body2">
        HASKI-Fragebogenstudie: Erhebung für die erste Evaluation des HASKI Systems
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">1. Informationen zur Studie</Typography>
      <Typography variant="body2">
        Im Rahmen des HASKI-Projekts beschäftigen sich die OTH Regensburg, Hochschule Kempten und die TH Aschaffenburg
        damit, wie künstliche Intelligenz zur Unterstützung von Studierenden beim Lernen eingesetzt werden kann. Ziel
        des Projekts ist es, ein adaptives Learning Management System zu erstellen, welches die Lernenden mit den für
        sie bestmöglichen Lernmaterialien versorgt.
      </Typography>
      <Typography variant="body2">
        Teil dieses Learning Management Systems ist ein Lernenden-Modell. Dieses soll in einem im Rahmen der ersten
        Evaluation über Fragebögen vorab erstellt werden.
      </Typography>
      <Typography variant="body2">
        Als Teil dieser Studie werden Sie Fragen in folgenden Bereichen ausfüllen:
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

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">2. Hinweise zum Datenschutz</Typography>
      <Typography variant="body2">
        Im Folgenden informieren wir Sie über den datenschutzrechtskonformen Umgang mit Ihren personenbezogenen Daten
        und bitten um Ihre Zustimmung zur Teilnahme an unserer Studie sowie zur Verwendung Ihrer Daten für die
        angegebenen Zwecke. Bitte lesen Sie die folgenden Erklärungen sorgfältig durch. Bei Rückfragen oder
        Verständnisschwierigkeiten wenden Sie sich an den Studienleiter. Wenn Sie mit unserem Vorhaben einverstanden
        sind, stimmen Sie bitte der nachstehenden Einverständniserklärung zu. Wir danken Ihnen für Ihre Mitwirkung und
        Ihr Vertrauen in unsere Arbeit!
      </Typography>
      <p></p>
      <Typography variant="body2">
        Wir arbeiten nach den Vorschriften der Datenschutz-Grundverordnung und allen anderen datenschutzrechtlichen
        Bestimmungen. Im Rahmen dieser Studie werden folgende Daten erhoben:
      </Typography>
      <List>
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
          <ListItemText primary="Vor- und Nachname" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary="Learning Analytics" />
        </ListItem>
      </List>
      <Typography>Diese Daten möchten wir wie im Folgenden dargelegt einsetzen:</Typography>

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Datenerhebung</Typography>
      <Typography variant="body2">
        Die Datenerhebungen werden von entsprechend geschulter Mitarbeiterinnen des HASKI-Projekts betreut und online
        mittels Moodle durchgeführt. Bei Fragen zum jeweiligen Erhebungsverfahren oder bezüglich weiterführender
        Informationen können Sie sich jederzeit an die nachfolgend genannten Kontaktpersonen wenden. Die erhobenen Daten
        werden im weiteren Verlauf ausschließlich vertraulich verarbeitet.
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Datenverarbeitung</Typography>
      <Typography variant="body2">
        Nach Aufzeichnung werden die Daten durch wissenschaftliche MitarbeiterInnen des HASKI-Projekts ausgewertet. Die
        für die Datenauswertung verantwortlichen wissenschaftlichen MitarbeiterInnen stehen in keinem
        Interessenskonflikt mit den teilnehmenden Personen (z.B. Bewertungssituation). Im Rahmen der Auswertungen werden
        auch Abschriften und/oder Kopien der Daten erstellt. Diese Abschriften und Kopien werden anonymisiert, d. h., es
        werden sämtliche Namen und sonstigen Hinweise, die Rückschlüsse auf Sie als Person ermöglichen könnten,
        entfernt.
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Aufbewahrung und Zugriff</Typography>
      <Typography variant="body2">
        Die Daten werden in digitaler Form geschützt auf dem Moodle-Server TH Aschaffenburg aufbewahrt und nur
        berechtigten MitarbeiterInnen des HASKI-Projekts zugänglich gemacht. Ihr Einverständnis vorausgesetzt, werden
        die in dieser Studie erhobenen Daten im Sinne guter wissenschaftlicher Praxis in anonymisierter Form in einem
        vertrauenswürdigen Archiv aufbewahrt und von anderen Wissenschaftlerinnen genutzt. Die anonymisierten Daten
        werden – Ihr Einverständnis vorausgesetzt – unter kontrollierten Bedingungen auch im Rahmen der Lehre
        eingesetzt.
      </Typography>
      <Typography>
        Die Daten werden in digitaler Form geschützt auf dem Moodle-Server TH Aschaffenburg aufbewahrt und nur
        berechtigten MitarbeiterInnen des HASKI-Projekts zugänglich gemacht. Ihr Einverständnis vorausgesetzt, werden
        die in dieser Studie erhobenen Daten im Sinne guter wissenschaftlicher Praxis in anonymisierter Form in einem
        vertrauenswürdigen Archiv aufbewahrt und von anderen Wissenschaftlerinnen genutzt. Die anonymisierten Daten
        werden – Ihr Einverständnis vorausgesetzt – unter kontrollierten Bedingungen auch im Rahmen der Lehre
        eingesetzt.
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Veröffentlichung</Typography>
      <Typography variant="body2">
        Die Veröffentlichung von Forschungsergebnissen in Publikationen oder auf Tagungen erfolgt ausschließlich in
        anonymisierter Form und lässt zu keinem Zeitpunkt Rückschlüsse auf Sie als Person zu. Es erfolgt keine
        Veröffentlichung von personenbezogenen Daten (z. B. Name, Kontaktdaten).
      </Typography>
      <Typography variant="body2">Sie haben jederzeit die Möglichkeit folgende Rechte geltend zu machen:</Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Art. 7 Abs. 3 DSGVO - Recht auf Widerruf der Einwilligung: Sie haben das Recht, Ihre Einwilligung jederzeit mit Wirkung für die Zukunft zu widerrufen." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Art. 15 DSGVO - Auskunftsrecht: Sie haben uns gegenüber das Recht, Auskunft darüber zu erhalten, welche Daten wir zu Ihrer Person verarbeiten." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Art. 16 DSGVO - Recht auf Berichtigung: Sollten die Sie betreffenden Daten nicht richtig oder unvollständig sein, so können Sie die Berichtigung unrichtiger oder die Vervollständigung unvollständiger Angaben verlangen." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Art. 17 DSGVO - Recht auf Löschung: Sie können jederzeit die Löschung Ihrer Daten verlangen" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Art. 18 DSGVO - Recht auf Einschränkung der Verarbeitung: Sie können die Einschränkung der Verarbeitung der Sie betreffenden personenbezogenen Daten verlangen." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Art. 21 DSGVO - Widerspruchsrecht: Sie können jederzeit gegen die Verarbeitung der Sie betreffenden Daten Widerspruch einlegen." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Art. 77 DSGVO - Recht auf Beschwerde bei einer Aufsichtsbehörde: Wenn Sie der Auffassung sind, dass wir bei der Verarbeitung Ihrer Daten datenschutzrechtliche Vorschriften nicht beachtet haben, können Sie sich mit einer Beschwerde an die zuständige Aufsichtsbehörde wenden, die Ihre Beschwerde prüfen wird." />
        </ListItem>
      </List>

      <Typography paragraph variant="body2">
        In jedem Fall gilt: Ihre Teilnahme an den Erhebungen und Ihre Zustimmung zur Verwendung der Daten, wie oben
        beschrieben, sind freiwillig. Sie haben jederzeit die Möglichkeit zu widerrufen. Durch Verweigerung oder
        Widerruf entstehen Ihnen keine Nachteile.
      </Typography>
      <Typography paragraph variant="body2">
        Für die Einhaltung der Datenschutzbestimmungen ist im Falle der vorliegenden Studie die TH Aschaffenburg
        verantwortlich.
      </Typography>
      <Typography paragraph variant="body2">
        Bei Rückfragen bezüglich datenschutzrechtlicher Themen, wenden Sie sich bitte an den Datenschutzbeauftragten.
        Dieser ist unter den folgenden Kontaktdaten erreichbar:
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Kontakt Datenschutzbeauftragter</Typography>
      <Typography variant="body2">Prof. Dr. Eberhard Schott</Typography>
      <Typography variant="body2">Technische Hochschule Aschaffenburg</Typography>
      <Typography variant="body2">Würzburger Straße 45, 63743 Aschaffenburg</Typography>
      <Typography variant="body2">Tel.: 06021 4206 708</Typography>
      <Typography variant="body2">
        <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>E-Mail:</Typography>{' '}
        <Link href="mailto:Eberhard.Schott@th-ab.de">Eberhard.Schott@th-ab.de</Link>
      </Typography>

      <Typography variant="h6">Kontakt Studienleitung</Typography>
      <Typography variant="body2">Prof. Dr.-Ing. Jörg Abke</Typography>
      <Typography variant="body2">Technische Hochschule Aschaffenburg</Typography>
      <Typography variant="body2">Würzburger Straße 45, 63743 Aschaffenburg</Typography>
      <Typography variant="body2">Tel.: 06021 4206 883</Typography>
      <Typography variant="body2">
        <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>E-Mail:</Typography>{' '}
        <Link href="mailto:joerg.abke@th-ab.de">joerg.abke@th-ab.de</Link>
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">
        3. Einverständniserklärung zur Teilnahme und Verwendung personenbezogener Daten
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Ich habe die Studieninformationen und die beigefügten Datenschutzhinweise gelesen und verstanden. Außerdem hatte ich ausreichend Gelegenheit, Fragen (z. B. zu Inhalt, Ziel, Verlauf und Risiken) zu stellen. Diese wurden mir ggf. verständlich beantwortet." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Mir ist bewusst, dass meine Teilnahme an der Studie vollkommen freiwillig ist und ich bei einer Verweigerung meiner Einwilligung keinerlei Nachteile erleide. Meine Einwilligung kann ich jederzeit mit Wirkung für die Zukunft widerrufen, ohne dass dies einer Begründung bedarf oder mir daraus irgendwelche Nachteile entstehen." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Ich bin mit der Erhebung, Verarbeitung, Speicherung und Weitergabe meiner personenbezogenen Daten entsprechend der Beschreibungen zum oben bezeichneten Forschungsvorhaben einverstanden." />
        </ListItem>
      </List>
    </>
  )
}

export default PrivacyPolicy
