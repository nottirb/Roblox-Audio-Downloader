# Roblox Audio Downloader

Downloads audio files from Roblox to your file system automatically given a list of audio IDs.
Requires node.js and npm

## To Download Audio

1. Download `node.js` and `npm`
2. Download this repo to your computer (use whatever method you like, or the one below)
   - 2a) Click the green `Code` drop down button in the top right
   - 2b) Click `Download ZIP`
   - 2c) Extract the zip file to wherever you like
   - 2d) Open the extracted folder (should be called `Roblox-Audio-Downloader-main`
3. Open the `AudioIDs.json` file
4. Add whatever audio ids (the audio id number) you need to download to the JSON array
   - 4a) Let's say I need to download two audios: `35423526` and `3256262662`
   - 4b) I would add them to the array by putting them into the two square brackets `[]` with a comma `,` in between each audio id
   - 4c) So it would look something like: `[35423526, 3256262662]`
5. Open your favorite terminal and type `npm run download`, hit enter
6. Once it's done your audio files will be located in the `audio` folder.
