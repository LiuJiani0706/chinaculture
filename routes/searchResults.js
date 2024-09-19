// routes/searchResults.js
const express = require('express');
const router = express.Router();
const articles = require('../data/articles'); // 导入文章数据

// 搜索路由
router.get('/', (req, res) => {
    console.log('Type of articles:', typeof articles); // 输出 articles 的类型
    console.log('Articles content:', articles); // 输出 articles 的内容

    // 这里可以继续处理搜索逻辑
    const { query, author, category, dateFrom, dateTo } = req.query;

    // 根据搜索条件过滤文章
    let filteredArticles = articles.filter(article => {
        const matchesQuery = query ? (article.title.includes(query) || article.description.includes(query)) : true;
        const matchesAuthor = author ? article.author.includes(author) : true;
        const matchesCategory = category ? article.category === category : true;
        const matchesDateFrom = dateFrom ? new Date(article.date) >= new Date(dateFrom) : true;
        const matchesDateTo = dateTo ? new Date(article.date) <= new Date(dateTo) : true;

        return matchesQuery && matchesAuthor && matchesCategory && matchesDateFrom && matchesDateTo;
    });

    res.json(filteredArticles); // 返回符合条件的文章
});

module.exports = router;
