import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import './Dropzone.css'

function Dropzone({ uploadImage }) {
    const onDrop = useCallback(acceptedFiles => { uploadImage(acceptedFiles) },[uploadImage])
    const{ getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})

    return (
        <div className="dropzone" {...getRootProps()}>
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