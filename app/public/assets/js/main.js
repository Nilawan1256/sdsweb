function bt_sms_sends(id) {
  const tr = document.getElementById("row_" + id);
  const td = tr.getElementsByTagName("td");
  const data = [];

  for (i = 0; i < 3; i++) {
    data.push(td[i].innerText);
  }

  // Prompt Box //
  const smstext = prompt("กรุณากรอกข้อความที่ต้องการจะส่ง : ");

  if (!smstext){
    
  }
  else{
    fetch("/sms/sends", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: data,
        text: smstext
      })
    })
    .done();
  }
}

//delete
function deleted(id) {
  var del = confirm('คุณต้องการที่จะลบรายการนี้ ?');
  //alert(popup);
  if(del == true){
    //alert("true!!!");
  fetch("/donor/delete", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: id
    })
  })
    .then(response => {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    })
    .done(); 
  }
   else{
      //alert("false!!!");
  } 
}


//delete user
function deletedUser(id) {
  var del = confirm('คุณต้องการที่จะลบรายการนี้ ?');
  //alert(popup);
  if(del == true){
    //alert("true!!!");
  fetch("/setting/user/delete", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: id
    })
  })
    .then(response => {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    })
    .done(); 
  }
   else{
      //alert("false!!!");
  } 
}
