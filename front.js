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
  		} else {
  			alert("Error: couldn't add exam.");
		}
	});
	return false;
}

function getItems () {

	let fullAPIPath = BaseAPIPath + ContactAPIPath + "?page=1&perPage=20";
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

function populateTable(exams) {
	console.log(exams);

	let itemsTable = document.getElementById("examList");

	for (let i=0; i < exams.length; i++) {
		
		let newRow = itemsTable.insertRow(i+1);
		let item1 = newRow.insertCell(0);
		let item2 = newRow.insertCell(1);
		let item3 = newRow.insertCell(2);
		let item4 = newRow.insertCell(3);
		let item5 = newRow.insertCell(4);

		item1.innerHTML = exams[i].data.subject;
		item2.innerHTML = exams[i].data.group;
		item3.innerHTML = exams[i].data.date;
		item4.innerHTML = exams[i].data.time;
		item5.innerHTML = exams[i].data.comments;
	}
}
