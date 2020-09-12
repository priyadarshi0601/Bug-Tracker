const express=require('express');
const mongoose=require('mongoose')
const Issue=require('./models/issue')

const app=express()

const dbURI = 'mongodb+srv://priyo:test1234@cluster0.8gas9.mongodb.net/Mantis?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000), console.log('Connected to db'))
  .catch(err => console.log(err));

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.get('/add',(req,res)=>{
    const issue=new Issue({
        name:"Jayanta Sarkar",
        description:'Gtpv2',
        Severity:"Minor"
    });
    issue.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
})

app.get('/',(req,res)=>{
    res.redirect('/issues')
})
app.get('/issues/create',(req,res)=>{
    res.render('create',{title:'Create new issue'})
});



app.get('/issues',(req,res)=>{
Issue.find().sort({createdAt:-1})
    .then(result=>{
        res.render('index',{issues:result,title:'All blogs'});
})
    .catch(err=>{
        console.log(err)
    });
});
app.post('/issues',(req,res)=>{
    const issue=new Issue(req.body);
    console.log(req.body)
    issue.save()
    .then(result=>{
        res.redirect('/issues');
    })
    .catch(err=>{
        console.log(err);
    });
});
app.get('/issues/:id',(req,res)=>{
    const id=req.params.id;
    console.log(id)
    Issue.findById(id)
    .then(result=>{
        console.log(result)
        res.render('details',{issue :result ,title:'Issue Details'});
    })
    .catch(err=>{
        console.log('Super')
        console.log(err)
    });
});
app.delete('/issues/:id',(req,res)=>{
    const id=req.params.id;
    console.log('Req received')
    Issue.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect:'/issues'});
    })
    .catch(err=>{
        console.log(err);
    })
})



