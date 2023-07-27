const showMoreBtn = document.getElementById('showMoreBtn')
const hiddenList = document.getElementById('hiddenList')
const originalListItems = document.querySelectorAll('.nav__list-link')
const arrow = document.querySelector('#showMoreBtn span')

const screenWidth = window.innerWidth
let sliceValue
if (screenWidth > 1440) {
	sliceValue = -3
} else if (screenWidth > 1024) {
	sliceValue = -5
} else {
	sliceValue = 0
}
const hiddenItems = Array.from(originalListItems).slice(sliceValue)

hiddenItems.forEach(item => {
	hiddenList.appendChild(item.cloneNode(true))
})

function toggleHiddenList() {
	hiddenList.classList.toggle('show')
	arrow.classList.toggle('rotate')
}

showMoreBtn.addEventListener('click', toggleHiddenList)
