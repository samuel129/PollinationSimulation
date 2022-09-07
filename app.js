'use strict';

const lightSwitch = document.querySelector('.light-switch');

lightSwitch.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

	const className = document.body.className;
	if (className == "light-theme"){
		this.textContent = "Dark";
	} else {
		this.textContent = "Light";	
	}

	console.log("current class name: ", className)
});

const incrementBtn = document.querySelector('.incrementBtn');
const countHeader = document.getElementById("count");
const decrementBtn = document.querySelector('.decrementBtn');

countHeader.textContent = localStorage.getItem("Increment");

incrementBtn.addEventListener('click', function() {
	countHeader.textContent = (+countHeader.textContent + 1);
	localStorage.setItem("Increment", countHeader.textContent);
});

decrementBtn.addEventListener('click', function(){
	countHeader.textContent = (+countHeader.textContent - 1);
	localStorage.setItem("Increment", countHeader.textContent);
});