var siteNameInput = document.querySelector("#siteName");
var siteUrlInput = document.querySelector("#siteUrl");
var btnSubmit = document.querySelector("#btnSubmit");
var tableBody = document.querySelector("#tableBody");
var nameAlert = document.querySelector('#nameAlert');
var urlAlert = document.querySelector('#urlAlert');
var siteList;
var regex = {
  siteUrl: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,
  siteName: /^[A-Z][a-z]{3,}$/
};

loadData();
display(siteList);

function loadData() {
  if (localStorage.getItem("siteList") == null) {
    siteList = [];
  } else {
    siteList = JSON.parse(localStorage.getItem("siteList"));
  }
}

function addSite() {
  if (
    siteNameInput.classList.contains("is-valid") &&
    siteUrlInput.classList.contains("is-valid")
  ) {
    var site = {
      siteName: siteNameInput.value,
      siteUrl: siteUrlInput.value,
    };
    siteList.push(site);
    clearInputs();
    display(siteList);
    localStorage.setItem("siteList", JSON.stringify(siteList));
  } else {
    alert("please enter valid data")
  }
}

btnSubmit.addEventListener("click", addSite);

function clearInputs() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");
}

function display(list) {
  var htmlTemplate = "";
  var temp;
  for (var i = 0; i < list.length; i++) {
    temp = i;
    htmlTemplate += `<tr>
                        <td class="fw-light">${++temp}</td>
                        <td class="fw-light">${list[i].siteName}</td>
                        <td>
                        <a href="${list[i].siteUrl}" target="_blank" rel="noopener noreferrer">
                            <button class="btn btn-success"><i class="fa-regular fa-eye"></i> Visit</button>
                        </a>
                        </td>
                        <td>
                            <button onclick="deleteSite(${i})" class="btn btn-danger"><i class="fa-regular fa-trash-can"></i> Delete</button>
                        </td>
                    </tr>`;
  }
  tableBody.innerHTML = htmlTemplate;
}

function deleteSite(index) {
  siteList.splice(index, 1);
  localStorage.setItem("siteList", JSON.stringify(siteList));
  display(siteList);
}

function validateInput(element) {
  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add('d-none');
} else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove('d-none');
  }
}
