// Slider

function slider() {
	let offset = 0
	let slideIndex = 1

	const slides = document.querySelectorAll('.services__slide'),
		prev = document.querySelector('.services__slider-prev'),
		next = document.querySelector('.services__slider-next'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),
		slidesWrapper = document.querySelector('.services__slider-wrapper'),
		width = window.getComputedStyle(slidesWrapper).width,
		slidesField = document.querySelector('.services__slider-inner')

	if (slides.length < 10) {
		total.textContent = slides.length
		current.textContent = slideIndex
	} else {
		total.textContent = slides.length
		current.textContent = slideIndex
	}

	slidesField.style.width = 100 * slides.length + '%'
	slidesField.style.display = 'flex'
	slidesField.style.transition = '0.5s all'

	slidesWrapper.style.overflow = 'hidden'

	slides.forEach((slide) => {
		slide.style.width = width
	})

	next.addEventListener('click', () => {
		if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
			offset = 0
		} else {
			offset += +width.slice(0, width.length - 2)
		}

		slidesField.style.transform = `translateX(-${offset}px)`

		if (slideIndex == slides.length) {
			slideIndex = 1
		} else {
			slideIndex++
		}

		if (slides.length < 10) {
			current.textContent = slideIndex
		} else {
			current.textContent = slideIndex
		}
	})

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = +width.slice(0, width.length - 2) * (slides.length - 1)
		} else {
			offset -= +width.slice(0, width.length - 2)
		}

		slidesField.style.transform = `translateX(-${offset}px)`

		if (slideIndex == 1) {
			slideIndex = slides.length
		} else {
			slideIndex--
		}

		if (slides.length < 10) {
			current.textContent = slideIndex
		} else {
			current.textContent = slideIndex
		}
	})
}

export default slider
