import React from 'react';
import { Grid, Container, Card, Button } from '@material-ui/core';
import Dropzone from '../../Components/Dropzone/Dropzone'

function TextDetection({ textToParent, clearText }) {

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
    <Grid container className="App" direction="column" alignItems="stretch">
      <Container id="dropzoneContainer">
        <Card variant="outlined">
          <Dropzone uploadImage = {uploadImage}/>
        </Card>
      </Container>
      <Container>
        <Button variant="outlined" type="button" onClick={() => clearText()}>Clear text</Button>
      </Container>
    </Grid>
  );
}

export default TextDetection;
