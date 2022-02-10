// Assign module to Astral object
Astral.mobileDropdownDrawer = {
	init: function(){
		const oNavigation = document.getElementById('navigation');

		Astral.delegate(oNavigation, 'click', '.btn-open-dropdown', function(e){
			let oBtn = e.target.closest('.hasDropdown');

			oBtn.classList.add('isOpening');
		});

		Astral.delegate(oNavigation, 'click', '.btn-close-dropdown', function(e){
			let oBtn = e.target.closest('.hasDropdown');

			oBtn.classList.remove('isOpening');
		});
	}
}

// Register this module with Astral
Astral.core.register({
	name: 'Mobile Dropdown Drawer', // User friendly name used to reference it person-to-person
	type: 'module', // module || utility
	functionName: 'mobileDropdownDrawer', // Code friendly name using camelCase
	subscribers: { // add any number of custom events usting the same name/array convention found below, fill arrays with function names from the module
		'pre': [], // pre-init
		'dom': ['init'], // document ready
		'post': [], // post-init
		'load': [], // all resources loaded
		'custom': []
	},
	dependencies: ['delegate'] // Array of strings referencing functionNames of other modules/utilities (optional)
});
