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

//These Values are later given from the Backend
let organize = 5;
let elaborate = 5;
let criticalReview = 5;
let repeat = 5;
let attention = 1;
let effort = 1;
let time = 1;
let goalsPlans = 1;
let control = 1;
let regulate = 1;
let learnWithClassmates = 1;
let literatureResearch = 1;
let learningEnvironment = 1;

export function GetSubscaleScore(score: number[]): number {

    return score.reduce((a, b) => a + b, 0) / score.length;
}

//Setting ILSparameters for tests
export function SetListKParameters(org?: number, elab?: number, critRev?: number, rep?: number,
                                   att?: number, eff?: number, tim?: number, goalsPl?: number, contr?: number,
                                   reg?: number, learnWClass?: number, litRes?: number,
                                   learnE?: number){

    organize = org ?? organize;
    elaborate = elab ?? elaborate;
    criticalReview = critRev ?? criticalReview;
    repeat = rep ?? repeat;
    attention = att ?? attention;
    effort = eff ?? effort;
    time = tim ?? time;
    goalsPlans = goalsPl ?? goalsPlans;
    control = contr ?? control;
    regulate = reg ?? regulate;
    learnWithClassmates = learnWClass ?? learnWithClassmates;
    literatureResearch = litRes ?? literatureResearch;
    learningEnvironment = learnE ?? learningEnvironment;
}

export function GetListKParameters(): [[
    organize: number, elaborate: number, criticalReview: number, repeat: number,
    attention: number, effort: number, time: number, goalsPlans: number, control: number,
    regulate: number, learnWithClassmates: number, literatureResearch: number,
    learningEnvironment: number
], [
    averageCognitiveStrategies: number, averageInternalResourceManagementStrategies: number,
    averageMetacognitiveStrategies: number, averageExternalResourcesManagementStrategies: number
]] {

    SetListKParameters();

    const averageCognitiveStrategies = GetSubscaleScore([organize, elaborate, criticalReview, repeat])
    const averageInternalResourceManagementStrategies = GetSubscaleScore([attention, effort, time]);
    const averageMetacognitiveStrategies = GetSubscaleScore([goalsPlans, control, regulate]);
    const averageExternalResourcesManagementStrategies = GetSubscaleScore([learnWithClassmates, literatureResearch, learningEnvironment]);


    return [[
        organize, elaborate, criticalReview, repeat, attention, effort, time, goalsPlans, control, regulate, learnWithClassmates,
        literatureResearch, learningEnvironment
    ], [
        averageCognitiveStrategies, averageInternalResourceManagementStrategies,
        averageMetacognitiveStrategies, averageExternalResourcesManagementStrategies
    ]];
}

export function TableListK() {

    const {t} = useTranslation();

    const [[
        organize, elaborate, criticalReview, repeat, attention, effort, time, goalsPlans, control, regulate, learnWithClassmates,
        literatureResearch, learningEnvironment
    ], [
        averageCognitiveStrategies, averageInternalResourceManagementStrategies,
        averageMetacognitiveStrategies, averageExternalResourcesManagementStrategies
    ]] = GetListKParameters();

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
            col2: organize.toFixed(2),
            col3: t("components.QuestionnaireResults.TableListK.Attention"),
            col4: attention.toFixed(2),
        },
        {
            id: 4,
            col1: t("components.QuestionnaireResults.TableListK.Elaborate"),
            col2: elaborate.toFixed(2),
            col3: t("components.QuestionnaireResults.TableListK.Effort"),
            col4: effort.toFixed(2),
        },
        {
            id: 5,
            col1: t("components.QuestionnaireResults.TableListK.Critical review"),
            col2: criticalReview.toFixed(2),
            col3: t("components.QuestionnaireResults.TableListK.Time"),
            col4: time.toFixed(2),
        },
        {
            id: 6,
            col1: t("components.QuestionnaireResults.TableListK.Repeat"),
            col2: repeat.toFixed(2),
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
            col2: goalsPlans.toFixed(2),
            col3: t("components.QuestionnaireResults.TableListK.Learning with classmates"),
            col4: learnWithClassmates.toFixed(2),
        },
        {
            id: 9,
            col1: t("components.QuestionnaireResults.TableListK.Control"),
            col2: control.toFixed(2),
            col3: t("components.QuestionnaireResults.TableListK.Literature research"),
            col4: literatureResearch.toFixed(2),
        },
        {
            id: 10,
            col1: t("components.QuestionnaireResults.TableListK.Regulate"),
            col2: regulate.toFixed(2),
            col3: t("components.QuestionnaireResults.TableListK.Learning environment"),
            col4: learningEnvironment.toFixed(2),
        },
    ];

    return (
        <TableContainer component={Paper} style={{minWidth: 300}}>
            <Table sx={{minWidth: 300}} aria-label="customized table">
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
                        <StyledTableCellWithoutBorder align="left"
                                                      style={{color: "white"}}>{rows[1].col1}</StyledTableCellWithoutBorder>
                        <StyledTableCellWithoutBorder align="left"
                                                      style={{color: "white"}}>{rows[1].col2}</StyledTableCellWithoutBorder>
                        <StyledTableCellWithoutBorder align="left"
                                                      style={{color: "white"}}>{rows[1].col3}</StyledTableCellWithoutBorder>
                        <StyledTableCellWithoutBorder align="left"
                                                      style={{color: "white"}}>{rows[1].col4}</StyledTableCellWithoutBorder>
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