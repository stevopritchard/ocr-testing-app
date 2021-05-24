import React, { useEffect, useState }from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import Header from './Containers/Header/Header';
import TextDetection from './Containers/TextDetection/TextDetection';
import FormData from './Components/Tables/FormData';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { green } from '@material-ui/core/colors'

import { createMuiTheme , ThemeProvider } from '@material-ui/core/styles'
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange
} from "@material-ui/core/colors";
import POList from './Components/Tables/POList';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  mainArea:{
    display: 'flex',
    marginTop: 35,
    height: 'calc(100vh-35px)',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
  },
  lowerArea: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

export default function App() {
  const [darkState, setDarkState ] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [json, setJson] = useState({})

  let invoiceList = invoices.length

  useEffect(() => {
    console.log(json)
  }, [json])

  useEffect(() => {
    if(invoiceList > 0) {
      invoices.forEach((invoice, index) => {
        invoice.purchaseOrders.forEach((purchaseOrder) => {
          searchBP(purchaseOrder).then(response => {
            if (response) {
              let newArr = [...invoices]
              newArr[index].validNumber = response.id
              setInvoices(newArr)
            }
          })
        })
      })
    }
  },[invoiceList])

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
    sendToBP: {
      palette: green
    }
  });

  const handleThemeChange = () => {
    setDarkState(!darkState)
  };

  function clearText() {
    setInvoices([{
      date: "",
      name: "",
      purchaseOrders: [],
      validNumber: ""
    }])
  }

  async function searchBP (orderNumber) {
    const findOrder = await fetch('/queryBp', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({orderId: orderNumber})
    });
    const testComplete = await findOrder.json()
    // console.log(testComplete)
    return testComplete
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
          <TextDetection 
            handleThemeChange={handleThemeChange}
            keyDataToParent={setInvoices} 
            clearText={clearText}
          />
        </Grid>
        <main className={classes.mainArea}>
          <Grid container spacing={3} className={classes.container}>
            <Grid item sm={1}/>
            <Grid item sm={10}>
              <Grid container >
                <POList invoices={invoices} setJson={setJson} searchBP={searchBP} setInvoices={setInvoices}/>
              </Grid>
            </Grid>
            <Grid item sm={1}/>
          </Grid>
        </main>
        <Grid item sm={12} className={classes.lowerArea}>
          <Button variant="contained" type="button" disableElevation onClick={() => writeToFile()}>Send to BrightPearl</Button>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

