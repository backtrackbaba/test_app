import { h } from "preact"
import render from "preact-render-to-string"
import { flushChunkNames } from "react-universal-component/server"
import flushChunks from "webpack-flush-chunks"
import TestComponent from "../app/TestComponent"

export default ({ clientStats }) => (req, res) => {
	const app = render(<TestComponent />)
	const chunkNames = flushChunkNames()

	const {
		js,
		styles,
		cssHash,
		scripts,
		stylesheets
	} = flushChunks(clientStats, { chunkNames })

	console.log("PATH: ", req.path) // eslint-disable-line no-console
	console.log("DYNAMIC CHUNK NAMES RENDERED", chunkNames) // eslint-disable-line no-console
	console.log("SCRIPTS SERVED: ", scripts) // eslint-disable-line no-console
	console.log("STYLESHEETS SERVED: ", stylesheets) // eslint-disable-line no-console

	res.send(`
		<!doctype html>
		<html>
			<head>
				<meta charset="utf-8">
				<title>Test App</title>
				${styles}
			</head>
			<body>
				<div id="root">${app}</div>
				${cssHash}
				${js}
			</body>
		</html>
	`)
}