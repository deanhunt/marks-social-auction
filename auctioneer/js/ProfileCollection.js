window.ProfileCollection = Backbone.Collection.extend({
	model: ProfileModel,

	/**
    * Key for local storage.		    
    * Change this value for a new instantiation of your app.
	*/
	key: 'arthackday_goingdark',

	load: function(){
		var json = localStorage.getItem(this.key);
		if (json){
			json = JSON.parse(json);
			this.reset(json);
		} else {
			this.boot();
		}
	},

	save: function(){
		var json = this.toJSON();
		localStorage.setItem(this.key, JSON.stringify(json));
	},

	clear: function(){
		localStorage.removeItem(this.key);
		this.boot();
	},

	boot: function(){
		this.reset([
			{
				name: 'Kim',
				photo: 'assets/kim-basic.jpg',
				replacement: 'assets/bond.png'
			},
			{
				name: 'TWEAK',
				photo: 'assets/tweak-basic.jpg',
				replacement: 'assets/priest.png'
			},
			{
				name: 'Anthony',
				photo: 'assets/anthony-basic.jpg',
				replacement: 'assets/skeleton.png'
			},
			{
				name: 'Darsha',
				photo: 'assets/darsha-basic.jpg',
				replacement: 'assets/superman.png'
			},
			{
				name: 'Mystery',
				photo: 'assets/mystery-basic.jpg',
				replacement: 'assets/yoda.jpg'
			}
		]);
	}
});
