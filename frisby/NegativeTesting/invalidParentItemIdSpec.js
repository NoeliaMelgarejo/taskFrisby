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

frisby.create('Verify that is not possible add a item with invalid parent id')
    .post('https://todo.ly/api/items.json', {
            "Content": "testItem",
            "ParentId": 3333333433333333233},
            {json: true})
    .inspectJSON()
    .expectJSON({
        "ErrorMessage": "Invalid Parent Item Id",
        "ErrorCode": 303
    })
.toss();