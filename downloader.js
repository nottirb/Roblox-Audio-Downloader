// imports
const axios = require('axios');
const fs = require('fs');


// parse input audio list
const rawData = fs.readFileSync('./AudioIDs.json');
const audioIDList = JSON.parse(rawData);


// download file function
async function downloadFile(fileUrl, outputLocationPath) {
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
audioIDList.forEach(async (audioID) => {
	axios
		.get(`https://www.roblox.com/library/${audioID}/`)
		.then((response) => {
			const data = response.data;
			const urlStart = data.indexOf("data-mediathumb-url") + 21;
			const audioContainer = data.substring(urlStart, urlStart + 300);
			const urlEnd = audioContainer.indexOf("\"");
			const audioURL = audioContainer.substring(0, urlEnd);
			return audioURL;
		})
		.then((audioURL) => {
			//const audioFile = fs.createWriteStream(`./downloads/${audioID}.ogg`);
			downloadFile(audioURL, `./audio/${audioID}.ogg`)
				.then(() => {
					console.log(`Finished downloading audio with ID: ${audioID}`);
				})
				.catch((err) => {
					console.log(`Failed to download audio with ID: ${audioID}`);
				});
		})
		.catch((err) => {
			console.log(`Failed to download audio with ID: ${audioID}`);
		})
})