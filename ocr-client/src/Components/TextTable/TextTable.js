import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() => ({
    container: {
        marginLeft: 10,
        marginRight: 10,
        maxHeight: 'calc(100vh - 150px)',
        height: '100%',
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
    //   backgroundColor: theme.palette.common.black,
    //   color: theme.palette.common.white,
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
    const classes = useStyles()
    return (
        <TableContainer component={Paper} className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                <TableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell>Line</StyledTableCell>
                    <StyledTableCell>Transcribed Text</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {
                        segments ?
                        segments.map((segment, i) => {
                            if (segment !== "") {
                                return (
                                <StyledTableRow key={i}>
                                    <Checkbox></Checkbox>
                                    <StyledTableCell>{i+1}</StyledTableCell>
                                    <StyledTableCell>{segment}</StyledTableCell>
                                </StyledTableRow>
                                )
                            } else {
                                return null
                            }
                        }) 
                        :
                        <StyledTableRow>
                            <Checkbox></Checkbox>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </StyledTableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

