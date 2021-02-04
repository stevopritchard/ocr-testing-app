import React, { useState }from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
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
                <TextTable segments={text}/>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    </ThemeProvider>
  );
}

