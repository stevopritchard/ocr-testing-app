import React, { useState, useEffect, useRef} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'

import Button from '@material-ui/core/Button'

import {Select, MenuItem } from '@material-ui/core'


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


export default function TextTable({segments, setJson}) {
    const defaultCategories = [{value:'description'}, {value:'quantity'}, {value:'price'}]

    //the array of categories available to the dropdown in the table
    const [categories, updateCategories] = useState(defaultCategories)

    //the ref to which selected catories are assigned
    const catRefs = useRef([])

    const [currentCategory, setSelected] = useState('')

    const [finalCategories, setFinal] = useState([]);
    const [finalSegments, setSegments] = useState([]);

    //create an array of refs for each row
    const segmentsLength = segments.length;

    if(catRefs.current.length !== segmentsLength) {
        catRefs.current = Array(segmentsLength).fill().map((_, i) => catRefs.current[i])
        console.log(catRefs.current)
    }

    //callback assigns the selected category to the TextField with the ref that has a matching index
    const handleChange = (index, event) => {
        setSelected(event.target.value);
        catRefs.current[index] = event.target.value
        console.log(catRefs)
        updateCategories(categories.filter(category => category.value !== event.target.value)) //to be amended to filter out items that exist in catRefs
    }
    
    const setCategories = () => {
        // setFinal(catRefs.current)
        
        let filteredCategories = finalCategories.filter((cat, i) => cat !== undefined)
        console.log(filteredCategories)
        let catKeys = []
        filteredCategories.forEach(element => {
            catKeys.push(finalCategories.indexOf(element))
        });
        console.log(catKeys)
        // catKeys.forEach(key => {
        //     setSegments(prevState => [...prevState, segments[key]])
        // });
        catKeys.forEach(key => {
            finalSegments.push(segments[key])
        })
        console.log(finalSegments)

        let jsonDoc = {}
        filteredCategories.forEach((category, i) => {
            var key = category
            jsonDoc[key] = finalSegments[i]
        });
        console.log(jsonDoc)
        setJson(jsonDoc)
    }

    useEffect(() => {
        setFinal(catRefs.current)
    },[catRefs.current])

    useEffect(() => {
        setSegments(finalSegments)
    },[finalSegments])

    const classes = useStyles()

    return (
        <TableContainer component={Paper} className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Category</StyledTableCell>
                    <StyledTableCell>Available</StyledTableCell>
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
                                    <StyledTableCell>
                                        <TextField
                                            // ref={catRefs.current[i]}
                                            value={catRefs.current[i]} 
                                            disabled
                                        >
                                        </TextField>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Select
                                            onChange={handleChange.bind(this, i)}
                                        >
                                            {categories.map((category, j) => {
                                                return (
                                                    <MenuItem 
                                                    key={j}
                                                    value={category.value}
                                                    >
                                                        {category.value}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </StyledTableCell>
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
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </StyledTableRow>
                    }
                </TableBody>
            </Table>
            <Button variant="outlined" type="button" onClick={setCategories}>set categories</Button>
        </TableContainer>
    )
}

