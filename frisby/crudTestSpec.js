//CRUD
var frisby = require('frisby');

frisby.globalSetup({ //se aplica a todos
    request: {
        headers: {
            'Authorization': 'Basic dmlyZ2luaWEudGVzdC5qYWxhQGdtYWlsLmNvbTpDb250cm9sMTIz'
        },
        //proxy: 'http://172.20.240.5:8080',
        //json: true,  //declara el tipo de content
        inspectOnFailure: true //si es que fallaq  muestre lo q recive
    }
});

/*Function to create a project*/
var createProject = function(){
    var now = new Date();
    var project = {
        "Content": "projectChildItem " + now.getTime()
    };

    return frisby.create('Create project')
        .post('https://todo.ly/api/projects.json', project, {json: true})
        .inspectJSON()
        .expectJSON(project);
    
};

/*****CRUD for an item within a project*********/
var project = {
    "Content": "projectWithItem",
    "Icon":"1"
};

var updateItemValues = {
    "Content": "updateItemTest1",
    "Priority": 3
};

var parametersItem = {
        Id : Number,
        Content: String,
        Checked:Boolean,
        Priority:Number,
        Children: Array
};


createProject()
.expectStatus(200)
.afterJSON(function(responseData){
    var projectId = responseData.Id
    console.log(" projeId:" + projectId);
    frisby.create('Create a childItem within a projet' + responseData.content)
        .post('https://todo.ly/api/items.json', {
            "Content": "itemTest1",
            "Priority": 2,
            "ProjectId": projectId},
             {json: true})
        .inspectJSON()
        .expectStatus(200)
        .expectJSONTypes(parametersItem)
        .expectJSON({
            "ProjectId": projectId
        })
        .afterJSON(function(responseItem){
            var itemId = responseItem.Id;
            console.log("itemId:" + itemId);

            frisby.create('GET Item  by ID')
                .get('https://todo.ly/api/items/' + itemId + '.json')
                //.inspectJSON()
                .expectStatus(200)
                .expectJSON({
                    "Id" : itemId,
                    "Content": "itemTest1"
                })
                .afterJSON(function(json){
                    frisby.create('Update the already created childItem by Id' + itemId)
                        .put('https://todo.ly/api/items/' + itemId + '.json', updateItemValues, {json: true})
                        .inspectJSON()
                        .expectStatus(200)
                        .expectJSON(updateItemValues)
                        .afterJSON(function(responseItemUpdate){
                            var itemIdUpdate = responseItemUpdate.Id
                            console.log("itemIdUpdate:" + itemIdUpdate);
                            frisby.create('Delete item with ID:' + itemIdUpdate + ' from project: ' + responseItemUpdate.projectId)
                                .delete('https://todo.ly/api/items/' + itemIdUpdate +'.json' )
                                .inspectJSON()
                                .expectJSON({
                                    Deleted: true
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