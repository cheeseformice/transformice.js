export class TFMConnectionError extends Error {
	constructor(public serverType: "main" | "bulle", message?: string) {
		super(message);
		//this.name = 'ConnectionError';
		//Object.setPrototypeOf(this, new.target.prototype);
	}
}
