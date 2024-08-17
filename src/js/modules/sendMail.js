function sendMail(Inputmask, JustValidate) {
	let selector = document.querySelector('#tel')
	let im = new Inputmask('+7(999) 999-99-99')
	im.mask(selector)

	let validation = new JustValidate('form')

	validation
		.addField('#name', [
			{
				rule: 'required',
				errorMessage: 'Введите имя!',
			},
			{
				rule: 'minLength',
				value: 2,
				errorMessage: 'Минимум 2 символа!',
			},
		])
		.addField('#tel', [
			{
				validator: (value) => {
					const phone = selector.inputmask.unmaskedvalue()
					return Boolean(Number(phone) && phone.length > 0)
				},
				errorMessage: 'Введите телефон',
			},
			{
				validator: (value) => {
					const phone = selector.inputmask.unmaskedvalue()
					return Boolean(Number(phone) && phone.length === 10)
				},
				errorMessage: 'Введите телефон полностью',
			},
		])
		.onSuccess(async function() {
			let data = {
				name: document.getElementById('name').value,
				tel: selector.inputmask.unmaskedvalue(),
				msg: document.getElementById('msg').value,
			}

			let response = await fetch('mail.php', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json; charset=UTF-8',
				},
			})

			let result = await response.text()

			showThanksModal(result)
		})

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog')
		const modal = document.querySelector('.modal')

		prevModalDialog.classList.add('hide')
		modal.classList.add('show')
		modal.classList.remove('hide')
		document.body.style.overflow = 'hidden'

		const thanksModal = document.createElement('div')
		thanksModal.classList.add('modal__dialog')
		thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `
		modal.append(thanksModal)
		setTimeout(() => {
			thanksModal.remove()
			prevModalDialog.classList.add('show')
			prevModalDialog.classList.remove('hide')
			modal.classList.add('hide')
			modal.classList.remove('show')
			document.body.style.overflow = ''
		}, 4000)
	}
}

export default sendMail
