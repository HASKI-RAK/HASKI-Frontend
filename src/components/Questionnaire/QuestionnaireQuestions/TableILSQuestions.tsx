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
import {useState} from "react";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {styled} from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";

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

const stepsShortILS = [
    {
        label: "Step 1",
        question1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-9"),
        questionNumber1: "9",
        answer1_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-9.1"),
        answer1_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-9.2"),

        question2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-2"),
        questionNumber2: "2",
        answer2_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-2.1"),
        answer2_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-2.2"),

        question3: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-7"),
        questionNumber3: "7",
        answer3_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-7.1"),
        answer3_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-7.2"),

        question4: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-4"),
        questionNumber4: "4",
        answer4_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-4.1"),
        answer4_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-4.2")
    },
    {
        label: "Step 2",
        question1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-13"),
        questionNumber1: "13",
        answer1_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-13.1"),
        answer1_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-13.2"),

        question2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-14"),
        questionNumber2: "14",
        answer2_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-14.1"),
        answer2_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-14.2"),

        question3: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-19"),
        questionNumber3: "19",
        answer3_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-19.1"),
        answer3_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-19.2"),

        question4: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-8"),
        questionNumber4: "8",
        answer4_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-8.1"),
        answer4_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-8.2")
    },
    {
        label: "Step 3",
        question1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-21"),
        questionNumber1: "21",
        answer1_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-21.1"),
        answer1_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-21.2"),

        question2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-26"),
        questionNumber2: "26",
        answer2_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-26.1"),
        answer2_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-26.2"),

        question3: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-27"),
        questionNumber3: "27",
        answer3_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-27.1"),
        answer3_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-27.2"),

        question4: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-16"),
        questionNumber4: "16",
        answer4_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-16.1"),
        answer4_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-16.2")
    },
    {
        label: "Step 4",
        question1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-25"),
        questionNumber1: "25",
        answer1_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-25.1"),
        answer1_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-25.2"),

        question2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-38"),
        questionNumber2: "38",
        answer2_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-38.1"),
        answer2_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-38.2"),

        question3: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-39"),
        questionNumber3: "39",
        answer3_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-39.1"),
        answer3_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-39.2"),

        question4: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-40"),
        questionNumber4: "40",
        answer4_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-40.1"),
        answer4_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-40.2")
    },
    {
        label: "Step 5",
        question1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-29"),
        questionNumber1: "29",
        answer1_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-29.1"),
        answer1_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-29.2"),

        question2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-42"),
        questionNumber2: "42",
        answer2_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-42.1"),
        answer2_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-42.2"),

        question3: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-43"),
        questionNumber3: "43",
        answer3_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-43.1"),
        answer3_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-43.2"),

        question4: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-44"),
        questionNumber4: "44",
        answer4_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-44.1"),
        answer4_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-44.2")
    }
]

