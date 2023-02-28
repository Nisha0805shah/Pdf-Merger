
          $(document).ready(function () {
            $('#loginAlert').hide();
            const urlParams = new URLSearchParams(window.location.search);
            const myParam = urlParams.get('error');
            if (myParam == "Incorrect_Credential") {
              $('#loginAlert').show();
            }
            setTimeout(() => {
              $('#loginAlert').hide();

            }, 3000)

            $('#embeded').hide();
            const name = urlParams.get('name');
            // console.log(name);
            if (name != null) {
              // console.log("In ifff.....");
              $('#embeded').show();
              $('#setsrc').attr("src", "../static/" + name + "");
              // src="../uploads/"+name+"";

            }
            else {
              // console.log("In elseee....");
              $('#embeded').hide();
            }


          })


          function GetFileSizeNameAndType() {
            document.getElementById('fp').innerHTML = "";
            fi = document.getElementById('fileUpload'); // GET THE FILE INPUT AS VARIABLE.
            var arr;
            console.log(fi);
            var totalFileSize = 0;
            filelength = fi.files.length;
            document.getElementById('filesize').value = filelength;
            const files = Object.values(fi.files);
            console.log(files);
            // console.log("Innter value :: "+);
            if (fi.files.length > 0) {
              document.getElementById('fp').innerHTML = files.map((element, index) => (`
                
                </br>
                <span class="bi bi-file-pdf-fill teal-color" style="font-size: 100px;"> 
                  </span>Selected File Name is <b> ${element.name} </b>.
                <div class="card" id="card" style="width: 18rem;">  
                <div class="form-check">
                <input class="form-check-input" type="radio" value="all" checked name="page-selection-${index}"/>All
                </div>
                <div class="form-check">
                <input class="form-check-input" type="radio" value="Odd" name="page-selection-${index}"/>Odd
                </div>
                <div class="form-check">
                <input class="form-check-input" type="radio" value="Even" name="page-selection-${index}"/>Even
                </div>
                </div>
                ` 
              ))
             
            }
          }


          function downloadFile() {



            // e.preventDefault();
            console.log(".........");
            const urlParams = new URLSearchParams(window.location.search);
            const name = urlParams.get('name');
            console.log(name);
            let filename = $("#filename").val()
            console.log(filename);
            let obj = {
              oldname: name,
              newname: filename
            };
            //let arr = [name,filename];
            console.log(obj);
            let filepath = "download/" + JSON.stringify(obj) + "";
            console.log(filepath);
            $('#formpath').attr('action', filepath);
            // $('a#hrefsrc').attr({target:'_blank',href:'filepath'});

          };

          function getPages() {
            console.log("getpages callled........");
            fi = document.getElementById('fileUpload');
            filelength = document.getElementById('filesize').value;
            console.log(filelength);
            // Array.from({length: filelength}, () => {})
            // let obj = {};
            // for (let i = 0; i < filelength; i++) {
            //   var ele = document.getElementsByName('page-selection-' + `${i}`);
            //   // let val = document
            //   // console.log(ele);
            //   for (j = 0; j < ele.length; j++) {
            //     // console.log("in jjj for.........");
            //     if (ele[j].checked) {
            //       obj[i]=ele[j].value;
            //     }
            //   }
            // }
            // let pages = "merge/" + JSON.stringify(obj) + "";
            // console.log(pages);
            // // $('#getpdf').attr('action', pages);
            // console.log(arr);

          };
