const express = require('express');

const path = require('path');

const port = 1800;

const db = require('./config/mongoose')

const ToDo = require('./models/todo');

const app = express();

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());

app.use(express.static('assets'));

app.use(express.static('views'));

app.get('/',function(req,res){
    ToDo.find({},function(err,contacts){
        console.log(contacts)
        if(err){
            console.log("Error In Fetching Contacts");
            return;
        }
        res.render('index',{
            title:"ToDo List",
            arr:contacts
        });
    })
    
});
var month_name = function(dt){
    mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
      return mlist[dt.getMonth()];
    };
app.post('/',function(req,res){
    var str = req.body.date;
    var date = str.substring(str.length-2, str.length);
    var month= month_name(new Date(str));
    var year = str.substring(0, 4);
    var task=req.body.task;
    var category=req.body.category;
    var finaldate=date+"th "+month+", "+year;
    if(finaldate=="th undefined, "){
        finaldate="No Deadline"
    }
    ToDo.create({
        task: task,
        category: category,
        date:finaldate

    },function(err,newTask){
        if(err){
            console.log(err);
            console.log("Error in creating a contact");
            return;
        }
        return res.redirect("back");
    });
});

app.post('/delete',function(req,res){
    if(req.body.vehicle1.length==24){
        ToDo.findByIdAndRemove(req.body.vehicle1, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Removed List : ", docs);
            }

        }); 
    }else{
        for(var i=0;i<req.body.vehicle1.length;i++){
            ToDo.findByIdAndRemove(req.body.vehicle1[i], function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Removed List : ", docs);
                }
    
            });
            
        }
    }
    
    res.redirect('back')
    
});

app.listen(port,function(err){
    if(err){
        console.log("Error In Loading The Server");
        return;
    }
    console.log("Server Launched Successfully");
})