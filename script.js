var studentData;
let fetchedData;
let url =
  "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json";
fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    studentData = data;
    fetchedData = JSON.parse(JSON.stringify(data));
    createTable(data);
  });

function createTable(data) {
  // Create a table element
  const table = document.createElement("table");

  // Create the table header row
  const headerRow = table.insertRow();

  var th = document.createElement("th");
  //id
  th.textContent = "Id";
  headerRow.appendChild(th);
  //Name
  var th = document.createElement("th");
  th.textContent = "Name";
  headerRow.appendChild(th);
  //Gender
  var th = document.createElement("th");
  th.textContent = "Gender";
  headerRow.appendChild(th);
  //class
  var th = document.createElement("th");
  th.textContent = "Class";
  headerRow.appendChild(th);
  //marks
  var th = document.createElement("th");
  th.textContent = "Marks";
  headerRow.appendChild(th);
  //passoing
  var th = document.createElement("th");
  th.textContent = "Passing";
  headerRow.appendChild(th);
  //email
  var th = document.createElement("th");
  th.textContent = "Email";
  headerRow.appendChild(th);

  // Create the table rows with data
  data.forEach((item) => {
    const row = table.insertRow();

    // add for Id column
    var td = document.createElement("td");
    td.textContent = item.id;
    row.appendChild(td);
    // add for Name column
    var td = document.createElement("td");
    td.style = `
        display: flex;
        align-items: center;
    `;
    var avatar = document.createElement("img");
    avatar.src = item.img_src;
    avatar.style = `
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: pink;
        margin-left: 5px;
        margin-right: 5px;
    `;
    td.appendChild(avatar);
    var p = document.createElement("p");
    p.textContent = item.first_name + " " + item.last_name;
    td.appendChild(p);
    row.appendChild(td);

    // add for Gender column
    var td = document.createElement("td");
    td.textContent = item.gender;
    row.appendChild(td);
    // add for Class column
    var td = document.createElement("td");
    td.textContent = item.class;
    row.appendChild(td);
    // add for Marks column
    var td = document.createElement("td");
    td.textContent = item.marks;
    row.appendChild(td);
    // add for Passing column
    var td = document.createElement("td");
    if(item.passing){
        td.textContent = "Passing";
    }else{
        td.textContent = "Failed";
    }
    
    row.appendChild(td);
    // add for Email column
    var td = document.createElement("td");
    td.textContent = item.email;
    row.appendChild(td);
  });

  // Append the table to the body of the document
  const tableSection = document.getElementById("table");
  tableSection.appendChild(table);
}

function sortTable(property, order = "az") {
  if (order == "az") {
    studentData.sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
  } else {
    studentData.sort((a, b) => {
      if (a[property] < b[property]) return 1;
      if (a[property] > b[property]) return -1;
      return 0;
    });
  }

  removeExistingAndCreateNew(studentData);
}
function removeExistingAndCreateNew(studentData) {
  // Remove the existing table
  const existingTables = document.querySelectorAll("table");
  existingTables.forEach((table) => table.remove());
  // Create and append the updated table
  createTable(studentData);
}

function sortData(property) {
  switch (property) {
    case "class":
      sortTable("class");
      break;
    case "full_name_az":
      studentData.sort((a, b) => {
        if (
          a["first_name"] + " " + a["last_name"] <
          b["first_name"] + " " + b["last_name"]
        )
          return -1;
        if (
          a["first_name"] + " " + a["last_name"] >
          b["first_name"] + " " + b["last_name"]
        )
          return 1;
        return 0;
      });
      removeExistingAndCreateNew(studentData);
      break;
    case "full_name_za":
      studentData.sort((a, b) => {
        if (
          a["first_name"] + " " + a["last_name"] <
          b["first_name"] + " " + b["last_name"]
        )
          return 1;
        if (
          a["first_name"] + " " + a["last_name"] >
          b["first_name"] + " " + b["last_name"]
        )
          return -1;
        return 0;
      });
      removeExistingAndCreateNew(studentData);
      break;
    case "marks":
      sortTable("marks");
      break;
    case "passing":
      studentData = studentData.filter((item) => item.passing);
      removeExistingAndCreateNew(studentData);
      break;
    case "gender":
      const ms = studentData.filter(
        (item) => item.gender.toLowerCase() == "male"
      );
      removeExistingAndCreateNew(ms);
      const fs = studentData.filter(
        (item) => item.gender.toLowerCase() == "female"
      );
      createTable(fs);
      break;
    default:
      studentData = JSON.parse(JSON.stringify(fetchedData));
      removeExistingAndCreateNew(fetchedData);
  }
}

function searchTable() {
  const searchInput = document.getElementById("searchInput");
  const searchText = searchInput.value.toLowerCase();

  const filteredData = studentData.filter(
    (item) =>
      item.first_name.toLowerCase().includes(searchText) ||
      item.last_name.toLowerCase().includes(searchText) ||
      item.email.toLowerCase().includes(searchText)
  );

  // Remove the existing table
  const existingTables = document.querySelectorAll("table");
  existingTables.forEach((table) => table.remove());
  //   if (existingTable) {
  //     existingTable.remove();
  //   }

  // Create and append the updated table with filtered data
  createTable(filteredData);
}
