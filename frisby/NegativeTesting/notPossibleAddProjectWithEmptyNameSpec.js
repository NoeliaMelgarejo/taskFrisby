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

var nameProject = {
            "Content": ""
};
frisby.create('Verify that it is not possible to add project with empty name')
        .post('https://todo.ly/api/projects.json', nameProject, {json: true})
        .inspectJSON()
        .expectJSON({
            "ErrorMessage": "Too Short Project Name",
            "ErrorCode": 305
        })
.toss();