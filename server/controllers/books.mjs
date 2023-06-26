import { validationResult } from "express-validator";
import Book from "../models/book.mjs";

async function getAllBooks (req, res) {
    const books = await Book.find().sort({ updatedAt: -1 });        
    res.json(books);
}

async function getBookById (req, res) {
    //_idが存在しない場合について考える
    const _id = req.params.id;
    // const booksOne = await Book.findOne({_id: _id });  
    const book = await Book.findById(_id);

    if(book === null) {
        return res.status(404).json({ msg: "Page Not Found" });
    }
    res.json(book);
}

async function registBook (req, res) {
    //express-validatorを使ったエラー検知
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        const errs = errors.array();
        return res.status(400).json(errs);
    }

    const book = new Book(req.body);
    const newBook = await book.save();
    res.status(201).json(newBook);
}

async function updateBook (req, res) {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        const errs = errors.array();
        return res.status(400).json(errs);
    }

    const { title, description, comment, rating } = req.body;
    const _id = req.params.id;
    const book = await Book.findById(_id);

    if (book === null) {
        return res.status(404).json({ msg: "Page Not Found" });
    }

    if(title !== undefined) {
        book.title = title;
    }
    if(description !== undefined) {
        book.description = description;
    }
    if(comment !== undefined) {
        book.comment = comment;
    }
    if(rating !== undefined) {
        book.rating = rating;
    }

    await book.save();
    res.json(book);
}

async function deleteBook (req, res) {
    //基本はtry-catchで囲んでエラーを吸い取るような形で実装します.全てのコントローラに対して例外処理を実装するのはめんどくさいのでリクエストハンドラに関数を適用します
    const _id = req.params.id;
    const { deletedCount } = await Book.deleteOne({ _id });

    if (deletedCount === 0) {
        return res.status(404).json({ msg: "Target Book Not Found" });
    }

    res.json({ "meg": "Delete succeeded." });
}

export {
    getAllBooks,
    getBookById,
    registBook,
    updateBook,
    deleteBook
};

//validationResult(req)でvalidationCheckの結果を取得します.戻り値でResultオブジェクトを返します
//Result.isEmpty()でエラーがあったかどうかをbooleanで返します.errors.array()でエラーを配列で返します