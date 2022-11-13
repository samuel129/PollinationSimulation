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
	
if (document.getElementById("pollinationsimulation")) {

	const bee0upgrades = [1, 2, 4, 8, 16]; //multipliers per upgrade
	const bee1upgrades = [1, 2, 4, 8, 16];
	let beeCounts = [0, 0, 0, 0, 0];
	let beeCosts = [1, 0, 0, 0, 0];
	let upgradeStatus = [0, 0, 0, 0, 0]; //index = which bee, number = which upgrade

	let income = 0;

	incomeOverTime();

	let beeUpgrades = {
	bee0_0: "Flies will now generate 2x pollen per fly", bee0_0cost: 3000,
	bee0_1: "Flies bees will now generate 4x pollen per fly", bee0_1cost: 10000,
	bee0_2: "Flies bees will now generate 8x pollen per fly", bee0_2cost: 15000,

	bee1_0: "Moths will now generate 2x pollen per moth", bee1_0cost: 500000,
	bee1_1: "Moths will now generate 4x pollen per moth", bee1_1cost: 1000000,
	bee1_2: "Moths will now generate 8x pollen per moth", bee1_2cost: 5000000
	};

	//loader for income and upgrade status for each bee

	for (let i = 0; i <= 1; i++) {
		if (!localStorage.getItem("bee" + i + "UpgradeStatus")) {
			localStorage.setItem("bee" + i + "UpgradeStatus", 0);
		}

		if (localStorage.getItem("bee" + i + "UpgradeStatus")) {
			upgradeStatus[i] = +localStorage.getItem("bee" + i + "UpgradeStatus");
			document.getElementById("bee" + i + "UpgradeText").textContent = beeUpgrades["bee" + i + "_" + upgradeStatus[i]];
			document.getElementById("bee" + i + "UpgradeCost").textContent = "$" + beeUpgrades["bee" + i + "_" + upgradeStatus[i] + "cost"];
			console.log(i);
		}

		if (localStorage.getItem("bee" + i + "Count")) {
			beeCounts[i] = localStorage.getItem("bee" + i + "Count");
			document.getElementById("bee" + i + "count").textContent = beeCounts[i];
			console.log("i = ", i, " ", beeCounts[i]);
			income = setIncome();

			if (i == 0) {
				beeCosts[i] = getCostFormula(i);
				document.getElementById("bee" + i + "Tooltip").textContent = "Purchase bee for " + beeCosts[i] + " pollen";
				document.getElementById("bee0Income").textContent = (Math.trunc((beeCounts[i] * 2 * bee0upgrades[upgradeStatus[0]]) * .8)) + " pollen per second"
			}

			else if (i == 1) {
				beeCosts[i] = getCostFormula(i);
				document.getElementById("bee" + i + "Tooltip").textContent = "Purchase bee for " + beeCosts[i] + " pollen";
				document.getElementById("bee1Income").textContent = (Math.trunc((beeCounts[1] * 100 * bee0upgrades[upgradeStatus[1]]) * .8)) + " pollen per second"
			}
		}
	}

	//loading pollen count from localstorage
	if (localStorage.getItem("pollenCount")) {
		setpollenDisplay(+localStorage.getItem("pollenCount"));
	}

	document.getElementById("flowerImg").onclick = function () {
		localStorage.setItem("pollenCount", +localStorage.getItem("pollenCount") + 200);
		setpollenDisplay(+localStorage.getItem("pollenCount"));
	}



	document.getElementById("bee0").onclick = function () {
		beeCosts[0] = getCostFormula(0);

		if (localStorage.getItem("pollenCount") > beeCosts[0]) {
			localStorage.setItem("pollenCount", localStorage.getItem("pollenCount") - beeCosts[0]);

			beeCounts[0] = +beeCounts[0] + 1;
			localStorage.setItem("bee0Count", beeCounts[0]);
			document.getElementById("bee0count").textContent = beeCounts[0];
			income = setIncome();
			document.getElementById("bee0Tooltip").textContent = "Purchase bee for " + (getCostFormula(0)) + " pollen";
			setpollenDisplay(+localStorage.getItem("pollenCount"));	
			document.getElementById("bee0Income").textContent = (Math.trunc((beeCounts[0] * 2 * bee0upgrades[upgradeStatus[0]]) * .8)) + " pollen per second"
		}
	}

	document.getElementById("bee1").onclick = function () {
		beeCosts[1] = getCostFormula(1);

		if (localStorage.getItem("pollenCount") > beeCosts[1]) {
			localStorage.setItem("pollenCount", localStorage.getItem("pollenCount") - beeCosts[1]);

			beeCounts[1] = +beeCounts[1] + 1;
			localStorage.setItem("bee1Count", beeCounts[1]);
			document.getElementById("bee1count").textContent = beeCounts[1];
			income = setIncome(income, 1);
			document.getElementById("bee1Tooltip").textContent = "Purchase bee for " + (getCostFormula(1)) + " pollen";
			setpollenDisplay(+localStorage.getItem("pollenCount"));
			document.getElementById("bee1Income").textContent = (Math.trunc((beeCounts[1] * 100 * bee0upgrades[upgradeStatus[1]]) * .8)) + " pollen per second"
		}
	}

	document.getElementById("bee0UpgradeContainer").onclick = function () {
		//checking if user has enough pollen
		if (localStorage.getItem("pollenCount") >= beeUpgrades["bee0_" + upgradeStatus[0] + "cost"]) {
			localStorage.setItem("pollenCount", localStorage.getItem("pollenCount") - beeUpgrades["bee0_" + upgradeStatus[0] + "cost"])  

			upgradeStatus[0] = upgradeStatus[0] + 1;

			income = setIncome();

			localStorage.setItem("bee0UpgradeStatus", upgradeStatus[0])
			document.getElementById("bee0UpgradeText").textContent = beeUpgrades["bee0_" + upgradeStatus[0]];
			document.getElementById("bee0UpgradeCost").textContent = "$" + beeUpgrades["bee0_" + upgradeStatus[0] + "cost"];

			setpollenDisplay(+localStorage.getItem("pollenCount"));
			document.getElementById("bee0Income").textContent = (Math.trunc((beeCounts[0] * 2 * bee0upgrades[upgradeStatus[0]]) * .8)) + " pollen per second"
		}
	}

	document.getElementById("bee1UpgradeContainer").onclick = function () {
		//checking if user has enough pollen
		if (localStorage.getItem("pollenCount") >= beeUpgrades["bee1_" + upgradeStatus[1] + "cost"]) {
			localStorage.setItem("pollenCount", localStorage.getItem("pollenCount") - beeUpgrades["bee1_" + upgradeStatus[1] + "cost"])  

			upgradeStatus[1] = upgradeStatus[1] + 1;

			income = setIncome();

			localStorage.setItem("bee1UpgradeStatus", upgradeStatus[1])
			document.getElementById("bee1UpgradeText").textContent = beeUpgrades["bee1_" + upgradeStatus[1]];
			document.getElementById("bee1UpgradeCost").textContent = "$" + beeUpgrades["bee1_" + upgradeStatus[1] + "cost"];
			
			setpollenDisplay(+localStorage.getItem("pollenCount"));
			document.getElementById("bee1Income").textContent = (Math.trunc((beeCounts[1] * 100 * bee0upgrades[upgradeStatus[1]]) * .8)) + " pollen per second"
		}
	}

	function getCostFormula(i) {
		if (i == 0) {
			return (+beeCounts[0] + 1) ** 2;
		}

		if (i == 1) {
			return (200000 + ((+beeCounts[1] * 20) ** 2));
		}
	}

	function setIncome() {
		income = 0;

		for (let i = 0; i <= 1; i++) {
			if (i == 0) {
				income += Math.trunc((beeCounts[i] * 2 * bee0upgrades[upgradeStatus[0]]) * .8);
			}

			else if (i == 1) {
				income += Math.trunc((beeCounts[i] * 100 * bee0upgrades[upgradeStatus[1]]) * .8)
			}
		}
		return income;
	}

	function incomeOverTime() {
		let currpollen = +localStorage.getItem("pollenCount");
		setpollenDisplay(currpollen + income);
		localStorage.setItem("pollenCount", currpollen + income);
		setTimeout(incomeOverTime, 400);
		console.log(income);
	}

	function setpollenDisplay(pollen) {
		pollen = pollen.toString();
		let pollenLength = pollen.toString().length;

		//above hundred trillion
		if (pollenLength >= 16) {
				document.getElementById("pollenCount").textContent = ((+pollen).toExponential(3)) + " pollen";
			}

		//trillions
		else if (pollenLength >= 13) {

			if (pollenLength == 13) {
				document.getElementById("pollenCount").textContent = pollen.slice(3,3) + "." + pollen.slice(3,5)+ "t pollen";
			}

			else if (pollenLength == 14) {
				document.getElementById("pollenCount").textContent = pollen.slice(1,3) + "." + pollen.slice(3,5)+ "t pollen";
			}

			else if (pollenLength == 15) {
				document.getElementById("pollenCount").textContent = pollen.slice(2,3) + "." + pollen.slice(3,5)+ "t pollen";
			}

			else {
				document.getElementById("pollenCount").textContent = pollen.slice(0,3) + "." + pollen.slice(3,5)+ "t pollen";
			}

			}

		//billions
		else if (pollenLength >= 10) {

			if (pollenLength == 10) {
				document.getElementById("pollenCount").textContent = pollen.slice(3,3) + "." + pollen.slice(3,5)+ "b pollen";
			}

			else if (pollenLength == 11) {
				document.getElementById("pollenCount").textContent = pollen.slice(1,3) + "." + pollen.slice(3,5)+ "b pollen";
			}

			else if (pollenLength == 12) {
				document.getElementById("pollenCount").textContent = pollen.slice(2,3) + "." + pollen.slice(3,5)+ "b pollen";
			}

			else {
				document.getElementById("pollenCount").textContent = pollen.slice(0,3) + "." + pollen.slice(3,5)+ "b pollen";
			}

			}

		//millions
		else if (pollenLength >= 7) {

			if (pollenLength == 7) {
				document.getElementById("pollenCount").textContent = pollen.slice(0,1) + "." + pollen.slice(1,4)+ "m pollen";
			}

			else if (pollenLength == 8) {
				document.getElementById("pollenCount").textContent = pollen.slice(0,2) + "." + pollen.slice(2,5)+ "m pollen";
			}

			else if (pollenLength == 9) {
				document.getElementById("pollenCount").textContent = pollen.slice(0,3) + "." + pollen.slice(3,6)+ "m pollen";
			}
			}

		else {
			document.getElementById("pollenCount").textContent = pollen + " pollen";
		}

		console.log(pollen);
	}

	window.onmousemove = function(e) {

		if (e.target.id == 'bee0') {
			document.getElementById("bee0Tooltip").style.visibility = "visible";
			document.getElementById("bee0TooltipContainer").style.visibility = "visible";
			document.getElementById("bee0TooltipContainer").style.top = e.screenY - 240 + 'px';
		}

		else if (e.target.id == 'bee1') {
			document.getElementById("bee1Tooltip").style.visibility = "visible";
			document.getElementById("bee1TooltipContainer").style.visibility = "visible";
			document.getElementById("bee1TooltipContainer").style.top = e.screenY - 240 + 'px';
		}

		else {
			for (let i = 0; i <= 1; i++) {
				document.getElementById("bee" + i + "Tooltip").style.visibility = "hidden";
				document.getElementById("bee" + i + "TooltipContainer").style.visibility = "hidden";
			}
		}
	}


// D E V     B U T T O N S

//loader function

	function loadEverything() {
		for (let i = 0; i <= 1; i++) {
		if (localStorage.getItem("bee" + i + "UpgradeStatus")) {
			upgradeStatus[i] = +localStorage.getItem("bee" + i + "UpgradeStatus");
			document.getElementById("bee" + i + "UpgradeText").textContent = beeUpgrades["bee" + i + "_" + upgradeStatus[i]];
			document.getElementById("bee" + i + "UpgradeCost").textContent = "$" + beeUpgrades["bee" + i + "_" + upgradeStatus[i] + "cost"];
		}

		if (localStorage.getItem("bee" + i + "Count")) {
			beeCounts[i] = localStorage.getItem("bee" + i + "Count");
			document.getElementById("bee" + i + "count").textContent = beeCounts[i];
			console.log("i = ", i, " ", beeCounts[i]);
			income = setIncome();
			beeCosts[i] = (+beeCounts[0] + 1) ** 2;
			document.getElementById("bee0Tooltip").textContent = "Purchase bee for " + beeCosts[0] + " pollen";
			}
		}	
	}

	document.getElementById("addPollen").onclick = function () {
		localStorage.setItem("pollenCount", +localStorage.getItem("pollenCount") + 200000);
		loadEverything();
		setpollenDisplay(+localStorage.getItem("pollenCount"));
	}

	document.getElementById("resetPollenButton").onclick = function () {
		localStorage.setItem("pollenCount", 0);
		document.getElementById("pollenCount").textContent = "0 pollen";
		setpollenDisplay(+localStorage.getItem("pollenCount"));
	}

	document.getElementById("resetUpgradesButton").onclick = function () {
		localStorage.setItem("bee0UpgradeStatus", 0);
		localStorage.setItem("bee1UpgradeStatus", 0);
		upgradeStatus[0] = 0;
		upgradeStatus[1] = 0;
		income = setIncome();
		loadEverything();
	}

	document.getElementById("resetBeeCountButton").onclick = function () {
		 beeCounts[0] = 0;
		 beeCounts[1] = 0;
		 localStorage.setItem("bee1Count", 0);
		 localStorage.setItem("bee0Count", 0);
		 loadEverything();
	}
}
