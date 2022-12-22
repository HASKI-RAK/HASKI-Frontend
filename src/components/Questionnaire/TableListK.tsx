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

const StyledTableCellWithoutBorder = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#24262a',
      color: '#FFFFFF',
      fontSize: 13,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 13,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:nth-of-type(2)':{
      backgroundColor: '#24262a'
    },
    '&:nth-of-type(7)':{
      backgroundColor: '#24262a'
    },
}));


export function ListK() {

  const {t} = useTranslation();
  

  const rows = [
    { id: 1,
      col1: t("components.QuestionnaireResults.TableListK.factors & subscala"),
      col2: t("components.QuestionnaireResults.TableListK.score"),
    },
    { id: 2,
      col1: t("components.QuestionnaireResults.TableListK.cognitive strategies"),
      col2: "2,08",
      col3: t("components.QuestionnaireResults.TableListK.internal resource management strategies"),
      col4: "2,33"
    },
    { id: 3,
      col1: t("components.QuestionnaireResults.TableListK.organize"),
      col2: "2,00",
      col3: t("components.QuestionnaireResults.TableListK.attention"),
      col4: "2,67"
    },
    { id: 4,
      col1: t("components.QuestionnaireResults.TableListK.elaborate"),
      col2: "1,67",
      col3: t("components.QuestionnaireResults.TableListK.effort"),
      col4: "3,33"
    },
    { id: 5,
      col1: t("components.QuestionnaireResults.TableListK.critical review"),
      col2: "1,00",
      col3: t("components.QuestionnaireResults.TableListK.time"),
      col4: "1.00"
    },
    { id: 6,
      col1: t("components.QuestionnaireResults.TableListK.repeat"),
      col2: "3,67",
      col3: "",
      col4: ""
    },
    { id: 7,
      col1: t("components.QuestionnaireResults.TableListK.metacognitive strategies"),
      col2: "1,89",
      col3: t("components.QuestionnaireResults.TableListK.external resource management strategies"),
      col4: "3,44"
    },
    { id: 8,
      col1: t("components.QuestionnaireResults.TableListK.aim & plan"),
      col2: "1,00",
      col3: t("components.QuestionnaireResults.TableListK.learning with classmates"),
      col4: "3,00"
    },
    { id: 9,
      col1: t("components.QuestionnaireResults.TableListK.control"),
      col2: "2,33",
      col3: t("components.QuestionnaireResults.TableListK.literature research"),
      col4: "3,67"
    },
    { id: 10,
      col1: t("components.QuestionnaireResults.TableListK.regulate"),
      col2: "2,33",
      col3: t("components.QuestionnaireResults.TableListK.learning environment"),
      col4: "3,67"
    },
  ];

  return (
      <TableContainer component={Paper} style={{ width: 500 }}>
        <Table style={{ width: 500 }} aria-label="customized table">
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
                  <StyledTableCellWithoutBorder align="left">{rows[1].col1}</StyledTableCellWithoutBorder>
                  <StyledTableCell align="left">{rows[1].col2}</StyledTableCell>
                  <StyledTableCell align="left">{rows[1].col3}</StyledTableCell>
                  <StyledTableCell align="left">{rows[1].col4}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCellWithoutBorder align="left" style={{color:"white"}}>{rows[2].col1}</StyledTableCellWithoutBorder>
                  <StyledTableCellWithoutBorder align="left" style={{color:"white"}}>{rows[2].col2}</StyledTableCellWithoutBorder>
                  <StyledTableCellWithoutBorder align="left" style={{color:"white"}}>{rows[2].col3}</StyledTableCellWithoutBorder>
                  <StyledTableCellWithoutBorder align="left" style={{color:"white"}}>{rows[2].col4}</StyledTableCellWithoutBorder>
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
                  <StyledTableCellWithoutBorder align="left">{rows[6].col1}</StyledTableCellWithoutBorder>
                  <StyledTableCell align="left">{rows[6].col2}</StyledTableCell>
                  <StyledTableCell align="left">{rows[6].col3}</StyledTableCell>
                  <StyledTableCell align="left">{rows[6].col4}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCellWithoutBorder align="left" style={{color:"white"}}>{rows[7].col1}</StyledTableCellWithoutBorder>
                  <StyledTableCellWithoutBorder align="left" style={{color:"white"}}>{rows[7].col2}</StyledTableCellWithoutBorder>
                  <StyledTableCellWithoutBorder align="left" style={{color:"white"}}>{rows[7].col3}</StyledTableCellWithoutBorder>
                  <StyledTableCellWithoutBorder align="left" style={{color:"white"}}>{rows[7].col4}</StyledTableCellWithoutBorder>
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