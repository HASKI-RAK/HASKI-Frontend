import * as React from 'react';
import Box from '@mui/material/Box';
import {DefaultButton as Button} from "@common/components";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Modal from '@mui/material/Modal';
import {TableILS} from './TableILS';
import {TableListK, GraphILS, GraphListK} from "@components";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Stack} from "@mui/material";

const steps = ['ILS Results', 'List K Results'];

const styleButtonClose = {
    position: 'relative',
    left: '98%',
    bottom: '20px',
}

const styleBox = {
    position: 'absolute',
    left: '10%',
    top: '5%',
    overflow: 'auto',
    maxHeight: '85%',
    width: '75%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const styleButtonNext = {
    position: 'relative',
    top: '10px',
}

const styleButtonBack = {
    position: 'relative',
    top: '10px',
}

export function QuestionnaireResultsButton() {
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
                    onClick={handleOpen}>Questionnaire Results
            </Button>
            <Modal
                id={"myModal"}
                open={open}
                onClose={handleClose}
            >
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
                    <div>
                        <React.Fragment>
                            {activeStep === 0 ? (
                                <div>
                                    <Stack
                                        direction="column"
                                        justifyContent="space-between"
                                        alignItems="stretch"
                                        spacing={1}
                                    >
                                        <Stack direction="row"
                                               justifyContent="space-between"
                                               alignItems="center"
                                               spacing={1}
                                        >
                                            <GraphILS/>
                                            <TableILS/>
                                        </Stack>
                                        HALLO
                                    </Stack>
                                </div>) : (
                                <div>
                                    <Stack direction="row"
                                           justifyContent="space-between"
                                           alignItems="center"
                                           spacing={1}
                                    >
                                        <GraphListK/>
                                        <TableListK/>
                                    </Stack>
                                </div>)}
                        </React.Fragment>
                    </div>
                    <Stack direction="row"
                           justifyContent="space-between"
                           alignItems="center"
                           spacing={1}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleBack}
                            sx={styleButtonBack}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            sx={styleButtonNext}
                        >
                            Next
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}


