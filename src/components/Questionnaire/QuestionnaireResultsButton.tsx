import * as React from 'react';
import Box from '@mui/material/Box';
import {DefaultButton as Button} from "@common/components";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Modal from '@mui/material/Modal';
import {TableILS} from './TableILS';
import {TableListK, GraphILS, GraphListK, ResultDescriptionILS, ResultDescriptionListK} from "@components";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Stack} from "@mui/material";
import {useTranslation} from "react-i18next";


const styleButtonClose = {
    position: 'relative',
    left: '97%',
    bottom: '10px',
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
    p: 2,
};

export function QuestionnaireResultsButton() {
    const {t} = useTranslation();

    const steps = [t("components.QuestionnaireResults.ResultDescriptionILS.ILSResults"), t("components.QuestionnaireResults.ResultDescriptionILS.ListKResults")];
    const [open, setOpen] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);

    const handleBack = () => {
        setActiveStep(activeStep === 1 ? activeStep - 1 : activeStep);
    };

    const handleNext = () => {
        setActiveStep(activeStep === 0 ? activeStep + 1 : activeStep);

    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant="contained"
                    color="primary"
                    onClick={handleOpen}>{t("components.QuestionnaireResults.QuestionnaireResultsButton.ButtonText")}
            </Button>
            <Modal
                id={"myModal"}
                open={open}
                onClose={handleClose}
            >
                <div>
                <Box sx={styleBox}>
                    <IconButton color="primary" sx={styleButtonClose}>
                        <CloseIcon onClick={handleClose}/>
                    </IconButton>
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label}>
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
                                <div>
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
                                        <ResultDescriptionILS/>
                                    </Stack>
                                </div>) : (
                                <div>
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
                                        <ResultDescriptionListK/>
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
                            disabled={activeStep === 0}
                        >
                            {t("Back")}
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
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