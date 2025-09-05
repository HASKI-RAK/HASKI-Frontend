import { Grid, Paper, Step, StepButton, Stepper } from '@common/components'
import { useState, memo
 } from 'react'

 type GameSidePanelProps = {
   children: React.ReactNode
 }

 const GameSidePanel = ({ children }: GameSidePanelProps) => {
   const [activeStep, setActiveStep] = useState<number>(0)

   const handleStepClick = (step: number) => {
     setActiveStep(step)
   }

   return (
     <Grid container>
       <Grid item xs={9}>
         {children}
       </Grid>
     </Grid>
   )
 }

 export default memo(GameSidePanel)
