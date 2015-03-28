//CRUD
var frisby = require('frisby');

frisby.globalSetup({ //se aplica a todos
    request: {
        headers: {
            'Authorization': 'Basic bm9lbGlhbWVsZ2FyZWpvamF2YXNjcmlwdEBnbWFpbC5jb206Q29udHJvbDEyMw=='
        },
        //proxy: 'http://172.20.240.5:8080',
        //json: true,  //declara el tipo de content
        inspectOnFailure: true 
    }
});

/*variable*/
var parametersItem = {
        Id : Number,
        Content: String,
        Checked:Boolean,
        Priority:Number,
        Children: Array
};

/**
*Function to create a project
*/
var createProject = function(projectName){
    var now = new Date();
    var project1 = {
        "Content":  projectName + now.getTime()
    };

    return frisby.create('Create project')
        .post('https://todo.ly/api/projects.json', project1, {json: true})
        .inspectJSON()
        .expectJSON(project1);
    
};

/**
*Function to create item within a project
*/
var createItemWithinProject = function(proId, content, itemName){
    var projectId = proId;
    return frisby.create('Create a Item within a projet' + content)
        .post('https://todo.ly/api/items.json', {
            "Content": itemName,
            "Priority": 2,
            "ProjectId": projectId},
             {json: true})
        .inspectJSON()
        .expectStatus(200)
        .expectJSONTypes(parametersItem)    
};



/**
* CRUD Test case1: create/read/update/delete an item within a project
*/
var project = {
    "Content": "projectWithItem",
    "Icon":"1"
};

var updateItemValues = {
    "Content": "updateItemTest1",
    "Priority": 3
};

createProject("projectWithItem")
.expectStatus(200)
.afterJSON(function(responseData){
    var projectId = responseData.Id
    console.log(" projeId:" + projectId);
    createItemWithinProject(projectId, responseData.content, "itemNameTest1")
    .afterJSON(function(responseItem){     
            var itemId = responseItem.Id;
            var itemNameTest = responseItem.Content;
            console.log('itemId:' ,itemId , 'itemName:' , itemNameTest);

            frisby.create('GET Item  by ID')
                .get('https://todo.ly/api/items/' + itemId + '.json')
                //.inspectJSON()
                .expectStatus(200)
                .expectJSON({
                    "Id" : itemId,
                    "Content": itemNameTest
                })
                .afterJSON(function(json){
                    frisby.create('Update the already created Item by Id' + itemId)
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
