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
  orderBy,
  serverTimestamp,
  getDoc,
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

//queries
const q = query(colRef, orderBy("createdAt"));

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
      //adding data
      //adding security calling the form, calling the addDoc function from firebase
      const addSecurity = document.querySelector("#addSecForm");
      addSecurity.addEventListener("submit", (e) => {
        e.preventDefault();
        addDoc(colRef, {
          barangay: addSecurity.secBrgy.value,
          position: addSecurity.position.value,
          email: addSecurity.secEmail.value,
          firstname: addSecurity.secFname.value,
          lastname: addSecurity.secLname.value,
          middlename: addSecurity.secMname.value,
          municipality: addSecurity.secMunicip.value,
          password: addSecurity.secPassword.value,
          phone: addSecurity.secPhone.value,
          province: addSecurity.secProvince.value,
          street: addSecurity.secStreet.value,
          createdAt: serverTimestamp(),
        }).then(() => {
          addSecurity.reset();
        });
      }); //end adding data

      //creating the table data

      const sectable = document.querySelector(".eminem");
      const renderSecurity = (docu) => {
        console.log(docu.id);

        const tr = `<tr data-id='${docu.id}'>
          <td>${docu.data().firstname} ${docu.data().lastname}</td>
          <td>${docu.data().position}</td>
          <td>${docu.data().barangay}, ${docu.data().street}, ${docu.data().municipality}, ${docu.data().province}</td>
          <td>${docu.data().email}</td>
          <td>${docu.data().phone}</td>
          <td>
            <a href="#editmodal" rel="modal:open"><button>Edit</button></a>
            <button class="secDelete">Delete</button>
          </td>
        </tr>`;
        sectable.insertAdjacentHTML("beforeend", tr);
        //deleting data
        const secDelete = document.querySelector(`[data-id='${docu.id}'] .secDelete`);
        secDelete.addEventListener("click", () => {
          const docRef = doc(db, "security", docu.id);
          deleteDoc(docRef).then(() => {
            console.log("deleted successfully");
          });
        });
      }; //end of render sec

      //getting the collection data
      //real time collection of data
      onSnapshot(q, (snapshot) => {
        let security = [];
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            renderSecurity(change.doc);
          }
          if (change.type === "removed") {
            let row = document.querySelector(`[data-id="${change.doc.id}"]`);
            // let tbody = row.parentElement;
            sectable.removeChild(row);
          }
          security.push({ ...change.doc.data(), id: change.doc.id });
        });
        console.log(security);
      });
    } //end if ready state
  };
  xhttp.open("GET", "/sidebar/user-security.html", true);
  xhttp.send();
});
