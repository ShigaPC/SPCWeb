# Shiga University Computer Club's  Website

This is the rep for the [Shiga Univ Computer Club's website]("www.shigapc.com").

## Would you like to join us?

You can contact us in many different ways!

* [Twitter@densan_public]("https://twitter.com/densan_public")
* visit our exibition at 開学祭 or 滋大祭
* attend our welcome event
* send a pull request

## 記事を投稿する方法

1. `www.shigapc.com/admin/`からログイン（またはSign inリンクを踏む）
1. `New Posts`をクリック
1. 各種項目を埋めて`Publish`をクリックしたら完了！（ビルドに数分掛かります）

* 下書き機能を準備中です
* ページネーション機能（記事が多くなると一覧表示が長くなってしまうのを防ぐ）を準備中です
* Slugは`test-post`のように、**スラッシュを付けずに**ケバブケース（ハイフン繋ぎ）で記述してください。`.html`は付けなくても大丈夫です。日本語も使えますが、Twitterに張り付けたりするとurlがパーセントエンコードされるかもしれません
* 投稿後のＵＲＬは、`www.shigapc.com/category-name/post-name`となります
* urlが偶然重複してしまうことも考えられます。バグったらスラッグを変えてみてください
* Categoryに`tech`か`news`か`projects`を**小文字で**設定すると、自動的にトップページで紹介されます
* Categoryに`notices`を設定すると、トップページに目立つように表示されます。イベントの告知などに使ってください
* Tagは日本語もＯＫです。カンマ区切りで複数入力することもできます
* 本分はリッチテキストエディタかマークダウン記法を選べますが、リッチテキストエディタは英字用に作られている為、日本語を入力すると誤動作を起こすことがあります
* ページが増えすぎると、ビルドに時間が掛かるようになります。ビルドに１５分以上かかると強制終了するので、更新が反映されないと思ったらウェブマスターに報告してください
* 何かの拍子にログインページが404 Not Foundになったら、ブラウザのシークレットモードで開いてください

## Please Contribute!

　このサイトは[GatsbyJS]("https://www.gatsbyjs.org/")で作られています。ブログなどの、本来であればサーバーと通信しながら動的に生成するコンテンツを、NodeJSサーバーで元からすべて生成しておくことで、ただのHTMLとJavaScriptだけで表示することができます。サーバーも無料のものを使えるのでお手軽です。ページが増えすぎるとビルドに時間が掛かってしまうという欠点がありますが、小規模だけど少し豪華なサイトにしたい案件に最適です。

　ReactというFacebook製のツールセットとES6で比較的容易に書けるので、このサイトはおもちゃにしてください。GitHubと同期されているので、マスターブランチの変更は即座にサイトに反映されます。あるいはブランチを作ってプルリクエストしてください。

## バグを発見したら

　自分で直すか、Issuesに投稿するか、ウェブマスターに問い合わせてください。あるいは、Netlifyのキャッシュを消すとうまくいくかもしれません。

## ウェブマスターの引継ぎ

　引継ぎの際に必要となる技術関連の云々はサイト内で記事にしていきます。
