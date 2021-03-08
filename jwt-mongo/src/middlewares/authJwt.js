import jwt from 'jsonwebtoken';
import { UserService } from '../services';
import { JWT_SECRET } from '../config';

export const verifyToken = async (req, res, next) => {
	let token = String(req.headers.authorization || '');
	
	if (!token) return res.status(403).json({ message: 'No authentication header provided'});

	if (token.startsWith('Bearer ')) {
		token = token.substring(7, token.length);
	}

	try {
		const decodedToken = jwt.verify(token, JWT_SECRET);
	
		const userService = new UserService();

		req.user = await userService.getUser({ id: decodedToken.id }, { withRoles: true });

		next();
	} catch (error) {
		return res.status(401).json({ message: 'Authentication error' });
	}
}

export const verifyRole = (roleName) => async (req, res, next) => {
	for (let role of req.user.roles) {
		if (role.name === roleName) {
			next();
			return;
		}
	}

	return res.status(403).json({ message: 'Authorization failed' });
}