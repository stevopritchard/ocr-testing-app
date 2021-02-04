import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Container, Card, Button } from '@material-ui/core';
import Dropzone from '../../Components/Dropzone/Dropzone'

const useStyles = makeStyles(() => ({
  dropzoneCard: {
    marginBottom: 40,
  },
  buttonArea: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

function TextDetection({ textToParent, clearText }) {
  const classes = useStyles()

  const uploadImage = async (image) => {
    var formData = new FormData();
    formData.append('photo', image[0])
    const response = await fetch('/upload', {
      method: "post",
      body: formData
    })
    const body = await response.json();
    console.log(body.split(/\r?\n/))
    textToParent(body.split(/\r?\n/))
  }

  return (
    <Grid>
      <Container>
        <Card variant="outlined" className={classes.dropzoneCard}>
          <Dropzone uploadImage = {uploadImage}/>
        </Card>
      </Container>
      <Container className={classes.buttonArea}>
        <Button variant="outlined" type="button" onClick={() => clearText()}>Clear text</Button>
      </Container>
    </Grid>
  );
}

export default TextDetection;
