let button = document.querySelector("button");
button.addEventListener("click", function() {
	window.location.reload();
});

let numberOne = getRandomInRange(6, 9);
let numberTwo = getRandomInRange(11, 14) - numberOne;
let sumNumbers = numberOne + numberTwo;

function getRandomInRange(min, max) {	//Случайное целое число в диапазоне, включая минимальное и максимальное.
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Сформируем пример
let example = document.getElementById("example-block");
example.innerHTML = `<span class="number-one">${numberOne}</span> 
	+ <span class="number-two">${numberTwo}</span> = <span class="result">?</span>`;


let canvas = document.getElementById("canvas");
let context = canvas.getContext('2d');

let step = 806/20.5; //Одно деление на оси

let centerArcOne = numberOne*step/2;	//Координаты центра дуги-1
let endArcOne = numberOne*step;	//Координаты конца дуги-1
let bend = 10;
let radiusArcOne = numberOne*step/2;
let cY = 100;	//координата Y (высота canvas)

let centerArcTwo = numberTwo*step/2 + endArcOne;	//Координаты центра дуги-2
let endArcTwo = numberTwo*step + endArcOne;	//Координаты конца дуги-2
let radiusArcTwo = numberOne*step/2;

function drawArcOne() {	//Рисуем дугу-1 и стрелку
	context.beginPath();
	context.strokeStyle = "#A52959";
	context.moveTo(0, cY);
	context.quadraticCurveTo(centerArcOne, -bend, endArcOne, cY);
	context.stroke();
	
	context.beginPath(); 
	context.moveTo(endArcOne, cY);
	context.lineTo(endArcOne - radiusArcOne/2/bend, cY-10);
	context.stroke();
	context.beginPath();
	context.moveTo(endArcOne, cY);
	context.lineTo(endArcOne - radiusArcOne/bend, cY-5);
	context.stroke();
}

drawArcOne();

function drawArcTwo() {	//Рисуем дугу-2 и стрелку
	context.beginPath();
	context.strokeStyle = "#A52959";
	context.moveTo(endArcOne, cY);
	context.quadraticCurveTo(centerArcTwo, bend, endArcTwo, cY);
	context.stroke();
	
	context.beginPath(); 
	context.moveTo(endArcTwo, cY);
	context.lineTo(endArcTwo - radiusArcOne/2/bend, cY-10);
	context.stroke();
	context.beginPath();
	context.moveTo(endArcTwo, cY);
	context.lineTo(endArcTwo - radiusArcOne/bend, cY-5);
	context.stroke();
}

inputBlock = document.body.querySelector(".input-block");

function drawInputOne() {	//Рисуем инпут-1
	let inputOne = document.createElement("input");
	inputOne.setAttribute("type", "text");
	inputOne.setAttribute("maxlength", "1");
	inputOne.setAttribute("pattern", "\d");	//только числа
	inputOne.setAttribute("size", "1");
	inputOne.classList.add("input-one");
	inputOne.style.left = ((centerArcOne - 10) + 'px');	//центрировать над дугой, 10px - половина ширины инпута
	inputOne.style.top = (100 + 'px');	//прижать к низу блока, 100px - вымота блока 
	inputBlock.append(inputOne);
}

drawInputOne();

function drawInputTwo() {	//Рисуем инпут-2
	let inputTwo = document.createElement("input");
	inputTwo.setAttribute("type", "text");
	inputTwo.setAttribute("maxlength", "1");
	inputTwo.setAttribute("pattern", "\d");	//только числа
	inputTwo.setAttribute("size", "1");
	inputTwo.classList.add("input-two");
	inputTwo.style.left = ((centerArcTwo - 10 - 20 - 10) + 'px');	//центрировать над дугой
	inputTwo.style.top = (110 + 'px');	//прижать к низу блока 
	inputBlock.append(inputTwo);
}


let elemInputOne = document.body.querySelector(".input-one");	//элемент страницы инпут-1
let numberInputOne = document.body.querySelector(".number-one");	//значение в инпут-1
elemInputOne.onkeyup = function(e) {	//onkeyup возникает в момент отпускания нажатой клавиши
	if (e.key == numberOne) {
		elemInputOne.disabled = true;
		elemInputOne.style.color = "black";
		numberInputOne.style.background = "none";
		numberInputOne.style.borderRadius  = "none";
		numberInputOne.style.padding  = "none";
		drawArcTwo();
		drawInputTwo();
		checkInputTwo();
	}
	else {
		elemInputOne.style.color = "red";
		numberInputOne.style.background = "#FF9B40";
		numberInputOne.style.borderRadius  = "5px";
		numberInputOne.style.padding  = "5px";
	}		
}

let inputResult = document.createElement('input');	//инпут с результатом
inputResult.setAttribute("type", "text");
inputResult.setAttribute("maxlength", "2");
inputResult.setAttribute("pattern", "\d");
inputResult.classList.add('input-result');

function checkInputTwo() {
	let elemInputTwo = document.body.querySelector(".input-two");	//элемент страницы инпут-2
	let numberInputTwo = document.body.querySelector(".number-two");	//значение в инпут-2
	elemInputTwo.onkeyup = function(e) {
	if (e.key == numberTwo) {
		elemInputTwo.disabled = true;
		elemInputTwo.style.color = "black";
		numberInputTwo.style.background = "none";
		numberInputTwo.style.borderRadius  = "none";
		numberInputTwo.style.padding  = "none";
		let result = document.body.querySelector(".result");
		result.after(inputResult); 
		result.remove();
	}
	else {
		elemInputTwo.style.color = "red";
		numberInputTwo.style.background = "#FF9B40";
		numberInputTwo.style.borderRadius  = "5px";
		numberInputTwo.style.padding  = "5px";
	}
}
}

function checkSumNumbers() { // Проверка input с суммой
	if (inputResult.value === String(sumNumbers)) {
		inputResult.disabled = true;;
		inputResult.style.color = "black";
		inputResult.style.border = "none";
		inputResult.style.background = "none";
	} else {
		inputResult.style.color = "red";
	}
};

inputResult.oninput = checkSumNumbers;














