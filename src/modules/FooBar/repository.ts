import type { ICatchError } from "../../utils/interfaces";
import type * as interfaces from "./interfaces";

export const foo = async () => {
	try {
		// handle with your database
		const obj: interfaces.IFooBar = {
			BAR: 'FOO'
		}
		return obj;
	} catch (error) {
		const { stack } = error as ICatchError;
		console.error(stack);
		throw new Error(stack);
	}
};
