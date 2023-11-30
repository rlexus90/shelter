let numCarts, pets, cartMap, currentPosition;

function changeHelpContent() {
	if (document.body.clientWidth <= 1050) {
		const helpContentFirst = document.querySelector('.help__content-first');
		const helpContentSecond = document.querySelector('.help__content-second');
		while (helpContentSecond.childElementCount > 0) {
			helpContentFirst.appendChild(helpContentSecond.firstElementChild)
		}
	}
	numberCart();
}

window.addEventListener('resize', changeHelpContent)

//---burger---//
const burgerMenuBtn = document.querySelector('.nav__menu-btn');
const burgerMenu = document.querySelector('.nav__menu');
const menuBackground = document.querySelector('.nav__link-background');
const body = document.querySelector('body');
document.addEventListener('click', swhowMenu);

function swhowMenu(e) {
	if (e.target.closest('.nav__menu-btn')) {
		burgerMenu.classList.toggle('active');
		burgerMenuBtn.classList.toggle('active');
		menuBackground.classList.toggle('active');
	} else {
		burgerMenu.classList.remove('active');
		burgerMenuBtn.classList.remove('active');
		menuBackground.classList.remove('active');
	}

	body.style = burgerMenu.classList.contains('active')
		? "overflow-y: hidden;" : "overflow-y: scroll;";
}
//---slider---//

const petsCart = document.querySelectorAll('.pets__cart');
const petsCartImg = document.querySelectorAll('.pets__cart-img');
const petsCartText = document.querySelectorAll('.pets__cart-text');
const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector('.arrow-left');

arrowRight.addEventListener('click', sliderRight);
arrowLeft.addEventListener('click', sliderLeft);
window.addEventListener('load', async () => {
	changeHelpContent();
	numberCart();
	genCartMap()
	await getPets();
	await loadCart(...cartMap[currentPosition]);
});

function numberCart() {
	numCarts = document.body.clientWidth > 1050 ? 3 :
		document.body.clientWidth < 560 ? 1 : 2;
}

async function getPets() {
	const getPets = await fetch('../assets/pets.json');
	pets = await getPets.json();
}

function loadCart(...n) {
	n.forEach((el, index) => {
		const link = pets[el].img;
		const text = pets[el].name;
		petsCartImg[index].src = link;
		petsCartText[index].innerHTML = text;
		petsCart[index].id = el;
	})
}

function genCartMap() {
	currentPosition = 1;
	let currentCarts = [],
		leftCarts = [],
		rightCarts = [];
	cartMap = [];
	while (currentCarts.length < 3) {
		let n = Math.round(Math.random() * 7);
		if (!currentCarts.includes(n)) { currentCarts.push(n) }
	}
	while (rightCarts.length < 3) {
		let n = Math.round(Math.random() * 7);
		if (!currentCarts.includes(n) && !rightCarts.includes(n)) { rightCarts.push(n) }
	}
	while (leftCarts.length < 3) {
		let n = Math.round(Math.random() * 7);
		if (!currentCarts.includes(n) && !leftCarts.includes(n)) { leftCarts.push(n) }
	}
	cartMap.push(leftCarts);
	cartMap.push(currentCarts);
	cartMap.push(rightCarts);
}


async function sliderRight() {
	currentPosition++;
	if (currentPosition < 0 || currentPosition > 2) { genCartMap(); };
	await loadCart(...cartMap[currentPosition]);
}

async function sliderLeft() {
	currentPosition--;
	if (currentPosition < 0 || currentPosition > 2) { genCartMap(); };
	await loadCart(...cartMap[currentPosition]);
}


//----pop-up----//
const popUp = document.querySelector('.pop-up');
const popUpImg = document.querySelector('.pop-up__img');
const popUpName = document.querySelector('.pop-up__name');
const popUpType = document.querySelector('.pop-up__type');
const popUpDescr = document.querySelector('.pop-up__desription');
const popUpMore = document.querySelector('.pop-up__more');

petsCart.forEach(e => {
	e.addEventListener('click', (ev) => {
		popUp.classList.add('active');
		loadPopUp(ev)
		setTimeout(() => (body.style = "overflow-y: hidden;"), 50);
	});
})


popUp.addEventListener('click', (e) => {
	if (!e.target.closest('.pop-up__wrapper')) {
		popUp.classList.remove('active');
		body.style = "overflow-y: scroll;";
	} else if (e.target.closest('.pop-up__close')) {
		popUp.classList.remove('active');
		body.style = "overflow-y: scroll;";
	} else { setTimeout(() => (body.style = "overflow-y: hidden;"), 50); }

})

function loadPopUp(e) {
	const id = e.target.closest('.pets__cart').id;
	popUpImg.src = pets[id].img;
	popUpName.innerHTML = pets[id].name;
	popUpType.innerHTML = `${pets[id].type} - ${pets[id].breed}`;
	popUpDescr.innerHTML = pets[id].description;
	popUpMore.innerHTML = `<li class="pop-up__list"><span>Age: </span>${pets[id].age}</li>
	<li class="pop-up__list"><span>Inoculations: </span>${pets[id].inoculations}</li>
	<li class="pop-up__list"><span>Diseases: </span>${pets[id].diseases}</li>
	<li class="pop-up__list"><span>Parasites: </span>${pets[id].parasites}</li>`;

}

