// 
// Problem 2: Using callbacks and the fs module's asynchronous functions, do the following:
//     1. Read the given file lipsum.txt
//     2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
//     3. Read the new file and convert it to lower case. Then split the contents into sentences.
//        Then write it to a new file. Store the name of the new file in filenames.txt
//     4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
//     5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
// 

const FS = require('fs').promises;

module.exports.problem2 = () => {
    FS.readFile(__dirname + '/data/lipsum.txt', 'utf8')
        .then((data) => FS.writeFile(__dirname + '/data/NEW_FILE.txt', data.toUpperCase(), 'utf8'))
        .then(() => FS.writeFile(__dirname + '/data/filenames.txt', 'NEW_FILE.txt', 'utf8'))
        .then(() => FS.readFile(__dirname + '/data/NEW_FILE.txt', 'utf8'))
        .then((data) => FS.writeFile(__dirname + '/data/new_file.txt', data.toLowerCase().split('. ').join('.\n'), 'utf8'))
        .then(() => FS.appendFile(__dirname + '/data/filenames.txt', '\nnew_file.txt', 'utf8'))
        .then(() => FS.readFile(__dirname + '/data/new_file.txt', 'utf8'))
        .then((data) => FS.writeFile(__dirname + '/data/file_new.txt', data.split('\n').sort((stringA, stringB) => stringA.localeCompare(stringB)).join('\n'), 'utf8'))
        .then(() => FS.appendFile(__dirname + '/data/filenames.txt', '\nfile_new.txt', 'utf8'))
        .then(() => FS.readFile(__dirname + '/data/filenames.txt', 'utf8'))
        .then((data) => {
            const FILE_NAMES = data.split('\n');
            return Promise.all(FILE_NAMES.map(async (FILE_NAME) => await FS.unlink(__dirname + `/data/${FILE_NAME}`)));
        })
        .then(() => FS.unlink(__dirname + '/data/filenames.txt'))
        .catch((error) => console.log(error));
}