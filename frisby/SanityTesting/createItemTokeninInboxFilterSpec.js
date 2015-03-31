
/**
 * Test case that allows Verify it is posible to create a Item in "Inbox" filter  with token authentication a
 * 
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
                var Item = {
                    "Content": "Proyect Item"
                };
                frisby.create('Create Item with token')
                    .post('https://todo.ly/api/items.json', Item, {json: true})
                    .inspectJSON()
                    .addHeaders({'Token': Token})//Token for create Item
                    .expectJSON(Item)
                    .expectStatus(200)
                    .afterJSON(function(resItem){
                        console.log( "Item Created with Token: " , resItem);
							frisby.create('Get all Filters')
									.get('https://todo.ly/api/filters.json')
									.inspectJSON()
									.addHeaders({'Token': Token})//Token for create Project
									.expectStatus(200)
									.afterJSON(function(responseFilters){
									var array=[];
										for (var  i=0;i < responseFilters.length; i++){
											if(responseFilters[i].Content=="Inbox" ){
												array.push(responseFilters[i]);
												break;
											
											}
										}
										var Id=array[0].Id;
										frisby.create('Get all Filters created in ')
											.get('https://todo.ly/api/filters/'+Id+'/items.json')
											.inspectJSON()
											.addHeaders({'Token': Token})//Token for create Project
											.expectStatus(200)
											.expectJSON('?', {
                                                    Id: resItem.Id //Verify
                                                })
											.afterJSON(function(responseFilterInbox){
												console.log("List of Items in Inbox ", responseFilterInbox);
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
