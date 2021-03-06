export class IndexController {
	index(_req, res, next) {
		try {
			res.json({
				name: pkg.name,
				author: pkg.author,
				description: pkg.description,
				version: pkg.version,
			});
		} catch {
			next(error);
		}
	}
}
