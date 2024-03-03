// https://www.youtube.com/watch?v=s-v-usE-LLw&ab_channel=Simplilearn
import React from "react";
import { ReactDOM } from "react-dom";
import App from "./App";
// import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
