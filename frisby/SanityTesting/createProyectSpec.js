// Frisby tests

var frisby = require('frisby');

frisby.globalSetup({
	request: {
		headers: {
		'Authorization': 'Basic bm9lbGlhbWVsZ2FyZWpvamF2YXNjcmlwdEBnbWFpbC5jb206Q29udHJvbDEyMw=='
		}
		
	}
});




frisby.create('Get Proyects')
	.get('https://todo.ly/api/projects.json')
	.expectStatus(200)
	.afterJSON(function(responseData){
	
		var totalProjects = responseData.length;
		var totalDeleted = 0;
		
		for(var i = 0; i < responseData.length; i++) {
		
			console.log('DELETEING ITEM = ', i, '; ID = ', responseData[i].Id);
			
			frisby.create('Delete proyect with ID:' + responseData[i].Id)
				.delete('https://todo.ly/api/projects/' + responseData[i].Id + '.json')
				.expectJSON({
					Deleted: true
				})
				.afterJSON(function(data){
					console.log('totalDeleted = ', totalDeleted, ' ID = ', data.Id);
					totalDeleted++;
					
					if (totalDeleted == totalProjects) {
						var now = new Date();
						var project = {
							"Content": "Project " + now.getTime()
						};
						var tam =2;
						var cont=0;
						var IDs=[];
						for (var i = 0; i < tam; i++) {
							frisby.create('Create  projects')
								.post('https://todo.ly/api/projects.json', project, {json: true})
								.inspectJSON()
								.expectJSON(project)
								.expectStatus(200)
								.afterJSON(function(datares){
									IDs.push(datares.Id);
									cont++;
									if (cont==tam){
										var updateParent = {
											"ParentId": IDs[0],
											"Content": "Project Children " 
										};
									
										frisby.create('Create Proyect Child') //update value for children proyect 
											.put('https://todo.ly/api/projects/' + IDs[1] + '.json', updateParent, {json: true})
											.expectStatus(200)
											.expectJSON(updateParent)
											.afterJSON(function(json2){
											
											console.log("Proyect Children: ID",json2.Id,"Name :", json2.Content);
											
											 })
										.toss();
										
									}
									
								})
								.toss();
							
						}
						
					}
				})
			.toss();
		}
	})
.toss();