'use strict';

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
	const honeyElement = document.getElementById("honeyCount");
	let beeCounts = [1, 0, 0, 0, 0];
	let beeCosts = [1, 0, 0, 0, 0]
	let income = 0;
	incomeOverTime();

	//loader for income
	for (let i = 0; i <= 4; i++) {
		if (localStorage.getItem("bee" + i + "Count")) {
			beeCounts[i] = localStorage.getItem("bee" + i + "Count");
			document.getElementById("bee" + i + "count").textContent = beeCounts[i];
			console.log("i = ", i, " ", beeCounts[i]);
			income = setIncome(i);
			beeCosts[i] = (+beeCounts[0] + 1) ** 2;
			document.getElementById("bee0Tooltip").textContent = "Purchase bee for " + beeCosts[0] + " Honey";
		}
	}

	function setIncome(i) {
		if (i == 0) {
			return beeCounts[i] * 2;
		}
	}

	//loading honey count from localstorage
	if (localStorage.getItem("honeyCount")) {
		honeyElement.textContent = (localStorage.getItem("honeyCount")) + " Honey";
	}


	document.getElementById("flowerImg").onclick = function () {
		let currHoney = +honeyElement.textContent.replace(/[^0-9]/gi, '') + 200;
		honeyElement.textContent = currHoney + " Honey";
		localStorage.setItem("honeyCount", currHoney);
	}



	document.getElementById("bee0").onclick = function () {
		beeCosts[0] = (+beeCounts[0] + 1) ** 2;

		if (localStorage.getItem("honeyCount") > beeCosts[0]) {
			honeyElement.textContent = (localStorage.getItem("honeyCount") - beeCosts[0]) + " Honey"; 
			localStorage.setItem("honeyCount", localStorage.getItem("honeyCount") - beeCosts[0]);

			beeCounts[0] = +beeCounts[0] + 1;
			localStorage.setItem("bee0Count", beeCounts[0]);
			document.getElementById("bee0count").textContent = beeCounts[0];
			income = setIncome(0);
			document.getElementById("bee0Tooltip").textContent = "Purchase bee for " + ((+beeCounts[0] + 1) ** 2) + " Honey";
		}
	}

	document.getElementById("bee0UpgradeContainer").onclick = function () {
		console.log("dog");
	}

	function incomeOverTime() {
		let currHoney = +localStorage.getItem("honeyCount");
		honeyElement.textContent = (currHoney + income) + " Honey";
		localStorage.setItem("honeyCount", currHoney + income);
		setTimeout(incomeOverTime, 1000);
		console.log(income);
	}



	window.onmousemove = function(e) {
		var tooltip = document.getElementById("bee0Tooltip");
		var tooltipContainer = document.getElementById("bee0TooltipContainer");
		if (e.target.id == 'bee0') {
			tooltip.style.visibility = "visible";
			tooltipContainer.style.visibility = "visible";
			tooltipContainer.style.top = e.screenY - 210 + 'px';
		}
		else {
			tooltip.style.visibility = "hidden";
			tooltipContainer.style.visibility = "hidden";
		}
	}
}
