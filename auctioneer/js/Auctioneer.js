window.Auctioneer = Backbone.View.extend({
	// Provide a localstorage model.

	initialize: function(){
		this.mousemoveSkewEventBound_ = this.mousemoveSkewEvent_.bind(this);

		this.timer_ = new Timer({
			el: this.el.querySelector('#timer'),
			duration: 900,
			onDone: this.auctionOver_.bind(this)
		});

		this.model.on('reset', function(){
			this.drawProfiles_();
			this.redraw_();
		}.bind(this));
	},

	render: function(){
		this.drawProfiles_();

		this.redraw_();

		// Bind our keyboard handlers.
		this.el.addEventListener('keydown', this.keydownEvent_.bind(this));
		this.el.addEventListener('keyup', this.keyupEvent_.bind(this));

		this.timer_.render();
		this.timer_.start();
	},

	drawProfiles_: function(){
		var graphEl = this.el.querySelector('#graph-profiles');
		graphEl.innerHTML = '';

		var profileTemplate = document.querySelector('#template-profile').innerHTML;
		this.model.forEach(function(profile, i){
			var data = profile.toJSON();
			data.index = i + 1;
			data.cost = data.bids * Auctioneer.BID_INCREMENT;
			var markup = _.template(profileTemplate, data);
			graphEl.innerHTML = graphEl.innerHTML + markup;
		}, this);
	},

	/**
	 * Updates the size of the bar graphs and does stuff.
	 */
	redraw_: function(){
		var profileEls = this.el.querySelectorAll('#graph-profiles li');
		Array.prototype.slice.call(profileEls).forEach(function(el){
			el.style.width = (40 * parseInt(el.dataset.bids, 10)) + 225 + 'px';
		}, this);
	},

	bid_: function(evt){
		// Normalize to the number represented by the key, then change to 0-indexed.
		// E.g., 49 - 1 = '1' key; '1' key set to 0-index = 48.
		var index = evt.which - 49;
		var isIncrease = !evt.shiftKey;

		// Assume that elements are returned in the order that they're rendered into the document.
		var profileEl = this.el.querySelectorAll('#graph-profiles li')[index];
		var bids = parseInt(profileEl.dataset.bids, 10) || 0;

		if (!bids && !isIncrease) return;

		var updatedBid = isIncrease ? bids + 1 : bids - 1;
		profileEl.dataset.bids = updatedBid;
		profileEl.dataset.cost = updatedBid * Auctioneer.BID_INCREMENT;

		this.model.at(index).set('bids', updatedBid);
		this.model.save();

		// if (parseInt(profileEl.dataset.bids, 10) > Auctioneer.ON_FIRE_BIDS){
		// 	profileEl.classList.add('on-fire');
		// }

		if (isIncrease){
			profileEl.classList.add('higher');
			setTimeout(function(){
				profileEl.classList.remove('higher');
			}, 500);
		} else {
			profileEl.classList.add('lower');
			setTimeout(function(){
				profileEl.classList.remove('lower');
			}, 500);
		}

		this.redraw_();
	},

	save_: function(){

	},

	load_: function(){

	},

	auctionOver_: function(){
		alert('Auction over!');
	},

	bling_nyan_: function(evt){
		if (this.nyanTimer_) return;

		var nyanEl = this.el.querySelector('#bling-nyan');
		nyanEl.classList.add('active');
		this.nyanTimer_ = setTimeout(function(){
			nyanEl.classList.remove('active');
			this.nyanTimer_ = null;
		}.bind(this), 1200);
	},

	bling_fog_: function(){
		var fogEl = this.el.querySelector('#bling-fog');
		fogEl.classList.toggle('active');
	},

	bling_cornify_: function(){
		cornify_add();
	},

	bling_start_skew_: function(){
		if (this.bling_isSkewing_) return;

		this.bling_isSkewing_ = true;
		document.addEventListener('mousemove', this.mousemoveSkewEventBound_);
	},

	bling_stop_skew_: function(){
		document.removeEventListener('mousemove', this.mousemoveSkewEventBound_);

		this.bling_isSkewing_ = false;
	},

	bling_replace_: function(evt){
		var graphEl = this.el.querySelector('#graph-profiles');
		graphEl.classList.toggle('replace');
	},

	bling_reset_: function(evt){
		document.body.style.webkitTransform = '';

		if (evt.shiftKey){
			var cornifyEls = this.el.querySelectorAll('.cornify');
			Array.prototype.slice.call(cornifyEls).forEach(function(el){
				el.parentElement.removeChild(el);
			}, this);
		}
	},

	bling_mystery_: function(evt){
		var mysteryEl = this.el.querySelector('#bling-mystery');
		mysteryEl.classList.toggle('active');
	},

	mousemoveSkewEvent_: function(evt){
		var xPercentage = evt.clientX / document.body.clientWidth;
		var yPercentage = evt.clientY / document.body.clientHeight;

		var xDeg = 20 * xPercentage - 10;
		var yDeg = 20 * yPercentage - 10;
		var skew = 'skew(' + xDeg + 'deg,' + yDeg + 'deg)';
		var scale = 'scale(' + (xPercentage * yPercentage) + ')';
		document.body.style.webkitTransform = skew + ' ' + scale;
	},

	keydownEvent_: function(evt){
		switch (evt.which){
			case 27: // 'Esc'.
				this.bling_reset_(evt);
				break;
			case 49: // '1'.
			case 50: // '2'.
			case 51: // '3'.
			case 52: // '4'.
			case 53: // '5'.
				this.bid_(evt);
				break;
			case 67: // 'c'.
				this.bling_cornify_(evt);
				break;
			case 70: // 'f'.
				this.bling_fog_(evt);
				break;
			case 77: // 'm'.
				this.bling_mystery_(evt);
				break;
			case 78: // 'n'.
				this.bling_nyan_(evt);
				break;
			case 82: // 'r'.
				this.bling_replace_(evt);
				break;
			case 83: // 's'.
				this.bling_start_skew_(evt);
				break;
		}
	},

	keyupEvent_: function(evt){
		switch (evt.which){
			case 83: // 's'.
				this.bling_stop_skew_(evt);
				break;
		}
	}
});

Auctioneer.ON_FIRE_BIDS = 5;

Auctioneer.BID_INCREMENT = 5;
