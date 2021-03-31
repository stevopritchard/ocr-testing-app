import React, { useEffect, useState }from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import Header from './Containers/Header/Header';
import TextDetection from './Containers/TextDetection/TextDetection';
import TextTable from './Components/TextTable/TextTable';

import { createMuiTheme , ThemeProvider } from '@material-ui/core/styles'
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange
} from "@material-ui/core/colors";
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  mainArea:{
    flexGrow: 1,
    marginTop: 35,
    height: 'calc(100vh-35px)',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: 'flex',
  },
}))

export default function App() {
  const [darkState, setDarkState ] = useState(false);
  const [text, setText] = useState([]);
  const [json, setJson] = useState({})

  useEffect(() => {
    console.log(json)
  }, [json])

  const classes = useStyles()

  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];

  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    },
    primary: {
      main: mainPrimaryColor
    },
    secondary: {
      main: mainSecondaryColor
    },
  });

  const handleThemeChange =() => {
    setDarkState(!darkState)
  };

  function clearText() {
    setText("")
  }

  const writeToFile = async () => {
    console.log(json)
    const response = await fetch('http://localhost:5000/writeInvoice', {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    })
    const body = await response.json()
    console.log(body)
    return body
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        <Grid>
          <Header darkState={darkState} handleDarkMode={handleThemeChange}/>
        </Grid>
        <main className={classes.mainArea}>
          <Grid container spacing={3} className={classes.container}>
            <Grid item xs={12} sm={4}>
              <TextDetection textToParent={setText} clearText={clearText}/>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Grid container >
                <TextTable segments={text} setJson={setJson}/>
              </Grid>

              <Button variant="outlined" type="button" onClick={() => writeToFile()}>send to endpoint</Button>
            </Grid>
          </Grid>
        </main>
      </div>
    </ThemeProvider>
  );
}

