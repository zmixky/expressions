const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

class Result {
    constructor() {
        this.path = path.resolve('models', 'data', 'results.txt');
    }

    find(callback) {
        fs.readFile(this.path, (err, data) => {
            if (err) {
                callback(err);
            }

            let results = [];

            for (let numberStr of data.toString().split('\n')) {
                results.push(Number(numberStr));
            }

            callback(null, results);
        });
    }

    update(results, callback) {
        let str = '';
        if (results.length > 0) {
            str = results[0].toString();
        }

        for (let i = 1; i < results.length; ++i) {
            str += '\n';
            str += Number(results[i]).toString();
        }

        fs.writeFile(this.path, str, (err) => {
            if (err) {
                callback(err);
            }

            callback(null);
        });
    }
}

module.exports = Result;