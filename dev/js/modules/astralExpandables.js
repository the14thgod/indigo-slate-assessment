// Assign module to Astral object
Astral.astralExpandables = {
	init: function(){
		AstralExpandables('.astral-expandables');
	}
}

// Register this module with Astral
Astral.core.register({
	name: 'Astral Expandables', // User friendly name used to reference it person-to-person
	type: 'module', // module || utility
	functionName: 'astralExpandables', // Code friendly name using camelCase
	subscribers: { // add any number of custom events usting the same name/array convention found below, fill arrays with function names from the module
		'pre': [], // pre-init
		'dom': ['init'], // document ready
		'post': [], // post-init
		'load': [], // all resources loaded
		'custom': []
	},
	dependencies: [] // Array of strings referencing functionNames of other modules/utilities (optional)
});
