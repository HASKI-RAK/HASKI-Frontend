import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';
import {useTranslation} from 'react-i18next';
import MobileStepper from '@mui/material/MobileStepper';
import {Box, Divider, FormControlLabel, Radio, RadioGroup, Stack, Typography} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import {DefaultButton as Button} from "@common/components";
import React, {useState} from "react";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";
import {useQuestionnaireAnswersListKStore} from "@services";
import {styleButtonClose} from "./QuestionnaireQuestionsTableStyle";


const stepsListK = [
    [
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-1"),
            questionLabel: "Org1_F1",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-2"),
            questionLabel: "Org2_F2",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-3"),
            questionLabel: "Org3_F3",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-4"),
            questionLabel: "Ela1_F4",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-5"),
            questionLabel: "Ela2_F5",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        }
    ],
    [

        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-6"),
            questionLabel: "Ela3_F6",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-7"),
            questionLabel: "krP1_F7",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-8"),
            questionLabel: "krP2_F8",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-9"),
            questionLabel: "krP3_F9",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-10"),
            questionLabel: "Wie1_F10",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        }
    ],
    [

        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-11"),
            questionLabel: "Wie2_F11",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-12"),
            questionLabel: "Wie3_F12",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-13"),
            questionLabel: "ZP1_F13",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-14"),
            questionLabel: "ZP2_F14",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-15"),
            questionLabel: "ZP3_F15",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        }
    ],
    [
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-16"),
            questionLabel: "Kon1_F16",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-17"),
            questionLabel: "Kon2_F17",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-18"),
            questionLabel: "Kon3_F18",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-19"),
            questionLabel: "Reg1_F19",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-20"),
            questionLabel: "Reg2_F20",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        }
    ],
    [
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-21"),
            questionLabel: "Reg3_F21",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-22"),
            questionLabel: "Auf1r_F22",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-23"),
            questionLabel: "Auf2r_F23",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-24"),
            questionLabel: "Auf3r_F24",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-25"),
            questionLabel: "Ans1_F25",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        }
    ],
    [
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-26"),
            questionLabel: "Ans2_F26",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-27"),
            questionLabel: "Ans3_F27",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-28"),
            questionLabel: "Zei1_F28",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-29"),
            questionLabel: "Zei2_F29",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-30"),
            questionLabel: "Zei3_F30",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        }
    ],
    [

        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-31"),
            questionLabel: "LmS1_F31",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-32"),
            questionLabel: "LmS2_F32",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-33"),
            questionLabel: "LmS3_F33",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-34"),
            questionLabel: "Lit1_F34",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-35"),
            questionLabel: "Lit2_F35",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        }
    ],
    [
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-36"),
            questionLabel: "Lit3_F36",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-37"),
            questionLabel: "LU1_F37",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-38"),
            questionLabel: "LU2_F38",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
        {
            question: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Question-39"),
            questionLabel: "LU3_F39",
            answer1: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-1"),
            answer2: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-2"),
            answer3: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-3"),
            answer4: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-4"),
            answer5: ("components.Questionnaire.QuestionnaireQuestions.TableListKQuestions.Answer-5")
        },
    ],
];

