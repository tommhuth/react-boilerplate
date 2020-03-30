import "../assets/styles/app.scss" 

import { Workbox } from "workbox-window"
import React from "react"
import ReactDOM from "react-dom"  
import Config from "./Config"

ReactDOM.render(
    <>
        <h1>Hello, world</h1>
    </>,
    document.getElementById("root")
) 

if (Config.REGISTER_SERVICEWORKER) {
    let worker = new Workbox("/serviceworker.js") 

    worker.addEventListener("installed", e => {
        console.info(`Service worker ${e.isUpdate ? "updated" : "installed"}`)
    })
    worker.register() 
}