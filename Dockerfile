#node.jsイメージをベースにする
FROM node:22-alpine 
#Docker接続時に入るディレクトリ
WORKDIR /home/File-Timestamp-App
#起動時に実行されるコマンド
RUN npm install -g npm
