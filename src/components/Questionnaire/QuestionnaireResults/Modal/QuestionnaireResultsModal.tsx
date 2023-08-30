import React, {useEffect, useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {useTranslation} from 'react-i18next';
import {
    DefaultBox as Box,
    DefaultButton as Button,
    DefaultModal as Modal,
    DefaultStepper as Stepper,
    DefaultStep as Step,
    DefaultStepButton as StepButton,
    DefaultIconButton as IconButton,
    DefaultStack as Stack,
    DefaultTypography as Typography
} from '@common/components'
import {usePersistedStore, useStore} from "@store";
import {ILS, ListK} from "@core";
import { Link } from 'react-router-dom';
import log from 'loglevel';

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
};

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
};

type QuestionnaireResultsModalProps = {
    open?: boolean;
    handleClose?: () => void;
    activeStepForTesting?: number
};

export const QuestionnaireResultsModal = ({open = false, handleClose, activeStepForTesting=0}: QuestionnaireResultsModalProps) => {
    const {t} = useTranslation();
    const fetchUser = usePersistedStore((state) => state.fetchUser);
    const fetchILS = useStore((state) => state.fetchILS);
    const fetchListK = useStore((state) => state.fetchListK);

    const steps = [
        t('components.Questionnaire.QuestionnaireResults.Text.ResultDescriptionILS.ILSResults'),
        t('components.Questionnaire.QuestionnaireResults.Text.ResultDescriptionILS.ListKResults')
    ];

    const [activeStep, setActiveStep] = useState(activeStepForTesting);
    const [ilsData, setILSData] = useState<ILS | null>(null); // Initialize with null
    const [listkData, setListKData] = useState<ListK | null>(null); // Initialize with null

    useEffect(() => {
        fetchUser().then((user) => {
            fetchILS(user.settings.user_id, user.lms_user_id, user.id).then((data) => {
                setILSData(data);
            }).catch((error) => {
                log.error(error);
            })
            fetchListK(user.settings.user_id, user.lms_user_id, user.id).then((data) => {
                setListKData(data);
            }).catch((error) => {
                log.error(error);
            })
        }).catch((error) => {
            log.error(error);
        })
    }, []);

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

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
                                            setActiveStep(index);
                                        }}>
                                        {label}
                                    </StepButton>
                                </Step>
                            ))}
                        </Stepper>
                        <Stack direction="column" justifyContent="space-between" alignItems="stretch">
                            <div>
                                {activeStep === 0 && ilsData ? (
                                    <div data-testid={'ActiveStepILS'}>
                                        <Stack direction="column" justifyContent="space-between" alignItems="stretch" m={2}>
                                            <div>
                                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                    <GraphILS data={ilsData}/>
                                                    <TableILS data={ilsData}/>
                                                </Stack>
                                            </div>
                                            <div>
                                                <ResultDescriptionILS data={ilsData}/>
                                            </div>
                                        </Stack>
                                    </div>
                                ) : activeStep === 1 && listkData ? (
                                    <div data-testid={'ActiveStepListK'}>
                                        <Stack direction="column" justifyContent="space-between" alignItems="stretch" m={2}>
                                            <div>
                                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                    <GraphListK data={listkData}/>
                                                    <TableListK data={listkData}/>
                                                </Stack>
                                            </div>
                                            <div>
                                                <ResultDescriptionListK data={listkData}/>
                                            </div>
                                        </Stack>
                                    </div>
                                ) : activeStep === 0 ? (
                                    <Stack alignItems="center">
                                        <div data-testid={'ActiveStepILSNoData'}>
                                            <Typography variant="body2">
                                                {t("components.Questionnaire.QuestionnaireResults.Modal.NoData.Part1")}
                                                <ul>
                                                    <li>
                                                        <Link to="/questionnaire_ils_short" onClick={handleClose}>
                                                            {t("components.Questionnaire.QuestionnaireResults.Modal.NoData.ILSShort.Part1")}
                                                        </Link> {t("components.Questionnaire.QuestionnaireResults.Modal.NoData.ILSShort.Part2")}
                                                    </li>
                                                    <li>
                                                        <Link to="/questionnaire_ils_long" onClick={handleClose}>
                                                            {t("components.Questionnaire.QuestionnaireResults.Modal.NoData.ILSLong.Part1")}
                                                        </Link>
                                                    </li>
                                                </ul>
                                                {t("components.Questionnaire.QuestionnaireResults.Modal.NoData.Part2")}
                                            </Typography>
                                        </div>
                                    </Stack>
                                ) : activeStep === 1 ? (
                                    <Stack alignItems="center">
                                        <div data-testid={'ActiveStepListKNoData'}>
                                            <Typography variant="body2">
                                                {t("components.Questionnaire.QuestionnaireResults.Modal.NoData.Part1")}
                                                <ul>
                                                    <li>
                                                        <Link to="/questionnaire_listk" onClick={handleClose}>
                                                            {t("components.Questionnaire.QuestionnaireResults.Modal.NoData.ListK")}
                                                        </Link>
                                                    </li>
                                                </ul>
                                                {t("components.Questionnaire.QuestionnaireResults.Modal.NoData.Part2")}
                                            </Typography>
                                        </div>
                                    </Stack>
                                ) : null}
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
    );
};
