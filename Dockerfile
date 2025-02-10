#node.jsイメージをベースにする
FROM node:22-alpine 
#Docker接続時に入るディレクトリ
WORKDIR /home/File-Timestamp-App
#起動時に実行されるコマンド
RUN npm install -g npm

# アプリケーションのソースコードをコピー
COPY . .

# 依存関係をインストール
RUN npm install

# 開発サーバーを起動
CMD ["npm", "run", "dev"]