function bt_sms_sends() {
  var tr = document.getElementById("test");
  var spans = tr.getElementsByTagName("td");
  var _phone = spans[1].innerHTML;
  
  fetch("/sms/sends", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      phone: _phone
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
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    })
    .done();
}
