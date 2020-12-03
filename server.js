require('dotenv').config(); // read .env files
const express = require('express');
const fs = require('fs');
const { exec } = require("child_process");

const app = express();
const port = process.env.PORT || 3000;

// Set public folder as root
app.use(express.static('public'));

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.get('/api/run', async (req, res) => {
	try {
		exec('./EPSA/epsa3_1.00Z1_x64.exe');
		return res.json({ foo: 'bar' });
	} catch(ex) {
		return res.json(ex);
	}
});

app.get('/api/check', async (req, res) => {
	let files = fs.readdirSync('./EPSA');
	return res.json({ files: files });
});

// Redirect all traffic to index.html
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

// Listen for HTTP requests on port 3000
app.listen(port, () => {
	console.log('listening on %d', port);
});
