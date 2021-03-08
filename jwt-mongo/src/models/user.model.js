import { model } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserSchema } from '../schemas';

class UserModel {
	async encryptPassword(pwd) {
		const salt = await bcrypt.genSalt(10);
		return bcrypt.hash(pwd, salt);
	}

	async validatePassword(pwd) {
		return bcrypt.compare(pwd, this.password);
	} 
}

UserSchema.loadClass(UserModel);

UserSchema.pre('save', async function() {
	const user = this;

	if (!user.isModified('password')) return;

	const hashedPwd = await this.encryptPassword(user.password);
	user.password = hashedPwd;

	return user;
});

export const User = model('User', UserSchema);
