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
        "Content":  projectName + now.getTime(),
        "Icon": 2
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
            "Priority": 1,
            "ProjectId": projectId},
             {json: true})
        .inspectJSON()
        .expectStatus(200)
        .expectJSONTypes(parametersItem)    
};

/**
*Function to create a chilItem within a item
*/
var createChildItem = function(childItemName, itemParentId){
    return frisby.create('Create a child Item within an already item' + itemParentId)
        .post('https://todo.ly/api/items.json', {
            "Content": childItemName,
            "Priority": 2,
            "ParentId": itemParentId},
             {json: true})
        .inspectJSON()
        .expectStatus(200)
        .expectJSONTypes(parametersItem)    
};

/**
* CRUD Test case2: create/read/update/delete a child item within a project
*/
var project = {
    "Content": "projectWithChildItem",
    "Icon":"2"
};

var updateItemValues = {
    "Content": "updateChildItemTest2",
    "Priority": 3
};

createProject("projectWithChildItem")
.expectStatus(200)
.afterJSON(function(responseData){
    var projectId = responseData.Id
    console.log(" projeId:" + projectId);
    createItemWithinProject(projectId, responseData.content, "itemNameTest2")
    .afterJSON(function(responseItem){     
            var itemId = responseItem.Id;
            var itemNameTest = responseItem.Content;
            console.log('itemId:' ,itemId , 'itemName:' , itemNameTest);
            createChildItem("childItemNameTest1", itemId)
                .afterJSON(function(reponseChildItem){
                    var childItemId = reponseChildItem.Id;
                    var childItemNameTest = reponseChildItem.Content;
                    var parentId= reponseChildItem.ParentId;
                    console.log('childItem:' ,childItemId , 'itemName:' , childItemNameTest, 'parentid: ', parentId);
                    frisby.create('GET Item  by ID')
                        .get('https://todo.ly/api/items/' + childItemId + '.json')
                        //.inspectJSON()
                        .expectStatus(200)
                        .expectJSON({
                            "Id" : childItemId,
                            "Content": childItemNameTest
                        })
                        .afterJSON(function(json){
                            frisby.create('Update the childItem created within an Item by Id' + childItemId)
                                .put('https://todo.ly/api/items/' + childItemId+ '.json', updateItemValues, {json: true})
                                .inspectJSON()
                                .expectStatus(200)
                                .expectJSON(updateItemValues)
                                .afterJSON(function(responseItemUpdate){
                                    var childItemIdUpdate = responseItemUpdate.Id
                                    console.log("childItemIdUpdate:" + childItemIdUpdate);
                                    frisby.create('Delete childItem with ID:' + childItemIdUpdate + ' from project: ' + responseItemUpdate.ParentId)
                                        .delete('https://todo.ly/api/items/' + childItemIdUpdate +'.json' )
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
})
.toss();
