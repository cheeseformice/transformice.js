/**
 * @category Error
 */
export class TFMConnectionError extends Error {
	protected _isTFMConnectionError: boolean;
	constructor(public serverType: "main" | "bulle", message?: string) {
		super(message);
		this._isTFMConnectionError = true;
	}

	static isThis(payload: any): payload is TFMConnectionError {
		return typeof payload === "object" && payload._isTFMConnectionError === true;
	}
}
