const username = 'jcalitoc@miumg.edu.gt';
const password = 'Umg2019.';
const auth = `Basic ${new Buffer(`${username}:${password}`).toString('base64')}`

const headers = {
    'Accept': 'application/json',
    'Authorization': auth
}

const headers2 = {
    'Accept': 'application/json',
    'Authorization': auth,
    'content-type': 'multipart/form-data'
}


module.exports = { headers, headers2 };