function bt_sms_sends(id) {
  const tr = document.getElementById("row_" + id);
  const td = tr.getElementsByTagName("td");
  const data = [];

  for (i = 0; i < 3; i++) {
    data.push(td[i].innerText);
  }

  // Prompt Box //
  const smstext = prompt("Please enter your SMSText:");

  if (!smstext){
    alert("Error");
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
        smstext: smstext
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
        console.log("Fetch Error : ", err);
      })
      .done();
  }
}
