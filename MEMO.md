# 131 package.jsonのマージ
①dependencies.devdependenciesをコピーしてマージ先に貼り付け.重複する物があればどちらかを削除
②scriptsをコピーしてマージ先に貼り付け.npm-run-allかconcurrentlyを使って並列に実行するscriptを作成

# 134 CORSとは
http://localhost:3000 や http://localhost:8080 のようなパス以外の部分のURLの事をオリジンと言います
異なるオリジンからのJavaScriptを使ったデータ取得(XHRなど)はサーバ側のレスポンスヘッダーにAccess-Control-Allow-Originが適切に設定していなければデータを取得する事が出来ません.サーバ側のレスポンスヘッダーを適切に設定する事でデータ取得を行う事が出来ます
