window.Timer = Backbone.View.extend({
	ticker_: null,

	seconds_: 0,

	initialize: function(options){
		options = options || {};

		this.seconds_ = options.duration || 1800;
		this.onDone_ = options.onDone || function(){};

		this.keydownEventBound_ = this.keydownEvent_.bind(this);
	},

	render: function(){
		this.el.addEventListener('focus', this.focusEvent_.bind(this));
		this.el.addEventListener('blur', this.blurEvent_.bind(this));
	},

	start: function(){
		if (this.ticker_) clearInterval(this.ticker_);

		this.ticker_ = setInterval(this.tick_.bind(this), 1000);
	},

	stop: function(){
		if (this.ticker_) clearInterval(this.ticker_);
		this.ticket_ = null;
	},

	tick_: function(){
		this.seconds_--;
		this.el.innerText = this.secondsToString_(this.seconds_);

		if (!this.seconds_){
			this.stop();
			this.onDone_();
		}
	},

	secondsToString_: function(seconds){
		var minutes = Math.floor(seconds / 60);
		seconds = seconds % 60;
		if (seconds < 10) seconds = '0' + seconds;
		return minutes + ':' + seconds;
	},

	stringToSeconds_: function(str){
		var split = str.split(':');
		var minutes = parseInt(split[0], 10);
		var seconds = parseInt(split[1], 10);
		if (!minutes && !seconds) return;
		return (minutes * 60) + seconds;
	},

	// Muting keyboard.
	keydownEvent_: function(evt){
		evt.stopPropagation();

		// Enter.
		if (evt.which === 13){
			evt.preventDefault();
			this.el.blur();
		}
	},

	focusEvent_: function(){
		this.stop();

		this.el.addEventListener('keydown', this.keydownEventBound_);
	},

	blurEvent_: function(){
		var newDuration = this.stringToSeconds_(this.el.innerText);
		if (newDuration) this.seconds_ = newDuration;

		this.start();

		this.el.removeEventListener('keydown', this.keydownEventBound_);
	}
});
