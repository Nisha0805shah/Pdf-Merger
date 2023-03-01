// import Link from "next/link";
const express = require('express');
const path = require('path');
const multer = require('multer');
const { mergePdf } = require('./merge');
const upload = multer({ dest: 'uploads/' });
const fs = require("fs");
require('dotenv').config();
const { json } = require('express');
const pdf = require('pdf-page-counter');
const PDF = require('pdf-page-counter');

const nodemailer = require("nodemailer");
// import { request } from 'https';
const app = express();
const port = 3000;

app.use('/static', express.static('public'));
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/template/index.html'));
})


app.post('/merge', upload.array('pdfs', 12), async (req, res, next) => {
 


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
    // console.log('File Copied....');


     res.download(path+newname+".pdf", function(err) {
        if(err) {
            console.log(err);
        }
    })

})






app.get('/email/:obj',async(req,res)=>{
    console.log(req.params);
    const path = "public/";
    const object = req.params;
    const arr = object.obj;
    const newarr = JSON.parse(arr);
    const filename = newarr.filename;
    const email = newarr.email;
    // sendVerifyMail(path,email,filename);
    try 
    {
        let transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            service : 'Gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
            }
        });

        let mailDetails = {
            from: process.env.EMAIL,
            to: email,
            subject: 'An Attached File',
            text: 'Check out this attached pdf file',
            attachments: [{
                filename: filename,
                path: 'public/'+filename,
                contentType: 'application/pdf'
              }],
            html: '<p> Dear '+email+'\n\n, Pdf is : <b>'+filename+'</b>'
        }
        transport.sendMail(mailDetails, function(err ) {
            if(err) {
                console.log({message: err});
            } else {
                console.log('Email sent successfully -');
                res.redirect('/');
            }
        });
    }
    catch(error){
        res.json({msg: error})
    }
})



app.listen(port, () => {
    console.log(`app on http://localhost:${port}`);
})
