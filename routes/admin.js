const express = require('express');
const router = express.Router();
let articles = require('../data/articles');

// 后台页面
router.get('/admin', (req, res) => {
    res.render('admin', { articles });
});

// 处理文章分类的 POST 请求
router.post('/admin/assign-category', (req, res) => {
    const { article_id, category } = req.body;

    // 找到对应的文章并更新分类
    const article = articles.find(a => a.id === parseInt(article_id));
    if (article) {
        article.category = category;
    }

    // 重定向回后台页面
    res.redirect('/admin');
});

// 更新首页文章的 POST 请求
router.post('/admin/update-homepage', (req, res) => {
    const selectedArticles = req.body.showOnHomepage;

    // 重置所有文章的首页显示状态
    articles = articles.map(article => {
        article.showOnHomepage = Array.isArray(selectedArticles)
            ? selectedArticles.includes(String(article.id))
            : article.id === Number(selectedArticles);
        return article;
    });

    // 重定向回后台页面
    res.redirect('/admin');
});
// 提供推荐文章的路由
router.get('/homepage-articles', (req, res) => {
    // 过滤出首页显示的文章
    const homepageArticles = articles.filter(article => article.showOnHomepage);
    res.json(homepageArticles);
});

module.exports = router;
