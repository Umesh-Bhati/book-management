export interface IBook {
	_id: string;
	author: string;
	title: string;
	published?: boolean;
}

export interface IUser {
	name: string;
	email: string;
	password: string;
}