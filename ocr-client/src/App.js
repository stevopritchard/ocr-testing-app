import React, { useState }from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import TextDetection from './Containers/TextDetection/TextDetection'
import TextTable from './Components/TextTable/TextTable'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}))


export default function App() {
  const [text, setText] = useState([])

  const classes = useStyles()

  function clearText() {
    setText("")
  }

  return (
    <div className={classes.root} spacing={2}>
      <Grid item xs={12} sm={4}>
        <TextDetection textToParent={setText} clearText={clearText}/>
      </Grid>
      <Grid item xs={12} sm={8}>
        <TextTable segments={text}/>
      </Grid>
    </div>
  );
}

