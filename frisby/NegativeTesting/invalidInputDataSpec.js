//Negative
var frisby = require('frisby');

frisby.create('Verify that an error message is displayed when trying to add an user with empty data')
    .post('https://todo.ly/api/user.json',"",{json: true})
    .inspectJSON()
    .expectJSON({
        "ErrorMessage": "Invalid input Data",
        "ErrorCode": 302
    })
.toss();