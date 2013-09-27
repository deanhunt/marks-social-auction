window.Auctioneer = Backbone.View.extend({
	// Provide a localstorage model.

	events: {

	},

	initialize: function(){

	},

	render: function(){


		this.redraw_();

		// Bind our keyboard handler.
		this.el.addEventListener('keydown', this.keydownEvent_.bind(this));
	},

	/**
	 * Updates the size of the bar graphs and does stuff.
	 */
	redraw_: function(){
		var profileEls = this.el.querySelectorAll('#graph-profiles li');
		Array.prototype.slice.call(profileEls).forEach(function(el){
			el.style.width = (8 * parseInt(el.dataset.bids, 10)) + '%';
		}, this);
	},

	bid_: function(evt){
		// Normalize to the number represented by the key, then change to 0-indexed.
		// E.g., 49 - 1 = '1' key; '1' key set to 0-index = 48.
		var index = evt.which - 49;
		var isIncrease = !evt.shiftKey;

		// Assume that elements are returned in the order that they're rendered into the document.
		var profileEl = this.el.querySelectorAll('#graph-profiles li')[index];
		var bids = parseInt(profileEl.dataset.bids, 10);
		profileEl.dataset.bids = isIncrease ? bids + 1 : bids - 1;

		profileEl.classList.add('active');
		profileEl.classList.remove('active');

		this.redraw_();
	},

	keydownEvent_: function(evt){
		switch (evt.which){
			case 49: // '1'.
			case 50: // '2'.
			case 51: // '3'.
			case 52: // '4'.
			case 53: // '5'.
				this.bid_(evt);
				break;
		}
	}
});
