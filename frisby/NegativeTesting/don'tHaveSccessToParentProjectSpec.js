//Negative
var frisby = require('frisby');

frisby.globalSetup({ //se aplica a todos
    request: {
        headers: {
            'Authorization': 'Basic bm9lbGlhbWVsZ2FyZWpvamF2YXNjcmlwdEBnbWFpbC5jb206Q29udHJvbDEyMw=='
        },
        inspectOnFailure: true 
    }
});

frisby.create('Verify that is not possible to add a new project with invalid ParentId')
    .post('https://todo.ly/api/projects.json', {
        "Content": "newProjectTest",
        "ParentId": 188888999999
        }, {json: true})
    .inspectJSON()
    .expectJSON({
        "ErrorMessage": "You don't have access to this ParentProject",
        "ErrorCode": 401
    })
.toss();