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
console.log(workingDir);

// writing a file

const video = '/Users/apple/Desktop/In_progress/node/challenge/video';
const duplicated = '/Users/apple/Desktop/In_progress/node/challenge/duplicated';
const captured = '/Users/apple/Desktop/In_progress/node/challenge/captured';

try {
    if (!fs.existsSync(video)) {
        fs.mkdirSync(video);
    }
} catch (err) {
    console.error(err);
}

try {
    if (!fs.existsSync(duplicated)) {
        fs.mkdirSync(duplicated);
    }
} catch (err) {
    console.error(err);
}

try {
    if (!fs.existsSync(captured)) {
        fs.mkdirSync(captured);
    }
} catch (err) {
    console.error(err);
}

// move a file with extension to a folder. 

fs.readdir('/Users/apple/Desktop/In_progress/node/challenge/test', (err, files) => {

    files.forEach(file => {
        const slicedFile = Array.from(file);

        if (path.extname(file) === '.jpg') {
            if ( !slicedFile.includes('E')) {
            console.log(file);
            fs.rename('/Users/apple/Desktop/In_progress/node/challenge/test/' + file, '/Users/apple/Desktop/In_progress/node/challenge/duplicated/' + file, err => {
                if (err) throw err;
                console.log('Moving ' + file);
            });

            }
        } 
        }
    )

    files.forEach(file => {
        if (path.extname(file) === '.mp4' || path.extname(file) === '.mov') {
            fs.rename('/Users/apple/Desktop/In_progress/node/challenge/test/' + file, '/Users/apple/Desktop/In_progress/node/challenge/video/' + file, err => {
                if (err) throw err;
                console.log('Moving ' + file);
            });
        }
        }
    )

    files.forEach(file => {
        if (path.extname(file) === '.png' || path.extname(file) === '.aae' ) {
            fs.rename('/Users/apple/Desktop/In_progress/node/challenge/test/' + file, '/Users/apple/Desktop/In_progress/node/challenge/captured/' + file, err => {
                if (err) throw err;
                console.log('Moving ' + file);
            });
        }
        }
    )

    
})

