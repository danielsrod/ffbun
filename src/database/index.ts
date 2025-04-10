import * as oracledb from 'oracledb';
import type { ICatchError } from '../utils/interfaces';
import type { IOracleQueryOptions } from './interfaces';
import { env } from '../utils/env';

const options: oracledb.PoolAttributes = {
	user: env.ORACLE_USER,
	password: env.ORACLE_PASSWORD,
	connectionString: env.ORACLE_CONNECTIONSTRING,
	poolMin: 10,
	poolMax: 50,
	poolIncrement: 5,
	poolTimeout: 60,
	queueTimeout: 60000,
	queueMax: 1000
};

const executeOptions: oracledb.ExecuteOptions = {
	autoCommit: true,
	outFormat: oracledb.OUT_FORMAT_OBJECT
};

export const startPool = async () => {
    try {
        await oracledb.createPool(options);
    } catch (error) {
        const { stack } = error as ICatchError
        throw new Error(stack)
    }
}

export const executeQuery = async <T>(prop: IOracleQueryOptions): Promise<oracledb.Result<T>> => {
	const pool = await oracledb.getConnection();
	try {
		const { sql, binds } = prop;
		const result = await pool.execute(sql, binds, executeOptions) as oracledb.Result<T>;
		return result;
	} catch (error) {
		console.error(`Error in executeQuery: ${error}`);
		throw new Error(`Error in executeQuery: ${error}`);
	} finally {
		await pool.close();
	}
};
