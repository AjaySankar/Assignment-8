/*eslint-env browser*/

var employeeData = {
  1: {
    "name": "ABC",
    "title": "abc",
    "extension": '123'
  },
  2: {
    "name": "DEF",
    "title": "def",
    "extension": '456'
  },
  3: {
    "name": "GHI",
    "title": "ghi",
    "extension": '789'
  },
  4: {
    "name": "JKL",
    "title": "jkl",
    "extension": '145'    
  },
  5: {
    "name": "MNO",
    "title": "mno",
    "extension": '284'
  }
}


function loadEmployeeData() {
  var table = document.getElementById('employee_table');
  var header = table.firstElementChild.firstElementChild;
  var rows = Object.keys(employeeData).map(function(id) {
    var name = employeeData[id].name || '';
    var title = employeeData[id].title || '';
    var extension = employeeData[id].extension || '';
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
  delete employeeData[employee_id];
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
  var emp_id = Math.round(Math.random() * Math.pow(10,10));
  var newEmployee = {};
  inputFields.forEach(function(ele){
    newEmployee[ele.id] = ele.value;
    ele.value = '';
  });
  employeeData[emp_id] = newEmployee;
  loadEmployeeData();
}

function init() {
  loadEmployeeData();
  document.getElementById('add').addEventListener('click', addEmployee);
}

window.addEventListener('load', init);