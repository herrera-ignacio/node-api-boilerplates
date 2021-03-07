import bcrypt from 'bcrypt';
import { Role, User } from '../models';

const createInitialRoles = async () => {
	try {
		if (await Role.estimatedDocumentCount() > 0) return;

		const roles = await Promise.all([
			new Role({ name: 'user' }).save(),
			new Role({ name: 'moderator' }).save(),
			new Role({ name: 'admin' }).save(),
		]);

		console.log('[INFO] Created initial roles');

		return roles;
	} catch (error) {
		console.error(error);
	}
}

const createInitialUser = async () => {
	const adminUser = await User.findOne({ email: 'admin@localhost' });
	const privilegedRoles = await Role.find({ name: { $in: ['admin', 'moderator'] } });

	if (!adminUser) {
		try {
			const admin = await User.create({
				username: 'admin',
				email: 'admin@localhost',
				password: 'admin',
				roles: privilegedRoles.map(role => role._id),
			});
	
			console.log('[INFO] Admin user created');
	
			return admin;
		} catch (error) {
			console.error(error);
		}
	}
}

export const setupDb = async () => {
	await createInitialRoles();
	await createInitialUser();
}
