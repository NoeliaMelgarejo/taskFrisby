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
 * smock testing for Delete User
 *
 */


var user = {
"Email": 'cursojvascriptt@gmail.com',
"Password": 'passwordtt',
"FullName": 'javascriptt'
};

frisby.create('Verify Create User')
	.post('https://todo.ly/api/user.json', user, {json: true})
	.inspectJSON()
	.expectStatus(200)
	.afterJSON(function(jsonresponse){
	
		frisby.create('Verify Delete User')
			.delete('https://todo.ly/api/user/' + jsonresponse.Id + '.json')
			.inspectJSON()
			.expectStatus(200)	 
	})
.toss();