const stepsLongILS = [
    {
        label: "Step 1",
        questionNumber1: "1",
        question1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-1"),
        answer1_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-1.1"),
        answer1_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-1.2"),

        question2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-2"),
        questionNumber2: "2",
        answer2_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-2.1"),
        answer2_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-2.2"),

        question3: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-3"),
        questionNumber3: "3",
        answer3_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-3.1"),
        answer3_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-3.2"),

        question4: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-4"),
        questionNumber4: "4",
        answer4_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-4.1"),
        answer4_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-4.2")
    },
    {
        label: "Step 2",
        questionNumber1: "5",
        question1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-5"),
        answer1_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-5.1"),
        answer1_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-5.2"),

        question2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-6"),
        questionNumber2: "6",
        answer2_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-6.1"),
        answer2_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-6.2"),

        question3: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-7"),
        questionNumber3: "7",
        answer3_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-7.1"),
        answer3_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-7.2"),

        question4: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-8"),
        questionNumber4: "8",
        answer4_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-8.1"),
        answer4_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-8.2")
    },
    {
        label: "Step 3",
        question1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-9"),
        questionNumber1: "9",
        answer1_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-9.1"),
        answer1_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-9.2"),

        question2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-10"),
        questionNumber2: "10",
        answer2_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-10.1"),
        answer2_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-10.2"),

        question3: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-11"),
        questionNumber3: "11",
        answer3_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-11.1"),
        answer3_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-11.2"),

        question4: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-12"),
        questionNumber4: "12",
        answer4_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-12.1"),
        answer4_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-12.2")
    },
    {
        label: "Step 4",
        question1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-13"),
        questionNumber1: "13",
        answer1_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-13.1"),
        answer1_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-13.2"),

        question2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-14"),
        questionNumber2: "14",
        answer2_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-14.1"),
        answer2_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-14.2"),

        question3: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-15"),
        questionNumber3: "15",
        answer3_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-15.1"),
        answer3_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-15.2"),

        question4: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-16"),
        questionNumber4: "16",
        answer4_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-16.1"),
        answer4_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-16.2")
    },
    {
        label: "Step 5",
        question1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-17"),
        questionNumber1: "17",
        answer1_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-17.1"),
        answer1_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-17.2"),

        question2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-18"),
        questionNumber2: "18",
        answer2_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-18.1"),
        answer2_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-18.2"),

        question3: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-19"),
        questionNumber3: "19",
        answer3_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-19.1"),
        answer3_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-19.2"),

        question4: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-20"),
        questionNumber4: "20",
        answer4_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-20.1"),
        answer4_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-20.2")
    },
    {
        label: "Step 6",
        question1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-21"),
        questionNumber1: "21",
        answer1_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-21.1"),
        answer1_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-21.2"),

        question2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-22"),
        questionNumber2: "22",
        answer2_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-22.1"),
        answer2_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-22.2"),

        question3: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-23"),
        questionNumber3: "23",
        answer3_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-23.1"),
        answer3_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-23.2"),

        question4: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-24"),
        questionNumber4: "24",
        answer4_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-24.1"),
        answer4_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-24.2")
    },
    {
        label: "Step 7",
        question1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-25"),
        questionNumber1: "25",
        answer1_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-25.1"),
        answer1_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-25.2"),

        question2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-26"),
        questionNumber2: "26",
        answer2_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-26.1"),
        answer2_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-26.2"),

        question3: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-27"),
        questionNumber3: "27",
        answer3_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-27.1"),
        answer3_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-27.2"),

        question4: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-28"),
        questionNumber4: "28",
        answer4_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-28.1"),
        answer4_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-28.2")
    },
    {
        label: "Step 8",
        question1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-29"),
        questionNumber1: "29",
        answer1_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-29.1"),
        answer1_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-29.2"),

        question2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-30"),
        questionNumber2: "30",
        answer2_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-30.1"),
        answer2_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-30.2"),

        question3: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-31"),
        questionNumber3: "31",
        answer3_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-31.1"),
        answer3_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-31.2"),

        question4: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-32"),
        questionNumber4: "32",
        answer4_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-32.1"),
        answer4_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-32.2")
    },
    {
        label: "Step 9",
        question1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-33"),
        questionNumber1: "33",
        answer1_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-33.1"),
        answer1_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-33.2"),

        question2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-34"),
        questionNumber2: "34",
        answer2_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-34.1"),
        answer2_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-34.2"),

        question3: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-35"),
        questionNumber3: "35",
        answer3_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-35.1"),
        answer3_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-35.2"),

        question4: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-36"),
        questionNumber4: "36",
        answer4_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-36.1"),
        answer4_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-36.2")
    },
    {
        label: "Step 10",
        questionNumber: "37",
        question1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-37"),
        questionNumber1: "37",
        answer1_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-37.1"),
        answer1_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-37.2"),

        question2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-38"),
        questionNumber2: "38",
        answer2_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-38.1"),
        answer2_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-38.2"),

        question3: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-39"),
        questionNumber3: "39",
        answer3_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-39.1"),
        answer3_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-39.2"),

        question4: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-40"),
        questionNumber4: "40",
        answer4_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-40.1"),
        answer4_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-40.2")
    },
    {
        label: "Step 11",
        question1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-41"),
        questionNumber1: "41",
        answer1_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-41.1"),
        answer1_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-41.2"),

        question2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-42"),
        questionNumber2: "42",
        answer2_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-42.1"),
        answer2_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-42.2"),

        question3: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-43"),
        questionNumber3: "43",
        answer3_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-43.1"),
        answer3_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-43.2"),

        question4: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Question-44"),
        questionNumber4: "44",
        answer4_1: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-44.1"),
        answer4_2: ("components.Questionnaire.QuestionnaireQuestions.TableILS.Answer-44.2")
    }
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

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setRadioButton1("");
        setRadioButton2("");
        setRadioButton3("");
        setRadioButton4("");
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onClickClose = () => {
        if(window.confirm("Do you really want to cancel the Questionnaire?")) {
            navigate('/');
        }
    }

    const LongIls = () => {
        return(<TableBody key={"TableILSBody"}>
            <TableRow>
                <StyledTableCellQuestion align="left"
                                         style={{color: theme.palette.common.white}}><Typography
                    variant={"h5"}>{t(stepsLongILS[activeStep].question1)}</Typography></StyledTableCellQuestion>
            </TableRow>
            <TableRow>
                <TableCell>
                    <RadioGroup
                        value={radioButton1}
                        name="Question1-radio-buttons-group"
                        onChange={(e) => setRadioButton1(e.target.value)}
                    >
                        <FormControlLabel value={stepsLongILS[activeStep].questionNumber1} control={<Radio/>}
                                          label={<Typography variant={"h6"}>{t(stepsLongILS[activeStep].answer1_1)}</Typography>}/>
                        <FormControlLabel value={stepsLongILS[activeStep].answer1_2} control={<Radio/>}
                                          label={<Typography variant={"h6"}>{t(stepsLongILS[activeStep].answer1_2)}</Typography>}/>
                    </RadioGroup>
                </TableCell>
            </TableRow>
            <TableRow>
                <StyledTableCellQuestion align="left"
                                         style={{color: theme.palette.common.white}}><Typography
                    variant={"h5"}>{t(stepsLongILS[activeStep].question2)}</Typography></StyledTableCellQuestion>
            </TableRow>
            <TableRow>
                <TableCell>
                    <RadioGroup
                        value={radioButton2}
                        onChange={(e) => setRadioButton2(e.target.value)}
                        name="Question1-radio-buttons-group"
                    >
                        <FormControlLabel value={stepsLongILS[activeStep].questionNumber2} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsLongILS[activeStep].answer2_1)}</Typography>}/>
                        <FormControlLabel value={stepsLongILS[activeStep].answer2_2} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsLongILS[activeStep].answer2_2)}</Typography>}/>
                    </RadioGroup>
                </TableCell>
            </TableRow>
            <TableRow>
                <StyledTableCellQuestion align="left"
                                         style={{color: theme.palette.common.white}}><Typography
                    variant={"h5"}>{t(stepsLongILS[activeStep].question3)}</Typography></StyledTableCellQuestion>
            </TableRow>
            <TableRow>
                <TableCell>
                    <RadioGroup
                        value={radioButton3}
                        onChange={(e) => setRadioButton3(e.target.value)}
                        name="Question1-radio-buttons-group"
                    >
                        <FormControlLabel value={stepsLongILS[activeStep].questionNumber3} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsLongILS[activeStep].answer3_1)}</Typography>}/>
                        <FormControlLabel value={stepsLongILS[activeStep].answer3_2} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsLongILS[activeStep].answer3_2)}</Typography>}/>
                    </RadioGroup>
                </TableCell>
            </TableRow>
            <TableRow>
                <StyledTableCellQuestion align="left"
                                         style={{color: theme.palette.common.white}}><Typography
                    variant={"h5"}>{t(stepsLongILS[activeStep].question4)}</Typography></StyledTableCellQuestion>
            </TableRow>
            <TableRow>
                <TableCell>
                    <RadioGroup
                        value={radioButton4}
                        onChange={(e) => setRadioButton4(e.target.value)}
                        name="Question1-radio-buttons-group"
                    >
                        <FormControlLabel value={stepsLongILS[activeStep].questionNumber4} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsLongILS[activeStep].answer4_1)}</Typography>}/>
                        <FormControlLabel value={stepsLongILS[activeStep].answer4_2} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsLongILS[activeStep].answer4_2)}</Typography>}/>
                    </RadioGroup>
                </TableCell>
            </TableRow>
        </TableBody>)
    }


    const ShortIls = () => {
        return(<TableBody key={"TableILSBody"}>
            <TableRow>
                <StyledTableCellQuestion align="left"
                                         style={{color: theme.palette.common.white}}><Typography
                    variant={"h5"}>{t(stepsShortILS[activeStep].question1)}</Typography></StyledTableCellQuestion>
            </TableRow>
            <TableRow>
                <TableCell>
                    <RadioGroup
                        value={radioButton1}
                        onChange={(e) => setRadioButton1(e.target.value)}
                        name="Question1-radio-buttons-group"
                    >
                        <FormControlLabel value={stepsShortILS[activeStep].questionNumber1} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsShortILS[activeStep].answer1_1)}</Typography>}/>
                        <FormControlLabel value={stepsShortILS[activeStep].answer1_2} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsShortILS[activeStep].answer1_2)}</Typography>}/>
                    </RadioGroup>
                </TableCell>
            </TableRow>
            <TableRow>
                <StyledTableCellQuestion align="left"
                                         style={{color: theme.palette.common.white}}><Typography
                    variant={"h5"}>{t(stepsShortILS[activeStep].question2)}</Typography></StyledTableCellQuestion>
            </TableRow>
            <TableRow>
                <TableCell>
                    <RadioGroup
                        value={radioButton2}
                        onChange={(e) => setRadioButton2(e.target.value)}
                        name="Question1-radio-buttons-group"
                    >
                        <FormControlLabel value={stepsShortILS[activeStep].questionNumber2} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsShortILS[activeStep].answer2_1)}</Typography>}/>
                        <FormControlLabel value={stepsShortILS[activeStep].answer2_2} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsShortILS[activeStep].answer2_2)}</Typography>}/>
                    </RadioGroup>
                </TableCell>
            </TableRow>
            <TableRow>
                <StyledTableCellQuestion align="left"
                                         style={{color: theme.palette.common.white}}><Typography
                    variant={"h5"}>{t(stepsShortILS[activeStep].question3)}</Typography></StyledTableCellQuestion>
            </TableRow>
            <TableRow>
                <TableCell>
                    <RadioGroup
                        value={radioButton3}
                        onChange={(e) => setRadioButton3(e.target.value)}
                        name="Question1-radio-buttons-group"
                    >
                        <FormControlLabel value={stepsShortILS[activeStep].questionNumber3} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsShortILS[activeStep].answer3_1)}</Typography>}/>
                        <FormControlLabel value={stepsShortILS[activeStep].answer3_2} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsShortILS[activeStep].answer3_2)}</Typography>}/>
                    </RadioGroup>
                </TableCell>
            </TableRow>
            <TableRow>
                <StyledTableCellQuestion align="left"
                                         style={{color: theme.palette.common.white}}><Typography
                    variant={"h5"}>{t(stepsShortILS[activeStep].question4)}</Typography></StyledTableCellQuestion>
            </TableRow>
            <TableRow>
                <TableCell>
                    <RadioGroup
                        value={radioButton4}
                        onChange={(e) => setRadioButton4(e.target.value)}
                        name="Question1-radio-buttons-group"
                    >
                        <FormControlLabel value={stepsShortILS[activeStep].questionNumber4} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsShortILS[activeStep].answer4_1)}</Typography>}/>
                        <FormControlLabel value={stepsShortILS[activeStep].answer4_2} control={<Radio/>}
                                          label={<Typography
                                              variant={"h6"}>{t(stepsShortILS[activeStep].answer4_2)}</Typography>}/>
                    </RadioGroup>
                </TableCell>
            </TableRow>
        </TableBody>)
    }

    return (
        <Box>
            <IconButton color="primary" sx={styleButtonClose} onClick={onClickClose} data-testid={"QuestionnaireResultsCloseButton"}>
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