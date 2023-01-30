import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useTranslation} from 'react-i18next';

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#24262a',
        color: '#FFFFFF',
        fontSize: 13,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
    },
    [`&.MuiTableCell-root`]: {
        borderLeft: "3px solid rgba(224, 224, 224, 1)"
    }
}));

const StyledTableCellWithoutBorder = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#24262a',
        color: '#FFFFFF',
        fontSize: 13,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: 'rgba(200,205,219,0.25)',
    },
    '&:nth-of-type(1)': {
        backgroundColor: '#24262a'
    },
    '&:nth-of-type(6)': {
        backgroundColor: '#24262a'
    },
}));

export function getSubscaleScore(score: number[]): number{

    return score.reduce((a, b) => a + b, 0) / score.length;
}

export function getListKParameters(){

    //These Values are later given from the Backend
    const organize = 2.12;
    const elaborate = 1.32;
    const criticalReview = 1.23;
    const repeat = 2.45;
    const attention = 2.47;
    const effort = 2.32;
    const time = 2.00;
    const goalsPlans = 1.85;
    const control = 2.75;
    const regulate = 3.1;
    const learnWithClassmates = 4.99;
    const literatureResearch = 4.32;
    const learningEnvironment = 4.32;

    return [organize, elaborate, criticalReview, repeat, attention, effort, time, goalsPlans, control, regulate, learnWithClassmates, literatureResearch, learningEnvironment];
}


