const { headers, headers2 } = require('../config');
const fs = require('fs');
const url = 'http://52.90.36.44:8080/activiti-app/api';


function options(path, method, params = null, file = null) {
    if (method == 'GET') {
        option = {
            method,
            uri: `${url}/${path}`,
            headers,
            json: true
        }
        return option;
    } else if (method == 'POST' && file === null) {
        option = {
            method,
            uri: `${url}/${path}`,
            headers,
            body: params,
            json: true
        }
        return option;
    } else if (method == 'POST' && file !== null) {
        option = {
            method,
            uri: `${url}/${path}`,
            headers: headers2,
            formData: {
                file: {
                    value: fs.createReadStream(file.path),
                    options: {
                        filename: file.name,
                        contentType: file.type
                    }
                }
            },
            json: true
        }
        return option;
    }

}

module.exports = options;