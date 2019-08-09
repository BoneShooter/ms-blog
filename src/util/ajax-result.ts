import { PlainObject } from '../interface/object';

function AjaxPaginationResult(page: number, size: number, total: number, list: PlainObject[]) {
    const t1 = Math.floor(total / size);
    let t2 = 0;
    if ((total % size) !== 0) {
        t2 = 1;
    }
    const totalPage = t1 + t2;
    const response = {
        code: 200,
        data: {
            pagination: {
                page,
                size,
                total,
                totalPage
            },
            result: list
        }
    };
    return response;
}

function AjaxResult(data?: any) {
    const response = {
        code: 200,
        data
    };
    return response;
}

function AjaxResultError(code: number, message: string) {
    const response = {
        code,
        message
    };
    return response;
}

export { AjaxPaginationResult, AjaxResult, AjaxResultError };
