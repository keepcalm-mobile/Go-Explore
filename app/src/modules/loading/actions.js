import t from './types';

export function isLoading(iBool) {
    return {
        type: t.IS_LOADING,
        isLoading: iBool,
    };
}
