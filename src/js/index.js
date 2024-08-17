import Inputmask from 'inputmask'
import JustValidate from 'just-validate'
import mobileNav from './modules/mobile-nav.js'
import slider from './modules/slider.js'
import modal from './modules/modal.js'
import sendMail from './modules/sendMail.js'

window.addEventListener('DOMContentLoaded', function() {
	mobileNav()
	slider()
	modal()
	sendMail(Inputmask, JustValidate)
})
