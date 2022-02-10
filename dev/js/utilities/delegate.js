/**
 * Delegate
 * Similar to jQuery's .on, specifiy an element to delegate an event to. Rather than having multiple elements with an event handler, this has one element to handle multiple elements so its one function.
 * 
 * @param  {dom object} oContainers [the oContainers the triggering event should fire on]
 * @param  {string} evt [the specific event to tie the handler to; multiple events can be space separated]
 * @param  {string} selector [the element that triggers the event; multiple selectors can be comma separated]
 * @param  {fn} handler [function for event handler]
 */
Astral.delegate = function(oContainers, evt, selector, handler){
	var oContainers = Array.isArray(oContainers) ? oContainers : [oContainers],
		oEvents = evt.split(' '),
		oSelectors = selector.split(',');

	// Loop over each delegated container
	oContainers.forEach(oContainer => {
		// Loop over each event type
		oEvents.forEach(oEvent => {
			oContainer.addEventListener(oEvent, function(event){
				var target = event.target;
				while(target && target !== this){
					// Matches mutliple selectors
					for(var i=0; i < oSelectors.length; i++){
						if(target.matches(oSelectors[i].trim())){
							handler.call(target, event);
						}
					}
					target = target.parentNode;
				}
			});
		});
	});
}

// Register this module with Astral
Astral.core.register({
	name: 'Delegate', // User friendly name used to reference it person-to-person
	type: 'utility', // module || utility
	functionName: 'delegate', // Code friendly name using camelCase
	subscribers: { // add any number of custom events usting the same name/array convention found below
		'custom': [] // custom event
	},
	dependencies: [] // Array of strings referencing functionNames of other modules/utilities (optional)
});
