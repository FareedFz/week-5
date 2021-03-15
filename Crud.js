// create a JSON data array
let data = [
    { id: 1, title: 'Create a project',  order: 1, completed: true, createdOn: new Date() },
    { id: 2, title: 'Take a cofféé',     order: 2, completed: true, createdOn: new Date() },
    { id: 3, title: 'Write new article', order: 3, completed: true, createdOn: new Date() },
    { id: 4, title: 'Walk toward home', order: 4, completed: false, createdOn: new Date() },
    { id: 5, title: 'Have some dinner', order: 5, completed: false, createdOn: new Date() },
];
//express is an framework of nodejs 
var express = require('express')
var app = express()//app is an object or method in express
const port = 9000 //server port number
//var bodyParser = require('body-parser');//body parser used for body in the postman
app.use(express.json());

// GET method 
app.get('/', function (req, res) {

    res.send(JSON.stringify(data));

  })
  app.get('/:id', function (req, res) {
    // find an object from `data` array match by `id`
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    // if object found return an object else return 404 not-found
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

  // POST method route
  app.post('/', function (req, res) {
    let itemIds = data.map(item => item.id);
    let orderNums = data.map(item => item.order);
    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;//if create the another another (id)object in array then creating the new id automatically
    let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;//if create the another (order)another object in array then creating the new id automatically

    // create an object of new Item
      let newItem={
        id: newId, // generated in above step
        title: req.body.title, // value of `title` get from POST req
        order: newOrderNum, // generated in above step
        completed: false, // default value is set to false
        createdOn: new Date() // new date object
      };
    data.push(newItem);//adding the data to the array
    res.status(201).json(newItem);
  });

//put operation
app.put('/:id',function(req,res){//id is found then start the update function
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if(found){
        let updated= {
            id:found.id,
            title:req.body.title,
            order:req.body.order,
            completed:req.body.completed
        };
        let updateindex=data.indexOf(found);
        console.log(updateindex);
        data.splice(updateindex,1,updated);
        res.send('Success');
    }
    else{
        res.send('FailedSuccess');
    }
});
//delete operation
app.delete('/:id',function(req,res){
 let found=data.find(function(item){
   return item.id==parseInt(req.params.id)
 })
 if(found){
   let target=data.indexOf(found)
   //console.log(target);
   data.splice(target,1);
   //console.log(data.splice(target,1));
 }
 res.send('success')
});


//const port = process.env.PORT || 5600;
module.exports = app.listen(port, () => console.log(`Listening on port ${port}...`));























