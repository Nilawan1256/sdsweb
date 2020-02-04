function bt_sms_sends(id) {
  const tr = document.getElementById("row_" + id);
  const td = tr.getElementsByTagName("td");
  const data = [];

  for (i = 0; i < 3; i++) {
    data.push(td[i].innerText);
  }

  // Prompt Box //
  const smstext = prompt("กรุณากรอกข้อความที่ต้องการจะส่ง : ");

  if (smstext == ""){
    alert("กรุณากรอกข้อความ");
  }
  if (!smstext){
    alert("ยกเลิกการส่งข้อความ");
  }  else{
    fetch("/sms/sends", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
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
  if(del == true){
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
        setTimeout(() => {
          location.reload()
        }, 0);
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
  if(del == true){
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
        setTimeout(() => {
          location.reload()
        }, 0);
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
