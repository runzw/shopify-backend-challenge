var express = require('express');
var router = express.Router();
const {Item} = require('../database/connection.js')

/* create an inventory*/
router.post('/create', async (req, res, next) => {
  const name = req.body.name;
  const count = 1;
  const tag = req.body.tags;
  const lastUpdateTime = new Date();

  if(name == null)  res.send("Inventory item name cannot be none!");

  const item = await Item.findOne({
    "name" : name
  })

  if(item != null){
    res.send("This item already exists in the inventory");
  }

  const new_item = {
    "name" : name,
    "count" : count,
    "tags" : tag,
    "lastUpdateTime" : lastUpdateTime
  }

  Item.create(new_item, function(err){
    if(err){
      res.send("Inventory item cannot be created!");
    }
  });

  res.send("Inventory item has been created successfully");
});

/* edit an inventory*/
router.put('/edit', async (req, res, next) => {
  const name = req.body.item_name;

  var change = req.body;
  delete change.item_name;
  change.lastUpdateTime = new Date();
  await Item.updateOne({
    "name" : name
  },change);

  res.send("Inventory item has been updated");
});

/* delete an inventory*/
router.delete('/delete', async (req, res, next) => {
  const name = req.body.name;

  await Item.deleteOne({
    "name" : name
  })

  res.send("Inventory item has been deleted");
});

/* show a list of inventory*/
router.get('/showAll', async (req, res, next) => {
  const items = await Item.find();
  res.send(items);
});

/*Advanced feature */
//filtering based on name
router.get('/show/name/:filter', async (req, res, next) => {
  filter = req.params.filter;
  filter = filter.split("");

  regex = "";

  for(let char of filter){
      regex += "[\\S|\\s]*"
      regex += char
  }

  regex += "[\\S|\\s]*"
  console.log(regex)
  res.send(await Item.find(
      {'name' : {"$regex" : RegExp(regex)}}
  ));
});

//filtering based on tags
router.get('/show/tags/:tags', async (req, res, next) => {
  const tags = req.params.tags.split('+');

  var names = new Set();
  for(let tag of tags){
    console.log(tag);
    const res = await Item.find({
      "tags" : {"$elemMatch" : {"$eq" : tag}}
    })
    for(let item of res){
      names.add(item.name);
    }
  }

  var items = [];
  for(let name of names){
    const item = await Item.findOne({
      "name" : name
    });
    items.push(item)
  }

  res.send(items);
});

//filtering based on count
router.get('/show/count/:filter', async (req, res, next) => {
  const numbers = req.params.filter.split('-');
  const min = numbers[0];
  const max = numbers[1];
  const range = {};

  if(min != "*")  range.$gte = min;
  if(max != "*") range.$lte = max;
  const items = await Item.find({
    "count" : range
  })

  res.send(items)
});

module.exports = router;
