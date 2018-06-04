---
slug: gatsby-amp-pwa
date: '2018-06-04'
title: Gatsby製の当サイトがAMPとPWAに対応しました
category: tech
tags:
  - Gatsby
  - PWA
  - AMP
  - ウェブサイト
  - Lighthouse
author: 平松
---
　モバイルWebに対応しました。ウェブ屋さん的に言うと、PWAやAMPと呼ばれる最先端のモバイル最適化技術を導入しました。

　AndroidかiPhone(iOS 11.3以降)でこのサイトにアクセスしていただくと、PWAの機能を体験できます。

　また、[こちら](https://www.shigapc.com/amp/)が自動生成されたトップページのAMP版となります。

　パフォーマンスの最適化も行いました。Lighthouseによるこのサイトのスコアが以下となります。

![Lighthouse result](/assets/lighthouse.png)

## PWAやAMPとは

　PWAはブラウザでネイティブアプリに近い体験を実現するための仕組みです。[ServiceWorker](https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja)をインストールすることでオフラインで動作したり、[ウェブアプリマニフェスト](https://developers.google.com/web/fundamentals/web-app-manifest/?hl=ja)を設定してあたかもネイティブアプリのように振舞います。

　ユーザーにとっての印象はあまり大きくないかもしれませんが、今後新しく登場するウェブサービスではネイティブアプリとウェブアプリが統合されるかもしれないということは、頭の隅にでも留めておいてください。ちなみに、昨年度の滋大祭で展示した時計もPWAを使っていました。

　AMPはウェブサイトを高速で表示するためのHTML/CSS/JavaScriptの作法です。ここ半年の間に、スマホの検索結果に⚡マークの付いたサイトが続々と増えてきていたのにお気づきでしょうか。⚡はAMPに対応したサイトに付けられるマークです。快適にページを閲覧できるかどうかの一つの指標にもなるので覚えておいて損はないと思います。

　で、ウチもパソコン研究会を名乗っている以上、それらを実装することにしました。

## GatsbyJSにAMPを導入する

　AMPはクライアントで動作するHTML/CSS/JavaScriptに制約を加えたものです。このサイトは何の捻りもないUIなので、AMPの範疇でしょう。一点だけ、CSSで背景画像を読み込むことはできないので、背景だけスタイルシートを分離しておきます。

　さて、GatsbyにAMP対応ページを生成してもらうための大まかな方針を説明します。GatsbyJSはまだ公式にAMPのサポートをしていないので、自力で実装することになります。

　`gatsby build`すると、GatsbyはReactを走らせて生のHTMLを書きだします。これがいわゆるSSR（サーバーサイドレンダリング）です。要はこのときに`/public/`に吐き出された静的ファイルを、`/public/amp/`にコピーしてAMPに対応させればよい訳です。

　gatsby-ssr.jsを弄ってレンダリング時にAMPを書き出すものを作っている人もいるそうですが、コードが見当たらなかったので、[公式が推している](https://www.gatsbyjs.org/features/#amp-support)方法で実装しました。リンク先で support this through plugins and starter kits と書かれているのですが、そのスターターキットというのがたぶん[これ](https://github.com/chiedo/gatsby-amp-starter-blog)です。この中に入っている`ampify.js`を借用します。

　`yarn install ampify`したら、この`ampify.js`をコピーしてルートディレクトリに投げ込み、サイトに合わせて適当に修正します。

　次に、ビルド時に`ampify.js`を走らせるための設定をします。`package.json`に

```
"scripts": {
    "build": "gatsby build && cp -r public amp && rm amp/*.js amp/*.map amp/*.css amp/*.xml amp/*.json amp/*.txt amp/*.webmanifest && mv amp public/amp && node ampify.js",
  },
```

　を追記します。これも自分のサイトに合わせて改良してください。以上でAMP化は完了です。デプロイする前に、Netlifyのビルドの設定を`npm run build`に書き換えておきましょう。

　最後に、`/amp/*`がAMPに対応しているか、[Googleが提供しているテストツール](https://search.google.com/test/amp)等で確認してください。imgタグにはインラインサイズを指定する必要があるため注意してください。

## GatsbyにPWAを実装する

　GatsbyJSを使っているなら、PWAは比較的簡単に実装することができます。

　ServiceWorkerをインストールしたい場合は、`gatsby-plugin-offline`を導入するだけです。ただし、ServiceWorkerをインストールするとNetlifyCMSが404エラーになるので、シークレットモードでアクセスする必要があります。

　ウェブアプリマニフェストは`gatsby-plugin-manifest`を入れると自動的に生成されます。`gatsby-config.js`でお好みに設定してください。ただし、ServiceWorkerと併用する場合、`gatsby-config.js`内で宣言するときに`gatsby-plugin-offline`が`gatsby-plugin-manifest`より下にくるようにしましょう。

## ampify.jsで生成したAMPページにPWAを実装する

　Gatsby製のサイトなら、AMPのページ内でPWAを動かす形態で十分でしょう。AMPページからServiceWorkerをインストールするには[amp-install-serviceworker](https://www.ampproject.org/docs/reference/components/amp-install-serviceworker)を別途使用する必要があります。

　`gatsby-plugin-offline`は`/sw.js`を生成しているので、同じ場所にServiceWorkerをインストールさせます。先ほどのampify.jsに

```
$('head').prepend(`<script async custom-element="amp-install-serviceworker"
  src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>`);

$('body').prepend(`<amp-install-serviceworker
      src="/sw.js" data-iframe-src="https://www.shigapc.com/sw.html"
      layout="nodisplay">
</amp-install-serviceworker>`);
```

　を付け足しておきましょう。これでAMPページにもServiceWorkerを導入できました。

## まとめ

　GatsbyJSなら、AMPやPWAも比較的容易に実装できることがわかりました。また、PWAとAMPを組み合わせたPWAMP化にも成功しました。これによって、スマート端末による閲覧が快適になりました。
