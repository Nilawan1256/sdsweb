function bt_sms_sends(id) {
  const tr = document.getElementById("row_" + id);
  const td = tr.getElementsByTagName("td");
  const array = [];

  for (i = 0; i < 3; i++) {
    array.push(td[i].innerHTML);
  }

  fetch("/sms/sends", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: array
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
