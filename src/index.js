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
  getDocs,
  collectionGroup,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

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
const secColRef = collection(db, "security");
const accColRef = collection(db, "account-information");
const logsColRef = collection(db, "logs");
// for storage

//queries
const secQuery = query(secColRef, orderBy("createdAt"));
const accQuery = query(accColRef, orderBy("createdAt"));
// Side bar links
const loadSec = document.querySelector("#secLink");
const loadFaculty = document.querySelector("#resiLink");
const loadLogs = document.querySelector("#logsLink");

// dashboard scripts
const userCount = document.querySelector("#userCount");

//AJAX START FOR SECURITY
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
      let uploaBtn = document.querySelector("#uploaBtn");
      uploaBtn.addEventListener("click", () => {
        const storage = getStorage();
        const storageRef = ref(storage, "sample-Pic");

        var file = document.querySelector("#imgInput").files[0];
        var name = file.name;
        var metadata = {
          contentType: file.type,
        };
        // var uploadTask = storageRef.child(name).put(file, metadata);
        // uploadTask
        //   .then((snapshot) => snapshot.ref.getDownloadURL())
        //   .then((url) => {
        //     console.log(url);
        //   });

        // console.log(name);

        uploadBytes(storageRef, file).then((snapshot) => {
          console.log("UPLOADED");
        });
      });

      const addSecurity = document.querySelector("#addSecForm");
      addSecurity.addEventListener("submit", (e) => {
        e.preventDefault();
        addDoc(secColRef, {
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
        // updateDiv();
      }); //end adding data

      //creating the table data
      let id;
      const sectable = document.querySelector(".table-body");

      // var t = $("table.display").DataTable({
      //   dom: "Bfrtip",
      //   buttons: ["copy", "csv", "excel", "pdf", "print"],
      // });

      const renderSecurity = (docu) => {
        console.log(docu.id);

        // var temp = t.row
        //   .add([
        //     docu.id,
        //     `${docu.data().firstname} ${docu.data().middlename} ${docu.data().lastname}`,
        //     docu.data().position,
        //     `${docu.data().barangay}, ${docu.data().street}, ${docu.data().municipality}, ${docu.data().province}`,
        //     docu.data().email,
        //     docu.data().phone,
        //     `
        //     <div class="drop-container">
        //       <button class="drop-btn">ACTIONS
        //       <iconify-icon icon="bxs:down-arrow" style="color: black;" width="12" height="12"></iconify-icon>
        //       </button>
        //       <div class="drop-content" id="dropSec">

        //         <a href="#viewSec" rel="modal:open" class="view-button"><iconify-icon
        //         class="view-icon"
        //         icon="bi:eye-fill"
        //         style="color: black"
        //         width="16"
        //         height="16"
        //       ></iconify-icon> View Details</a>

        //           <a href="#editmodal" rel="modal:open" class = 'edit-button'>
        //           <iconify-icon
        //           class="view-icon"
        //           icon="bxs:user-circle" style="color: black;" width="16" height="16"></iconify-icon>
        //           Edit User Info</a>

        //         <a href="#editAccInfo" rel="modal:open" class = "editSecAccBtn">
        //         <iconify-icon
        //           class="view-icon"
        //           icon="fa6-solid:key" style="color: black;" width="16" height="16"></iconify-icon>
        //         Edit Account</a>

        //           <a href="#" class="delete-button">
        //           <iconify-icon
        //             class="view-icon"
        //             icon="ep:delete-filled"
        //             style="color: black"
        //             width="16"
        //             height="16"
        //           ></iconify-icon>
        //           Delete User</a>

        //       </div>
        //     </div>
        //   `,
        //   ])
        //   .draw(false)
        //   .node();
        // $(temp).attr("data-id", `${docu.id}`);

        const tr = `<tr data-id='${docu.id}'>
          <td>${docu.id}</td>
          <td>${docu.data().firstname} ${docu.data().middlename} ${docu.data().lastname}</td>
          <td>${docu.data().position}</td>
          <td>${docu.data().barangay}, ${docu.data().street}, ${docu.data().municipality}, ${docu.data().province}</td>
          <td>${docu.data().email}</td>
          <td>${docu.data().phone}</td>
          <td>
          <div class="drop-container">
            <button class="drop-btn">ACTIONS
            <iconify-icon icon="bxs:down-arrow" style="color: black;" width="12" height="12"></iconify-icon>
            </button>
            <div class="drop-content" id="dropSec">

              <a href="#viewSec" rel="modal:open" class="view-button"><iconify-icon
              class="view-icon"
              icon="bi:eye-fill"
              style="color: black"
              width="16"
              height="16"
            ></iconify-icon> View Details</a>

                <a href="#editmodal" rel="modal:open" class = 'edit-button'>
                <iconify-icon
                class="view-icon"
                icon="bxs:user-circle" style="color: black;" width="16" height="16"></iconify-icon>
                Edit User Info</a>

              <a href="#editAccInfo" rel="modal:open" class = "editSecAccBtn">
              <iconify-icon
                class="view-icon"
                icon="fa6-solid:key" style="color: black;" width="16" height="16"></iconify-icon>
              Edit Account</a>

                <a href="#" class="delete-button">
                <iconify-icon
                  class="view-icon"
                  icon="ep:delete-filled"
                  style="color: black"
                  width="16"
                  height="16"
                ></iconify-icon>
                Delete User</a>

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

        //editing data -- edit useer information only
        const editSecForm = document.querySelector("#editSecForm");
        const editSecBtn = document.querySelector(`[data-id='${docu.id}'] .edit-button`);

        editSecBtn.addEventListener("click", () => {
          id = docu.id;
          editSecForm.secBrgy.value = docu.data().barangay;
          editSecForm.position.value = docu.data().position;
          // editSecForm.secEmail.value = docu.data().email;
          editSecForm.secFname.value = docu.data().firstname;
          editSecForm.secLname.value = docu.data().lastname;
          editSecForm.secMname.value = docu.data().middlename;
          editSecForm.secMunicip.value = docu.data().municipality;
          // editSecForm.secPassword.value = docu.data().password;
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
            // email: editSecForm.secEmail.value,
            phone: editSecForm.secPhone.value,
            province: editSecForm.secProvince.value,
            street: editSecForm.secStreet.value,
            municipality: editSecForm.secMunicip.value,
            barangay: editSecForm.secBrgy.value,
            // password: editSecForm.secPassword.value,
          }).then(() => {});
        });

        let dropSec = document.querySelector(`[data-id='${docu.id}'] .drop-btn`);
        let dropSecContent = document.querySelector(`[data-id='${docu.id}'] #dropSec`);
        dropSec.addEventListener("click", () => {
          dropSecContent.classList.toggle("show");
        });
        //dropdown - if user clicks outside of the dropdown
        window.onclick = function (event) {
          if (!event.target.matches(".drop-btn")) {
            var dropdowns = document.getElementsByClassName("drop-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
              var openDropdown = dropdowns[i];
              if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
              }
            }
          }
        };

        // Edit Account -- email and password
        const editSecAccInfo = document.querySelector("#editSecAccForm");
        const editSeccAccBtn = document.querySelector(`[data-id='${docu.id}'] .editSecAccBtn`);
        const emailBox = document.querySelector(".email-box");
        const passBox = document.querySelector(".password-box");

        // script for edit account modal
        const changeEmailBtn = document.querySelector(".change-email-button");
        const changePassBtn = document.querySelector(".change-password-button");
        changeEmailBtn.addEventListener("click", () => {
          passBox.classList.add("hide-change");
          emailBox.classList.remove("hide-change");
          changePassBtn.classList.remove("title-bg");
          changeEmailBtn.classList.add("title-bg");
        });
        changePassBtn.addEventListener("click", () => {
          passBox.classList.remove("hide-change");
          emailBox.classList.add("hide-change");
          changePassBtn.classList.add("title-bg");
          changeEmailBtn.classList.remove("title-bg");
        });

        // end script

        editSeccAccBtn.addEventListener("click", () => {
          passBox.classList.add("hide-change");
          changeEmailBtn.classList.add("title-bg");
          editSecAccInfo.secEmail.value = docu.data().email;
          editSecAccInfo.secPassword.value = docu.data().password;
        });
        //for updating edit
        editSecAccInfo.addEventListener("submit", (e) => {
          e.preventDefault();
          const docRef2 = doc(db, "security", id);
          updateDoc(docRef2, {
            email: editSecAccInfo.secEmail.value,
            password: editSecAccInfo.secPassword.value,
          }).then(() => {});
        });

        //viewing the security information
        const viewName = document.querySelector(".viewName");
        const viewPos = document.querySelector(".viewPos");
        const viewAddress = document.querySelector(".viewAddress");
        const viewPhone = document.querySelector(".viewPhone");
        const viewEmail = document.querySelector(".viewEmail");
        const viewButton = document.querySelector(`[data-id='${docu.id}'] .view-button`);
        const fullName = `${docu.data().firstname} ${docu.data().middlename} ${docu.data().lastname}`;
        const fullAddress = `${docu.data().barangay}, ${docu.data().street}, ${docu.data().municipality}, ${
          docu.data().province
        }`;

        viewButton.addEventListener("click", () => {
          viewName.textContent = fullName;
          viewPos.textContent = docu.data().position;
          viewAddress.textContent = fullAddress;
          viewPhone.textContent = docu.data().phone;
          viewEmail.textContent = docu.data().email;
        });
        //end view

        // end edit account email and password
      }; //end of render sec

      //getting the collection data
      //real time collection of data
      onSnapshot(secQuery, (snapshot) => {
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
  xhttp.open("GET", "../sidebar/user-security.html", true);
  xhttp.send();
});
//AJAX END FOR SECURITY

//AJAX START FOR FACULTY
loadFaculty.addEventListener("click", () => {
  headerTitle.textContent = "Users";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = this.responseText;
      secLink.classList.remove("active");
      persLink.classList.remove("active");
      resiLink.classList.add("active");
      visiLink.classList.remove("active");
      // generateTable();

      // rendering the data
      const facultyTbody = document.querySelector(".facultyTbody");
      var t = $("table.display").DataTable({
        dom: "Bfrtip",
        buttons: ["copy", "csv", "excel", "pdf", "print"],
      });

      const renderFaculty = (doc) => {
        var temp = t.row
          .add([
            doc.id,
            `${doc.data().first_name} ${doc.data().last_name}`,
            doc.data().id_number,
            doc.data().is_active,
            doc.data().phone_num,
            `<div class="actions-button">
            <div class="view-btn">
              <iconify-icon
                class="view-icon"
                icon="bi:eye-fill"
                style="color: black"
                width="16"
                height="16"
              ></iconify-icon>
              <div>View</div>
            </div>
            <div class="delete-btn">
              <iconify-icon
                class="view-icon"
                icon="ep:delete-filled"
                style="color: white"
                width="16"
                height="16"
              ></iconify-icon>
              <div>Delete</div>
            </div>
          </div>`,
          ])
          .draw(false)
          .node();
        $(temp).attr("data-id", `${doc.id}`);
        // const tr = `
        // <tr>
        //         <td>${doc.id}</td>
        //         <td>${doc.data().first_name}</td>
        //         <td>0001</td>
        //         <td>email@email.com</td>
        //         <td>0923737392</td>
        //         <td>
        //           <div class="actions-button">
        //             <div class="view-btn">
        //               <iconify-icon
        //                 class="view-icon"
        //                 icon="bi:eye-fill"
        //                 style="color: black"
        //                 width="16"
        //                 height="16"
        //               ></iconify-icon>
        //               <div>View</div>
        //             </div>
        //             <div class="delete-btn">
        //               <iconify-icon
        //                 class="view-icon"
        //                 icon="ep:delete-filled"
        //                 style="color: white"
        //                 width="16"
        //                 height="16"
        //               ></iconify-icon>
        //               <div>Delete</div>
        //             </div>
        //           </div>
        //         </td>
        //       </tr>`;
        // facultyTbody.insertAdjacentHTML("beforeend", tr);
      }; //end of render sec

      //getting the data
      // getDocs(accColRef).then((snapshot) => {
      //   let accs = [];
      //   snapshot.docs.forEach((doc) => {
      //     renderFaculty(doc);
      //     accs.push({ ...doc.data(), id: doc.id });
      //   });
      //   console.log(accs);
      // });
      // end getting data

      onSnapshot(accQuery, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let accs = [];
          if (change.type === "added") {
            renderFaculty(change.doc);
            accs.push({ ...change.doc.data(), id: change.doc.id });
          }
        });
      });
    } //end if ready state
  };
  xhttp.open("GET", "../sidebar/user-resident.html", true);
  xhttp.send();
});
//AJAX END FOR FACULTY

// AJAX FOR LOGS
loadLogs.addEventListener("click", () => {
  headerTitle.textContent = "Logs";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = this.responseText;
      secLink.classList.remove("active");
      persLink.classList.remove("active");
      resiLink.classList.remove("active");
      visiLink.classList.add("active");

      dropdownContent.style.display = "none";
      dropDown.classList.remove("active");
      vehiLink.classList.remove("active");
      logLink.classList.add("active");
      annoLink.classList.remove("active");
      var t = $("table.display").DataTable({
        dom: "Bfrtip",
        buttons: ["copy", "csv", "excel", "pdf", "print"],

        createdRow: function (row, data, dataIndex) {
          // Set the data-status attribute, and add a class
          $(row).attr("data-id", `${doc.id}`);
        },
      });
      //  getting the data
      getDocs(logsColRef).then((snapshot) => {
        let accs = [];
        snapshot.docs.forEach((doc) => {
          accs.push({ data: doc.data(), id: doc.id });
        });
        console.log(accs);
        console.log();
      });

      // end getting data
    } //end if ready state
  };
  xhttp.open("GET", "../sidebar/logs.html", true);
  xhttp.send();
});

// AJAX END FOR LOGS
