// polyfill
import "../assets/styles/app.scss"

import "core-js/stable" 

import { Workbox } from "workbox-window"
import React from "react"
import ReactDOM from "react-dom"  
import Config from "./Config"

ReactDOM.render(
    <>
        <div>Hello, world</div>
    </>,
    document.getElementById("root")
)


if (Config.REGISTER_SERVICEWORKER) {
    let worker = new Workbox("/serviceworker.js")
       
    worker.addEventListener("installed", e => {
        console.log(`Service worker ${e.isUpdate ? "updated" : "installed"}`)
    })
    worker.register()
}