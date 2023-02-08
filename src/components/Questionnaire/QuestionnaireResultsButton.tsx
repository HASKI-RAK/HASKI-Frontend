import * as React from 'react';
import Box from '@mui/material/Box';
import {DefaultButton as Button} from "@common/components";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Modal from '@mui/material/Modal';
import {TableILS} from './TableILS';
import {TableListK} from "./TableListK";
import {GraphILS} from "./GraphILS";
import {GraphListK} from "./GraphListK";
import {ResultDescILS} from "./ResultDescriptionILS";
import {ResultDescListK} from "./ResultDescriptionListK";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Stack} from "@mui/material";
import {useTranslation} from "react-i18next";


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

export const QuestionnaireResultsButton = () => {
    const {t} = useTranslation();

    const steps = [t("components.QuestionnaireResults.ResultDescriptionILS.ILSResults"), t("components.QuestionnaireResults.ResultDescriptionILS.ListKResults")];
    const [open, setOpen] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);

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
                    data-testid={"QuestionnaireResultsButton"}>{t("components.QuestionnaireResults.QuestionnaireResultsButton.ButtonText")}
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
                                <React.Fragment>
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
                                                    <ResultDescILS/>
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
                                                    <ResultDescListK/>
                                                </div>
                                            </Stack>
                                        </div>)}
                                </React.Fragment>
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