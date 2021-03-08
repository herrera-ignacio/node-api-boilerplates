export class NoteController {

	getNotes(_req, res, next) {
		try {
			res.status(200).json({ data: [] });
		} catch (error) {
			next(error);
		}
	}
}
