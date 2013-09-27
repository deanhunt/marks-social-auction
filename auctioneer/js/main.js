var profiles = new ProfileCollection([
	{
		name: 'First Guy',
		photo: '/assets/deanprofile.png'
	},
	{
		name: 'Second Guy',
		photo: 'nothing.gif'
	},
	{
		name: 'Third Guy',
		photo: 'nothing.gif'
	},
	{
		name: 'Fourths Guy',
		photo: 'nothing.gif'
	},
	{
		name: 'Fifth Guy',
		photo: 'nothing.gif'
	}
]);

var auctioneer = new Auctioneer({
	el: document.body,
	model: profiles
});
auctioneer.render();
