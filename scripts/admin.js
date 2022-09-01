//for the data table 

$(document).ready( function () {
  $('table.display').DataTable(
{
  dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
}
  );
} );


  // $(document).ready( function () {
  //   $('#secTable').DataTable();} );


//for dropdown content

let dropDown = document.querySelectorAll(".menu-btn"); 

dropDown.forEach(function(item) {
    item.addEventListener("click", function() {
        item.classList.toggle("active") 
        let dropdownContent = item.nextElementSibling;
        if (dropdownContent.style.display === "flex") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "flex";
        }
    });
})
let headerTitle = document.querySelector("#headerTitle");
//ajax - users side bar
function loadSec() {
  headerTitle.textContent = "Security"
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = this.responseText;
    }
  }; 
  xhttp.open("GET", "/sidebar/user-security.html",true);
  xhttp.send();
}
function loadPersonnel() {
  headerTitle.textContent = "Personnel"
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = this.responseText;
    }
  }; 
  xhttp.open("GET", "/sidebar/user-personnel.html",true);
  xhttp.send();
}
function loadResidents() {
  headerTitle.textContent = "Residents"
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = this.responseText;
    }
  }; 
  xhttp.open("GET", "/sidebar/user-resident.html",true);
  xhttp.send();
}

function loadVisitors() {
  headerTitle.textContent = "Visitors"
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = this.responseText;
    }
  }; 
  xhttp.open("GET", "/sidebar/user-visitor.html",true);
  xhttp.send();
}

//changing header when sidebar link is clicked

