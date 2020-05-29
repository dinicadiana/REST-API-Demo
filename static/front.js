const BaseAPIPath = 'http://localhost:3000/rest';
const ContactAPIPath = "/contact";

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

		let fullAPIPath = BaseAPIPath + ContactAPIPath + "/" + (row.rowIndex).toString();
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
			response.json().then(data => { populatePage(data); });
			if (response.ok) {
				// the status code is 200
				alert("Exam selected!");
			} else {
				alert("Error: couldn't select exam.");
			}
		});

		return false;
	};
}

function populatePage(exam) {
	console.log(exam);

	document.getElementById("examId").innerHTML = exam.data.id;
	document.getElementById("subject_edit").placeholder = exam.data.subject;
	document.getElementById("comments_edit").placeholder = exam.data.comments;
	document.getElementById("group_edit").placeholder = exam.data.group;
	document.getElementById("date_edit").placeholder = exam.data.date;
	document.getElementById("time_edit").placeholder = exam.data.time;
}

function addTableRow(exam, i) {
	let itemsTable = document.getElementById("examList");
	
	let newRow = itemsTable.insertRow(i+1);
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
	let examId = document.getElementById("examId").innerHTML;
	let fullAPIPath = BaseAPIPath + ContactAPIPath + examId.toString();
	let httpPromise = fetch(fullAPIPath, {
		method: 'DELETE'
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

function updateExam(event) {
	event.preventDefault();

	// in this object we keep the data that will be sent to backend
	let data = {};

	let examId = document.getElementById("examId").innerHTML;
	// get values from formular
	data['subject'] = document.getElementById("subject_edit").value;
	data['group'] = document.getElementById("group_edit").value;
	data['date'] = document.getElementById("date_edit").value;
	data['time'] = document.getElementById("time_edit").value;
	data['comments'] = document.getElementById("comments_edit").value;

	console.log(JSON.stringify(data));

	let fullAPIPath = BaseAPIPath + ContactAPIPath + "/" + examId.toString();
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
  		} else {
  			alert("Error: couldn't modify exam.");
		}
	});
	return false;
}
