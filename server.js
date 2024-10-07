const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 设置 EJS 作为模板引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'website')));
app.use('/data', express.static(path.join(__dirname, 'data')));

// 支持解析表单数据
app.use(express.urlencoded({ extended: true }));

// 首页路由 - 渲染 index.ejs
app.get('/', (req, res) => {
  res.render('index', { title: '首页' });
});

// 哲学页面路由
app.get('/philosophy', (req, res) => {
  // 使用 res.sendFile 来返回哲学页面
  res.sendFile(path.join(__dirname, 'website', 'Philosophy.html'));
});



// 儒学页面路由
app.get('/confucianism', (req, res) => {
  // 使用 res.sendFile 来返回页面
  res.sendFile(path.join(__dirname, 'website', 'confucianism.html'));
});
// 孔庙页面路由
app.get('/ConfucianTemple', (req, res) => {
  // 使用 res.sendFile 来返回页面
  res.sendFile(path.join(__dirname, 'website', 'ConfucianTemple.html'));
});

app.get('/Religion', (req, res) => {
  // 使用 res.sendFile 来返回页面
  res.sendFile(path.join(__dirname, 'website', 'Religion.html'));
});
app.get('/Arts', (req, res) => {
  // 使用 res.sendFile 来返回页面
  res.sendFile(path.join(__dirname, 'website', 'Arts.html'));
});
app.get('/FolkArts', (req, res) => {
  // 使用 res.sendFile 来返回页面
  res.sendFile(path.join(__dirname, 'website', 'FolkArts.html'));
});

app.get('/NanluoguLane', (req, res) => {
  // 使用 res.sendFile 来返回页面
  res.sendFile(path.join(__dirname, 'website', 'NanluoguLane.html'));
});
app.get('/museum', (req, res) => {
  // 使用 res.sendFile 来返回页面
  res.sendFile(path.join(__dirname, 'website', 'museum.html'));
});
app.get('/LamaTemple', (req, res) => {
  // 使用 res.sendFile 来返回页面
  res.sendFile(path.join(__dirname, 'website', 'LamaTemple.html'));
});
app.get('/ImperialCollege', (req, res) => {
  // 使用 res.sendFile 来返回页面
  res.sendFile(path.join(__dirname, 'website', 'ImperialCollege.html'));
});
app.get('/GreatWall', (req, res) => {
  // 使用 res.sendFile 来返回页面
  res.sendFile(path.join(__dirname, 'website', 'GreatWall.html'));
});
app.get('/ForbiddenCity', (req, res) => {
  // 使用 res.sendFile 来返回页面
  res.sendFile(path.join(__dirname, 'website', 'ForbiddenCity.html'));
});
app.get('/BaiyunTemple', (req, res) => {
  // 使用 res.sendFile 来返回页面
  res.sendFile(path.join(__dirname, 'website', 'BaiyunTemple.html'));
});
app.get('/excel', (req, res) => {
  // 使用 res.sendFile 来返回页面
  res.sendFile(path.join(__dirname, 'website', 'excel.html'));
});
app.get('/volunteer-platform', (req, res) => {
  // 使用 res.sendFile 来返回页面
  res.sendFile(path.join(__dirname, 'website', 'volunteer-platform.html'));
});
// 监听服务器
app.listen(PORT, () => {
  console.log(`服务器正在端口 ${PORT} 运行`);
});
