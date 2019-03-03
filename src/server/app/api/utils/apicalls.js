export const createResult = (data) => {
    return {
        success: true,
        data : data,
    };
}

export const createFailedResult = ({err, errType}) => {
    return {
        success: false,
        reasonType: errType,
        reason: err,
    };
}

export const bindCall = callName => (router, path, code, mapExceptionToFailResult) => {
    (router[callName])(path, async (req, res) => {
        try {
            let result = await code(req.body, {router, path, req, res});
            await res.json(createResult(result));
        } catch (error) {
            if (mapExceptionToFailResult) {
                error = await mapExceptionToFailResult(error, req.body, {router, path, req, res});
            }
            await res.json(createFailedResult(error));
        }
    });
};

export const bindGet = bindCall('get');
export const bindPost = bindCall('post');
export const bindPut = bindCall('put');
export const bindDelete = bindCall('delete');
export const bindInsert = bindCall('insert');
