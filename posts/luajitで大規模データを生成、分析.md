---
slug: luajit-torch-svm
date: '2019-10-27'
title: LuaJITで大規模データを生成、分析
category: tech
tags:
  - LuaJIT
  - Torch7
  - 機械学習
author: 平松
---
データ分析では基本的にPythonを使えば問題ありませんが、場合によってはLuaJITで書かれたTorch7を使う必要もあります。そこで今回はLuaJITで1億件の大規模データを扱い、Torch7で実装されたLIBLINEARで教師あり学習する方法を紹介します。Windows10の環境を整えるところから説明しているので、データ分析の一連の流れを学ぶことができます。

## 前提

まず、Windows10のローカル環境にBash on Windowsを入れていない場合はインストールします。Bash on Windowsについてはググってみると記事がたくさん見つかります。今回はBash on Ubuntu on Windowsを使用します。端末を起動し、初期設定を終えたら、最低限必要なパッケージをインストールします。次のコマンドを一行ずつ入力してください。
```
sudo apt-get update
sudo apt-get install build-essential cmake libreadline-dev
```
次に、```cd ~```でホームディレクトリに移動してください。ホームディレクトリであることを確認したら、以下のコマンドを一行ずつ実行してください。
```
git clone https://github.com/torch/distro.git ~/torch --recursive
cd ~/torch; bash install-deps;
./install.sh
source ~/.bashrc
sudo apt-get install lua5.1 parallel
cd ~; git clone git://github.com/koraykv/torch-svm.git
cd ~/torch-svm; luarocks make
```

以上の作業によって、LuaJIT、LuaRocks、Torch7、Lua5.1、GNU parallel、torch-svmのインストールが完了します。```luajit```や```th```コマンドによってTorchのインタプリタが起動します。```lua```コマンドでは処理速度の遅い、標準実装のLua5.1が起動します。インタプリタから抜け出すには```Ctrl+C```を入力します。

LuaJITには2GBのメモリ制限があるので、大きなファイルを移動したい場合などは標準実装のLuaを使うと便利です。今回インストールしたLuaJITやLuaの規格はLua5.1ですが、Luaの最新の言語規格はLua5.3です。Lua5.3では様々な制限が撤廃されていますが、今回は使いません。GNU parallelはデータ生成を最適化するために使います。また、インストール完了後、ディスクに10GB以上の空き容量があること確認してください。

## ベンチマーク
LuaJITはJavaと同じ実行時コンパイルを採用しているため、LuaやPythonの標準実装より遥かに高いパフォーマンスを持ちます。処理速度を試すために、ベンチマークしてみましょう。今回は特に意味のない並び替え問題を計算してファイルに書き出すまでの処理を試します。Windowsのデスクトップなどに```gen.lua```というファイルと```outputs```というフォルダを作成し、任意のエディタで次のコードを入力してください。
```
local start = os.clock()
local output = io.open("outputs/output"..arg[1]..".txt" ,"w")
local function fact(n) return n <= 0 and 1 or n * fact(n-1) end
math.randomseed(arg[1])

for i=1,100000 do
  local tmp, ary, sum, mul = {}, {}, 0, 1

  for i=1,10 do table.insert(tmp, math.random(10)) end
  for i,v in ipairs(tmp) do ary[i] = math.floor(10-math.pow(v, i/10)) end
  for _,v in ipairs(ary) do sum, mul = sum + v, mul * fact(v) end
  local str = (fact(sum) / mul > 1e+60 and "+1" or "-1").." "
  for i,v in ipairs(tmp) do str = str..i..":"..(v/5-1.1).." " end

  output:write(str.."\n")
end

output:close()
print(arg[1], os.clock() - start)
```
実際のデータはもっと複雑に生成され、ラベルは手動で付けられますが、今回は実験的に、至って簡潔に生成しています。次に、
```
luajit /mnt/c/Users/Windowsのユーザー名/Desktop/gen.lua 1
lua /mnt/c/Users/Windowsのユーザー名/Desktop/gen.lua 1
```
を実行して、実行速度の違いを確認してみましょう。私の環境では次のようになりました。
```
1       1.34375
1       3.25
```
場合によっては十倍以上の差が出ることもありますが、今回はあまり最適化されなかったようです。```outputs/output1.txt```という6MBくらいのファイルが書き出されていることも確認してください。このファイルはサポートベクターマシンを使うときに必要になります。開いてみると分かりますが、
```
LABEL 1:VALUE 2:VALUE 3:VALUE ...
LABEL 1:VALUE 2:VALUE 3:VALUE ...
```
という形式になっています。LABELは-1か1であり、VALUEは-1~1にスケールされていることを確認してください。
これはLIBSVMやLIBLINEARを使うためによく目にする規格です。今回は並び替えが10^60通り以上あるものに限り、LABELを+1にしています。バイナリ形式も使えるらしいですが、詳しく調べていないのでわかりません。

