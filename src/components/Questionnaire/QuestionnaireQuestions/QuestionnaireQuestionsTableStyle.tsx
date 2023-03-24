import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";

export const StyledTableCellQuestion = styled(TableCell)(() => ({
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: 'rgba(36,38,42,0.65)',
    },
}));

export const styleButtonClose = {
    position: 'absolute',
    left: '75.5%',
    top: '1%',
    p: 2,
}