export function TableListK() {

    const {t} = useTranslation();
    const [organize, elaborate, criticalReview, repeat, attention, effort, time, goalsPlans, control, regulate, learnWithClassmates, literatureResearch, learningEnvironment] = getListKParameters();

    const scoreCognitiveStrategiesArray = [organize, elaborate, criticalReview, repeat];
    const scoreInternalResourceManagementStrategiesArray = [attention, effort, time];
    const scoreMetacognitiveStrategiesArray = [goalsPlans, control, regulate];
    const scoreExternalResourceManagementStrategiesArray = [learnWithClassmates, literatureResearch, learningEnvironment];

    const averageCognitiveStrategies = getSubscaleScore(scoreCognitiveStrategiesArray)
    const averageInternalResourceManagementStrategies = getSubscaleScore(scoreInternalResourceManagementStrategiesArray);
    const averageMetacognitiveStrategies = getSubscaleScore(scoreMetacognitiveStrategiesArray);
    const averageExternalResourcesManagementStrategies = getSubscaleScore(scoreExternalResourceManagementStrategiesArray);


    const rows = [
        {
            id: 1,
            col1: t("components.QuestionnaireResults.TableListK.Factors & subscales"),
            col2: t("components.QuestionnaireResults.TableListK.Score"),
        },
        {
            id: 2,
            col1: t("components.QuestionnaireResults.TableListK.Cognitive strategies"),
            col2: (Math.round((averageCognitiveStrategies + Number.EPSILON) * 100) / 100).toFixed(2),
            col3: t("components.QuestionnaireResults.TableListK.Internal resource management strategies"),
            col4: (Math.round((averageInternalResourceManagementStrategies + Number.EPSILON) * 100) / 100).toFixed(2),
        },
        {
            id: 3,
            col1: t("components.QuestionnaireResults.TableListK.Organize"),
            col2: scoreCognitiveStrategiesArray[0].toFixed(2),
            col3: t("components.QuestionnaireResults.TableListK.Attention"),
            col4: scoreInternalResourceManagementStrategiesArray[0].toFixed(2),
        },
        {
            id: 4,
            col1: t("components.QuestionnaireResults.TableListK.Elaborate"),
            col2: scoreCognitiveStrategiesArray[1].toFixed(2),
            col3: t("components.QuestionnaireResults.TableListK.Effort"),
            col4: scoreInternalResourceManagementStrategiesArray[1].toFixed(2),
        },
        {
            id: 5,
            col1: t("components.QuestionnaireResults.TableListK.Critical review"),
            col2: scoreCognitiveStrategiesArray[2].toFixed(2),
            col3: t("components.QuestionnaireResults.TableListK.Time"),
            col4: scoreInternalResourceManagementStrategiesArray[2].toFixed(2),
        },
        {
            id: 6,
            col1: t("components.QuestionnaireResults.TableListK.Repeat"),
            col2: scoreCognitiveStrategiesArray[3].toFixed(2),
            col3: "",
            col4: ""
        },
        {
            id: 7,
            col1: t("components.QuestionnaireResults.TableListK.Metacognitive strategies"),
            col2: (Math.round((averageMetacognitiveStrategies + Number.EPSILON) * 100) / 100).toFixed(2),
            col3: t("components.QuestionnaireResults.TableListK.External resource management strategies"),
            col4: (Math.round((averageExternalResourcesManagementStrategies + Number.EPSILON) * 100) / 100).toFixed(2),
        },
        {
            id: 8,
            col1: t("components.QuestionnaireResults.TableListK.Goals & plans"),
            col2: scoreMetacognitiveStrategiesArray[0].toFixed(2),
            col3: t("components.QuestionnaireResults.TableListK.Learning with classmates"),
            col4: scoreExternalResourceManagementStrategiesArray[0].toFixed(2),
        },
        {
            id: 9,
            col1: t("components.QuestionnaireResults.TableListK.Control"),
            col2: scoreMetacognitiveStrategiesArray[1].toFixed(2),
            col3: t("components.QuestionnaireResults.TableListK.Literature research"),
            col4: scoreExternalResourceManagementStrategiesArray[1].toFixed(2),
        },
        {
            id: 10,
            col1: t("components.QuestionnaireResults.TableListK.Regulate"),
            col2: scoreMetacognitiveStrategiesArray[2].toFixed(2),
            col3: t("components.QuestionnaireResults.TableListK.Learning environment"),
            col4: scoreExternalResourceManagementStrategiesArray[2].toFixed(2),
        },
    ];

    return (
        <TableContainer component={Paper} style={{minWidth: 300}}>
            <Table sx={{minWidth: 300, top:300}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCellWithoutBorder align="left">{rows[0].col1}</StyledTableCellWithoutBorder>
                        <StyledTableCellWithoutBorder align="left">{rows[0].col2}</StyledTableCellWithoutBorder>
                        <StyledTableCellWithoutBorder align="left">{rows[0].col1}</StyledTableCellWithoutBorder>
                        <StyledTableCellWithoutBorder align="left">{rows[0].col2}</StyledTableCellWithoutBorder>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow>
                        <StyledTableCellWithoutBorder align="left" style={{color: "white"}}>{rows[1].col1}</StyledTableCellWithoutBorder>
                        <StyledTableCellWithoutBorder align="left" style={{color: "white"}}>{rows[1].col2}</StyledTableCellWithoutBorder>
                        <StyledTableCellWithoutBorder align="left" style={{color: "white"}}>{rows[1].col3}</StyledTableCellWithoutBorder>
                        <StyledTableCellWithoutBorder align="left" style={{color: "white"}}>{rows[1].col4}</StyledTableCellWithoutBorder>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCellWithoutBorder align="left"
                        >{rows[2].col1}</StyledTableCellWithoutBorder>
                        <StyledTableCell align="left"
                        >{rows[2].col2}</StyledTableCell>
                        <StyledTableCell align="left"
                        >{rows[2].col3}</StyledTableCell>
                        <StyledTableCell align="left"
                        >{rows[2].col4}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCellWithoutBorder align="left">{rows[3].col1}</StyledTableCellWithoutBorder>
                        <StyledTableCell align="left">{rows[3].col2}</StyledTableCell>
                        <StyledTableCell align="left">{rows[3].col3}</StyledTableCell>
                        <StyledTableCell align="left">{rows[3].col4}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCellWithoutBorder align="left">{rows[4].col1}</StyledTableCellWithoutBorder>
                        <StyledTableCell align="left">{rows[4].col2}</StyledTableCell>
                        <StyledTableCell align="left">{rows[4].col3}</StyledTableCell>
                        <StyledTableCell align="left">{rows[4].col4}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCellWithoutBorder align="left">{rows[5].col1}</StyledTableCellWithoutBorder>
                        <StyledTableCell align="left">{rows[5].col2}</StyledTableCell>
                        <StyledTableCell align="left">{rows[5].col3}</StyledTableCell>
                        <StyledTableCell align="left">{rows[5].col4}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCellWithoutBorder align="left" style={{color: "white"}}>
                            {rows[6].col1}</StyledTableCellWithoutBorder>
                        <StyledTableCellWithoutBorder align="left" style={{color: "white"}}>
                            {rows[6].col2}</StyledTableCellWithoutBorder>
                        <StyledTableCellWithoutBorder align="left" style={{color: "white"}}>
                            {rows[6].col3}</StyledTableCellWithoutBorder>
                        <StyledTableCellWithoutBorder align="left" style={{color: "white"}}>
                            {rows[6].col4}</StyledTableCellWithoutBorder>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCellWithoutBorder align="left">{rows[7].col1}</StyledTableCellWithoutBorder>
                        <StyledTableCell align="left">{rows[7].col2}</StyledTableCell>
                        <StyledTableCell align="left">{rows[7].col3}</StyledTableCell>
                        <StyledTableCell align="left">{rows[7].col4}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCellWithoutBorder align="left">{rows[8].col1}</StyledTableCellWithoutBorder>
                        <StyledTableCell align="left">{rows[8].col2}</StyledTableCell>
                        <StyledTableCell align="left">{rows[8].col3}</StyledTableCell>
                        <StyledTableCell align="left">{rows[8].col4}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCellWithoutBorder align="left">{rows[9].col1}</StyledTableCellWithoutBorder>
                        <StyledTableCell align="left">{rows[9].col2}</StyledTableCell>
                        <StyledTableCell align="left">{rows[9].col3}</StyledTableCell>
                        <StyledTableCell align="left">{rows[9].col4}</StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}