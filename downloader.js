// imports
const axios = require('axios');
const fs = require('fs');


// parse input audio list
const rawData = fs.readFileSync('./AudioIDs.json');
const audioIDList = JSON.parse(rawData);


// create output directory (if it doesn't exist)
if (!fs.existsSync('./audio')){
    fs.mkdirSync('./audio');
}


// download file function
function downloadFile(fileUrl, outputLocationPath) {
	const writer = fs.createWriteStream(outputLocationPath);

	return axios({
		method: 'get',
		url: fileUrl,
		responseType: 'stream',
	}).then(response => {
		return new Promise((resolve, reject) => {
			response.data.pipe(writer);
			let error = null;
			writer.on('error', err => {
				error = err;
				writer.close();
				reject(err);
			});
			writer.on('close', () => {
				if (!error) {
					resolve(true);
				}
			});
		});
	});
}


// get audio URLS
audioIDList.forEach((audioID) => {
	axios
		.get(`https://www.roblox.com/library/${audioID}/`)
		.then((response) => {
			const data = response.data;
			const urlStart = data.indexOf('data-mediathumb-url') + 21;
			const audioContainer = data.substring(urlStart, urlStart + 300);
			const urlEnd = audioContainer.indexOf('"');
			const audioURL = audioContainer.substring(0, urlEnd);
			return audioURL;
		})
		.then((audioURL) => {
			downloadFile(audioURL, `./audio/${audioID}.ogg`)
				.then(() => {
					console.log(`Finished downloading audio with ID: ${audioID}`);
				})
				.catch((err) => {
					fs.unlinkSync(`./audio/${audioID}.ogg`);
					console.log(`Failed to download audio with ID: ${audioID}`);
				});
		})
		.catch((err) => {
			console.log(`Failed to download audio with ID: ${audioID}`);
		})
})