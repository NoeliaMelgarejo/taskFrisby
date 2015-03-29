
/**
 * Test case that allows Verify it is poosible to create a proyect with token authentication and after deleting the token it is not possible to create new proyect
 * @type {exports}
 */

var frisby = require('frisby');

frisby.create('Verify that the user is authenticated')
    .get('https://todo.ly/api/authentication/isauthenticated.json')
    .inspectJSON()
    .addHeaders({'Authorization': 'Basic bm9lbGlhbWVsZ2FyZWpvamF2YXNjcmlwdEBnbWFpbC5jb206Q29udHJvbDEyMw=='}) //Basic Auth
    .expectJSONTypes(true)
    .expectStatus(200)
    .afterJSON(function(json){
        frisby.create('Verify get Token')
            .get('https://todo.ly/api/authentication/token.json')
            .inspectJSON()
            .addHeaders({'Authorization': 'Basic bm9lbGlhbWVsZ2FyZWpvamF2YXNjcmlwdEBnbWFpbC5jb206Q29udHJvbDEyMw=='})
            .expectJSON({
                TokenString: String})
            .expectStatus(200)
            .afterJSON(function(token){
                var Token=token.TokenString;
                console.log(Token,"--Token is gotten");
                var Proyect = {
                    "Content": "ProyectToken "
                };
                frisby.create('Create Proyect with token')
                    .post('https://todo.ly/api/projects.json', Proyect, {json: true})
                    .inspectJSON()
                    .addHeaders({'Token': Token})//Token for create Project
                    .expectJSON(Proyect)
                    .expectStatus(200)
                    .afterJSON(function(resProyect){
                        console.log( "Proyect Created with Token: " , resProyect.Content);
						console.log(Token,"-- Token ---");
						frisby.create('Delete token')
							.delete('https://todo.ly/api/authentication/token.json')
							.inspectJSON()
							.addHeaders({'Token': Token})//Token for create Project
							.expectStatus(200)
							.afterJSON(function(resTokenDelete){
								var tokenDelete=resTokenDelete.TokenString;
								console.log( "Token Deleted is : " , tokenDelete);
								frisby.create('Create Proyect without token')
									.post('https://todo.ly/api/projects.json', Proyect, {json: true})
									.inspectJSON()
									.addHeaders({'Token': tokenDelete})//Token for create Project
									.expectJSON({ ErrorMessage: 'Not Authenticated'})
									.expectStatus(200)
									.afterJSON(function(response){
										console.log( "This is of response: " , response);
									})
								.toss();
									                    
							})
							.toss();
                    })
                    .toss();
            })
            .toss();
    })
    .toss();
