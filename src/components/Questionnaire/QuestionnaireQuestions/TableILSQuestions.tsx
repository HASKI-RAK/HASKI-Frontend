import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';
import {useTranslation} from 'react-i18next';
import MobileStepper from '@mui/material/MobileStepper';
import {Box, FormControlLabel, Radio, RadioGroup, Stack, Typography, useTheme} from "@mui/material";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import {DefaultButton as Button} from "@common/components";
import React, {useEffect, useState} from "react";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {styled} from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";
import {useQuestionnaireAnswersILSStore} from "@services";

const StyledTableCellQuestion = styled(TableCell)(() => ({
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: 'rgba(36,38,42,0.65)',
    },
}));

const styleButtonClose = {
    position: 'absolute',
    left: '75.5%',
    top: '1%',
    p: 2,
}

const StyledMobileStepper = styled(MobileStepper)(() => ({
    // Override the color of the progress bar here
    ['.css-187aqqa-MuiLinearProgress-bar1']: {
        ['background-color']: '#8d4446', // Change this to the desired color
    },
    /*[`& .MuiMobileStepper-progress`]: {
     'background-color': `linear-gradient(to right, #8d44486 0%, #ff0000 50%, #ffffff 50%, #ffffff 100%)`, // Change this to the desired colors and percentages
     },*/
}));

// Before reload or close window ask the user if he is sure
window.addEventListener("beforeunload", (e: BeforeUnloadEvent) => {
    // Cancel the event
    e.preventDefault();

    // Chrome requires returnValue to be set
    e.returnValue = "";
});

const stepsShortILS = [
    [
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-9"),
            questionLabel: "AR_3_F9",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-9.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-9.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-2"),
            questionLabel: "SI_1_F2",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-2.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-2.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-7"),
            questionLabel: "VV_2_F7",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-7.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-7.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-4"),
            questionLabel: "SG_1_F4",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-4.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-4.2")
        }
    ],
    [
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-13"),
            questionLabel: "AR_4_F13",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-13.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-13.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-14"),
            questionLabel: "SI_4_F14",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-14.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-14.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-19"),
            questionLabel: "VV_5_F19",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-19.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-19.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-8"),
            questionLabel: "SG_2_F8",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-8.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-8.2")
        }
    ],
    [
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-21"),
            questionLabel: "AR_6_F21",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-21.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-21.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-26"),
            questionLabel: "SI_7_F26",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-26.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-26.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-27"),
            questionLabel: "VV_7_F27",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-27.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-27.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-16"),
            questionLabel: "SG_4_F16",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-16.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-16.2")
        }
    ],
    [
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-25"),
            questionLabel: "AR_7_F25",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-25.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-25.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-38"),
            questionLabel: "SI_10_F38",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-38.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-38.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-39"),
            questionLabel: "VV_10_F39",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-39.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-39.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-40"),
            questionLabel: "SG_10_F40",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-40.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-40.2")
        }
    ],
    [
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-29"),
            questionLabel: "AR_8_F29",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-29.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-29.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-42"),
            questionLabel: "SI_11_F42",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-42.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-42.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-43"),
            questionLabel: "VV_11_F43",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-43.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-43.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-44"),
            questionLabel: "SG_11_F44",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-44.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-44.2")
        }
    ],
]

