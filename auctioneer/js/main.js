var profiles = new ProfileCollection();
profiles.load();

var auctioneer = new Auctioneer({
	el: document.body,
	model: profiles
});
auctioneer.render();
