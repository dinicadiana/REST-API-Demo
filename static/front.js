const BaseAPIPath = 'http://localhost:3000/rest';
const ContactAPIPath = "/contact";

let selectedRow = -1;

function processForm(event) {

	event.preventDefault();

	// in this object we keep the data that will be sent to backend
	let data = {};

	// get values from formular
	data['subject'] = document.getElementById("subject").value;
	data['group'] = document.getElementById("group").value;
	data['date'] = document.getElementById("date").value;
	data['time'] = document.getElementById("time").value;
	data['comments'] = document.getElementById("comments").value;

	console.log(JSON.stringify(data));

	let fullAPIPath = BaseAPIPath + ContactAPIPath;
	let httpPromise = fetch(fullAPIPath, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	});

	httpPromise.then(function(response) {
    	// log the response from backend for debugging
		console.log(response);
  		// show a simple alert
  		if (response.ok) {
  			// the status code is 200
  			alert("Exam successfully added!");
  			addTableRow(data, 0);

  		} else {
  			alert("Error: couldn't add exam.");
		}
	});
	return false;
}

function getItems () {

	let fullAPIPath = BaseAPIPath + ContactAPIPath;
	let httpPromise = fetch(fullAPIPath, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	});

	httpPromise.then(function(response) {
		// log the response from backend for debugging
		console.log(response);

		// handle the response from backend
		response.json().then(data => { populateTable(data); });
		if (response.ok) {
  			// the status code is 200
  			alert("Exams successfully read!");
  		} else {
  			alert("Error: couldn't get exams.");
  		}
	});
	
	return false;
}

function selectRow(row) {
	return function() {
		let itemsTable = document.getElementById("examList");
		if (!(selectedRow === -1)) {
			itemsTable.rows[selectedRow].style.backgroundColor = "white";
		}

		selectedRow = row.rowIndex;
		itemsTable.rows[selectedRow].style.backgroundColor = "red";
	};
}

function addTableRow(exam, i) {
	let itemsTable = document.getElementById("examList");
	
	let newRow = itemsTable.insertRow(i+1);
	newRow.style.backgroundColor = "white";
	newRow.onclick = selectRow(newRow);
	let item1 = newRow.insertCell(0);
	let item2 = newRow.insertCell(1);
	let item3 = newRow.insertCell(2);
	let item4 = newRow.insertCell(3);
	let item5 = newRow.insertCell(4);

	item1.innerHTML = exam.subject;
	item2.innerHTML = exam.group;
	item3.innerHTML = exam.date;
	item4.innerHTML = exam.time;
	item5.innerHTML = exam.comments;
}

function populateTable(exams) {
	console.log(exams);

	for (let i=0; i < exams.length; i++) {
		
		addTableRow(exams[i], i);
	}
}

function deleteItem() {
	let fullAPIPath = BaseAPIPath + ContactAPIPath + "/" + selectedRow.toString();
	let itemsTable = document.getElementById("examList");
	
	if (selectedRow === -1) {
		alert("Pick a row first!");
		return false;
	}

	let httpPromise = fetch(fullAPIPath, {
		method: 'DELETE'
	});

	
	httpPromise.then(function(response) {
		// log the response from backend for debugging
		console.log(response);

		// handle the response from backend
		if (response.ok) {
  			// the status code is 200
  			alert("Exams successfully deleted!");
  			if (!(selectedRow === -1)) {
  				itemsTable.deleteRow(selectedRow);
  				selectedRow = -1;
  			}
  		} else {
  			alert("Error: couldn't get exams.");
  		}
	});
	
	return false;
}

function updateExam() {
	// in this object we keep the data that will be sent to backend
	let data = {};
	let itemsTable = document.getElementById("examList");

	// get values from formular
	data['subject'] = document.getElementById("subject").value;
	data['group'] = document.getElementById("group").value;
	data['date'] = document.getElementById("date").value;
	data['time'] = document.getElementById("time").value;
	data['comments'] = document.getElementById("comments").value;

	console.log(JSON.stringify(data));

	if (selectedRow === -1) {
		alert("Pick a row first!");
		return false;
	}

	let fullAPIPath = BaseAPIPath + ContactAPIPath + "/" + selectedRow.toString();
	let httpPromise = fetch(fullAPIPath, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	});

	httpPromise.then(function(response) {
    	// log the response from backend for debugging
		console.log(response);
  		// show a simple alert
  		if (response.ok) {
  			// the status code is 200
  			alert("Exam successfully modified!");
  			itemsTable.rows[selectedRow].style.backgroundColor = "white";
  			itemsTable.rows[selectedRow].cells[0].innerHTML = data.subject;
  			itemsTable.rows[selectedRow].cells[1].innerHTML = data.group;
  			itemsTable.rows[selectedRow].cells[2].innerHTML = data.date;
  			itemsTable.rows[selectedRow].cells[3].innerHTML = data.time;
  			itemsTable.rows[selectedRow].cells[4].innerHTML = data.comments;
  			selectedRow = -1;
  		} else {
  			alert("Error: couldn't modify exam.");
		}
	});
	return false;
}
