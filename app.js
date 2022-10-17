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



/*
Bees will cost a base cost according to the stage of the game, cost will increase multiplicitavely for each bee purchased
Upgrade costs will increase by a flat amount according to how much income the player increases by?

*/
	
if (document.getElementById("flowerclicker")) {
	let beeCounts = [0, 0, 0, 0, 0];

	for (let i = 0; i <= 4; i++) {
		if (localStorage.getItem("bee" + i + "Count")) {
			beeCounts[i] = localStorage.getItem("bee" + i + "Count");
			console.log("i = ", i, " ", beeCounts[i]);
		}
	}

	const honeyElement = document.getElementById("honeyCount");
	if (localStorage.getItem("honeyCount")) {
		honeyElement.textContent = (localStorage.getItem("honeyCount")) + " Honey";
	}


	document.getElementById("flowerImg").onclick = function () {
		let currHoney = +honeyElement.textContent.replace(/[^0-9]/gi, '') + 200;
		honeyElement.textContent = currHoney + " Honey";
		localStorage.setItem("honeyCount", currHoney);
	}


	document.getElementById("bee0").onclick = function () {
		let cost = 50;

		if (localStorage.getItem("honeyCount") > cost) {
			honeyElement.textContent = (localStorage.getItem("honeyCount") - 50) + " Honey"; 
			localStorage.setItem("honeyCount", localStorage.getItem("honeyCount") - 50);

			beeCounts[0] = +beeCounts[0] + 1;
			localStorage.setItem("bee0Count", beeCounts[0]);
		}
	}



	window.onmousemove = function(e) {
		if (e.target.id == 'bee0') {
			var $target = e.target.nextElementSibling;

			if (!$target.classList.contains('visible')) {
				$target.classList.add('visible');
			} else {
				var offset = $target.parentElement.getBoundingClientRect();
				var tipDist = 70;

				$target.style.top = (e.clientY - offset.top - tipDist) + 'px';
				$target.style.left = (220) + 'px';
			}
		} else {
			var content = document.getElementsByClassName('content');
			for (var i = 0; i < content.length; i++) {
				content[i].classList.remove('visible');
			}
		} 
	}
}

