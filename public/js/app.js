window.addEventListener('load', () => {
	const el = $('#app');
	const appTemplate = Handlebars.compile($('#app-template').html());
	const errorTemplate = Handlebars.compile($('#error-template').html());

	const router = new Router({
		mode: 'history',
		page404: (path) => {
			const html = errorTemplate({
				title: 'Error 404 - Page NOT Found!',
				message: `The path '/${path}' does not exist on this site`,
			});
			el.html(html);
		},
	});

	router.navigateTo('');
	const html = appTemplate();
	el.html(html);

	$('#btnRun').click(async (evt) => {
		let res = await $.get("/api/run");
		console.log(res);
	})

	$('#btnCheck').click(async (evt) => {
		let files = await $.get("/api/check");
		console.log(files);
	})

});