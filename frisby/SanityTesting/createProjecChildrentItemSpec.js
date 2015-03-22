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
 * Function to create Project
 * @param projectName
 * @returns {json of Project created }
 */
var createProject = function(projectName){
    var now = new Date();
    var project1 = {
        "Content": projectName + now.getTime()
    };
    return frisby.create('Create project')
        .post('https://todo.ly/api/projects.json', project1, {json: true})
        //.inspectJSON()
        .expectJSON(project1);
};

/**
 * Function to create Child Project
 * @param projects; Array of Project
 * @returns {json of Project Children created }
 * @constructor
 */
var ProjectChild = function(projects){
    var Parent = {
        "ParentId": projects[0],
        "Content": "Project Children"
    };

    return frisby.create('Create project children')
        .put('https://todo.ly/api/projects/' + projects[1] + '.json', Parent, {json: true})
        .inspectJSON()
        .expectJSON(Parent)
};
/**
 * Function to create Item in Child Project
 * @param Idproject children
 * @returns {json of Item created}
 * @constructor
 */
var CreateItem = function(Idproject){
    var Item = {
        "ProjectId": Idproject,
        "Content": "Item Children"
    };

    return frisby.create('Create Item Children')
        .post('https://todo.ly/api/items.json', Item, {json: true})
        .inspectJSON()
        .expectJSON(Item)
};

/**
 * Function to Update Item
 * @param itemId
 * @returns {json of Item updated}
 * @constructor
 */
var UpdateItem = function(itemId){
    var updatePriority = {
        "Priority": 2
    };

    return frisby.create('Update Item Children')
        .put('https://todo.ly/api/items/' + itemId + '.json', updatePriority, {json: true})
        .inspectJSON()
        .expectJSON(updatePriority)
};


var IDs=[];
var cont=0;


for (var i=0;i < 2; i++) {
    createProject("projectWithItem"+i).expectStatus(200)
        .afterJSON(function(responseData){
            cont++;
            var projectId = responseData.Id;
            IDs.push(responseData.Id);
            console.log(" projeId:" + projectId);
            if (cont==2){
			
                ProjectChild(IDs).expectStatus(200)
                    .afterJSON(function(responseDataProyect){
                        var IdProyect=responseDataProyect.Id;
                        console.log("ID proyect Parent:"+IdProyect);

                        CreateItem(IdProyect).expectStatus(200)
                            .afterJSON(function(responseItem){
                                var IdItem=responseItem.Id;
                                console.log("ID Item:"+IdItem);

                                UpdateItem(IdItem).expectStatus(200)
                                    .afterJSON(function(updateItem){
                                        console.log("Item Update:"+updateItem.Id+"Priority:"+ updateItem.Priority);
                                    })
                                    .toss();

                            })
                            .toss();

                    })
                    .toss();

            }
        })
        .toss();

}

