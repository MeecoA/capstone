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
  updateDoc,
} from "firebase/firestore";

//this config connects the backend and frontend
//after this, intall firebase in node.js
const firebaseConfig = {
  apiKey: "AIzaSyBFzmDkFR_ZIi5aSc1ATfXykOcowRTx8oA",
  authDomain: "bulsu---pms.firebaseapp.com",
  projectId: "bulsu---pms",
  storageBucket: "bulsu---pms.appspot.com",
  messagingSenderId: "36091561292",
  appId: "1:36091561292:web:85d41dea4e7c7b80f8fbe9",
};
// const firebaseConfig = {
//   apiKey: "AIzaSyBY3hnXsQuXX_RIJ0VZSWbIYFmOxYe94SQ",
//   authDomain: "sample-capstone-project-ba941.firebaseapp.com",
//   projectId: "sample-capstone-project-ba941",
//   storageBucket: "sample-capstone-project-ba941.appspot.com",
//   messagingSenderId: "619482030443",
//   appId: "1:619482030443:web:f0d4435fed137c16902c2e",
//   measurementId: "G-VNRXHHQSRB",
// };

//for initializing app
initializeApp(firebaseConfig);

// initializing services
const db = getFirestore();

//collection reference
const colRef = collection(db, "security");

//queries
const q = query(colRef, orderBy("createdAt"));

const loadSec = document.querySelector("#secLink");
let id;
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
      let id;
      const sectable = document.querySelector(".eminem");
      const renderSecurity = (docu) => {
        console.log(docu.id);

        const tr = `<tr data-id='${docu.id}'>
          <td>${docu.id}</td>
          <td>${docu.data().firstname} ${docu.data().lastname}</td>
          <td>${docu.data().position}</td>
          <td>${docu.data().barangay}, ${docu.data().street}, ${docu.data().municipality}, ${docu.data().province}</td>
          <td>${docu.data().email}</td>
          <td>${docu.data().phone}</td>
          <td>
            <div class = "actions-button">
            <div class="view-button td-btn">
            <iconify-icon
            class="view-icon"
            icon="ci:edit" style="color: black;" width="16" height="16"></iconify-icon>
            <a href="#editmodal" rel="modal:open">Edit</a></div>
            <div class="delete-button">
            <iconify-icon
              class="view-icon"
              icon="ep:delete-filled"
              style="color: white"
              width="16"
              height="16"
            ></iconify-icon>
            <div>Delete</div>
          </div>
            </div>
          </td>
        </tr>`;
        sectable.insertAdjacentHTML("beforeend", tr);
        //deleting data
        const secDelete = document.querySelector(`[data-id='${docu.id}'] .delete-button`);
        secDelete.addEventListener("click", () => {
          const docRef = doc(db, "security", docu.id);
          deleteDoc(docRef).then(() => {
            console.log("deleted successfully");
          });
        }); //end of deleting data

        //editing data
        const editSecForm = document.querySelector("#editSecForm");
        const editSecBtn = document.querySelector(`[data-id='${docu.id}'] .view-button`);

        editSecBtn.addEventListener("click", () => {
          id = docu.id;
          editSecForm.secBrgy.value = docu.data().barangay;
          editSecForm.position.value = docu.data().position;
          editSecForm.secEmail.value = docu.data().email;
          editSecForm.secFname.value = docu.data().firstname;
          editSecForm.secLname.value = docu.data().lastname;
          editSecForm.secMname.value = docu.data().middlename;
          editSecForm.secMunicip.value = docu.data().municipality;
          editSecForm.secPassword.value = docu.data().password;
          editSecForm.secPhone.value = docu.data().phone;
          editSecForm.secProvince.value = docu.data().province;
          editSecForm.secStreet.value = docu.data().street;
        });

        //for edit submit
        editSecForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const docRef = doc(db, "security", id);

          updateDoc(docRef, {
            firstname: editSecForm.secFname.value,
            middlename: editSecForm.secMname.value,
            lastname: editSecForm.secLname.value,
            position: editSecForm.position.value,
            email: editSecForm.secEmail.value,
            phone: editSecForm.secPhone.value,
            province: editSecForm.secProvince.value,
            street: editSecForm.secStreet.value,
            municipality: editSecForm.secMunicip.value,
            barangay: editSecForm.secBrgy.value,
          }).then(() => {});
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
          if (change.type === "modified") {
            let row = document.querySelector(`[data-id="${change.doc.id}"]`);
            sectable.removeChild(row);
            renderSecurity(change.doc);
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
