const { response } = require('express');
const PDFMerger = require('pdf-merger-js');
const path = require('path');

var merger = new PDFMerger();
//3 all even odd
const mergePdf = async (arr,obj,pages) => {
  // arr.forEach (async element => {
  //   await merger.add(path.join(__dirname + '/' + element.path));
  // });
   console.log(arr.length);
   console.log(obj);
   console.log(pages);



  // for(const element of arr){
  //   await merger.add(path.join(__dirname + '/' + element.path));
  // }
  
  for(let i=0;i<arr.length;i++)
  {
    if(obj[i]=="all")
    {
      await merger.add(path.join(__dirname + '/' + arr[i].path));
    }
    if(obj[i]=="Even")
    {
      console.log("In even if");
      let evenPage = [];
      for(let k=0;k<pages[i];k++)
      {
        if(k%2==0)
        {
          evenPage.push(k);
        }
      }
      console.log(arr[i].path);
      console.log(evenPage);
      await merger.add(path.join(__dirname + '/' + arr[i].path),evenPage);
    }
    if(obj[i]=="Odd"){
      let page = [];
      for(let j=0;j<=pages[i];j++){
        if(j%2==1){
          page.push(j);
        }
      }
      console.log(page);
      await merger.add(path.join(__dirname + '/' + arr[i].path),page);
    }
    if(typeof(obj[i])==='object'){
      // console.log("In array of llop");
      // let customPage = []
      // customPage = Object.values(obj[i]);
      // console.log(customPage);
      // console.log(typeof customPage);
      // console.log(obj[i]);
      await merger.add(path.join(__dirname + '/' + arr[i].path),obj[i]);
    }
    
  }
  // await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
  // await merger.add(p2); // merge only page 2

  let d = new Date().getTime();
  await merger.save(`public/${d}.pdf`);
  
  //save under given name and reset the internal document
  return d;
  // Export the merged PDF as a nodejs Buffer
  // const mergedPdfBuffer = await merger.saveAsBuffer();
  // fs.writeSync('merged.pdf', mergedPdfBuffer);
}


module.exports= {mergePdf}