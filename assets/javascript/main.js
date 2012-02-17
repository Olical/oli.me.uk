(function(exports) {
	/*jshint mootools:true,smarttabs:true*/
	'use strict';
	
	// Find all elements and initialise any required variables
	var elements = {
		tags: {
			search: $$('input.tag-search'),
			list: $$('ul.tag-list > li'),
			headings: $$('ul.tag-list h2'),
			current: null
		}
	};
	
	/**
	 * Sort function for scored tags
	 * 
	 * @param {Object} a Object to compare
	 * @param {Object} b Object to compare
	 * @return {Number} -1 or 1 depending on the scores
	 */
	function sortScoredTags(a, b) {
		return (a.score >= b.score) ? -1 : 1;
	}
	
	/**
	 * Filters the tag list by the content of the tag search box
	 * Uses string_score
	 */
	function tagSearch(search) {
		// Initialise variables
		var i = null,
			best = null,
			scored = [],
			search = elements.tags.search[0].get('value');
		
		// Loop over the list
		for(i = 0; i < elements.tags.list.length; i += 1) {
			// Get the score of the search against this tag
			scored.push({
				element: elements.tags.list[i],
				score: elements.tags.list[i].get('data-tag').score(search)
			});
		}
		
		// Sort the scored element
		// Store the top one
		best = scored.sort(sortScoredTags)[0];
		
		// Is it the same as the current one?
		// If so, there is really nothing to do
		if(best.element !== elements.tags.current) {
			// Make sure we actually have a current tag
			if(elements.tags.current) {
				// Remove the class from the old one
				elements.tags.current.removeClass('show');
			}
			
			// Add the class to the best match
			best.element.addClass('show');
			
			// Now set the best element as the current element
			elements.tags.current = best.element;
			
			// Move the element to the top
			best.element.getParent().grab(best.element, 'top');
		}
	}
	
	/**
	 * Sets the tags search string and then searches
	 * 
	 * @param {String} search Your custom search string
	 */
	function customTagSearch(search) {
		elements.tags.search.set('value', search);
		tagSearch();
	}
	
	// If the tag search element exists then we are on tags.html
	// This means that when the user types in the search box we need to filter the tags
	if(elements.tags.search.length > 0) {
		// Start by adding the events for key presses
		// We will re-search on every press
		elements.tags.search.addEvent('keydown', tagSearch);
		
		// If a heading is clicked we do a search for that element
		elements.tags.headings.addEvent('click', function() {
			customTagSearch(this.getParent().get('data-tag'));
		});
		
		// If there is a hash then search for it by default
		if(window.location.hash.length > 0) {
			customTagSearch(window.location.hash.slice(1));
		}
	}
}(this));