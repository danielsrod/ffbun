import type { ICatchError } from '../../utils/interfaces';
import * as repository from './repository';

export const foo = async (params: object, query: object, body: object) => {
    try {
        const result = await repository.foo();
        return result;
    } catch (error) {
        const { message } = error as ICatchError;
        throw new Error(message);
    }
}