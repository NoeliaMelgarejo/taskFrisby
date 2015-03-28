
var frisby = require('frisby');

frisby.globalSetup({
    request: {
        headers: {
            'Authorization': 'Basic bm9lbGlhbWVsZ2FyZWpvamF2YXNjcmlwdEBnbWFpbC5jb206Q29udHJvbDEyMw=='
        }
    }
});

/**
 * CRUD of a Item in  Filters "NEXT"
 *
 */

var item = {
    "Content": "Item next"
};
var d= new Date();
var dateNext= ((d.getMonth())+2)+"/"+d.getDay()+"/"+d.getFullYear();

frisby.create('Create Item')
    .post('https://todo.ly/api/items.json', item, {json: true})
    .inspectJSON()
    .afterJSON(function(responseCreate){
        var itemNext = {
            "DueDate": dateNext
        };
        console.log("Item created",responseCreate);
        frisby.create('Create Item in Next')
            .put('https://todo.ly/api/items/' + responseCreate.Id + '.json', itemNext, {json: true})
            .inspectJSON()
            .afterJSON(function(responseCreateNext){
                console.log("Item Next Created",responseCreateNext);
                var itemNextupdate = {
                    "Priority": 3
                };

                frisby.create('Update Item of  Next Filter')
                    .put('https://todo.ly/api/items/' + responseCreateNext.Id + '.json', itemNextupdate, {json: true})
                    .inspectJSON()
                    .expectJSON(itemNextupdate)
                    .afterJSON(function(responseupdate){

                        console.log("Item Next is updated",responseupdate);
						
                        frisby.create('Delete the filter in Next Filter')
                            .delete('https://todo.ly/api/items/' + responseupdate.Id + '.json', itemNextupdate)
                            .inspectJSON()
                            .expectJSON({
                                Deleted: true
                            })
                            .afterJSON(function(responsedelete){

                                console.log("Item Next was deleted",responsedelete.Id);
                             
                            })
                            .toss();


                    })
                    .toss();

            })
            .toss();


    })
    .toss();