const stepsLongILS = [
    [
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-1"),
            questionLabel: "AR_1_F1",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-1.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-1.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-2"),
            questionLabel: "SI_1_F2",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-2.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-2.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-3"),
            questionLabel: "VV_1_F3",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-3.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-3.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-4"),
            questionLabel: "SG_1_F4",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-4.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-4.2")
        }
    ],
    [
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-5"),
            questionLabel: "AR_2_F5",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-5.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-5.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-6"),
            questionLabel: "SI_2_F6",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-6.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-6.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-7"),
            questionLabel: "VV_2_F7",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-7.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-7.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-8"),
            questionLabel: "SG_2_F8",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-8.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-8.2")
        }
    ],
    [
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-9"),
            questionLabel: "AR_3_F9",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-9.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-9.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-10"),
            questionLabel: "SI_3_F10",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-10.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-10.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-11"),
            questionLabel: "VV_3_F11",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-11.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-11.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-12"),
            questionLabel: "SG_3_F12",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-12.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-12.2")
        }
    ],
    [
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-13"),
            questionLabel: "AR_4_F13",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-13.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-13.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-14"),
            questionLabel: "SI_4_F14",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-14.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-14.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-15"),
            questionLabel: "VV_4_F15",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-15.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-15.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-16"),
            questionLabel: "SG_4_F16",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-16.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-16.2")
        }
    ],
    [
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-17"),
            questionLabel: "AR_5_F17",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-17.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-17.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-18"),
            questionLabel: "SI_5_F18",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-18.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-18.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-19"),
            questionLabel: "VV_5_F19",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-19.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-19.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-20"),
            questionLabel: "SG_5_F20",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-20.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-20.2")
        }
    ],
    [
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-21"),
            questionLabel: "AR_6_F21",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-21.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-21.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-22"),
            questionLabel: "SI_6_F22",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-22.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-22.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-23"),
            questionLabel: "VV_6_F23",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-23.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-23.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-24"),
            questionLabel: "SG_6_F24",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-24.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-24.2")
        }
    ],
    [
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-25"),
            questionLabel: "AR_7_F25",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-25.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-25.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-26"),
            questionLabel: "SI_7_F26",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-26.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-26.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-27"),
            questionLabel: "VV_7_F27",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-27.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-27.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-28"),
            questionLabel: "SG_7_F28",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-28.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-28.2")
        }
    ],
    [
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-29"),
            questionLabel: "AR_8_F29",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-29.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-29.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-30"),
            questionLabel: "SI_8_F30",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-30.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-30.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-31"),
            questionLabel: "VV_8_F31",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-31.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-31.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-32"),
            questionLabel: "SG_8_F32",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-32.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-32.2")
        }
    ],
    [
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-33"),
            questionLabel: "AR_9_F33",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-33.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-33.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-34"),
            questionLabel: "SI_9_F34",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-34.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-34.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-35"),
            questionLabel: "VV_9_F35",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-35.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-35.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-36"),
            questionLabel: "SG_9_F36",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-36.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-36.2")
        }
    ],
    [
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-37"),
            questionLabel: "AR_10_F37",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-37.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-37.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-38"),
            questionLabel: "SI_10_F38",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-38.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-38.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-39"),
            questionLabel: "VV_10_F39",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-39.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-39.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-40"),
            questionLabel: "SG_10_F40",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-40.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-40.2")
        }
    ],
    [
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-41"),
            questionLabel: "AR_11_F41",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-41.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-41.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-42"),
            questionLabel: "SI_11_F42",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-42.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-42.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-43"),
            questionLabel: "VV_11_F43",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-43.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-43.2"),
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-44"),
            questionLabel: "SG_11_F44",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-44.1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-44.2")
        }
    ]
];


