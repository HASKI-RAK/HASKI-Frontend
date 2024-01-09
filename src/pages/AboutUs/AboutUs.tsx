import { TextCardLeft, TextCardRight, TextStepper, ImageCollection } from '@components'

const AboutUs = () => {
  return (
    <>
      <TextCardLeft
        header="wer ist haski"
        body="HASKI ist ein Verbundprojekt der drei bayerischen Hochschulen OTH Regensburg, TH Aschaffenburg & HS Kempten und umfasst ein Team von über 20 Professorinnen, wissenschaftlichen Mitarbeiterinnen, studentischen Hilfskräften und an der Verwaltung beteiligten Personen."
        backgroundImageURL="/LogoPng.png">
        <ImageCollection
          leftImgURL="/images/AboutUsRegensburg.jpg"
          middleImgURL="/images/AboutUsAschaffenburg.jpg"
          rightImgURL="/images/AboutUsKempten.jpg"
        />
      </TextCardLeft>
      <TextStepper header="warum haski" />
      <TextCardRight header="re" />
      <TextCardLeft header="ab" />
      <TextCardRight header="ke" />
      <div>interdisziplinäres arbeiten</div>x
    </>
  )
}

export default AboutUs
