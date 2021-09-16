// 
// Problem 1: Using callbacks and the fs module's asynchronous functions, do the following:
//     1. Create a directory of random JSON files
//     2. Delete those files simultaneously
// 

const FS = require('fs');

module.exports.problem1 = (DIR_NAME, callback, NUMBER_OF_FILES = 10) => {
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
        DATASETS.push(randomDataGenerator(100));
        FILE_NAMES.push(randomDataGenerator(5));
    }

    if(!FS.existsSync(`${__dirname}/${DIR_NAME}`)) {
        FS.mkdir(`${__dirname}/${DIR_NAME}`, (error) => {
            if(error) {
                console.log(error);
            } else {
    
                for(run = 0; run < NUMBER_OF_FILES; run += 1) {
                    FILE_PATH = `${__dirname}/${DIR_NAME}/${FILE_NAMES[run]}.json`;
                    callback(FILE_PATH, DATASETS[run]);
                }
            }
        });
    } else {
        for(run = 0; run < NUMBER_OF_FILES; run += 1) {
            FILE_PATH = `${__dirname}/${DIR_NAME}/${FILE_NAMES[run]}.json`;
            callback(FILE_PATH, DATASETS[run]);
        }
    }
}