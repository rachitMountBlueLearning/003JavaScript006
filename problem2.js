// 
// Problem 2: Using callbacks and the fs module's asynchronous functions, do the following:
//     1. Read the given file lipsum.txt
//     2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
//     3. Read the new file and convert it to lower case. Then split the contents into sentences.
//        Then write it to a new file. Store the name of the new file in filenames.txt
//     4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
//     5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
// 

const FS = require('fs');

module.exports.problem2 = () => {
    FS.readFile(__dirname + '/data/lipsum.txt', 'utf8', (error, data) => {
        if(error) {
            console.log(error);
        } else {
            FS.writeFile(__dirname + '/data/NEW_FILE.txt', data.toUpperCase(), 'utf8', (error) => {
                if(error) {
                    console.log(error);
                } else {
                    FS.writeFile(__dirname + '/data/filesList.txt', 'NEW_FILE.txt', (error) => {
                        if(error) {
                            console.log(error);
                        }
                    });
                    FS.readFile(__dirname + '/data/NEW_FILE.txt', 'utf8', (error, data) => {
                        if(error) {
                            console.log(error);
                        } else {
                            FS.writeFile(__dirname + '/data/new_file.txt', data.split('.').join('.\n'), (error) => {
                                if(error) {
                                    console.log(error);
                                } else {
                                    FS.appendFile(__dirname + '/data/filesList.txt', '\nnew_file.txt', (error) => {
                                        if(error) {
                                            console.log(error);
                                        }
                                    });
                                    FS.readFile(__dirname + '/data/new_file.txt', 'utf8', (error, data) => {
                                        if(error) {
                                            console.log(error);
                                        } else {
                                            FS.writeFile(__dirname + '/data/file_new.txt', data.split('\n').sort((stringA, stringB) => stringA.localeCompare(stringB)).join(' '), (error) => {
                                                if(error) {
                                                    console.log(error);
                                                }
                                            });
                                            FS.appendFile(__dirname + '/data/filesList.txt', '\nfile_new.txt', (error) => {
                                                if(error) {
                                                    console.log(error);
                                                } else {
                                                    FS.readFile(__dirname + '/data/filesList.txt', 'utf8', (error, data) => {
                                                        if(error) {
                                                            console.log(error);
                                                        } else {
                                                            data = data.split('\n');
                                                            for(fileIndex = 0; fileIndex < data.length; fileIndex += 1) {
                                                                FS.unlink(__dirname + `/data/${data[fileIndex]}`, (error) => {
                                                                    if(error) {
                                                                        console.log(error);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}