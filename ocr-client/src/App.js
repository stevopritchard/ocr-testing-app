import React from 'react';
import Dropzone from 'react-dropzone';
import { Grid, Container, AppBar } from '@material-ui/core';
import "./App.css";

class App extends React.Component {
  state = {
    data: [],
    acceptedImage: ""
  };

  getText = async () => {
    const response  = await fetch('/read_text');
    const body = await response.json();
    console.log(body)
    if(response.status !== 200) {
      throw Error(body.message)
    }
    return body
  };

  postText = async () => {
    const response = await fetch('http://localhost:5000/submit_image', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        image: `public/img/${this.state.acceptedImage}`
      })
    })
    const body = await response.json();
    console.log(body)
    if(response.status !== 200) {
      throw Error(body.message)
    }
    return body
  };

  printText() {
    // this.getText()
    this.postText()
    .then(res => this.setState({data: res}))
    .catch(err => console.log(err));
  };

  readFile = (file) => {
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      const binaryStr = reader.result
      this.setState({acceptedImage: binaryStr},
        () => {this.logImage()}
      )
      console.log(binaryStr)
    }
    reader.readAsArrayBuffer(file[0])
  }

  writeFile = async () => {
    const response = await fetch('http://localhost:5000/write_image', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        image: `public/img/${this.state.acceptedImage}`
      })
    })
    const body = await response.json();
    console.log(body)
    if(response.status !== 200) {
      throw Error(body.message)
    }
    return body
  };

  uploadImage = async (image) => {
    var formData = new FormData();
    formData.append('photo', image[0])
    const response = await fetch('/upload', {
      method: "post",
      body: formData
    })
    const body = await response.json();
    console.log(body.split(/\r?\n/))
    this.setState({data: body.split(/\r?\n/)})
  }

  logImage() {
    console.log(this.state.acceptedImage)
  }

  render() {
    return (
      <Grid container className="App" direction="column" alignItems="stretch">
        <AppBar id="appBar" position="static">
        </AppBar>
        <Container id="dropzoneContainer">
          <Dropzone id="dropzone" onDrop={acceptedFiles => this.uploadImage(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
          
        <p>{this.state.data}</p>
        <div>
          {
            this.state.data.map((segment, i) => {
              return (
                <form key={i} value="segments">
                  <label htmlFor={`segment${i}`}>Segment {i+1}</label>
                  <input name={`segment${i}`} type="text" defaultValue={segment}></input>
                </form>
              )
            })
          }
        </div>
        </Container>
        <Container id="buttonContainer">
          <button id="googleVision" type="button" onClick={() => {this.printText()}}>Google Vision (img URL)</button>
          <button id="tesseractJS" type="button" onClick={() => {this.writeFile()}}>Send Image to Server</button>
        </Container>
      </Grid>
    );
  }
}

export default App;
