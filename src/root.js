import "../assets/styles/app.scss"

import { Workbox } from "workbox-window"
import { createRoot } from "react-dom/client"
import Config from "./data/Config"
import App from "./App"

const root = createRoot(document.getElementById("root"))

root.render(<App />)

if (Config.REGISTER_SERVICEWORKER) {
    let worker = new Workbox("/serviceworker.js")

    worker.addEventListener("installed", e => {
        console.info(`Service worker ${e.isUpdate ? "updated" : "installed"}`)
    })
    worker.register()
}