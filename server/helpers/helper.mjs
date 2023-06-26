//基本try-catchで囲んでエラーを吸い取るような形で例外処理を実装します.全てのコントローラに例外処理を記述するのはめんどくさいのでこの関数を使います
function requestErrorHandler(controller) {
    return async function(req, res, next) {
        try {
            return await controller(req, res);
        } catch(err) {
            next(err);
        }
    }
}

export {
    requestErrorHandler
}