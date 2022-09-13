'use strict';

const lightSwitch = document.querySelector('.light-switch');

let lightStatus = localStorage.getItem("lightStatus");

if (lightStatus) {
	document.body.className = lightStatus;
}

lightSwitch.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

	const className = document.body.className;
	if (className == "light-theme"){
		this.textContent = "Dark";
		console.log(this);
	} else {
		this.textContent = "Light";	
	}

	localStorage.setItem("lightStatus", className);
});




if (document.getElementById("count")) {
	const countHeader = document.getElementById("count");
	const incrementBtn = document.querySelector('.incrementBtn');
	const decrementBtn = document.querySelector('.decrementBtn');
	const resetBtn = document.querySelector('.resetBtn');
	countHeader.textContent = localStorage.getItem("Increment");

	incrementBtn.addEventListener('click', function() {
		countHeader.textContent = (+countHeader.textContent + 1);
		localStorage.setItem("Increment", countHeader.textContent);
	});

	decrementBtn.addEventListener('click', function() {
		countHeader.textContent = (+countHeader.textContent - 1);
		localStorage.setItem("Increment", countHeader.textContent);
	});

	resetBtn.addEventListener('click', function(){
		if (countHeader.textContent == '0') {
			return;
		}


		if (confirm("Are you sure you want to reset the counter?")) {
			countHeader.textContent = '0';
		}
		localStorage.setItem("Increment", countHeader.textContent);
	});
}



if (document.getElementById("todolist")) {
	const inputBox = document.getElementById('inputText');
	const submitBtn = document.querySelector('.submitBtn');
	const ul = document.getElementById('ul');

	inputBox.addEventListener("keypress", function(){
		if (event.key === 'Enter'){
			event.preventDefault();
			submitBtn.click();
		}
	});


	submitBtn.addEventListener('click', function() {
		const li = document.createElement("li");
		let inputText = document.getElementById('inputText').value;
		if (inputText.replace(/\s/g, '')) {
			let t = document.createTextNode('<a href="#">' + inputText + '</a>');
			li.appendChild(t);
			ul.appendChild(li);
			document.getElementById('inputText').value = '';
		}
	});
}
	



	













