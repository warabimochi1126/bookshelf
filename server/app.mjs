import path from "path";
import express from "express";
import env from "dotenv";
env.config();
import apiRoutes from "./api-routes/index.mjs";  //from "./server/api-routes"のようにディレクトリを指定してインポートするとそのディレクトリ内のindex.jsをインポートしてくれます

/* DB接続を担っているのでこれ移行mongoose.connect()を実行する必要がない.ミドルウェアで実装する物ではないのか？ */
import "./helpers/db.mjs";   //import "filePath"で指定したファイルを読み込んで実行しています

const app = express();
const port = process.env.PORT || 8080;  //.envにportが設定されていればそのportでサーバを立ち上げます.無ければ8080でサーバを立ち上げます

//buildフォルダ内のファイルをサーバから取得出来るよう設定しています
app.use(express.static("build"));

app.use(express.json());

//cors()をミドルウェアに設定する事で別オリジンからのデータ取得に対応する事が出来ます
// import cors from "cors";
// app.use(cors({
//     origin: "*"
// }));

// API
app.use("/api", apiRoutes);

//ReactはSPAなのでindex.htmlを絶対に読み込む必要があります
app.get("*", (req, res) => {
    const indexhtml = path.resolve("build", "index.html");
    res.sendFile(indexhtml);
})

//ルーティング出来なかったときの処理
app.use((req, res) => {
    res.status(404).json({ msg: "Page Not Found" });
})

//ミドルウェアのエラーハンドリング
app.use((err ,req, res, next) => {
    //res.headersSentは既にレスポンスを返しているかを保持するプロパティです
    if(res.headersSent) {
        //デフォルトのエラーハンドラに処理を移します
        return next(err);
    }
    res.status(500).json({ msg: "不正なエラーが発生しました。" });
})
app.listen(port, () => {
    console.log(`Server Start:http://localhost:${port}`);
})