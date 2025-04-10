import { executeQuery } from "../../database/index";
import type { ICatchError } from "../../utils/interfaces";
import type * as interfaces from "./interfaces";

export const foo = async () => {
	try {
		const sql = `
            select 'bar' from dual
        `;
		const binds = {};
		const { rows } = await executeQuery<interfaces.IFooBar>({ sql, binds });
		return rows;
	} catch (error) {
		const { stack } = error as ICatchError;
		console.error(stack);
		throw new Error(stack);
	}
};
