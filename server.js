const express = require('express');
const path = require('path');
const hbs = require('hbs'); 
var bodyParser = require('body-parser');  
var sf = require('node-salesforce');


var app = express();
const port = process.env.PORT || 3000;
var urlencodedParser = bodyParser.urlencoded({ extended: false })  


// middleware
// __dirname - stores path to directory

app.use(express.static(__dirname + '/assets'));
const viewPath = path.join(__dirname,'./templates/views');

// tell express to use templates instead of views. 

app.set('views',viewPath);





app.get('',(req,res)=>{
res.render('index');
});


app.post('/louthost',urlencodedParser,(req,res)=>{

console.log('username'+req.body.username);
console.log('password'+req.body.password);
console.log('mydomain'+req.body.mydomain);

var conn = new sf.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
     loginUrl : 'https://login.salesforce.com'
  });

conn.login(req.body.username, req.body.password, function(err, userInfo) {
if (err) { return console.error(err); }
// Now you can get the access token and instance URL information.
// Save them to establish connection next time.
console.log(conn.accessToken);
// console.log(conn.instanceUrl);
// // logged in user property
// console.log("User ID: " + userInfo.id);
// console.log("Org ID: " + userInfo.organizationId);
// ...
});

    res.render('louthost',{
        mydomain:req.body.mydomain,
        sessionIdV:conn.accessToken
    });

    // res.send('instanceURL'+conn.instanceUrl+'\n'
    // +'AccessToken'+conn.accessToken);
});


app.set('view engine','hbs');




app.listen(port);