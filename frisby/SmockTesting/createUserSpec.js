// Frisby tests

var frisby = require('frisby');

frisby.globalSetup({
	request: {
		headers: {
		'Authorization': 'Basic bm9lbGlhbWVsZ2FyZWpvamF2YXNjcmlwdEBnbWFpbC5jb206Q29udHJvbDEyMw=='
		}
	
	}
});

/**
 * smock testing for Create User
 *
 */
var user = {
"Email": 'cursojvascript@gmail.com',
"Password": 'passwor',
"FullName": 'javascrit'
};


frisby.create('Verify Create User')
	.post('https://todo.ly/api/user.json', user, {json: true})
	.inspectJSON()
	.expectJSON(user)
	.expectStatus(200)
	.afterJSON(function(jsonresponse){
	console.log("Users created is:",jsonresponse);	 
	})
.toss();










