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


//---pagination---//
let numCarts, numPages, pets, ourPets, petsArr,
	currentPage = 0;


const petsCart = document.querySelectorAll('.pets__cart');
const petsCartImg = document.querySelectorAll('.pets__cart-img');
const petsCartText = document.querySelectorAll('.pets__cart-text');
const farLeft = document.getElementById('far-left');
const left = document.getElementById('left');
const page = document.getElementById('page');
const right = document.getElementById('right');
const farRight = document.getElementById('far-right');


window.addEventListener('load', async () => {
	numberCart();
	genArrPets();
	blockButton()
	petsPages(numCarts)
	await getPets();
	await loadCart(...ourPets[currentPage]);
});

window.addEventListener('resize', async () => {
	numberCart();
	petsPages(numCarts);
	page.innerHTML = `<p>${currentPage + 1}</p>`;
	blockButton();
	await loadCart(...ourPets[currentPage]);
})

farLeft.addEventListener('click', () => {
	currentPage = 0;
	loadCart(...ourPets[currentPage]);
	page.innerHTML = `<p>1</p>`;
	blockButton()
});

farRight.addEventListener('click', () => {
	currentPage = numPages - 1;
	loadCart(...ourPets[currentPage]);
	page.innerHTML = `<p>${numPages}</p>`;
	blockButton()
})

right.addEventListener('click', () => {
	currentPage++;
	loadCart(...ourPets[currentPage]);
	page.innerHTML = `<p>${currentPage + 1}</p>`;
	blockButton()
})

left.addEventListener('click', () => {
	currentPage--;
	loadCart(...ourPets[currentPage]);
	page.innerHTML = `<p>${currentPage + 1}</p>`;
	blockButton()
})


function numberCart() {
	numCarts = document.body.clientWidth > 820 ? 8 :
		document.body.clientWidth < 560 ? 3 : 6;
	numPages = 48 / numCarts - 1;
	if (currentPage > numPages - 1) { currentPage = numPages - 1; };
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

function genArrPets() {
	petsArr = [];
	for (let i = 1; i <= 6; i++) {
		let arr = [0, 1, 2, 3, 4, 5, 6, 7];
		while (arr.length) {
			let i = Math.round(Math.random() * (arr.length - 1));
			let n = arr.splice(i, 1);
			petsArr.push(n[0])
		}
	}
}

function petsPages(n) {
	let pets = petsArr.slice(0)
	ourPets = [];
	while (pets.length) {
		ourPets.push(pets.splice(0, n))
	}
}

function blockButton() {
	if (currentPage == 0) {
		farLeft.classList.add('block');
		left.classList.add('block');
		farRight.classList.remove('block');
		right.classList.remove('block');
	}
	if (currentPage == numPages - 1) {
		farLeft.classList.remove('block');
		left.classList.remove('block');
		farRight.classList.add('block');
		right.classList.add('block');
	}
	if ((currentPage < numPages - 1) && (currentPage > 0)) {
		farLeft.classList.remove('block');
		left.classList.remove('block');
		farRight.classList.remove('block');
		right.classList.remove('block');
	}
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
