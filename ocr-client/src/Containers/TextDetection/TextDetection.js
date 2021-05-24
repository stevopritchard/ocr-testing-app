import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper, Container, Card, Button } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Dropzone from '../../Components/Dropzone/Dropzone'
import Switch from '@material-ui/core/Switch'

const useStyles = makeStyles((theme) => ({
  root:{
    display: 'flex',
    flexGrow: 1,
    margin: theme.spacing(1)
  },
  dropzone:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  dropzoneCard: {
    // marginBottom: 40,
  },
  buttonArea: {
    display: 'flex',
    justifyContent: 'center',
  },
  toolbarButtons: {
    display: 'flex',
    marginLeft: 'auto',
  },
}));

function TextDetection({ handleThemeChange, keyDataToParent, clearText }) {
  const classes = useStyles()

  var dummyData = [
    {
      name: 'Naylor 81091331 .jpg',
      purchaseOrders: [ '146499', '342010' ],
      date: '19/02/2021'
    },
    {
      name: 'Eccles 61275.jpg',
      purchaseOrders: [ '146865' ],
      date: '16/02/2021'
    },
    {
      name: 'no-po.jpg',
      purchaseOrders: [ '999999' ],
      date: '01/01/2021'
    }
  ]
  
  const uploadImage = async (images) => {
    var formData = new FormData();
    images.forEach(image => formData.append('photo', image))
    const formResponse = await fetch('/getFormData', {
      method: "post",
      body: formData
    })
    const formResponseData = await formResponse.json();
    
    // const tableResponse = await fetch('/getTableData', {
    //   method: "post",
    //   body: formData
    // })

    // const tableResponseData = await tableResponse.json();
    // console.log(tableResponseData)
    keyDataToParent(Object.values(formResponseData))
    // formResponseData.purchaseOrders.forEach((number) => searchBP(number))
  }

  return (
    // <Grid className={classes.root}>
    <Toolbar className={classes.root} variant="dense">
      <Grid xs={5}>
        Dashboard
        <Switch 
          onChange={handleThemeChange}
          defaultChecked
          color="default"
          inputProps={{ 'aria-label': 'checkbox with default color' }}
          label="Dark Mode"
        />
      </Grid>
      <Grid xs={3} className={classes.dropzone}>
        <Card 
          variant="outlined" 
          style={{border: '2px dashed gray'}}
          className={classes.dropzoneCard}
        >
          <Dropzone uploadImage = {uploadImage}/>
        </Card>
      </Grid>
      <Grid xs={4} className={classes.toolbarButtons}>
        <Container className={classes.buttonArea}>
          <Button 
            variant="contained"
            color="default"
            type="button" 
            disableElevation 
            onClick={() => clearText()}
          >
            Clear
          </Button>
        </Container>
        <Container className={classes.buttonArea}>
          <Button 
            variant="outlined" 
            type="button" 
            disableElevation 
            onClick={() => keyDataToParent(dummyData)}
          >
            Static
          </Button>
        </Container>
        <Container className={classes.buttonArea}>
          <Button
            variant="contained"
          >
            Logout
          </Button>
        </Container>
      </Grid>
    </Toolbar>
    // </Grid>
  );
}

export default TextDetection;
