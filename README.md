# shopify-backend-challenge
Shopify 2022 Summer Backend Developer Intern Challenge

## Enviroment setup
### Install node.js and npm
[Link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) here
### Run the server
`npm install`

`npm start`

Now the server is running on http://localhost:3000/inventory

## Design
### Data model
|Field|Type|Description|
|---|---|---|
|name|String|Name of item<br>Primary key|
|count|Integer|Count of item|
|tags|String[]||
|lastUpdateTime|Date|Last update time for this item|
### APIs
http://localhost:3000/inventory + `Route`
|Route|Type|Description|parameters|
|---|---|---|---|
|/create|POST|Used for creating an item|Request body:<br>{"name":"apple",<br>  "tags":["fruit","vegetable"],<br> "count" : 1}|
|/delete|DELETE|Used for deleting an item|Request body:<br>{"name":"apple"}|
|/edit|PUT|Used for editing an item|Request body:<br>{"item_name" : "apple",<br> "name":"Apple",<br>  "tags":["fruit"],<br> "count" : 2}<br> where `item_name` is the original name|
|/showall|GET|Used for showing all items||
|/show/name/:filter|GET|Used for selecting items which meet the requirement: filter is a subsequence of their names|/show/name/apl|
|/show/tags/:filter|GET|Used for selecting items which meet the requirement: they contain one of the tags that filter contains |/show/tags/fruit+vegetable<br>Different tags are separated by a '+'|
|/show/count/:filter|GET|Used for selecting items which meet the requirement: the counts of them are between the range that filter shows|/show/count/1-2<br>'1' represents the min value and '2' represents the max value and they are separated by a '-'<br>If there's no min/max value, use '*' instead|
