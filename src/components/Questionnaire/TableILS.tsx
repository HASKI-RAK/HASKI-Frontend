﻿import * as React from 'react';
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

let dimensionOneScore = -11;
let dimensionTwoScore = 7;
let dimensionThreeScore = 3;
let dimensionFourScore = -5;


//Setting ILSparameters for tests
export function setILSParameters(dimOne?: number, dimTwo?: number, dimThree?: number, dimFour?: number){

    dimensionOneScore = dimOne ?? dimensionOneScore;
    dimensionTwoScore = dimTwo ?? dimensionTwoScore;
    dimensionThreeScore = dimThree ?? dimensionThreeScore;
    dimensionFourScore = dimFour ?? dimensionFourScore;
}

export function GetILSParameters(){

    setILSParameters();

    return [dimensionOneScore, dimensionTwoScore, dimensionThreeScore, dimensionFourScore];
}

export function getInterpretation(score: number, interpretationString: string, onlyEnglish?: boolean): string {

    const {t, i18n} = useTranslation();

    const inter = new Map<number, string>();

    if(onlyEnglish){
        const en = i18n.getFixedT("en");

        inter.set(-1, en("components.QuestionnaireResults.TableILS.balanced"))
        inter.set(1, en("components.QuestionnaireResults.TableILS.balanced"))
        inter.set(-3, en("components.QuestionnaireResults.TableILS.balanced"))
        inter.set(3, en("components.QuestionnaireResults.TableILS.balanced"))
        inter.set(-5, en("components.QuestionnaireResults.TableILS.moderate"))
        inter.set(5, en("components.QuestionnaireResults.TableILS.moderate"))
        inter.set(-7, en("components.QuestionnaireResults.TableILS.moderate"))
        inter.set(7, en("components.QuestionnaireResults.TableILS.moderate"))
        inter.set(-9, en("components.QuestionnaireResults.TableILS.strong"))
        inter.set(9, en("components.QuestionnaireResults.TableILS.strong"))
        inter.set(-11, en("components.QuestionnaireResults.TableILS.strong"))
        inter.set(11, en("components.QuestionnaireResults.TableILS.strong"))
    }
    else{
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
    }

    //if the interpretation is "balanced", then only return "balanced" without the Dimension
    if(inter.get(score) === t("components.QuestionnaireResults.TableILS.balanced"))
        return t("components.QuestionnaireResults.TableILS.balanced")
    return inter.get(score) + " " + interpretationString;
}

//Depending on the score, return the corresponding dimension
export function getILSDimension(dimensionNumber: number, score: number, onlyEnglish?:boolean): string{

    const {t,i18n} = useTranslation();

    switch(dimensionNumber){
        case 1:
            if(onlyEnglish){
                const en = i18n.getFixedT("en");
                if (score > 0 )
                    return en("components.QuestionnaireResults.TableILS.Active")
                else
                    return en("components.QuestionnaireResults.TableILS.Reflective")
            }
            else {
                if(score > 0)
                    return t("components.QuestionnaireResults.TableILS.Active")
                else
                    return t("components.QuestionnaireResults.TableILS.Reflective")
            }
        case 2:
            if(onlyEnglish){
                const en = i18n.getFixedT("en");
                if (score > 0 )
                    return en("components.QuestionnaireResults.TableILS.Sensory")
                else
                    return en("components.QuestionnaireResults.TableILS.Intuitive")
            }
            else {
                if(score > 0)
                    return t("components.QuestionnaireResults.TableILS.Sensory")
                else
                    return t("components.QuestionnaireResults.TableILS.Intuitive")
            }
        case 3:
            if(onlyEnglish){
                const en = i18n.getFixedT("en");
                if (score > 0 )
                    return en("components.QuestionnaireResults.TableILS.Visual")
                else
                    return en("components.QuestionnaireResults.TableILS.Verbal")
            }
            else {
                if(score > 0)
                    return t("components.QuestionnaireResults.TableILS.Visual")
                else
                    return t("components.QuestionnaireResults.TableILS.Verbal")
            }
        case 4:
            if(onlyEnglish){
                const en = i18n.getFixedT("en");
                if (score > 0 )
                    return en("components.QuestionnaireResults.TableILS.Sequential")
                else
                    return en("components.QuestionnaireResults.TableILS.Global")
            }
            else {
                if(score > 0)
                    return t("components.QuestionnaireResults.TableILS.Sequential")
                else
                    return t("components.QuestionnaireResults.TableILS.Global")
            }
        default:
            return "No dimension found";
    }
}

export function TableILS() {

    const {t} = useTranslation();
    const [dimensionOneScore, dimensionTwoScore, dimensionThreeScore, dimensionFourScore] = GetILSParameters();

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
            col1: t("components.QuestionnaireResults.TableILS.Reflective"),
            col2: t("components.QuestionnaireResults.TableILS.Active"),
            col3: getInterpretation(dimensionOneScore, getILSDimension(1, dimensionOneScore).toLowerCase()),
            col4: [dimensionOneScore].toString()
        },
        {
            id: 3,
            col1: t("components.QuestionnaireResults.TableILS.Intuitive"),
            col2: t("components.QuestionnaireResults.TableILS.Sensory"),
            col3: getInterpretation(dimensionTwoScore, getILSDimension(2, dimensionTwoScore).toLowerCase()),
            col4: [dimensionTwoScore].toString()
        },
        {
            id: 4,
            col1: t("components.QuestionnaireResults.TableILS.Verbal"),
            col2: t("components.QuestionnaireResults.TableILS.Visual"),
            col3: getInterpretation(dimensionThreeScore, getILSDimension(3, dimensionThreeScore).toLowerCase()),
            col4: [dimensionThreeScore].toString()
        },
        {
            id: 5,
            col1: t("components.QuestionnaireResults.TableILS.Global"),
            col2: t("components.QuestionnaireResults.TableILS.Sequential"),
            col3: getInterpretation(dimensionFourScore, getILSDimension(4, dimensionFourScore).toLowerCase()),
            col4: [dimensionFourScore].toString()
        },
    ];

    return (
        <TableContainer component={Paper} style={{minWidth: 300}} key={"TableILSContainer"}>
            <Table style={{minWidth: 300}} aria-label="customized table" key={"TableILS"}>
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