# react 学习心得

## react学习资料
[入门教程](https://doc.react-china.org/tutorial/tutorial.html)
[react文档](https://doc.react-china.org/docs/introducing-jsx.html)
[react安装教程](https://doc.react-china.org/docs/try-react.html)
[自动生成react单页面框架](https://doc.react-china.org/docs/add-react-to-a-new-app.html)
[手动配置生成react单页面框架](https://doc.react-china.org/docs/add-react-to-an-existing-app.html)

## 常见问题
### react 单页面框架初始化失败
执行以下代码时，在内网环境会出现安装失败的情况，主要原因是 yarn 在内网无法使用。
```
npm install -g create-react-app
create-react-app my-app
```

对于这种情况，需要配置 yarn 的代理
```
yarn config set proxy http://xxxxx
```