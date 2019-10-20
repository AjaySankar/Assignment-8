/*eslint-env browser*/

var employeeData = [
  [
     "0",
     "ABC",
     "abc",
     '123'
  ],
  [
     "1",
     "DEF",
     "def",
     '456'
  ],
  [
     "2",
     "GHI",
     "ghi",
     '789'
  ],
  [
     "3",
     "JKL",
     "jkl",
     '145'    
  ],
  [
     "4",
     "MNO",
     "mno",
     '284'
  ]
]


function loadEmployeeData() {
  var table = document.getElementById('employee_table');
  var header = table.firstElementChild.firstElementChild;
  var rows = employeeData.map(function(emp) {
    var id = emp[0] || '';
    var name = emp[1] || '';
    var title = emp[2] || '';
    var extension = emp[3] || '';
    return `<tr id = ${id}> <td> ${name} </td> <td> ${title} </td> <td> ${extension} </td> <td> <input type=\"button\" value=\"Delete\"> </td> </tr>`;
  });
  table.innerHTML = header.innerHTML + rows.join('');
  attachDeleteEvents();
  document.getElementById('count').innerText = rows.length;
}

function deleteEmployee(event) {
  var employee_id = event.target.parentNode.parentNode.getAttribute("id") || '';
  if(!employee_id.length)
    return;
  var emp_index = -1;
  employeeData.forEach(function(emp, index) {
    if(emp[0] === employee_id) {
      emp_index = index;
    }
  });
  if(emp_index == -1) {
    window.alert("Employee id not found in the list");
    return;
  }
  employeeData.splice(emp_index,1);
  loadEmployeeData();
}

function attachDeleteEvents() {
  var deleteButtons = document.querySelectorAll('#employee_table tbody tr td input[type=button]') || [];
  deleteButtons.forEach(function (ele) {
    ele.addEventListener('click', deleteEmployee)
  });
}

function $(id) {
  return document.getElementById(id);
}

function isVaild(ele) {
  var id = ele.id || '';
  var val = ele.value || '';
  var sts = {
    'isValid': true,
    'errorMsg': ''
  }
  if(id === 'name' || id === 'title') {
    if(!val.length) {
      sts['isValid'] = false;
      sts['errorMsg'] = `Empty ${id}!!`
    }
  }
  else if(id === 'extension') {
    var ext = Number(val);
    if(isNaN(ext) || ext < 0) {
      sts['isValid'] = false;
      sts['errorMsg'] = `Invalid ext!!`
    }
  }
  return sts;
}

function addEmployee() {
  var inputFields = [$('name'), $('title'), $('extension')];
  var isValidData = true;
  inputFields.forEach(function(ele) {
    var id = ele.id || '';
    if(id.length) {
      var sts = isVaild(ele);
      isValidData = isValidData && sts['isValid'];
      span = document.getElementById("myspan");
      //var error_txt = document.createTextNode(sts['errorMsg']);
      ele.nextElementSibling.innerText = sts['errorMsg']; //appendChild(error_txt);
    }
  });
  if(!isValidData)
    return;
  var emp_id = String(Math.round(Math.random() * Math.pow(10,10)));
  var newEmployee = [];
  newEmployee.push(emp_id);
  inputFields.forEach(function(ele){
    newEmployee.push(ele.value);
    ele.value = '';
  });
  employeeData.push(newEmployee);
  loadEmployeeData();
}

function init() {
  loadEmployeeData();
  document.getElementById('add').addEventListener('click', addEmployee);
}

window.addEventListener('load', init);