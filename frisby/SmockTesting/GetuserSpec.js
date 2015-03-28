

var frisby = require('frisby');

frisby.globalSetup({
	request: {
		headers: {
		'Authorization': 'Basic bm9lbGlhbWVsZ2FyZWpvamF2YXNjcmlwdEBnbWFpbC5jb206Q29udHJvbDEyMw=='
		}
	
	}
});

/**
 * smock testing for Get User
 *
 */

frisby.create('Verify Get User')
	.get('https://todo.ly/api/user.json')
	.inspectJSON()
	.expectJSONTypes(true)
	.expectStatus(200)
	.afterJSON(function(jsonresponse){
	
		console.log("Users created are :",jsonresponse);
				
	})
.toss();













