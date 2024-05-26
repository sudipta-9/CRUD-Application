document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("form.html")) {
    initialPageLoad(); // Function to initialize the page
    handelList(); // Function to handle list-related operations
    setMaxDate(); // Set the max date for the DOB field
  }
});

function initialPageLoad() {
  const form = document.getElementById("my_student_form");
  if (form) form.addEventListener("submit", handelFormSubmit);
  else console.error("Form not found");
}

//for get all local storage data
function getItem() {
  return JSON.parse(localStorage.getItem("items")) ?? [];
}

function setMaxDate() {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("dob").setAttribute("max", today);
}

// Form Validation using regex
function validation() {
  const name = document.getElementById("name").value;
  const fname = document.getElementById("fname").value;
  const sname = document.getElementById("sname").value;
  const cname = document.getElementById("cname").value;
  const email = document.getElementById("email").value;
  const dob = document.getElementById("dob").value;
  const contact = document.getElementById("contact").value;

  let valid = true;

  // Regex Expression
  const namecheck = /^[a-zA-Z\s]+$/;
  const fnamecheck = /^[a-zA-Z\s]+$/;
  const snamecheck = /^[a-zA-Z\s]+$/;
  const cnamecheck = /^[a-zA-Z\s]+$/;
  const emailcheck = /[a-z0-9]{3,}@[a-z]{5,}[.]{1}[a-z]{3}/
  const contactcheck = /[6789]\d{9}$/;

  // Check whether the form in blank and user want to submit the blank form
  if (!namecheck.test(name)) {
    document.getElementById("nameError").innerHTML = "** Enter a valid name";
    valid = false;
  } else {
    document.getElementById("nameError").innerHTML = "";
  }

  if (!fnamecheck.test(fname)) {
    document.getElementById("fnameError").innerHTML = "** Enter a valid father's name";
    valid = false;
  } else {
    document.getElementById("fnameError").innerHTML = "";
  }

  if (!snamecheck.test(sname)) {
    document.getElementById("snameError").innerHTML = "** Enter a valid school name";
    valid = false;
  } else {
    document.getElementById("snameError").innerHTML = "";
  }

  if (!cnamecheck.test(cname)) {
    document.getElementById("cnameError").innerHTML = "** Enter a valid college name";
    valid = false;
  } else {
    document.getElementById("cnameError").innerHTML = "";
  }

  if (!emailcheck.test(email)) {
    document.getElementById("emailError").innerHTML = "** Enter a valid email";
    valid = false;
  } else {
    document.getElementById("emailError").innerHTML = "";
  }

  if (!dob) {
    document.getElementById("dobError").innerHTML = "** Enter a valid date of birth";
    valid = false;
  } else {
    const age = calculateAge(dob);
    if (age < 18 || age > 60) {
      document.getElementById("dobError").innerHTML = "** Age must be between 18 and 60";
      valid = false;
    } else {
      document.getElementById("dobError").innerHTML = "";
    }
  }

  if (!contactcheck.test(contact)) {
    document.getElementById("contactError").innerHTML = "** Enter a valid contact number";
    valid = false;
  } else {
    document.getElementById("contactError").innerHTML = "";
  }

  return valid;
}

// Check the whether the user want to submit symbols or any other things it will show the below message 
function nameValidation() {
  const name = document.getElementById("name").value;
  const namecheck = /^[a-zA-Z\s]+$/;
  if (!namecheck.test(name)) {
    document.getElementById("nameError").innerHTML = "Only characters allowed.";
    return false;
  } else {
    document.getElementById("nameError").innerHTML = "";
  }
}

// Check the whether the user want to submit symbols or any other things it will show the below message
function fnameValidation() {
  const fname = document.getElementById("fname").value;
  const fnamecheck = /^[a-zA-Z\s]+$/;
  if (!fnamecheck.test(fname)) {
    document.getElementById("fnameError").innerHTML = "Only characters allowed.";
    return false;
  } else {
    document.getElementById("fnameError").innerHTML = "";
  }
}

// Check the whether the user want to submit symbols or any other things it will show the below message
function snameValidation() {
  const sname = document.getElementById("sname").value;
  const snamecheck = /^[a-zA-Z\s]+$/;
  if (!snamecheck.test(sname)) {
    document.getElementById("snameError").innerHTML = "Only characters allowed.";
    return false;
  } else {
    document.getElementById("snameError").innerHTML = "";
  }
}

