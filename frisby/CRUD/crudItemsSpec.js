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
 * Test case that allows Create two Items and verify they are listed in the  list of al Items
 */
frisby.create('Gel all Items')
    .get('https://todo.ly/api/items.json')
    .inspectJSON()
    .expectStatus(200)
    .afterJSON(function(responseData){
        var totalItem = responseData.length;
        var totalDeleted = 0;
        for (var  i = 0; i < responseData.length; i++){
            frisby.create('Delete all Items')
                .delete('https://todo.ly/api/items/'+responseData[i].Id +'.json')
                .inspectJSON()
                .expectStatus(200)
                .afterJSON(function(datadeleted){
                    totalDeleted++;
                    if (totalDeleted == totalItem) {

                        var cont = 0;
                        var array2=[];

                        for (var  i = 0; i < 2; i++){//Creating 2 items 
                            var itemm = {
                                "Content": "ITEMMnew"+i
                            };
                            frisby.create('Create Item')
                                .post('https://todo.ly/api/items.json', itemm, {json: true})
                                .inspectJSON()
                                .expectJSON(itemm)
                                .afterJSON(function(valuecreated){
                                    cont++;
                                    array2.push(valuecreated.Id);
                                    if(cont==2){
                                        for (var  l = 0; l < array2.length; l++){

                                            frisby.create('Verify that the the 2 items were created')
                                                .get('https://todo.ly/api/items.json')
                                                .inspectJSON()
                                                .expectJSON('?', {
                                                    Content: "ITEMMnew"+l //Verify
                                                })
                                                .toss();
                                        }
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
