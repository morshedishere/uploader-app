import React, { useEffect, useState } from 'react'
import styles from './Uploader.module.css'
import axios from 'axios';

function Uploader() {
    const [fileList, setFileList] = useState([])
    const [progress,setProgress] = useState(0)

    const uploadFile = async (e) => {

        let file = e.target.files[0]
        var data = new FormData()
        data.append('file', file)
        data.append('user', 'hubot')
        try {
            // const r = await fetch('http://localhost:30001/upload', params)
            // console.log(await r.json())
            const { status, ...response } = await axios.request({
                method: "put",
                url: "http://localhost:30001/upload",
                data: data,
                onUploadProgress: (p) => {
                    setProgress(p.loaded / p.total * 100)
                }
            })
            getFilsList()
        } catch (e) {
            console.log(e)
        }
    }

    const getFilsList = async () => {
        try {
            const r = await fetch('http://localhost:30001/files', {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const list = await r.json()
            setFileList(list)
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(()=>{
        getFilsList()
    },[])
    return (<section>
        <fieldset>
            <label>Upload</label>
            <input type="file" onChange={(e) => uploadFile(e)} />
        </fieldset>
        <progress id="file" value={progress} max="100"> {progress}% </progress>

        <ul className={styles.fileList}>
            {
                fileList.map((file, index) => {
                    return <li key={index}>
                        {file}
                    </li>
                })
            }
        </ul>


    </section>)
}

export default Uploader