## マルチスレディング
ここからの工程は、ディスクに10GB以上の空き容量があることを確認してから行ってください。1時間100円くらいの相場ですが、32コア64スレッドのマシンをクラウドサービスでレンタルすることもできます。

大規模データを扱う場合には更なる速度が必要になることもあります。次はGNU parallelを使ってプロセスを増やし、1000件のファイル、合計1億件のデータを生成しましょう。次のコマンドを入力することで、複数のプロセスを同時に動かしてデータを生成します。マルチコアCPUなら並列処理になるので、処理速度が改善します。プロセス数は使用しているマシンの性能に合わせて調整してください。通常は4とか8になると思います。これは10分間くらいCPUに負担をかけるので自己責任でお願いします。
```
parallel --jobs 4 luajit ::: /mnt/c/Users/Windowsのユーザー名/Desktop/gen.lua ::: {1..1000}
```
```outputs```ディレクトリに1000件のファイルが生成されたら成功です。

## サポートベクターマシン
それでは機械学習に移ります。デスクトップに```svm.lua```というファイルを作成し、次のように編集してください。
```
require "svm"

model = liblinear.train(svm.ascread("outputs/output1.txt"))
for i=2,1000 do
  local d = svm.ascread("outputs/output"..i..".txt")
  liblinear.predict(d,model)
end
```
ファイルを作成したら、次のコマンドを入力してください。
```
th /mnt/c/Users/Windowsのユーザー名/Desktop/svm.lua
```
そしたらザザーっと予測結果が流れてくると思います。output1.txtに入っている100000件のデータを教師データとし、他の99900000件のテストデータを予測しています。1000分割されているので、途中で止めたい場合は```Ctrl+C```を入力してください。一例を挙げると、次のようになっています。
```
Reading outputs/output110.txt
# of positive samples = 47385
# of negative samples = 52615
# of total    samples = 100000
# of max dimensions   = 10
Min # of dims = 10
Max # of dims = 10
Accuracy = 94.277% (94277/100000)
```
今回の例では、およそ94%を正解させることができました。現実の問題では、output1.txtのみがラベル付きの訓練データで、他の999個のファイルは全て未知のデータと考えることができるので、SVMは有用なアルゴリズムであることがわかります。

## 実際の例
実際の例でSVMを使う場合、本当は交差検証などを重ねて正確性を保証する必要があります。LIBLINEARは非常に高速で使い勝手の良いアルゴリズムですが、LIBSVMの方がパラメータ設定の手間や学習時間が掛かる代わりに高い精度を出せることがあります。また、サンプル数が多ければSVMでなくランダムフォレストで並列処理した方が効率的です。ニューラルネットの出力をSVMの入力として使うこともあります。

他にもtorch.nnやtorch-rlも使ってみて、できるだけ多くの分析手法を習得すると良いです。たとえば私は最近Lua製のスマホゲームのレベルデザインを自動化しましたが、このように自分で課題を見つけて実用性のある分析をすると楽しめます。
