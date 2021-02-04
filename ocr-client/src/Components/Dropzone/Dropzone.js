import React, {useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {useDropzone} from 'react-dropzone';

const useStyles = makeStyles(() => ({
    dropzone: {
        padding: '10px'
    }
}))

function Dropzone({ uploadImage }) {
    const classes = useStyles()
    const onDrop = useCallback(acceptedFiles => { uploadImage(acceptedFiles) },[uploadImage])
    const{ getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})

    return (
        <div className={classes.dropzone} {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}

export default Dropzone;