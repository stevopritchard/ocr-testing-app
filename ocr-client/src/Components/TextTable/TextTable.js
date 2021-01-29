import React, {useStyles} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Scroll from '../Scroll/Scroll';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  
  }))(TableCell);
  
const StyledTableRow = withStyles((theme) => ({
root: {
    '&:nth-ot-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    },
},
}))(TableRow);

export default function TextTable({segments}) {
    return (
        <Scroll>
            <TableContainer>
            <Table>
                <TableHead>
                <TableRow>
                    <StyledTableCell>Segment</StyledTableCell>
                    <StyledTableCell>Transcribed Text</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {
                    segments ?
                    segments.map((segment, i) => {
                        return (
                        <StyledTableRow key={i}>
                            <StyledTableCell>{i+1}</StyledTableCell>
                            <StyledTableCell>{segment}</StyledTableCell>
                        </StyledTableRow>
                        )
                    }) :
                    <StyledTableRow>
                        <StyledTableCell>0</StyledTableCell>
                        <StyledTableCell>text goes here</StyledTableCell>
                    </StyledTableRow>
                }
                </TableBody>
            </Table>
            </TableContainer>
        </Scroll>
    )
}

