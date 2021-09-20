const FS = require('fs');
const problem1 = require('../problem1').problem1;

function createAndDestroyJSON(FILE_PATH, DATASET) {
    FS.writeFile(FILE_PATH, DATASET, (error) => {
        if(error) {
            console.log(error);
        } else {
            console.log(`${FILE_PATH} created`);
            FS.unlink(FILE_PATH, (error) => {
                if(error){
                    console.log(error);
                } else {
                    console.log(`${FILE_PATH} deleted`);
                }
            });
        }
    });
}

problem1("JSONFilesDirectory", createAndDestroyJSON, 10);