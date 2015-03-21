
var frisby = require('frisby');

frisby.globalSetup({
	request: {
		headers: {
		'Authorization': 'Basic bm9lbGlhbWVsZ2FyZWpvamF2YXNjcmlwdEBnbWFpbC5jb206Q29udHJvbDEyMw=='
		}
		//proxy: 'http://172.20.240.5:8080'
	}
});


var IdItem;
var item = {
	"Content": "New 565656"
};


var itemUpdate = {
	"Content":"Name updated"
};


frisby.create('Create new Item')
	.post('https://todo.ly/api/items.json', item, {json: true})
	.inspectJSON()
	.expectStatus(200)
	.expectJSON(item)
	.expectJSONTypes({
		Id: Number
	})
	.afterJSON(function(json){
		
		IdItem=Number(json.Id); 
		console.log(IdItem,"-This is item created --");
		 frisby.create('GET Items  by ID')
				.get('https://todo.ly/api/items/'+IdItem+'.json')
				.inspectJSON()
				.expectStatus(200)
				.expectJSONTypes({
					   Id: Number
				 })
				.afterJSON(function(json3){
					console.log(json3.Id,"-Get of item created ");
						frisby.create('Update Items  by ID')
							.put('https://todo.ly/api/items/'+IdItem+'.json', itemUpdate, {json: true})
							.inspectJSON()
							.expectStatus(200)
							.expectJSONTypes({
								   Id: Number
							 })
							// .afterJSON(function(json2){
							
								// console.log(json2.Id,"-This is item upTED--");
								// frisby.create('Delete proect with ID:' )
									// .delete('https://todo.ly/api/items/'+IdItem+'.json' )
									// .inspectJSON()
									// .expectJSON({
										// Deleted: true
									// })
									// .afterJSON(function(json3){
										// console.log(json3.Id,"-This is item  deleted--");
									
									// })
							// .toss();
							
							})
						.toss();
					 })
			 .toss();
	})
.toss();


