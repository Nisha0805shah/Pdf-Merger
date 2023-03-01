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
  $('#email').hide();
  
  const name = urlParams.get('name');
  // console.log(name);
  if (name != null) {
    // console.log("In ifff.....");
    $('#embeded').show();
    $('#email').show();
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
  var totalFileSize = 0;
  filelength = fi.files.length;
  document.getElementById('filesize').value = filelength;
  const files = Object.values(fi.files);


  // console.log("Innter value :: "+);
  if (fi.files.length > 0) {

    files.map((element, index) => {
      var reader = new FileReader();
      var count = 0;
      reader.readAsBinaryString(element);
      reader.onloadend = function () {
        count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length
        // console.log("filepage"+index);
        let name = "filepage" + index;
        // console.log(name);
        //document.getElementById('id').name = name;
        let tag = document.getElementById(name);

        console.log(count);
        tag.value = count;
        let dropid="dropdown"+index;
        // tag.setAttribute("name", name);
        console.log(tag.value);
        for (i = 1; i <=count; i++) {
          var opt = document.createElement("option");
          document.getElementById(dropid).innerHTML += '<option id="' + i + ' ">' + i + '</option>';
        }
        console.log(tag);
      }
    });



    document.getElementById('fp').innerHTML = files.map((element, index) => (`
      
      </br>
      <span class="bi bi-file-pdf-fill teal-color" style="font-size: 100px;"> 
        </span>Selected File Name is <b> ${element.name} </b>.
      <div class="card" id="card" style="width: 18rem;">  
        <div class="form-check">
          <input class="form-check-input" type="radio" value="all" name="page-selection-${index}"/>All
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" value="Odd" name="page-selection-${index}"/>Odd
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" value="Even" name="page-selection-${index}"/>Even
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" value="Custom" onchange="document.getElementById('dropdown${index}').style.display='inline'"/>Custom<br>
            <select id="dropdown${index}" value="Custom" name="page-selection-${index}" style="display: none;" multiple>
            </select> 
        </div>
      </div>
      
      <input type="hidden" id="filepage${index}" name="filepage${index}" value="">`
    ))

  }
}


function downloadFile() {

  // document.getElementById('dropdown${index}').style.display = inline;

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

function getEmail(){
  let emailid =  $("#emailid").val()
  // Document.getElementById('emailid');
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');
  let obj = {
    filename: name,
    email: emailid
  };
  console.log(obj);
  let sendEmail = "email/" +  JSON.stringify(obj) + "";
  console.log(sendEmail);
  $('#emailpath').attr('action', sendEmail);
}

