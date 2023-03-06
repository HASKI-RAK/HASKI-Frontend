import {useState} from 'react';
import Box from '@mui/material/Box';
import {DefaultButton as Button} from "@common/components";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Stack} from "@mui/material";
import {useTranslation} from "react-i18next";

//Can not shorten import, tests fail to recognize i18n.use...
import {GraphListK} from "./GraphListK";
import {TableListK} from "./TableListK";
import {ResultDescriptionILS} from "./ResultDescriptionILS";
import {ResultDescriptionListK} from "./ResultDescriptionListK";
import {GraphILS} from "./GraphILS";
import {TableILS} from './TableILS';

const styleButtonClose = {
    position: 'sticky',
    left: '99%',
    top: '1%',
    p: 2,
}

const styleBox = {
    position: 'absolute',
    left: '8%',
    right: '8%',
    top: '5%',
    overflow: 'auto',
    maxHeight: '83%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
};

export const QuestionnaireResultsModal = () => {
    const {t} = useTranslation();

    const steps = [t("components.QuestionnaireResults.ResultDescriptionILS.ILSResults"), t("components.QuestionnaireResults.ResultDescriptionILS.ListKResults")];
    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);

    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant="contained"
                    color="primary"
                    onClick={handleOpen}
                    data-testid={"QuestionnaireResultsButton"}>{t("components.QuestionnaireResults.QuestionnaireResultsModal.ButtonText")}
            </Button>
            <Modal
                id={"myModal"}
                open={open}
                onClose={handleClose}
            >
                <div>
                    <Box sx={styleBox}>
                        <IconButton color="primary" sx={styleButtonClose} onClick={handleClose} data-testid={"QuestionnaireResultsCloseButton"}>
                            <CloseIcon/>
                        </IconButton>
                        <Stepper nonLinear activeStep={activeStep}>
                            {steps.map((label, index) => (
                                <Step key={label} data-testid={"StepperButton"}>
                                    <StepButton color="inherit" onClick={() => {
                                        setActiveStep(index);
                                        handleOpen();
                                    }}>
                                        {label}
                                    </StepButton>
                                </Step>
                            ))}
                        </Stepper>
                        <Stack
                            direction="column"
                            justifyContent="space-between"
                            alignItems="stretch"
                        >
                            <div>
                                <>
                                    {activeStep === 0 ? (
                                        <div data-testid={"ActiveStepILS"}>
                                            <Stack
                                                direction="column"
                                                justifyContent="space-between"
                                                alignItems="stretch"
                                                m={2}
                                            >
                                                <div>
                                                    <Stack direction="row"
                                                           justifyContent="space-between"
                                                           alignItems="center"
                                                    >
                                                        <GraphILS/>
                                                        <TableILS/>
                                                    </Stack>
                                                </div>
                                                <div>
                                                    <ResultDescriptionILS/>
                                                </div>
                                            </Stack>
                                        </div>) : (
                                        <div data-testid={"ActiveStepListK"}>
                                            <Stack direction="column"
                                                   justifyContent="space-between"
                                                   alignItems="stretch"
                                                   m={2}
                                            >
                                                <div>
                                                    <Stack direction="row"
                                                           justifyContent="space-between"
                                                           alignItems="center"
                                                    >
                                                        <GraphListK/>
                                                        <TableListK/>
                                                    </Stack>
                                                </div>
                                                <div>
                                                    <ResultDescriptionListK/>
                                                </div>
                                            </Stack>
                                        </div>)}
                                </>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    m={2}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleBack}
                                        data-testid="backButton"
                                        disabled={activeStep === 0}
                                    >
                                        {t("Back")}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        data-testid="nextButton"
                                        disabled={activeStep === 1}
                                    >
                                        {t("Next")}
                                    </Button>
                                </Stack>
                            </div>
                        </Stack>
                    </Box>
                </div>
            </Modal>
        </div>
    );
}