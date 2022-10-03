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
		const container = document.createElement("div");
		const li = document.createElement("li");
		const a = document.createElement("a");
		const xButton = document.createElement("button");
		const br = document.createElement("br");

		let inputText = document.getElementById('inputText').value;
		xButton.classList.add("xbutton");
		container.classList.add("liContainer");
		container.href = "#";

		xButton.addEventListener('click', function() {
			container.remove();
			br.remove();
		});

		container.onclick = function() {
			if (a.style.textDecoration == "line-through") {
				a.style.textDecoration = "none";
			} else {
				a.style.textDecoration = "line-through";
			}
		};

		if (inputText.replace(/\s/g, '')) {
			let t = document.createTextNode(inputText);
			container.appendChild(xButton);
			ul.appendChild(container);
			ul.appendChild(br);
			container.appendChild(li);
			li.appendChild(a);
			a.appendChild(t);

			document.getElementById('inputText').value = '';
		}
	});
}




	






