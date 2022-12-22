import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '& .MuiTableCell-root': {
        borderLeft: "1px solid rgba(224, 224, 224, 1)"
    }
}));

const StyledTableRowWithoutBorder = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    }
}));



export function ILS() {

    const {t} = useTranslation();

    const inter = new Map<number,string>();
    inter.set(-1,t("components.QuestionnaireResults.TableILS.balanced"))
    inter.set(1,t("components.QuestionnaireResults.TableILS.balanced"))
    inter.set(-3,t("components.QuestionnaireResults.TableILS.balanced"))
    inter.set(3,t("components.QuestionnaireResults.TableILS.balanced"))
    inter.set(-5,t("components.QuestionnaireResults.TableILS.moderate"))
    inter.set(5,t("components.QuestionnaireResults.TableILS.moderate"))
    inter.set(-7,t("components.QuestionnaireResults.TableILS.moderate"))
    inter.set(7,t("components.QuestionnaireResults.TableILS.moderate"))
    inter.set(-9,t("components.QuestionnaireResults.TableILS.strong"))
    inter.set(9,t("components.QuestionnaireResults.TableILS.strong"))
    inter.set(-11,t("components.QuestionnaireResults.TableILS.strong"))
    inter.set(11,t("components.QuestionnaireResults.TableILS.strong"))
    
    function getInterpretation(score: number, interpretationString: string) {
        if(inter.get(score) === t("components.QuestionnaireResults.TableILS.balanced"))
            return inter.get(score)
        return inter.get(score) + " " + interpretationString;
    }

    const rows = [
        { id: 1,
            col1: t("components.QuestionnaireResults.TableILS.dimension"),
            col2: "",
            col3: t("components.QuestionnaireResults.TableILS.interpretation"),
            col4: t("components.QuestionnaireResults.TableILS.score")
        },
        { id: 2,
            col1: t("components.QuestionnaireResults.TableILS.active"),
            col2: t("components.QuestionnaireResults.TableILS.reflective"),
            col3: getInterpretation(-1,t("components.QuestionnaireResults.TableILS.reflective").toLowerCase()),
            col4: "-1"
        },
        { id: 3,
            col1: t("components.QuestionnaireResults.TableILS.sensory"),
            col2: t("components.QuestionnaireResults.TableILS.intuitive"),
            col3: getInterpretation(-5,t("components.QuestionnaireResults.TableILS.intuitive").toLowerCase()),
            col4: "-5"
        },
        { id: 4,
            col1: t("components.QuestionnaireResults.TableILS.visual"),
            col2: t("components.QuestionnaireResults.TableILS.verbal"),
            col3: getInterpretation(3,t("components.QuestionnaireResults.TableILS.verbal").toLowerCase()),
            col4: "3"
        },
        { id: 5,
            col1: t("components.QuestionnaireResults.TableILS.sequential"),
            col2: t("components.QuestionnaireResults.TableILS.global"),
            col3: getInterpretation(11,t("components.QuestionnaireResults.TableILS.verbal").toLowerCase()),
            col4: "11"
        },
    ];

    return (
        <TableContainer component={Paper} style={{ width: 500 }}>
            <Table style={{ width: 500 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">{rows[0].col1}</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell align="left">{rows[0].col3}</StyledTableCell>
                        <StyledTableCell align="left">{rows[0].col4}</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.filter(function(row) {
                        return row.id !== 1;
                    }).map((row) => (
                    <StyledTableRow>
                        <StyledTableCell align="left">{row.col1}</StyledTableCell>
                        <StyledTableCell align="left">{row.col2}</StyledTableCell>
                        <StyledTableCell align="left">{row.col3}</StyledTableCell>
                        <StyledTableCell align="right">{row.col4}</StyledTableCell>
                    </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}