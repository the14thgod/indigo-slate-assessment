// Assign module to Astral object
Astral.mobileMenu = {
	init: function(){
		const oNavigationWrapper = document.querySelector('.navigation-wrapper');
		const oMobileMenuButton = document.getElementById('mobile-menu');

		let sClassIsOpening = 'isOpening',
			sClassIsOpened = 'isOpened',
			sClassIsClosing = 'isClosing';

		oMobileMenuButton.addEventListener('click', (e) => {
			// Manage animation classes for opening/closing
			if(oNavigationWrapper.classList.contains(sClassIsOpening)){
				oMobileMenuButton.classList.add(sClassIsClosing);
				oNavigationWrapper.classList.add(sClassIsClosing);
			}else{
				oMobileMenuButton.classList.add(sClassIsOpening);
				oNavigationWrapper.classList.add(sClassIsOpening);
			}
		});

		// When closing, need to ensure the transition runs instead of just vanishing
		oMobileMenuButton.addEventListener('animationend', function(e) {
			if(e.animationName == 'animateMobileMenuBotBarX'){
				if(oMobileMenuButton.classList.contains(sClassIsOpening)){
					oMobileMenuButton.classList.add(sClassIsOpened);
					oMobileMenuButton.classList.remove(sClassIsOpening);
				}else{
					oMobileMenuButton.classList.remove(sClassIsOpened, sClassIsClosing);
				}
			}
		});

		// When closing, need to ensure the transition runs instead of just vanishing
		oNavigationWrapper.addEventListener('transitionend', function(e) {
			if(oNavigationWrapper.classList.contains(sClassIsClosing)) {
				oNavigationWrapper.classList.remove(sClassIsClosing, sClassIsOpening);
			}
		});
	}
}

// Register this module with Astral
Astral.core.register({
	name: 'Mobile Menu', // User friendly name used to reference it person-to-person
	type: 'module', // module || utility
	functionName: 'mobileMenu', // Code friendly name using camelCase
	subscribers: { // add any number of custom events usting the same name/array convention found below, fill arrays with function names from the module
		'pre': [], // pre-init
		'dom': ['init'], // document ready
		'post': [], // post-init
		'load': [], // all resources loaded
		'custom': []
	},
	dependencies: [] // Array of strings referencing functionNames of other modules/utilities (optional)
});
