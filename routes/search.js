// routes/search.js - 处理搜索请求的路由
const express = require('express');
const router = express.Router();
const articles = require('../data/articles'); // 假设你将文章数据存储在一个文件中

// 搜索路由
router.get('/', (req, res) => {
    const {
        query, // 用于关键词查询
        field1, // 第一个字段的选择
        keyword1, // 第一个关键词
        operator, // 操作符
        keyword2, // 第二个关键词
        fuzziness, // 模糊度
        dateFrom, // 起始日期
        dateTo, // 结束日期
        itemsPerPage // 每页显示条数
    } = req.query;

    // 根据搜索条件过滤文章
    let filteredArticles = articles.filter(article => {
        const matchesQuery = query ? (article.title.includes(query) || article.description.includes(query)) : true;
        const matchesField1 = field1 ? (article[field1] && article[field1].includes(keyword1)) : true;
        const matchesOperator = operator ? (operator === 'and' ? article.description.includes(keyword1) && article.description.includes(keyword2) : (operator === 'or' ? article.description.includes(keyword1) || article.description.includes(keyword2) : !article.description.includes(keyword1))) : true;
        const matchesFuzziness = fuzziness ? (fuzziness === 'fuzzy' ? article.title.includes(keyword1) : article.title === keyword1) : true;
        const matchesDateFrom = dateFrom ? new Date(article.date) >= new Date(dateFrom) : true;
        const matchesDateTo = dateTo ? new Date(article.date) <= new Date(dateTo) : true;

        return matchesQuery && matchesField1 && matchesOperator && matchesFuzziness && matchesDateFrom && matchesDateTo;
    });

    // 根据 `itemsPerPage` 参数进行分页处理
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(itemsPerPage) || 10;
    const paginatedArticles = filteredArticles.slice((page - 1) * perPage, page * perPage);

    res.json(paginatedArticles); // 返回符合条件的文章
});

module.exports = router;
