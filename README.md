Members :
	Noelia Melgarejo
	Virginia Sanabria

      
Account email: noeliamelgarejojavascript@gmail.com
password: Control123
Token:  bm9lbGlhbWVsZ2FyZWpvamF2YXNjcmlwdEBnbWFpbC5jb206Q29udHJvbDEyMw==
		    								
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
						Smock testing
--------------------------------------------------------------------------------------------------
■ Verify create User 
■ Verify Delete  a user
■ Verify Update  a user 
■ Verify get users 
■ Verify users authenticated 

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
						Sanity testing
--------------------------------------------------------------------------------------------------
■ Verify Create Project with token and it is not possible create a project with deleted token
■ Create a Item in "Inbox" filter with token authentication
■ Verify Create an Item in Child Project
■ Verify create child project after deleting previously all the projects
■ Verify Create Project with token authentication 
■ Verify after checking an item into inbox filter it is listed into the done list for Inbox filter 

--------------------------------------------------------------------------------------------------

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
						Negative testing
--------------------------------------------------------------------------------------------------
■ Verify that it is not  possible  access to  Parent Project with invalid ID
■ Verify that an error message is displayed when trying to add an user with invalid email Address
■ Verify that an error message is displayed when trying to add an user with empty data 
■ Verify that is not possible to add a item with invalid parent item id 
■ Verify that is not possible to add a item with invalid project id 
■ Verify that it is not possible to add project with empty name

--------------------------------------------------------------------------------------------------

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
						CRUD
--------------------------------------------------------------------------------------------------
■ CRUD for an item within a project
■ CRUD for an item within Today filter
■ CRUD for an item within Next filter
■ CRUD for child Item of project
■ CRUD for more than 1 items

--------------------------------------------------------------------------------------------------
