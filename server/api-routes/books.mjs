import express from "express";
import { body } from "express-validator";   //飛んできたJSONをチェックするライブラリです
import { getAllBooks, getBookById, deleteBook, registBook, updateBook } from "../controllers/books.mjs";
import { requestErrorHandler } from "../helpers/helper.mjs";
const router = express.Router();

//api/books
router.get("/", requestErrorHandler(getAllBooks));

//個別記事の取得
router.get("/:id", requestErrorHandler(getBookById));

//個別記事の作成
router.post("/", 
body("title").notEmpty(),
body("description").notEmpty(),
body("comment").notEmpty(),
body("rating").notEmpty().isInt({ min: 1, max: 5 }), 
registBook)

//個別記事の更新
router.patch("/:id",
body("title").optional().notEmpty(),
body("description").optional().notEmpty(),
body("comment").optional().notEmpty(),
body("rating").optional().notEmpty().isInt({ min: 1, max: 5 }),
requestErrorHandler(updateBook)
)

//個別記事の削除
router.delete("/:id", requestErrorHandler(deleteBook));

export default router;

//validator.js
//https://github.com/validatorjs/validator.js

//Model.find().sort()で降順に並び替えて取得出来ます
//Model.findById()でobjectIDをキーにドキュメントを取得出来ます
//await new Model(object).save()でドキュメントとしてMongoDBに保存します
//Model.propを書き換えてModel.save()を行うとその状態のModelでドキュメントを更新します

//express-validatorのbody関数を使うとPOSTで送られてきた値のvalidationが行える.validationを全て行った後エラーが無ければルーティングされるという流れになる
//body("rating").notEmpty().isInt({ min; 1, max; 5 })はJSONで送られてきたkey:ratingのvalueに対して空なら弾く・1~5までの値以外なら弾く処理を追加しています
//body("rating").optional()でJSONに該当するkeyがない場合そのvalidationCheckを無視する事が出来ます

//try-catchで例外処理を記述します.コントローラ毎にtry-catchを記述するのはめんどくさいのでリクエストハンドラにエラー処理を行う関数を実装します