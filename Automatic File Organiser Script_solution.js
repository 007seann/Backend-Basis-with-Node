// Planing
// 1. Taking a user-named folder
// 2 Creating three folder; video, captured, duplicated
// 3. If ( mp4, mov ). -> move them to video
// 4. If ( png, aae) -> move them to captured
// 5. If (original photo) -> move them to duplicated 


const fs = require('fs');
const os = require('os');
const path = require('path');

// Taking a user-defiend folder's name. 
const folder = process.argv[2];
const workingDir = path.join(os.homedir(), 'Pictures', folder);

if(!folder || !fs.existsSync(workingDir)) {
    console.error('Please enter a user-defined folder name in Pictures');
    return;
}

// Creating folders
videoDir = path.join(workingDir, 'video');   
capturedDir = path.join(workingDir, 'captured');  
duplicatedDir = path.join(workingDir, 'duplicated'); 


!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);

// 3. If ( mp4, mov ). -> move them to video
// 4. If ( png, aae) -> move them to captured
// 5. If (original photo) -> move them to duplicated 
fs.promises
    .readdir(workingDir)
    .then(processFiles)
    .catch(console.log);

function processFiles(files) {
    files.forEach((file) => {
        if(isVideoFile(file)) {
           move(file, videoDir) 
        } else if (isCapturedFile(file)) {
           move(file, capturedDir) 
        } else if (isDuplicatedFile(files, file)) {
           move(file, duplicatedDir) 
        }
    });
}

function isVideoFile(file) {
    const regExp = /(mp4|mov)$/gm;
    const match = file.match(regExp);
    return !!match;
}
function isCapturedFile(file) {
    const regExp = /(png|aae)$/gm;
    const match = file.match(regExp);
    return !!match;
}
function isDuplicatedFile(files, file) {
        if(!file.startsWith('IMG_') || file.startsWith('IMG_E')) {
            return false;
        }
    const edited = `IMG_E${file.split('_')[1]}`;
    const found = files.find(file => file.includes(edited));
    return !!found;
}

function move(file, targetDir) {
        console.info(`move ${file} to ${path.basename(targetDir)}`);
    const oldPath = path.join(workingDir, file);
    const newPath = path.join(targetDir, file);

    fs.promises
    .rename(oldPath, newPath) //
    .catch(console.error);
}
