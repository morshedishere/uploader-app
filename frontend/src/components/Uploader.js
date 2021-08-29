import React, { useState } from 'react'
import axios from 'axios';

function Uploader() {

    const [count, setCount] = useState(0)
    const [state,setState] = useState(0)

    const fetchHome = async () => {
        try {
            const r = await fetch('http://localhost:30001/', {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            setCount(count => count + 1)
            console.log(await r.json())
        } catch (e) {
            console.log(e)
        }

    }

    const uploadFile = async (e) => {

        let file = e.target.files[0]
        var data = new FormData()
        data.append('file', file)
        data.append('user', 'hubot')
        const params = {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, *cors, same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            // headers: {
            //   'Content-Type': 'multipart-form-data'
            //   // 'Content-Type': 'application/x-www-form-urlencoded',
            // },
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: data // body data type must match "Content-Type" header
        }
        try {
            // const r = await fetch('http://localhost:30001/upload', params)
            // console.log(await r.json())
            const {status,...response} = await axios.request({
                method: "put", 
                url: "http://localhost:30001/upload", 
                data: data, 
                onUploadProgress: (p) => {
                  console.log(p); 
                  setState(p.loaded / p.total*100)
                }
            })
            console.log(status)
        } catch (e) {
            console.log(e)
        }
    }
    return (<section>
        <fieldset>
            <label>Upload</label>
            <input type="file" onChange={(e) => uploadFile(e)} />
            <button onClick={() => fetchHome()}>{count}</button>
        </fieldset>
        <progress id="file" value={state} max="100"> {state}% </progress>


    </section>)
}

export default Uploader