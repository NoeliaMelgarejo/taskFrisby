// Frisby tests

var frisby = require('frisby');

frisby.globalSetup({
    request: {
        headers: {
            'Authorization': 'Basic bm9lbGlhbWVsZ2FyZWpvamF2YXNjcmlwdEBnbWFpbC5jb206Q29udHJvbDEyMw=='
        },
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
*Function to create item within a project
*/
var createItemWithinInboxFilter = function(itemName){
    return frisby.create('Create an Item within inbox Filter' + itemName)
        .post('https://todo.ly/api/items.json', {
            "Content": itemName,
            "Priority": 3},
            {json: true})
        .inspectJSON()
        .expectStatus(200)
        .expectJSONTypes(parametersItem)    
};

/**
*Function to update defaults value of an  item
*/
var updateItem = function(itemId){
    return frisby.create('Update the already created Item by Id' + itemId)
        .put('https://todo.ly/api/items/' + itemId + '.json', {
            "Checked": true}, 
            {json: true})
        .inspectJSON()
        .expectStatus(200)
};


/**
* Test case to verify after checking an item into inbox filter it is listed into the done list for Inbox filter
*/

createItemWithinInboxFilter("itemNameTestdone")
.expectJSON({"Checked": false})
.afterJSON(function(responseItem){     
    var itemId = responseItem.Id;
    var check = responseItem.Checked;
    console.log('itemId:' ,itemId , 'checked:', check );
    updateItem(itemId)
    .expectJSON({"Checked": true}) 
    .afterJSON(function(responseUpdateItem){
        frisby.create('Given all done items of Inbox filter')
            .get('https://todo.ly/api/filters/0/doneitems.json')
            .inspectJSON()
            .expectStatus(200)
            .expectJSON('?',{
                Id: itemId
             })
        .toss();
    })
    .toss();
})
.toss();

