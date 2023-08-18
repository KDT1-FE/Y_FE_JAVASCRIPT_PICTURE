// CSS
import css from "./css/main.css"
// Component
import App from "./App.js"
// Router
import router from "./routes/index"

const root = document.getElementById("root")
root.append(new App().el)

router()
