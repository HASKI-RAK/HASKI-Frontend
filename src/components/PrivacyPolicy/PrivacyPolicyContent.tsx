import {DefaultTypography as Typography, DefaultLink as Link, DefaultDivider as Divider} from '@common/components'
import {List, ListItem, ListItemText, ListItemIcon} from '@mui/material'
import {FiberManualRecord} from '@mui/icons-material';

export const PrivacyPolicyContent = () => {
    return (
        <>
            <Typography variant="h4">Datenschutzerklärung</Typography>
            <Typography paragraph variant="body2"/>
            <Divider/>
            <Typography variant="h6">1. Informationen zur Studie</Typography>
            <Typography variant="body2"> Im Rahmen des HASKI-Projekts beschäftigten sich die OTH Regensburg, HS Kempten und die TH
                Aschaffenburg
                damit, wie künstliche Intelligenz zur Unterstützung von Studierenden beim Lernen eingesetzt werden kann. Ziel des
                Projekts ist es, ein adaptives Learning Management System zu erstellen, welches die Lernenden mit den für sie bestmöglichen
                Lernmaterialien versorgt. Die erste Version dieses Systems, bezeichnet als HASKI Alpha, soll nun getestet werden im
                Hinblick auf den Einfluss von lernstilbasierten Lernpfaden auf die Motivation, das Interesse und den Wissensstand der
                teilnehmenden Studierenden. Der Fokus liegt dabei auf den unterschiedlichen Algorithmen, welche den Lernpfaden zugrunde
                liegen. Diese Vorgehensweise wird in der Ihnen vorliegenden Studie erstmals eingesetzt und getestet.</Typography>
            <Typography paragraph variant="body2"/>
            <Divider/>
            <Typography variant="h6">2. Hinweise zum Datenschutz</Typography>
            <Typography variant="body2"> Im Folgenden informieren wir Sie über den datenschutzrechtskonformen Umgang mit Ihren
                personenbezogenen Daten. Bei Rückfragen oder Verständnisschwierigkeiten wenden Sie sich an den Studienleiter.
                Wir danken Ihnen für Ihre Mitwirkung und Ihr Vertrauen in unsere Arbeit! Wir arbeiten nach den Vorschriften der
                Datenschutz-Grundverordnung und allen anderen datenschutzrechtlichen Bestimmungen. Im Rahmen dieser Studie werden
                folgende Daten erhoben:
            </Typography>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <FiberManualRecord/>
                    </ListItemIcon>
                    <ListItemText primary="Vor- und Nachname"/>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <FiberManualRecord/>
                    </ListItemIcon>
                    <ListItemText primary="Learning Analytics"/>
                </ListItem>
            </List>
            <Typography variant="body2">Diese Daten möchten wir wie im Folgenden dargelegt einsetzen:</Typography>
            <Typography paragraph variant="body2"/>
            <Typography variant="h6">Datenerhebung</Typography>
            <Typography variant="body2">Die Datenerhebungen werden von entsprechend geschulten MitarbeiterInnen des HASKI-Projekts betreut
                und online mittels Moodle und dem HASKI-System durchgeführt. Bei Fragen zum jeweiligen Erhebungsverfahren oder bezüglich
                weiterführender Informationen können Sie sich jederzeit an die nachfolgend genannten Kontaktpersonen wenden. Die erhobenen
                Daten werden im weiteren Verlauf ausschließlich vertraulich verarbeitet.</Typography>
            <Typography paragraph variant="body2"/>
            <Typography variant="h6">Datenverarbeitung</Typography>
            <Typography variant="body2"> Nach Aufzeichnung werden die Daten durch wissenschaftliche MitarbeiterInnen des HASKI-Projekts
                ausgewertet. Die für die Datenauswertung verantwortlichen wissenschaftlichen MitarbeiterInnen stehen in keinem
                Interessenskonflikt mit den teilnehmenden Personen (z.B. Bewertungssituation). Im Rahmen der Auswertungen werden auch
                Abschriften und/oder Kopien der Daten erstellt. Diese Abschriften und Kopien werden anonymisiert, d. h., es werden sämtliche
                Namen und sonstigen Hinweise, die Rückschlüsse auf Sie als Person ermöglichen könnten, entfernt.</Typography>
            <Typography paragraph variant="body2"/>
            <Typography variant="h6">Aufbewahrung und Zugriff</Typography>
            <Typography variant="body2">
                Die Daten werden in digitaler Form geschützt auf dem Server des HASKI-Projekts aufbewahrt und nur berechtigten
                MitarbeiterInnen des HASKI-Projekts zugänglich gemacht. Die in dieser Studie erhobenen Daten werden im Sinne guter
                wissenschaftlicher Praxis in anonymisierter Form in einem vertrauenswürdigen Archiv aufbewahrt und von anderen
                WissenschaftlerInnen genutzt. Die anonymisierten Daten werden unter kontrollierten Bedingungen auch im Rahmen der Lehre
                eingesetzt. Seitens des Projekts HASKI werden Ihre Daten für maximal 10 Jahre aufbewahrt und nach Ablauf dieses Zeitraums
                unwiederbringlich gelöscht.
            </Typography>
            <Typography paragraph variant="body2"/>
            <Typography variant="h6">Veröffentlichung</Typography>
            <Typography variant="body2">
                Die Veröffentlichung von Forschungsergebnissen in Publikationen oder auf Tagungen erfolgt ausschließlich in anonymisierter
                Form und lässt zu keinem Zeitpunkt Rückschlüsse auf Sie als Person zu. Es erfolgt keine Veröffentlichung von
                personenbezogenen Daten (z. B. Name, Kontaktdaten).
            </Typography>
            <Typography variant="body2">Sie haben jederzeit die Möglichkeit folgende Rechte geltend zu machen:</Typography>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <FiberManualRecord fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Art. 7 Abs. 3 DSGVO - Recht auf Widerruf der Einwilligung: Sie haben das Recht, Ihre Einwilligung
                    jederzeit mit Wirkung für die Zukunft zu widerrufen."/>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <FiberManualRecord fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Art. 15 DSGVO - Auskunftsrecht: Sie haben uns gegenüber das Recht, Auskunft darüber zu erhalten,
                    welche Daten wir zu Ihrer Person verarbeiten."/>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <FiberManualRecord fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Art. 16 DSGVO - Recht auf Berichtigung: Sollten die Sie betreffenden Daten nicht richtig oder
                    unvollständig sein, so können Sie die Berichtigung unrichtiger oder die Vervollständigung unvollständiger Angaben
                    verlangen."/>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <FiberManualRecord fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Art. 17 DSGVO - Recht auf Löschung: Sie können jederzeit die Löschung Ihrer Daten verlangen."/>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <FiberManualRecord fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Art. 18 DSGVO - Recht auf Einschränkung der Verarbeitung: Sie können die Einschränkung der
                    Verarbeitung der Sie betreffenden personenbezogenen Daten verlangen."/>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <FiberManualRecord fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Art. 21 DSGVO - Widerspruchsrecht:  Sie können jederzeit gegen die Verarbeitung der Sie
                    betreffenden Daten Widerspruch einlegen."/>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <FiberManualRecord fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Art. 77 DSGVO - Recht auf Beschwerde bei einer Aufsichtsbehörde: Wenn Sie der Auffassung sind,
                    dass wir bei der Verarbeitung Ihrer Daten datenschutzrechtliche Vorschriften nicht beachtet haben, können Sie sich mit
                    einer Beschwerde an die zuständige Aufsichtsbehörde wenden, die Ihre Beschwerde prüfen wird."/>
                </ListItem>
            </List>
            <Typography variant="body2">In jedem Fall gilt: Ihre Teilnahme an den Erhebungen ist freiwillig. Sie haben jederzeit die
                Möglichkeit zu widerrufen. Durch Verweigerung oder Widerruf entstehen Ihnen keine Nachteile.</Typography>
            <Typography variant="body2">Für die Einhaltung der Datenschutzbestimmungen ist im Falle der vorliegenden Studie die HS Kempten
                verantwortlich.</Typography>
            <Typography paragraph variant="body2"/>
            <Typography variant="body2">Bei Rückfragen zur Studie, wenden Sie sich bitte an den Versuchsleiter. Im Falle dieser Studie handelt es sich dabei um:</Typography>
            <Typography variant="body2"/>
            <Typography variant="body2">Jim Haug (HS Kempten)</Typography>
            <Typography variant="body2">Bahnhofstraße 61</Typography>
            <Typography variant="body2">D - 87435 Kempten</Typography>
            <Typography variant="body2">
                <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>E-Mail:</Typography>{' '}
                <Link href="mailto:jim.haug@hs-kempten.de">jim.haug@hs-kempten.de</Link>
            </Typography>
            <Typography paragraph variant="body2"/>
            <Typography variant="body2">Bei Rückfragen bezüglich datenschutzrechtlicher Themen, wenden Sie sich bitte an den
                Datenschutzbeauftragten. Dieser ist unter den folgenden Kontaktdaten erreichbar:</Typography>
            <Typography paragraph variant="body2"/>
            <Typography variant="body2">Datenschutzbeauftragter der Hochschule Kempten</Typography>
            <Typography variant="body2">Bahnhofstraße 61</Typography>
            <Typography variant="body2">D - 87435 Kempten</Typography>
            <Typography variant="body2">Fax: 0831 2523-9283</Typography>
            <Typography variant="body2">
                <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>E-Mail:</Typography>{' '}
                <Link href="mailto:Datenschutz@hs-kempten.de">Datenschutz@hs-kempten.de</Link>
            </Typography>
            <Typography paragraph variant="body2"/>
        </>
    )
}
