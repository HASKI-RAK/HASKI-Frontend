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


export function ListK() {

    const {t} = useTranslation();


    const rows = [
        {
            id: 1,
            col1: t("components.QuestionnaireResults.TableListK.Factors & subscales"),
            col2: t("components.QuestionnaireResults.TableListK.Score"),
        },
        {
            id: 2,
            col1: t("components.QuestionnaireResults.TableListK.Cognitive strategies"),
            col2: "2,08",
            col3: t("components.QuestionnaireResults.TableListK.Internal resource management strategies"),
            col4: "2,33"
        },
        {
            id: 3,
            col1: t("components.QuestionnaireResults.TableListK.Organize"),
            col2: "2,00",
            col3: t("components.QuestionnaireResults.TableListK.Attention"),
            col4: "2,67"
        },
        {
            id: 4,
            col1: t("components.QuestionnaireResults.TableListK.Elaborate"),
            col2: "1,67",
            col3: t("components.QuestionnaireResults.TableListK.Effort"),
            col4: "3,33"
        },
        {
            id: 5,
            col1: t("components.QuestionnaireResults.TableListK.Critical review"),
            col2: "1,00",
            col3: t("components.QuestionnaireResults.TableListK.Time"),
            col4: "1.00"
        },
        {
            id: 6,
            col1: t("components.QuestionnaireResults.TableListK.Repeat"),
            col2: "3,67",
            col3: "",
            col4: ""
        },
        {
            id: 7,
            col1: t("components.QuestionnaireResults.TableListK.Metacognitive strategies"),
            col2: "1,89",
            col3: t("components.QuestionnaireResults.TableListK.External resource management strategies"),
            col4: "3,44"
        },
        {
            id: 8,
            col1: t("components.QuestionnaireResults.TableListK.Goals & plans"),
            col2: "1,00",
            col3: t("components.QuestionnaireResults.TableListK.Learning with classmates"),
            col4: "3,00"
        },
        {
            id: 9,
            col1: t("components.QuestionnaireResults.TableListK.Control"),
            col2: "2,33",
            col3: t("components.QuestionnaireResults.TableListK.Literature research"),
            col4: "3,67"
        },
        {
            id: 10,
            col1: t("components.QuestionnaireResults.TableListK.Regulate"),
            col2: "2,33",
            col3: t("components.QuestionnaireResults.TableListK.Learning environment"),
            col4: "3,67"
        },
    ];

    return (
        <TableContainer component={Paper} style={{width: 500}}>
            <Table style={{width: 500}} aria-label="customized table">
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