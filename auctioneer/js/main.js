var profiles = new ProfileCollection([
	{
		name: 'Kim',
		photo: '/assets/kim-basic.jpg',
		replacement: '/assets/bond.png'
	},
	{
		name: 'TWEAK',
		photo: '/assets/tweak-basic.jpg',
		replacement: '/assets/priest.png'
	},
	{
		name: 'Anthony',
		photo: '/assets/anthony-basic.jpg',
		replacement: '/assets/skeleton.png'
	},
	{
		name: 'Addie',
		photo: '/assets/addie-basic.png',
		replacement: '/assets/superman.png'
	},
	{
		name: 'Mystery',
		photo: '/assets/mystery-basic.jpg',
		replacement: '/assets/yoda.jpg'
	}
]);

var auctioneer = new Auctioneer({
	el: document.body,
	model: profiles
});
auctioneer.render();
