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
	let beeCounts = [0, 0, 0, 0, 0];
	let beeCosts = [1, 0, 0, 0, 0];
	let upgradeStatus = [0, 0, 0, 0, 0]; //index = which bee, number = which upgrade
	let income = 0;
	incomeOverTime();

	let beeUpgrades = {
	bee0_0: "Worker bees will now generate 2x honey per bee", bee0_0cost: 3000,
	bee0_1: "Worker bees will now generate 4x honey per bee", bee0_1cost: 10000,
	bee0_2: "Worker bees will now generate 8x honey per bee", bee0_2cost: 15000,

	bee1_0: "Wizard bees will now generate 2x honey per bee", bee1_0cost: 50000,
	bee1_1: "Wizard bees will now generate 4x honey per bee", bee1_1cost: 150000,
	bee1_2: "Wizard bees will now generate 8x honey per bee", bee1_2cost: 1000000
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
				beeCosts[i] = (+beeCounts[i] + 1) ** 2;
				document.getElementById("bee" + i + "Tooltip").textContent = "Purchase bee for " + beeCosts[i] + " Honey";
			}

			else if (i == 1) {
				beeCosts[i] = 200000 + ((+beeCounts[1] + 1) ** 2);
				document.getElementById("bee" + i + "Tooltip").textContent = "Purchase bee for " + beeCosts[i] + " Honey";
			}
		}
	}

	//loading honey count from localstorage
	if (localStorage.getItem("honeyCount")) {
		setHoneyDisplay(+localStorage.getItem("honeyCount"));
	}

	document.getElementById("flowerImg").onclick = function () {
		localStorage.setItem("honeyCount", +localStorage.getItem("honeyCount") + 200);
		setHoneyDisplay(+localStorage.getItem("honeyCount"));
	}



	document.getElementById("bee0").onclick = function () {
		beeCosts[0] = (+beeCounts[0] + 1) ** 2;

		if (localStorage.getItem("honeyCount") > beeCosts[0]) {
			localStorage.setItem("honeyCount", localStorage.getItem("honeyCount") - beeCosts[0]);

			beeCounts[0] = +beeCounts[0] + 1;
			localStorage.setItem("bee0Count", beeCounts[0]);
			document.getElementById("bee0count").textContent = beeCounts[0];
			income = setIncome();
			document.getElementById("bee0Tooltip").textContent = "Purchase bee for " + ((+beeCounts[0] + 1) ** 2) + " Honey";
			setHoneyDisplay(localStorage.getItem("honeyCount"));	
		}
	}

	document.getElementById("bee1").onclick = function () {
		beeCosts[1] = 200000 + ((+beeCounts[1] + 1) ** 2);

		if (localStorage.getItem("honeyCount") > beeCosts[1]) {
			localStorage.setItem("honeyCount", localStorage.getItem("honeyCount") - beeCosts[1]);

			beeCounts[1] = +beeCounts[1] + 1;
			localStorage.setItem("bee1Count", beeCounts[1]);
			document.getElementById("bee1count").textContent = beeCounts[1];
			income = setIncome(income, 1);
			document.getElementById("bee1Tooltip").textContent = "Purchase bee for " + (200000 + ((+beeCounts[1] + 1) ** 2)) + " Honey";
			setHoneyDisplay(localStorage.getItem("honeyCount"));
		}
	}

	document.getElementById("bee0UpgradeContainer").onclick = function () {
		if (localStorage.getItem("honeyCount") >= beeUpgrades["bee0_" + upgradeStatus[0] + "cost"]) {
			localStorage.setItem("honeyCount", localStorage.getItem("honeyCount") - beeUpgrades["bee0_" + upgradeStatus[0] + "cost"])  
			upgradeStatus[0] = upgradeStatus[0] + 1;
			income = setIncome();
			localStorage.setItem("bee0UpgradeStatus", upgradeStatus[0])
			document.getElementById("bee0UpgradeText").textContent = beeUpgrades["bee0_" + upgradeStatus[0]];
			document.getElementById("bee0UpgradeCost").textContent = "$" + beeUpgrades["bee0_" + upgradeStatus[0] + "cost"];
			setHoneyDisplay(+localStorage.getItem("honeyCount"));
		}
	}

	document.getElementById("bee1UpgradeContainer").onclick = function () {
		if (localStorage.getItem("honeyCount") >= beeUpgrades["bee1_" + upgradeStatus[1] + "cost"]) {
			localStorage.setItem("honeyCount", localStorage.getItem("honeyCount") - beeUpgrades["bee1_" + upgradeStatus[1] + "cost"])  
			upgradeStatus[1] = upgradeStatus[1] + 1;
			income = setIncome();
			localStorage.setItem("bee1UpgradeStatus", upgradeStatus[1])
			document.getElementById("bee1UpgradeText").textContent = beeUpgrades["bee1_" + upgradeStatus[1]];
			document.getElementById("bee1UpgradeCost").textContent = "$" + beeUpgrades["bee1_" + upgradeStatus[1] + "cost"];
			setHoneyDisplay(+localStorage.getItem("honeyCount"));
		}
	}

	function setIncome() {
		const bee0upgrades = [1, 2, 4, 8, 16]; //multipliers per upgrade
		const bee1upgrades = [1, 2, 4, 8, 16];
		income = 0;

		for (let i = 0; i <= 1; i++) {
			if (i == 0) {
				income += Math.trunc((beeCounts[i] * 2 * bee0upgrades[upgradeStatus[0]]) * .8);
			}

			if (i == 1) {
				income += Math.trunc((beeCounts[i] * 100 * bee0upgrades[upgradeStatus[1]]) * .8)
			}
		}

		return income;
	}

	function incomeOverTime() {
		let currHoney = +localStorage.getItem("honeyCount");
		setHoneyDisplay(currHoney + income);
		localStorage.setItem("honeyCount", currHoney + income);
		setTimeout(incomeOverTime, 400);
		console.log(income);
	}

	function setHoneyDisplay(honey) {

		if (honey.toString().length >= 7) {
			document.getElementById("honeyCount").textContent = (honey.toExponential(3)) + " Honey";
		}

		else {
			document.getElementById("honeyCount").textContent = honey + " Honey";
		}
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
			document.getElementById("bee0Tooltip").textContent = "Purchase bee for " + beeCosts[0] + " Honey";
			}
		}	
	}

	document.getElementById("addHoney").onclick = function () {
		localStorage.setItem("honeyCount", +localStorage.getItem("honeyCount") + 200000);
		loadEverything();
	}

	document.getElementById("resetHoneyButton").onclick = function () {
		localStorage.setItem("honeyCount", 0);
		honeyElement.textContent = "0 Honey";
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