export const TableILSQuestions = (ilsLong: boolean) => {

    const {t} = useTranslation();

    const navigate = useNavigate();
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [radioButton1, setRadioButton1] = useState("");
    const [radioButton2, setRadioButton2] = useState("");
    const [radioButton3, setRadioButton3] = useState("");
    const [radioButton4, setRadioButton4] = useState("");
    const isNextDisabled = !radioButton1 || !radioButton2 || !radioButton3 || !radioButton4;

    const { questionnaireAnswers, setQuestionnaireAnswers } = useQuestionnaireAnswersILSStore();


    type ILStype = { question_id: string, answer: string };
    //const shortILSarray: ILStype[] = [];
    //const [longILSarray, setLongILSarray] = useState<ILStype[]>([]);

    useEffect(() => {
        //console.log(longILSarray);
        console.log(questionnaireAnswers)
    }, [questionnaireAnswers]);


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if(ilsLong) {
            setRadioButton1(handleBackAndNext(stepsLongILS[activeStep+1][0]));
            setRadioButton2(handleBackAndNext(stepsLongILS[activeStep+1][1]));
            setRadioButton3(handleBackAndNext(stepsLongILS[activeStep+1][2]));
            setRadioButton4(handleBackAndNext(stepsLongILS[activeStep+1][3]));
        }
        else{
            setRadioButton1(handleBackAndNext(stepsShortILS[activeStep+1][0]));
            setRadioButton2(handleBackAndNext(stepsShortILS[activeStep+1][1]));
            setRadioButton3(handleBackAndNext(stepsShortILS[activeStep+1][2]));
            setRadioButton4(handleBackAndNext(stepsShortILS[activeStep+1][3]));
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        if(ilsLong){
            setRadioButton1(handleBackAndNext(stepsLongILS[activeStep-1][0]));
            setRadioButton2(handleBackAndNext(stepsLongILS[activeStep-1][1]));
            setRadioButton3(handleBackAndNext(stepsLongILS[activeStep-1][2]));
            setRadioButton4(handleBackAndNext(stepsLongILS[activeStep-1][3]));
        }
        else{
            setRadioButton1(handleBackAndNext(stepsShortILS[activeStep-1][0]));
            setRadioButton2(handleBackAndNext(stepsShortILS[activeStep-1][1]));
            setRadioButton3(handleBackAndNext(stepsShortILS[activeStep-1][2]));
            setRadioButton4(handleBackAndNext(stepsShortILS[activeStep-1][3]));
        }

    };

    const handleFinish = () => {
        // TODO: Send the answers to the database
    }

    const handleBackAndNext = (ilsStep:{ question: string, questionLabel: string, answer1: string, answer2: string }) => {

        //this returns a or b
        if(questionnaireAnswers[ilsStep.questionLabel as keyof typeof questionnaireAnswers] === "a"){
            return ilsStep.answer1
        }
        else if(questionnaireAnswers[ilsStep.questionLabel as keyof typeof questionnaireAnswers] === "b"){
            return ilsStep.answer2
        }
        else{
            return ""
        }
    }

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>, ilsStep: { question: string, questionLabel: string, answer1: string, answer2: string }) => {
        const radioButtonOptions = [ilsStep.answer1, ilsStep.answer2];
        let selectedAnswer = "";
        if(radioButtonOptions.indexOf(event.target.value) === 0){
            selectedAnswer = "a";
        }
        else{
            selectedAnswer = "b";
        }

        /*
        if(longILSarray.find(element => element.question_id === ilsStep.questionLabel)){
            longILSarray.find(element => element.question_id === ilsStep.questionLabel)!.answer = selectedAnswer.toString();
        }
        else{
            const newILSArray = [
                ...longILSarray.filter((item) => item.question_id !== ilsStep.questionLabel),
                { question_id: ilsStep.questionLabel, answer: selectedAnswer.toString() },
            ];
            setLongILSarray(newILSArray);
        }*/

        setQuestionnaireAnswers(ilsStep.questionLabel , selectedAnswer.toString() );
    };

    const onClickClose = () => {
        if(window.confirm("Do you really want to cancel the Questionnaire?")) {
            navigate('/');
        }
    }

    const LongIls = () => {
        return (<TableBody key={"TableILSBody"}>
            <TableRow>
                <StyledTableCellQuestion align="left"
                                         style={{color: theme.palette.common.white}}><Typography
                    variant={"h5"}>{t(stepsLongILS[activeStep][0].question)}</Typography></StyledTableCellQuestion>
            </TableRow>
            <TableRow>
                <TableCell>
                    <RadioGroup
                        value={radioButton1}
                        name={stepsLongILS[activeStep][0].questionLabel}
                        onChange={e => {
                            setRadioButton1(e.target.value);
                            handleRadioChange(e, stepsLongILS[activeStep][0])
                        }}
                    >
                        <FormControlLabel value={stepsLongILS[activeStep][0].answer1} control={<Radio/>}
                                          label={<Typography variant={"h6"}>{t(stepsLongILS[activeStep][0].answer1)}</Typography>}/>
                        <FormControlLabel value={stepsLongILS[activeStep][0].answer2} control={<Radio/>}
                                          label={<Typography variant={"h6"}>{t(stepsLongILS[activeStep][0].answer2)}</Typography>}/>
                    </RadioGroup>
                </TableCell>
            </TableRow>
            <TableRow>
                <StyledTableCellQuestion align="left"
                                         style={{color: theme.palette.common.white}}><Typography
                    variant={"h5"}>{t(stepsLongILS[activeStep][1].question)}</Typography></StyledTableCellQuestion>
            </TableRow>
            <TableRow>
                <TableCell>
                    <RadioGroup
                        value={radioButton2}
                        onChange={e => {
                            setRadioButton2(e.target.value);
                            handleRadioChange(e, stepsLongILS[activeStep][1])
                        }}
                        name={stepsLongILS[activeStep][1].questionLabel}
                    >
                        <FormControlLabel value={stepsLongILS[activeStep][1].answer1} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsLongILS[activeStep][1].answer1)}</Typography>}/>
                        <FormControlLabel value={stepsLongILS[activeStep][1].answer2} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsLongILS[activeStep][1].answer2)}</Typography>}/>
                    </RadioGroup>
                </TableCell>
            </TableRow>
            <TableRow>
                <StyledTableCellQuestion align="left"
                                         style={{color: theme.palette.common.white}}><Typography
                    variant={"h5"}>{t(stepsLongILS[activeStep][2].question)}</Typography></StyledTableCellQuestion>
            </TableRow>
            <TableRow>
                <TableCell>
                    <RadioGroup
                        value={radioButton3}
                        onChange={e => {
                            setRadioButton3(e.target.value);
                            handleRadioChange(e, stepsLongILS[activeStep][2])
                        }}
                        name={stepsLongILS[activeStep][2].questionLabel}
                    >
                        <FormControlLabel value={stepsLongILS[activeStep][2].answer1} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsLongILS[activeStep][2].answer1)}</Typography>}/>
                        <FormControlLabel value={stepsLongILS[activeStep][2].answer2} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsLongILS[activeStep][2].answer2)}</Typography>}/>
                    </RadioGroup>
                </TableCell>
            </TableRow>
            <TableRow>
                <StyledTableCellQuestion align="left"
                                         style={{color: theme.palette.common.white}}><Typography
                    variant={"h5"}>{t(stepsLongILS[activeStep][3].question)}</Typography></StyledTableCellQuestion>
            </TableRow>
            <TableRow>
                <TableCell>
                    <RadioGroup
                        value={radioButton4}
                        onChange={e => {
                            setRadioButton4(e.target.value);
                            handleRadioChange(e, stepsLongILS[activeStep][3])
                        }}
                        name={stepsLongILS[activeStep][3].questionLabel}
                    >
                        <FormControlLabel value={stepsLongILS[activeStep][3].answer1} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsLongILS[activeStep][3].answer1)}</Typography>}/>
                        <FormControlLabel value={stepsLongILS[activeStep][3].answer2} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsLongILS[activeStep][3].answer2)}</Typography>}/>
                    </RadioGroup>
                </TableCell>
            </TableRow>
        </TableBody>)
    }


    const ShortIls = () => {
        return (<TableBody key={"TableILSBody"}>
            <TableRow>
                <StyledTableCellQuestion align="left"
                                         style={{color: theme.palette.common.white}}><Typography
                    variant={"h5"}>{t(stepsShortILS[activeStep][0].question)}</Typography></StyledTableCellQuestion>
            </TableRow>
            <TableRow>
                <TableCell>
                    <RadioGroup
                        value={radioButton1}
                        onChange={e => {
                            setRadioButton1(e.target.value);
                            handleRadioChange(e, stepsShortILS[activeStep][0])
                        }}
                        name="Question1-radio-buttons-group"
                    >
                        <FormControlLabel value={stepsShortILS[activeStep][0].answer1} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsShortILS[activeStep][0].answer1)}</Typography>}/>
                        <FormControlLabel value={stepsShortILS[activeStep][0].answer2} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsShortILS[activeStep][0].answer2)}</Typography>}/>
                    </RadioGroup>
                </TableCell>
            </TableRow>
            <TableRow>
                <StyledTableCellQuestion align="left"
                                         style={{color: theme.palette.common.white}}><Typography
                    variant={"h5"}>{t(stepsShortILS[activeStep][1].question)}</Typography></StyledTableCellQuestion>
            </TableRow>
            <TableRow>
                <TableCell>
                    <RadioGroup
                        value={radioButton2}
                        onChange={e => {
                            setRadioButton2(e.target.value);
                            handleRadioChange(e, stepsShortILS[activeStep][1])
                        }}
                        name="Question1-radio-buttons-group"
                    >
                        <FormControlLabel value={stepsShortILS[activeStep][1].answer1} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsShortILS[activeStep][1].answer1)}</Typography>}/>
                        <FormControlLabel value={stepsShortILS[activeStep][1].answer2} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsShortILS[activeStep][1].answer2)}</Typography>}/>
                    </RadioGroup>
                </TableCell>
            </TableRow>
            <TableRow>
                <StyledTableCellQuestion align="left"
                                         style={{color: theme.palette.common.white}}><Typography
                    variant={"h5"}>{t(stepsShortILS[activeStep][2].question)}</Typography></StyledTableCellQuestion>
            </TableRow>
            <TableRow>
                <TableCell>
                    <RadioGroup
                        value={radioButton3}
                        onChange={e => {
                            setRadioButton3(e.target.value);
                            handleRadioChange(e, stepsShortILS[activeStep][2])
                        }}
                        name="Question1-radio-buttons-group"
                    >
                        <FormControlLabel value={stepsShortILS[activeStep][2].answer1} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsShortILS[activeStep][2].answer1)}</Typography>}/>
                        <FormControlLabel value={stepsShortILS[activeStep][2].answer2} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsShortILS[activeStep][2].answer2)}</Typography>}/>
                    </RadioGroup>
                </TableCell>
            </TableRow>
            <TableRow>
                <StyledTableCellQuestion align="left"
                                         style={{color: theme.palette.common.white}}><Typography
                    variant={"h5"}>{t(stepsShortILS[activeStep][3].question)}</Typography></StyledTableCellQuestion>
            </TableRow>
            <TableRow>
                <TableCell>
                    <RadioGroup
                        value={radioButton4}
                        onChange={e => {
                            setRadioButton4(e.target.value);
                            handleRadioChange(e, stepsShortILS[activeStep][3])
                        }}
                        name="Question1-radio-buttons-group"
                    >
                        <FormControlLabel value={stepsShortILS[activeStep][3].answer1} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsShortILS[activeStep][3].answer1)}</Typography>}/>
                        <FormControlLabel value={stepsShortILS[activeStep][3].answer2} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsShortILS[activeStep][3].answer2)}</Typography>}/>
                    </RadioGroup>
                </TableCell>
            </TableRow>
        </TableBody>)
    }

    return (
        <Box>
            <IconButton id={"QuestionnaireAnswersCloseButton"} color="primary" sx={styleButtonClose} onClick={onClickClose} data-testid={"QuestionnaireAnswersCloseButton"}>
                <CloseIcon/>
            </IconButton>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                spacing={2}
            >
                <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                >
                    <StyledMobileStepper
                        variant="progress"
                        steps={ilsLong ? 11 : 5}
                        position="static"
                        activeStep={activeStep}
                        sx={{maxWidth: '50%', flexGrow: 1, align: "center"}}
                        nextButton={
                            <Button variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    data-testid="nextButton"
                                    disabled={ilsLong ? activeStep === 10 || isNextDisabled : activeStep === 4 || isNextDisabled}>
                                Next
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft/>
                                ) : (
                                    <KeyboardArrowRight/>
                                )}
                            </Button>
                        }

                        backButton={
                            <Button variant="contained"
                                    color="primary"
                                    onClick={handleBack}
                                    data-testid="backButton"
                                    disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRight/>
                                ) : (
                                    <KeyboardArrowLeft/>
                                )}
                                Back
                            </Button>
                        }
                    />
                </Stack>
                <Stack
                    direction="column"
                    justifyContent="space-around"
                    alignItems="center"
                >
                    <TableContainer component={Paper} style={{maxWidth: '51%'}}>
                        <Table style={{minWidth: '300px'}}>
                            {ilsLong ? LongIls() : ShortIls()}
                        </Table>
                    </TableContainer>
                    <>
                        <Stack
                            direction="column"
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            {(ilsLong ? activeStep === 10 : activeStep === 4) ? (
                                <div data-testid={"ActiveStepILS"}>
                                    <Button variant="contained"
                                            endIcon={<SendIcon/>}
                                            color="primary"
                                            data-testid="sendButton"
                                            disabled={isNextDisabled}
                                            sx={{m: 2}}>
                                        {t("Send")}
                                    </Button>
                                </div>) : undefined}
                        </Stack>
                    </>
                </Stack>
            </Stack>
        </Box>
    )
};