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
 * smock testing for Update User
 *
 */


var user = {
	"Email": 'cfd@gmail.com',
"Password": 'dfd',
"FullName": 'javasfdfd'
};


var userUpdate = {
"FullName": 'javascript'
};

/**
 * smock testing for Delete User
 *
 */


frisby.create('Verify Create User')
	.post('https://todo.ly/api/user.json', user, {json: true})
	.inspectJSON()
	.expectStatus(200)
	.afterJSON(function(jsonresponse){
		console.log(" Users created :",jsonresponse.Id);
		frisby.create('Verify Update User')
			.put('https://todo.ly/api/user/' + jsonresponse.Id + '.json', userUpdate, {json: true})
			.inspectJSON()
			.expectStatus(200)
			.afterJSON(function(response){
				 console.log("FullName of Users is updated :",response);
				 	
			})
		.toss();	 
	})
.toss();












