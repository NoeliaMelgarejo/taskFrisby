// Frisby tests

var frisby = require('frisby');

frisby.globalSetup({
	request: {
		headers: {
		'Authorization': 'Basic bm9lbGlhbWVsZ2FyZWpvamF2YXNjcmlwdEBnbWFpbC5jb206Q29udHJvbDEyMw=='
		}
		//proxy: 'http://172.20.240.5:8080'
	}
});


frisby.create('Verify that the user is authenticated')
	.get('https://todo.ly/api/authentication/isauthenticated.json')
	.inspectJSON()
	.expectJSONTypes(true)
	.expectStatus(200)
	.afterJSON(function(json){
		frisby.create('Verify get Token')
			.get('https://todo.ly/api/authentication/token.json')
			.inspectJSON()
			.expectJSON({
			 TokenString: String})
			.expectStatus(200)
			.afterJSON(function(token){
				 console.log(token.TokenString,"Token is gotten");
				 frisby.create('Verify Delete the  Token')
					.delete('https://todo.ly/api/authentication/' + token.TokenString + '.json')
					.expectStatus(200)
				.toss();	
			})
		.toss();	 
	})
.toss();
