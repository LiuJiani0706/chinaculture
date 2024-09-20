const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const articlesPath = path.join(__dirname, '../data/articles.js');
let articles = require(articlesPath); // 引入文章数据

// 后台页面
router.get('/admin', (req, res) => {
    // 重新加载 articles 数据以确保获取最新状态
    delete require.cache[require.resolve('../data/articles')];
    const articles = require('../data/articles');
    
    console.log('Loaded articles:', articles); // 检查加载的文章数据
    res.render('admin', { articles }); // 渲染 admin 视图
});

// 更新首页文章的 POST 请求
router.post('/admin/update-homepage', (req, res) => {
    const selectedArticles = req.body.showOnHomepage;
     // 如果 selectedArticles 不是数组（只有一个勾选项），将其转换为数组
     if (!Array.isArray(selectedArticles)) {
        selectedArticles = [selectedArticles];
    }
    console.log('Selected articles:', selectedArticles); // 打印被勾选的文章 ID

    // 重置所有文章的首页显示状态
    articles = articles.map(article => {
        article.showOnHomepage = Array.isArray(selectedArticles)
            ? selectedArticles.includes(String(article.id))
            : article.id === Number(selectedArticles);
        return article;
    });

    // 将更新后的数据写入文件
    const updatedArticlesData = `module.exports = ${JSON.stringify(articles, null, 2)};`;

    // 使用 fs.writeFile 写入文件，保存更新后的文章数据
    fs.writeFile(articlesPath, updatedArticlesData, (err) => {
        if (err) {
            console.error('Failed to write file:', err);  // 错误处理
            return res.status(500).send('Internal Server Error');
        }

        console.log('articles.js has been updated successfully.');  // 成功写入日志
        res.redirect('/admin'); // 写入成功后重定向回后台页面
    });
});

// 提供推荐文章的路由
router.get('/homepage-articles', (req, res) => {
    // 清除 require 缓存，确保每次加载最新的 articles 数据
    delete require.cache[require.resolve(articlesPath)];

    // 重新加载 articles 数据
    articles = require(articlesPath);
    
    // 过滤出首页显示的文章
    const homepageArticles = articles.filter(article => article.showOnHomepage);
    
    // 返回过滤后的文章数据
    res.json(homepageArticles);
});

module.exports = router;