// Check the whether the user want to submit symbols or any other things it will show the below message
function cnameValidation() {
  const cname = document.getElementById("cname").value;
  const cnamecheck = /^[a-zA-Z\s]+$/;
  if (!cnamecheck.test(cname)) {
    document.getElementById("cnameError").innerHTML = "Only characters allowed.";
    return false;
  } else {
    document.getElementById("cnameError").innerHTML = "";
  }
}

// Check the whether the user want to submit symbols or any other things it will show the below message
function emailValidation() {
  const email = document.getElementById("email").value;
  const emailcheck = /[a-z0-9]{3,}@[a-z]{5,}[.]{1}[a-z]{3}/
  if (!emailcheck.test(email)) {
    document.getElementById("emailError").innerHTML = "Ex-xyz@gmail.com";
    return false;
  } else {
    document.getElementById("emailError").innerHTML = "";
  }
}

// Check the whether the user want to submit symbols or any other things it will show the below message
function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}              

// Check the whether the user want to submit symbols or any other things it will show the below message
function contactValidation() {
  const contact = document.getElementById("contact").value;
  const contactcheck = /[6789]\d{9}$/;
  if (!contactcheck.test(contact)) {
    document.getElementById("contactError").innerHTML = "Only numbers are allowed.";
    return false;
  } else {
    document.getElementById("contactError").innerHTML = "";
  }
}

// Form from submit
function handelFormSubmit(e) {
  e.preventDefault();
  if (!validation()) return;

  const name = document.getElementById("name").value;
  const fname = document.getElementById("fname").value;
  const sname = document.getElementById("sname").value;
  const cname = document.getElementById("cname").value;
  const email = document.getElementById("email").value;
  const dob = document.getElementById("dob").value;
  const contact = document.getElementById("contact").value;
  const editId = document.getElementById("editId").value;

  const formData = { name, fname, sname, cname, email, dob, contact };

  if (editId) {
    updateItem(editId, formData);
    document.getElementById("submitButton").value = "Submit";
  } else {
    addItem(formData);
  }

  document.getElementById("my_student_form").reset();
  document.getElementById("editId").value = "";
}

// Add items to the localstorage
function addItem(item) {
  const items = JSON.parse(localStorage.getItem("items")) ?? [];
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
  handelList();
}

//Form showing local storage data in a list
function handelList() {
  const itemList = document.getElementById("student_list");
  const items = getItem();
  itemList.innerHTML = "";
  if (items.length === 0)
    itemList.innerHTML = ` 
    <tr> 
        <td colspan="9" class="text-center">No Data found! </td>
    </tr>`;
  items.forEach((item, index) => {
    itemList.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.fname}</td>
            <td>${item.sname}</td>
            <td>${item.cname}</td>
            <td>${item.email}</td>
            <td>${item.dob}</td>
            <td>${item.contact}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="editItem(${index})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteItem(${index})">Delete</button>
            </td>
        </tr>
    `;
  });
}

// Edit the records from localhost and also edit dynamically
function editItem(index) {
  if (confirm('Do you want to edit your record?')) { // Ask whether you want to edit the record
  const editId = document.getElementById("editId"); // If press ok then execute this block
  editId.setAttribute("value", index);

  const items = getItem();
  const item = items[index];

  document.getElementById("name").value = item.name;
  document.getElementById("fname").value = item.fname;
  document.getElementById("sname").value = item.sname;
  document.getElementById("cname").value = item.cname;
  document.getElementById("email").value = item.email;
  document.getElementById("dob").value = item.dob;
  document.getElementById("contact").value = item.contact;

  document.getElementById("submitButton").value = "Update";
  } else { // If press cancle then execute this block
  alert("Record not edited");
  }
}

// Update the records from localhost and also update dynamically
function updateItem(id, data) {
  if (confirm('Do you want to update your record?')) { // Ask whether you want to update the record
    const items = getItem(); // If press ok then execute this block
    items[id] = data;
    localStorage.setItem("items", JSON.stringify(items));
    handelList();
  } else { // If press cancle then execute this block
  alert("Record not updated");
  }
}

// Delete the records from localhost and also delete dynamically
function deleteItem(index) {
  if (confirm('Do you want to delete your record?')) { // Ask whether you want to delete the record
    const items = getItem(); // If press ok then execute this block
    items.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(items));
    handelList();
  } else { // If press cancle then execute this block
    console.log('Record not deleted');
  }
}
