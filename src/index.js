import { initializeApp } from "firebase/app";
import {
  //importing different products of firebase
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

//this config connects the backend and frontend
//after this, intall firebase in node.js
const firebaseConfig = {
  apiKey: "AIzaSyBY3hnXsQuXX_RIJ0VZSWbIYFmOxYe94SQ",
  authDomain: "sample-capstone-project-ba941.firebaseapp.com",
  projectId: "sample-capstone-project-ba941",
  storageBucket: "sample-capstone-project-ba941.appspot.com",
  messagingSenderId: "619482030443",
  appId: "1:619482030443:web:f0d4435fed137c16902c2e",
  measurementId: "G-VNRXHHQSRB",
};

//for initializing app
initializeApp(firebaseConfig);

// initializing services
const db = getFirestore();

//collection reference
const colRef = collection(db, "security");

const loadSec = document.querySelector("#secLink");
//AJAX
loadSec.addEventListener("click", () => {
  headerTitle.textContent = "Users";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = this.responseText;
      secLink.classList.add("active");
      persLink.classList.remove("active");
      resiLink.classList.remove("active");
      visiLink.classList.remove("active");

      // var t = "";
      // $(document).ready(function () {
      //   t = $("table.display").DataTable({
      //     dom: "Bfrtip",
      //     buttons: ["copy", "csv", "excel", "pdf", "print"],
      //   });
      // });

      //adding data
      //adding security calling the form, calling the addDoc function from firebase
      const addSecurity = document.querySelector("#addSecForm");
      addSecurity.addEventListener("submit", (e) => {
        e.preventDefault();
        addDoc(colRef, {
          barangay: addSecurity.secBrgy.value,
          email: addSecurity.secEmail.value,
          firstname: addSecurity.secFname.value,
          lastname: addSecurity.secLname.value,
          middlename: addSecurity.secMname.value,
          municipality: addSecurity.secMunicip.value,
          password: addSecurity.secPassword.value,
          phone: addSecurity.secPhone.value,
          province: addSecurity.secProvince.value,
          street: addSecurity.secStreet.value,
        }).then(() => {
          addSecurity.reset();
        });
      }); //end adding security

      //adding data
      //creating the table data

      const sectable = document.querySelector("#sectable");
      const renderSecurity = (docu) => {
        console.log(docu.id);

        const tr = `<tr data-id='${docu.id}'>
          <td>${docu.data().firstname}</td>
          <td>${docu.data().street}</td>
          <td>${docu.data().email}</td>
          <td>${docu.data().phone}</td>
          <td>
            <button class="secEdit">Edit</button>
            <button class="secDelete">Delete</button>
          </td>
        </tr>`;
        sectable.insertAdjacentHTML("beforeend", tr);
        //deleting data
        const secDelete = document.querySelector(
          `[data-id='${docu.id}'] .secDelete`
        );
        secDelete.addEventListener("click", () => {
          const docRef = doc(db, "security", docu.id);
          deleteDoc(docRef).then(() => {
            console.log("deleted successfully");
          });
        });
      }; //end of render sec
      //getting the collection data

      // db.collection("users").onSnapshot((snapshot) => {
      //   snapshot.docChanges().forEach((change) => {
      //     console.log(change.type);
      //   });
      // });

      // const q = query(collection(db, "security"));

      // colRef.onSnapshot((snapshot) => {
      //   snapshot.docChanges().forEach((change) => {
      //     console.log(change.type);
      //   });
      // });

      onSnapshot(colRef, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            renderSecurity(change.doc);
          }
          if (change.type === "removed") {
            let row = document.querySelector(`[data-id="${change.doc.id}"]`);
            let tbody = row.parentElement;
            sectable.removeChild(tbody);
          }
        });
      });

      //deleting data
    } //end if
  };
  xhttp.open("GET", "/sidebar/user-security.html", true);
  xhttp.send();
});
