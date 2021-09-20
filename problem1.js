// 
// Problem 1: Using callbacks and the fs module's asynchronous functions, do the following:
//     1. Create a directory of random JSON files
//     2. Delete those files simultaneously
// 

const FS = require('fs').promises;

module.exports.problem1 = (DIR_NAME, NUMBER_OF_FILES = 10) => {
    function randomDataGenerator(dataLength) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        charLength = characters.length;
        let randomString = '';
        
        for(stringLength = 0; stringLength < dataLength; stringLength += 1) {
            randomString += characters[Math.floor(Math.random() * charLength)];
        }
        return randomString;
    }

    const DATASETS = []
    const FILE_NAMES = []

    for(dataSetIndex = 0; dataSetIndex < NUMBER_OF_FILES; dataSetIndex += 1){
        const LETTERS_TO_GENERATE = Math.floor(Math.random() * 1000000);
        DATASETS.push(randomDataGenerator(LETTERS_TO_GENERATE));
        FILE_NAMES.push(randomDataGenerator(5));
    }
    
    const DIR_PATH = `${__dirname}/${DIR_NAME}`;

    FS.mkdir(DIR_PATH)
        .then(() => console.log(`${DIR_PATH} created\n\n`))
        .then(() => 
            Promise.all(FILE_NAMES.map(async (FILE_NAME, run) => {
                const FILE_PATH = `${DIR_PATH}/${FILE_NAME}.json`;

                return await FS.writeFile(FILE_PATH, DATASETS[run])
                    .then(() => console.log(`${FILE_PATH} created`))
                    .then(() => FS.unlink(FILE_PATH))
                    .then(() => console.log(`${FILE_PATH} deleted`))
                    .catch((error) => console.log(error));
            }))
        )
        .then(() => console.log('\n\nFiles created and deleted. Deleting the directory.'))
        .then(() => FS.rmdir(DIR_PATH))
        .then(() => console.log(`${DIR_PATH} deleted`))
        .catch((error) => console.log(error));
}