const container = document.querySelector('.container');
const card = document.querySelector('.card');
const front = document.querySelector('.front');
const back = document.querySelector('.back');
const show = document.querySelector('.show');
const btn = document.querySelector('.btn');
const progress = document.querySelector('.progress');
const play = document.querySelector('.play');
const pShow = document.querySelector('.pShow');

const imgs = [
	'pic (1)',
	'pic (2)',
	'pic (3)',
	'pic (4)',
	'pic (5)',
	'pic (6)',
	'pic (7)',
	'pic (8)',
	'pic (9)',
	'pic (1)',
	'pic (2)',
	'pic (3)',
	'pic (4)',
	'pic (5)',
	'pic (6)',
	'pic (7)',
	'pic (8)',
	'pic (9)',
];

let matched = [];
let opened = [];
const kir = [];
let advance = 0;
let second = 60;
let timeOut;

function shuffle() {
	let counter = imgs.length;
	while (counter > 0) {
		const indx = Math.floor(Math.random() * counter);
		counter--;
		const temp = imgs[counter];
		imgs[counter] = imgs[indx];
		imgs[indx] = temp;
	}
	return imgs;
}

function cardToDom() {
	shuffle();
	for (let i = 0; i < imgs.length; i++) {
		const div = document.createElement('div');
		div.classList.add('card');
		div.innerHTML = `
            <div class="side front" data-if=${i}></div>
                <div class="side back" data-ib=${i}>
                    <img src="./img/${imgs[i]}.png">               
            </div>
        `;
		kir.push(div);
		container.appendChild(div);
	}
	clickCards();
}

function clickCards() {
	kir.forEach((item, i) => {
		item.addEventListener('click', e => {
			item.querySelector('.front').classList.add('flip');
			item.querySelector('.back').classList.add('flipBack');
			opened.push(e.target);
			if (
				opened.length === 2 &&
				opened[0].dataset.if === opened[1].dataset.ib
			) {
				opened.pop();
			}
			if (opened.length === 2) {
				noMatch(e.target);
			}
		});
	});
}

function noMatch(e) {
	document.body.style.pointerEvents = 'none';
	let firstSrc = opened[0].nextElementSibling
		.querySelector('img')
		.getAttribute('src');
	let secSrc = opened[1].nextElementSibling
		.querySelector('img')
		.getAttribute('src');
	if (firstSrc !== secSrc) {
		setTimeout(() => {
			opened[0].classList.remove('flip');
			opened[1].classList.remove('flip');
			opened[0].nextElementSibling.classList.remove('flipBack');
			opened[1].nextElementSibling.classList.remove('flipBack');
			document.body.style.pointerEvents = 'auto';
			opened.length = '';
		}, 600);
	} else {
		matched.push(...opened);
		matched.forEach(matchs => {
			matchs.parentElement.style.pointerEvents = 'none';
		});
		if (matched.length === imgs.length) {
			pShow.innerHTML = 'congrats! you won';
			show.style.display = 'flex';
		}
		match();
	}
}

function match() {
	opened[0].classList.add('flip');
	opened[1].classList.add('flip');
	opened[0].nextElementSibling.classList.add('flipBack');
	opened[1].nextElementSibling.classList.add('flipBack');
	document.body.style.pointerEvents = 'auto';
	opened.length = '';
}

function removeCont() {
	container.innerHTML = '';
	matched.length = 0;
	opened.length = 0;
	kir.length = 0;
	advance = 0;
	progress.style.width = '0';
}

function updateTime() {
	timeOut = setInterval(() => {
		const timeAll = document.body.clientWidth / second;
		advance++;
		progress.style.width = `${timeAll * advance}px`;
		console.log(second);
		if (advance === second) {
			clearInterval(timeOut);
		}
		if (advance === second && matched.length !== imgs.length) {
			pShow.innerHTML = 'you lost';
			show.style.display = 'flex';
		}
	}, 1000);
}

btn.addEventListener('click', () => {
	removeCont();
	show.style.display = 'none';
	cardToDom();
	// updateTime();
});

play.addEventListener('click', () => {
	removeCont();
	cardToDom();
	// updateTime();
});