export const TableListKQuestions = () => {

    const {t} = useTranslation();

    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [radioButtonGroup1, setRadioButtonGroup1] = useState("");
    const [radioButtonGroup2, setRadioButtonGroup2] = useState("");
    const [radioButtonGroup3, setRadioButtonGroup3] = useState("");
    const [radioButtonGroup4, setRadioButtonGroup4] = useState("");
    const [radioButtonGroup5, setRadioButtonGroup5] = useState("");

    //if all radio buttons are selected, the next button is enabled (They are reset to their previous Value when the user goes back)
    const isNextDisabled = !radioButtonGroup1 || !radioButtonGroup2 || !radioButtonGroup3 || !radioButtonGroup4 || !radioButtonGroup5;

    const {questionnaireAnswers, setQuestionnaireAnswers} = useQuestionnaireAnswersListKStore();

    // Before reload or close window ask the user if he is sure
    window.addEventListener("beforeunload", (e: BeforeUnloadEvent) => {
        // Cancel the event
        e.preventDefault();

        // Chrome requires returnValue to be set
        e.returnValue = "";
    });

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        setRadioButtonGroup1(setRadioButtonValue(stepsListK[activeStep + 1][0]));
        setRadioButtonGroup2(setRadioButtonValue(stepsListK[activeStep + 1][1]));
        setRadioButtonGroup3(setRadioButtonValue(stepsListK[activeStep + 1][2]));
        setRadioButtonGroup4(setRadioButtonValue(stepsListK[activeStep + 1][3]));
        //because the last step has only 4 questions
        if(activeStep < 6) {
            setRadioButtonGroup5(setRadioButtonValue(stepsListK[activeStep + 1][4]));
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

        setRadioButtonGroup1(setRadioButtonValue(stepsListK[activeStep - 1][0]));
        setRadioButtonGroup2(setRadioButtonValue(stepsListK[activeStep - 1][1]));
        setRadioButtonGroup3(setRadioButtonValue(stepsListK[activeStep - 1][2]));
        setRadioButtonGroup4(setRadioButtonValue(stepsListK[activeStep - 1][3]));
        setRadioButtonGroup5(setRadioButtonValue(stepsListK[activeStep - 1][4]));
    };

    const handleSend = () => {
        const listkArray = Object.entries(questionnaireAnswers).filter(([key]) => key !== "");
        const listk_result = ["ils", listkArray];
        console.log(JSON.stringify(listk_result));
        //todo: send to server
    }

    const setRadioButtonValue = (listkStep: {
        question: string, questionLabel: string, answer1: string, answer2: string, answer3: string,
        answer4: string, answer5: string
    }) => {

        //if the question is already answered, the answer is set to the value of the radio button/ else radio button is not set
        switch(questionnaireAnswers[listkStep.questionLabel as keyof typeof questionnaireAnswers]) {
            case "1":
                return listkStep.answer1;
            case "2":
                return listkStep.answer2;
            case "3":
                return listkStep.answer3;
            case "4":
                return listkStep.answer4;
            case "5":
                return listkStep.answer5;
            default:
                return "";
        }
    }

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>, listkStep: {
        question: string, questionLabel: string,
        answer1: string, answer2: string, answer3: string, answer4: string, answer5: string
    }) => {

        const radioButtonOptions = [listkStep.answer1, listkStep.answer2, listkStep.answer3, listkStep.answer4, listkStep.answer5];
        let selectedAnswer;

        switch(radioButtonOptions.indexOf(event.target.value)) {
            case 0:
                selectedAnswer = "1";
                break;
            case 1:
                selectedAnswer = "2";
                break;
            case 2:
                selectedAnswer = "3";
                break;
            case 3:
                selectedAnswer = "4";
                break;
            default:
                selectedAnswer = "5";
                break;
        }

        setQuestionnaireAnswers(listkStep.questionLabel, selectedAnswer.toString());
    };

    const onClickClose = () => {
        if(window.confirm(t("CloseWebsite").toString())) {
            navigate('/');
        }
    }

    return (
        <Box>
            <IconButton id={"QuestionnaireAnswersCloseButton"} color="primary" sx={styleButtonClose} onClick={onClickClose}
                        data-testid={"QuestionnaireAnswersCloseButton"}>
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
                    <MobileStepper
                        variant="progress"
                        steps={8}
                        position="static"
                        activeStep={activeStep}
                        sx={{maxWidth: '50%', flexGrow: 1, align: "center"}}
                        nextButton={
                            <Button variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    data-testid="nextButton"
                                    disabled={activeStep === 7 || isNextDisabled}>
                                Next
                                    <KeyboardArrowRight/>
                            </Button>
                        }

                        backButton={
                            <Button variant="contained"
                                    color="primary"
                                    onClick={handleBack}
                                    data-testid="backButton"
                                    disabled={activeStep === 0}>
                                    <KeyboardArrowLeft/>
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
                            <TableBody key={"TableILSBody"}>
                                <TableRow>
                                    <TableCell align="left"
                                               sx={{
                                                   backgroundColor: (theme) => theme.palette.primary.dark,
                                                   color: (theme) => theme.palette.secondary.main
                                               }}>
                                        <Typography variant={"h5"}>{t(stepsListK[activeStep][0].question)}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <RadioGroup
                                            value={radioButtonGroup1}
                                            name={stepsListK[activeStep][0].questionLabel}
                                            onChange={e => {
                                                setRadioButtonGroup1(e.target.value);
                                                handleRadioChange(e, stepsListK[activeStep][0])
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                justifyContent="space-around"
                                                alignItems="center"
                                                divider={<Divider orientation="vertical" flexItem
                                                                  sx={{backgroundColor: (theme) => theme.palette.primary.dark}}/>}
                                            >
                                                <FormControlLabel value={stepsListK[activeStep][0].answer1} control={<Radio/>}
                                                                  label={<Typography
                                                                      variant={"h6"}>{t(stepsListK[activeStep][0].answer1)}</Typography>}/>
                                                <FormControlLabel value={stepsListK[activeStep][0].answer2} control={<Radio/>}
                                                                  label={<Typography
                                                                      variant={"h6"}>{t(stepsListK[activeStep][0].answer2)}</Typography>}/>
                                                <FormControlLabel value={stepsListK[activeStep][0].answer3} control={<Radio/>}
                                                                  label={<Typography
                                                                      variant={"h6"}>{t(stepsListK[activeStep][0].answer3)}</Typography>}/>
                                                <FormControlLabel value={stepsListK[activeStep][0].answer4} control={<Radio/>}
                                                                  label={<Typography
                                                                      variant={"h6"}>{t(stepsListK[activeStep][0].answer4)}</Typography>}/>
                                                <FormControlLabel value={stepsListK[activeStep][0].answer5} control={<Radio/>}
                                                                  label={<Typography
                                                                      variant={"h6"}>{t(stepsListK[activeStep][0].answer5)}</Typography>}/>
                                            </Stack>
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left"
                                               sx={{
                                                   backgroundColor: (theme) => theme.palette.primary.dark,
                                                   color: (theme) => theme.palette.secondary.main
                                               }}>
                                        <Typography variant={"h5"}>{t(stepsListK[activeStep][1].question)}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <RadioGroup
                                            value={radioButtonGroup2}
                                            name={stepsListK[activeStep][1].questionLabel}
                                            onChange={e => {
                                                setRadioButtonGroup2(e.target.value);
                                                handleRadioChange(e, stepsListK[activeStep][1])
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                justifyContent="space-around"
                                                alignItems="center"
                                                divider={<Divider orientation="vertical" flexItem
                                                                  sx={{backgroundColor: (theme) => theme.palette.primary.dark}}/>}
                                            >
                                                <FormControlLabel value={stepsListK[activeStep][1].answer1} control={<Radio/>}
                                                                  label={<Typography
                                                                      variant={"h6"}>{t(stepsListK[activeStep][1].answer1)}</Typography>}/>
                                                <FormControlLabel value={stepsListK[activeStep][1].answer2} control={<Radio/>}
                                                                  label={<Typography
                                                                      variant={"h6"}>{t(stepsListK[activeStep][1].answer2)}</Typography>}/>
                                                <FormControlLabel value={stepsListK[activeStep][1].answer3} control={<Radio/>}
                                                                  label={<Typography
                                                                      variant={"h6"}>{t(stepsListK[activeStep][1].answer3)}</Typography>}/>
                                                <FormControlLabel value={stepsListK[activeStep][1].answer4} control={<Radio/>}
                                                                  label={<Typography
                                                                      variant={"h6"}>{t(stepsListK[activeStep][1].answer4)}</Typography>}/>
                                                <FormControlLabel value={stepsListK[activeStep][1].answer5} control={<Radio/>}
                                                                  label={<Typography
                                                                      variant={"h6"}>{t(stepsListK[activeStep][1].answer5)}</Typography>}/>
                                            </Stack>
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left"
                                               sx={{
                                                   backgroundColor: (theme) => theme.palette.primary.dark,
                                                   color: (theme) => theme.palette.secondary.main
                                               }}>
                                        <Typography variant={"h5"}>{t(stepsListK[activeStep][2].question)}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <RadioGroup
                                            value={radioButtonGroup3}
                                            name={stepsListK[activeStep][2].questionLabel}
                                            onChange={e => {
                                                setRadioButtonGroup3(e.target.value);
                                                handleRadioChange(e, stepsListK[activeStep][2])
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                justifyContent="space-around"
                                                alignItems="center"
                                                divider={<Divider orientation="vertical" flexItem
                                                                  sx={{backgroundColor: (theme) => theme.palette.primary.dark}}/>}
                                            >
                                                <FormControlLabel value={stepsListK[activeStep][2].answer1} control={<Radio/>}
                                                                  label={<Typography
                                                                      variant={"h6"}>{t(stepsListK[activeStep][2].answer1)}</Typography>}/>
                                                <FormControlLabel value={stepsListK[activeStep][2].answer2} control={<Radio/>}
                                                                  label={<Typography
                                                                      variant={"h6"}>{t(stepsListK[activeStep][2].answer2)}</Typography>}/>
                                                <FormControlLabel value={stepsListK[activeStep][2].answer3} control={<Radio/>}
                                                                  label={<Typography
                                                                      variant={"h6"}>{t(stepsListK[activeStep][2].answer3)}</Typography>}/>
                                                <FormControlLabel value={stepsListK[activeStep][2].answer4} control={<Radio/>}
                                                                  label={<Typography
                                                                      variant={"h6"}>{t(stepsListK[activeStep][2].answer4)}</Typography>}/>
                                                <FormControlLabel value={stepsListK[activeStep][2].answer5} control={<Radio/>}
                                                                  label={<Typography
                                                                      variant={"h6"}>{t(stepsListK[activeStep][2].answer5)}</Typography>}/>
                                            </Stack>
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left"
                                               sx={{
                                                   backgroundColor: (theme) => theme.palette.primary.dark,
                                                   color: (theme) => theme.palette.secondary.main
                                               }}>
                                        <Typography variant={"h5"}>{t(stepsListK[activeStep][3].question)}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <RadioGroup
                                            value={radioButtonGroup4}
                                            name={stepsListK[activeStep][3].questionLabel}
                                            onChange={e => {
                                                setRadioButtonGroup4(e.target.value);
                                                handleRadioChange(e, stepsListK[activeStep][3])
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                justifyContent="space-around"
                                                alignItems="center"
                                                divider={<Divider orientation="vertical" flexItem
                                                                  sx={{backgroundColor: (theme) => theme.palette.primary.dark}}/>}
                                            >
                                                <FormControlLabel value={stepsListK[activeStep][3].answer1} control={<Radio/>}
                                                                  label={<Typography
                                                                      variant={"h6"}>{t(stepsListK[activeStep][3].answer1)}</Typography>}/>
                                                <FormControlLabel value={stepsListK[activeStep][3].answer2} control={<Radio/>}
                                                                  label={<Typography
                                                                      variant={"h6"}>{t(stepsListK[activeStep][3].answer2)}</Typography>}/>
                                                <FormControlLabel value={stepsListK[activeStep][3].answer3} control={<Radio/>}
                                                                  label={<Typography
                                                                      variant={"h6"}>{t(stepsListK[activeStep][3].answer3)}</Typography>}/>
                                                <FormControlLabel value={stepsListK[activeStep][3].answer4} control={<Radio/>}
                                                                  label={<Typography
                                                                      variant={"h6"}>{t(stepsListK[activeStep][3].answer4)}</Typography>}/>
                                                <FormControlLabel value={stepsListK[activeStep][3].answer5} control={<Radio/>}
                                                                  label={<Typography
                                                                      variant={"h6"}>{t(stepsListK[activeStep][3].answer5)}</Typography>}/>
                                            </Stack>
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                {activeStep < 7 ? (
                                    <>
                                        <TableRow>
                                            <TableCell align="left"
                                                       sx={{
                                                           backgroundColor: (theme) => theme.palette.primary.dark,
                                                           color: (theme) => theme.palette.secondary.main
                                                       }}>
                                                <Typography variant={"h5"}>{t(stepsListK[activeStep][4].question)}</Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <RadioGroup
                                                    value={radioButtonGroup5}
                                                    name={stepsListK[activeStep][4].questionLabel}
                                                    onChange={e => {
                                                        setRadioButtonGroup5(e.target.value);
                                                        handleRadioChange(e, stepsListK[activeStep][4])
                                                    }}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        alignItems="center"
                                                        divider={<Divider orientation="vertical" flexItem
                                                                          sx={{backgroundColor: (theme) => theme.palette.primary.dark}}/>}
                                                    >
                                                        <FormControlLabel value={stepsListK[activeStep][4].answer1} control={<Radio/>}
                                                                          label={<Typography
                                                                              variant={"h6"}>{t(stepsListK[activeStep][4].answer1)}</Typography>}/>
                                                        <FormControlLabel value={stepsListK[activeStep][4].answer2} control={<Radio/>}
                                                                          label={<Typography
                                                                              variant={"h6"}>{t(stepsListK[activeStep][4].answer2)}</Typography>}/>
                                                        <FormControlLabel value={stepsListK[activeStep][4].answer3} control={<Radio/>}
                                                                          label={<Typography
                                                                              variant={"h6"}>{t(stepsListK[activeStep][4].answer3)}</Typography>}/>
                                                        <FormControlLabel value={stepsListK[activeStep][4].answer4} control={<Radio/>}
                                                                          label={<Typography
                                                                              variant={"h6"}>{t(stepsListK[activeStep][4].answer4)}</Typography>}/>
                                                        <FormControlLabel value={stepsListK[activeStep][4].answer5} control={<Radio/>}
                                                                          label={<Typography
                                                                              variant={"h6"}>{t(stepsListK[activeStep][4].answer5)}</Typography>}/>
                                                    </Stack>
                                                </RadioGroup>
                                            </TableCell>
                                        </TableRow></>) : undefined}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <>
                        <Stack
                            direction="column"
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            {activeStep === 7 ? (
                                <div data-testid={"ActiveStepILS"}>
                                    <Button variant="contained"
                                            endIcon={<SendIcon/>}
                                            color="primary"
                                            data-testid="sendButton"
                                            onClick={handleSend}
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