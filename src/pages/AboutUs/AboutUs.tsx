import { TextCardLeft, TextCardRight, TextStepper, ImageCollection } from '@components'

const AboutUs = () => {
  return (
    <>
      <TextCardLeft header="wer ist haski" body="o  o i o  o">
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
