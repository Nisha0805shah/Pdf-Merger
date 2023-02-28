// import Link from "next/link";
const express = require('express');
const path = require('path');
const multer = require('multer');
const { mergePdf } = require('./merge');
const upload = multer({ dest: 'uploads/' });
const fs = require("fs");
const { json } = require('express');
const pdf = require('pdf-page-counter');
// import { request } from 'https';
const app = express();
const port = 3000;

app.use('/static', express.static('public'));
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/template/index.html'));
})

// app.get('/upload/202112125_Nisha_Shah',(req,res) => {
//     res.sendFile(__dirname,"../uploads/"+req.param('202112125_Nisha_Shah'));
//     });

// app.get('/show',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/uploads/202112125_Nisha_Shah.pdf'));
// })

app.post('/merge', upload.array('pdfs', 12), async (req, res, next) => {
    //console.log(req.files.length);
   // console.log(arr);
    // console.log(req);
    // console.log(req.body['page-selection-0']);
//    console.log(req.files);
    //  let files = req.files;
    //  let filearr = Object.entries(files);
   
    // var filearr  = Object.keys(files);
    // console.log(typeof filearr);
    // console.log(filearr);


    if (req.files.length < 2) {
        res.redirect('/?error=' + encodeURIComponent("Incorrect_Credential"));
    }
    else {
        let obj ={};
        let pages = {}
        for(let i=0;i<req.files.length;i++)
        {
            obj[i]=req.body['page-selection-'+`${i}`];
            pages[i] = req.body['filepage'+`${i}`];
        }
        // console.log(obj);
        // console.log(pages);
        let d = await mergePdf(req.files,obj,pages);
        res.redirect('/?name=' + d + '.pdf');
    }
})

app.get('/download/:obj', (req, res) => {
    // Image will be stored at this path
    // const path = `${__dirname}/files/img.jpeg`; 
    const path = "public/";
    const name = req.params;
    // console.log(name);
    const change = name.obj;
    const newobj = JSON.parse(change)
    // console.log(newobj);
    // console.log(typeof newobj);
    const oldname = newobj.oldname;
    const newname = newobj.newname;
    // console.log(oldname);
    // console.log(newname);
    //var fs = require('fs');

    fs.writeFileSync('public/'+ newname +'.pdf',fs.readFileSync('public/'+oldname+''));
    console.log('File Copied....');


     res.download(path+newname+".pdf", function(err) {
        if(err) {
            console.log(err);
        }
    })

})


app.listen(port, () => {
    console.log(`app on http://localhost:${port}`);
})
