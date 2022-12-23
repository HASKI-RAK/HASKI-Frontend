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

}));


export function ILS() {

    const {t} = useTranslation();

    const inter = new Map<number, string>();
    inter.set(-1, t("components.QuestionnaireResults.TableILS.balanced"))
    inter.set(1, t("components.QuestionnaireResults.TableILS.balanced"))
    inter.set(-3, t("components.QuestionnaireResults.TableILS.balanced"))
    inter.set(3, t("components.QuestionnaireResults.TableILS.balanced"))
    inter.set(-5, t("components.QuestionnaireResults.TableILS.moderate"))
    inter.set(5, t("components.QuestionnaireResults.TableILS.moderate"))
    inter.set(-7, t("components.QuestionnaireResults.TableILS.moderate"))
    inter.set(7, t("components.QuestionnaireResults.TableILS.moderate"))
    inter.set(-9, t("components.QuestionnaireResults.TableILS.strong"))
    inter.set(9, t("components.QuestionnaireResults.TableILS.strong"))
    inter.set(-11, t("components.QuestionnaireResults.TableILS.strong"))
    inter.set(11, t("components.QuestionnaireResults.TableILS.strong"))

    function getInterpretation(score: number, interpretationString: string): string {
        if(inter.get(score) === t("components.QuestionnaireResults.TableILS.balanced"))
            return t("components.QuestionnaireResults.TableILS.balanced")
        return inter.get(score) + " " + interpretationString;
    }

    const rows = [
        {
            id: 1,
            col1: t("components.QuestionnaireResults.TableILS.Dimension"),
            col2: "",
            col3: t("components.QuestionnaireResults.TableILS.Interpretation"),
            col4: t("components.QuestionnaireResults.TableILS.Score")
        },
        {
            id: 2,
            col1: t("components.QuestionnaireResults.TableILS.Active"),
            col2: t("components.QuestionnaireResults.TableILS.Reflective"),
            col3: getInterpretation(-1, t("components.QuestionnaireResults.TableILS.Reflective").toLowerCase()),
            col4: "-1"
        },
        {
            id: 3,
            col1: t("components.QuestionnaireResults.TableILS.Sensory"),
            col2: t("components.QuestionnaireResults.TableILS.Intuitive"),
            col3: getInterpretation(-5, t("components.QuestionnaireResults.TableILS.Intuitive").toLowerCase()),
            col4: "-5"
        },
        {
            id: 4,
            col1: t("components.QuestionnaireResults.TableILS.Visual"),
            col2: t("components.QuestionnaireResults.TableILS.Verbal"),
            col3: getInterpretation(3, t("components.QuestionnaireResults.TableILS.Verbal").toLowerCase()),
            col4: "3"
        },
        {
            id: 5,
            col1: t("components.QuestionnaireResults.TableILS.Sequential"),
            col2: t("components.QuestionnaireResults.TableILS.Global"),
            col3: getInterpretation(11, t("components.QuestionnaireResults.TableILS.Verbal").toLowerCase()),
            col4: "11"
        },
    ];

    return (
        <TableContainer component={Paper} style={{width: 500}} key={"TableILSContainer"}>
            <Table style={{width: 500}} aria-label="customized table" key={"TableILS"}>
                <TableHead key={"TableILSHead"}>
                    <TableRow key={"TableILSTableRow"}>
                        <StyledTableCellWithoutBorder align="left">{rows[0].col1}</StyledTableCellWithoutBorder>
                        <StyledTableCellWithoutBorder></StyledTableCellWithoutBorder>
                        <StyledTableCellWithoutBorder align="left">{rows[0].col3}</StyledTableCellWithoutBorder>
                        <StyledTableCellWithoutBorder align="left">{rows[0].col4}</StyledTableCellWithoutBorder>
                    </TableRow>
                </TableHead>
                <TableBody key={"TableILSBody"}>
                    {rows.filter(function(row) {
                        return row.id !== 1;
                    }).map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCellWithoutBorder align="left">{row.col1}</StyledTableCellWithoutBorder>
                            <StyledTableCellWithoutBorder align="left">{row.col2}</StyledTableCellWithoutBorder>
                            <StyledTableCell align="left">{row.col3}</StyledTableCell>
                            <StyledTableCell align="right">{row.col4}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}