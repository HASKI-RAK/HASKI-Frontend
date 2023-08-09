import {useState} from 'react'
import CloseIcon from '@mui/icons-material/Close'
import {useTranslation} from 'react-i18next'
import {
    DefaultBox as Box,
    DefaultButton as Button,
    DefaultModal as Modal,
    DefaultStepper as Stepper,
    DefaultStep as Step,
    DefaultStepButton as StepButton,
    DefaultIconButton as IconButton,
    DefaultStack as Stack
} from "@common/components";

//Can not shorten import, tests fail to recognize i18n.use...
import {GraphListK} from '../Graph/GraphListK'
import {TableListK} from '../Table/TableListK'
import {ResultDescriptionILS} from '../Text/ResultDescriptionILS'
import {ResultDescriptionListK} from '../Text/ResultDescriptionListK'
import {GraphILS} from '../Graph/GraphILS'
import {TableILS} from '../Table/TableILS'

const styleButtonClose = {
    position: 'sticky',
    left: '99%',
    top: '0%',
    p: 2
}

const styleBox = {
    position: 'absolute',
    left: '8%',
    right: '8%',
    top: '10%',
    overflow: 'auto',
    maxHeight: '83%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1
}

type QuestionnaireResultsModalProps = {
    open?: boolean
    handleClose?: () => void
}

export const QuestionnaireResultsModal = ({open = false, handleClose}: QuestionnaireResultsModalProps) => {
    const {t} = useTranslation()

    const steps = [
        t('components.Questionnaire.QuestionnaireResults.Text.ResultDescriptionILS.ILSResults'),
        t('components.Questionnaire.QuestionnaireResults.Text.ResultDescriptionILS.ListKResults')
    ]

    const [activeStep, setActiveStep] = useState(0)

    const handleBack = () => {
        setActiveStep(activeStep - 1)
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1)
    }

    return (
        <div>
            <Modal data-testid={'ILS and ListK Modal'} open={open} onClose={handleClose}>
                <div>
                    <Box sx={styleBox}>
                        <IconButton
                            color="primary"
                            sx={styleButtonClose}
                            onClick={handleClose}
                            data-testid={'QuestionnaireResultsCloseButton'}>
                            <CloseIcon/>
                        </IconButton>
                        <Stepper nonLinear activeStep={activeStep}>
                            {steps.map((label, index) => (
                                <Step key={label} data-testid={'StepperButton'}>
                                    <StepButton
                                        color="inherit"
                                        onClick={() => {
                                            setActiveStep(index)
                                        }}>
                                        {label}
                                    </StepButton>
                                </Step>
                            ))}
                        </Stepper>
                        <Stack direction="column" justifyContent="space-between" alignItems="stretch">
                            <div>
                                <>
                                    {activeStep === 0 ? (
                                        <div data-testid={'ActiveStepILS'}>
                                            <Stack direction="column" justifyContent="space-between" alignItems="stretch" m={2}>
                                                <div>
                                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                        <GraphILS/>
                                                        <TableILS/>
                                                    </Stack>
                                                </div>
                                                <div>
                                                    <ResultDescriptionILS/>
                                                </div>
                                            </Stack>
                                        </div>
                                    ) : (
                                        <div data-testid={'ActiveStepListK'}>
                                            <Stack direction="column" justifyContent="space-between" alignItems="stretch" m={2}>
                                                <div>
                                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                        <GraphListK/>
                                                        <TableListK/>
                                                    </Stack>
                                                </div>
                                                <div>
                                                    <ResultDescriptionListK/>
                                                </div>
                                            </Stack>
                                        </div>
                                    )}
                                </>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" m={2}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleBack}
                                        data-testid="backButton"
                                        disabled={activeStep === 0}>
                                        {t('Back')}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        data-testid="nextButton"
                                        disabled={activeStep === 1}>
                                        {t('Next')}
                                    </Button>
                                </Stack>
                            </div>
                        </Stack>
                    </Box>
                </div>
            </Modal>
        </div>
    )
}
