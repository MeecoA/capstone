generateTable();
generateDropdown();

//for the data table
function generateTable() {
  $(document).ready(function () {
    $("table.display").DataTable({
      dom: "Bfrtip",
      buttons: ["copy", "csv", "excel", "pdf", "print"],
    });
  });
}

function generateDropdown() {
  let dropDown = document.querySelectorAll(".menu-btn");
  dropDown.forEach(function (item) {
    item.addEventListener("click", function () {
      item.classList.toggle("active");
      let dropdownContent = item.nextElementSibling;
      if (dropdownContent.style.display === "flex") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "flex";
      }
    });
  });
}

let headerTitle = document.querySelector("#headerTitle");
//ajax - users side bar

let secLink = document.querySelector("#secLink");
let persLink = document.querySelector("#persLink");
let resiLink = document.querySelector("#resiLink");
let visiLink = document.querySelector("#visiLink");

function loadSec() {
  headerTitle.textContent = "Users";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = this.responseText;
      secLink.classList.add("active");
      persLink.classList.remove("active");
      resiLink.classList.remove("active");
      visiLink.classList.remove("active");
      generateTable();
    }
  };
  xhttp.open("GET", "sidebar/user-security.html", true);
  xhttp.send();
}
function loadPersonnel() {
  headerTitle.textContent = "Users";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = this.responseText;
      secLink.classList.remove("active");
      persLink.classList.add("active");
      resiLink.classList.remove("active");
      visiLink.classList.remove("active");
      generateTable();
    }
  };
  xhttp.open("GET", "sidebar/user-personnel.html", true);
  xhttp.send();
}
function loadResidents() {
  headerTitle.textContent = "Users";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = this.responseText;
      secLink.classList.remove("active");
      persLink.classList.remove("active");
      resiLink.classList.add("active");
      visiLink.classList.remove("active");
      generateTable();
    }
  };
  xhttp.open("GET", "sidebar/user-resident.html", true);
  xhttp.send();
}

function loadVisitors() {
  headerTitle.textContent = "Users";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = this.responseText;
      secLink.classList.remove("active");
      persLink.classList.remove("active");
      resiLink.classList.remove("active");
      visiLink.classList.add("active");

      generateTable();
    }
  };
  xhttp.open("GET", "sidebar/user-visitor.html", true);
  xhttp.send();
}

function loadVehicles() {
  headerTitle.textContent = "Vehicles";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = this.responseText;
      secLink.classList.remove("active");
      persLink.classList.remove("active");
      resiLink.classList.remove("active");
      visiLink.classList.add("active");

      generateTable();
    }
  };
  xhttp.open("GET", "sidebar/vehicles.html", true);
  xhttp.send();
}

function loadLogs() {
  headerTitle.textContent = "Logs";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = this.responseText;
      secLink.classList.remove("active");
      persLink.classList.remove("active");
      resiLink.classList.remove("active");
      visiLink.classList.add("active");

      generateTable();
    }
  };
  xhttp.open("GET", "sidebar/logs.html", true);
  xhttp.send();
}

function loadAnnounce() {
  headerTitle.textContent = "Announcements";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = this.responseText;
      secLink.classList.remove("active");
      persLink.classList.remove("active");
      resiLink.classList.remove("active");
      visiLink.classList.add("active");

      generateTable();
    }
  };
  xhttp.open("GET", "sidebar/announce.html", true);
  xhttp.send();
}
