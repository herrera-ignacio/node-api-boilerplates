import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { Roles } from '../models';
import { UserService, NoteService } from '../services';
import { JWT_SECRET } from '../config';

const userService = new UserService();
const noteService = new NoteService();

export const verifyToken = async (req, res, next) => {
	let token = String(req.headers.authorization || '');
	
	if (!token) return res.status(403).json({ message: 'No authentication header provided'});

	if (token.startsWith('Bearer ')) {
		token = token.substring(7, token.length);
	}

	try {
		const decodedToken = jwt.verify(token, JWT_SECRET);

		req.user = await userService.getUser({ id: decodedToken.id }, { withRoles: true });

		next();
	} catch (error) {
		return res.status(401).json({ message: 'Authentication error' });
	}
}

export const verifyAuthorization = ({ roleName, ownerId } = { roleName: Roles.ADMIN, ownerId: undefined }) => async (req, res, next) => {
	if (roleName) {
		for (let role of req.user.roles) {
			if (role.name === roleName) {
				return next();
			}
		}
	}

	if (ownerId) {
		if (req.user.id === ownerId) {
			return next();
		}
	}

	return res.status(403).json({ message: 'Authorization failed' });
}

export const verifyNoteOwnership = async (req, res, next) => {
	try {
		const note = await noteService.getNote({ id: req.params.id });
	
		if (req.user.id === String(note.creator)) {
			return next()
		}

		return res.status(403).json({ message: 'Authorization failed' });
	} catch (error) {
		console.log(error);
		return res.status(403).json({ message: 'Authorization failed' });
	}
}
