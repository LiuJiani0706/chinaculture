const express = require('express');
const path = require('path');
require('dotenv').config(); // 引入 dotenv 以加载环境变量

const app = express();
const adminRoutes = require('./routes/admin');
const searchRoutes = require('./routes/search');
const searchResultsRouter = require('./routes/searchResults');
const articles = require('./data/articles');

// 使用环境变量中的端口号，如果没有则使用 3000
const PORT = process.env.PORT || 3000;

// 设置 EJS 作为模板引擎
app.set('view engine', 'ejs');

// 设置视图文件夹路径为 views 文件夹
app.set('views', path.join(__dirname, 'views'));

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'website')));

// 支持解析表单数据（用于处理后台的POST请求）
app.use(express.urlencoded({ extended: true }));

// 首页路由 - 渲染 index.ejs
app.get('/', (req, res) => {
  res.render('index', { title: '首页' });
});

// 关于页面路由 - 渲染 about.ejs
app.get('/about', (req, res) => {
  res.render('about', { title: '关于我们' });
});

// 搜索路由
app.use('/search', searchRoutes);
app.use('/search-results', searchResultsRouter);

// 后台路由，用于处理文章的标注、管理等功能
app.use(adminRoutes);

// 首页推荐文章路由
app.get('/homepage-articles', (req, res) => {
  // 过滤显示在首页的文章
  const homepageArticles = articles.filter(article => article.showOnHomepage);
  res.json(homepageArticles);
});

// 监听服务器
app.listen(PORT, () => {
  console.log(`服务器正在端口 ${PORT} 运行`);
});
