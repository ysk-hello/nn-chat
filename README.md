# npmパッケージ
## pug
```
yarn add pug@3.0.2
```

## http-auth
```
yarn add http-auth@4.1.9
```

## postgres
sequelize(シークアライズ)

```
yarn add sequelize@6.5.0
yarn add pg@8.5.1
yarn add pg-hstore@2.3.3
```

## dayjs
```
yarn add dayjs@1.10.4
```

## cookies
```
yarn add cookies@0.8.0
```

## package.jsonに従いインストール
```
yarn install
```

# users.htpasswd
```
guest1:test
```

# PostgresSQLコンテナ
appコンテナを起動すると、自動的にdbコンテナが起動する。
```
su postgres
psql
\c nn_chat
select * from "Post";
\q
```

♯ pug
変数定義
```
- let isDeletable = (user === post.postedBy)
```