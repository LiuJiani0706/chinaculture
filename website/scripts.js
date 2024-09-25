
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('advanced-search-link').addEventListener('click', function (event) {
        event.preventDefault(); // 阻止默认链接行为


        const advancedSearchHtml = `
                            <form id="searchForm" action="/search-results" method="GET">
                                <div class="search-box-section">
                                    <!-- 高级搜索选项 -->
                                    <label for="field1">选择字段：</label>
                                    <select id="field1" name="field1">
                                        <option value="all">全部字段</option>
                                        <option value="subject">主体</option>
                                        <option value="author">作者</option>
                                        <option value="summary">摘要</option>
                                        <option value="source">来源</option>
                                    </select>
                                    <input type="text" id="keyword1" name="keyword1" placeholder="输入关键词" />

                                    <label for="operator">逻辑运算符：</label>
                                    <select id="operator" name="operator">
                                        <option value="and">并且</option>
                                        <option value="or">或者</option>
                                        <option value="not">不包含</option>
                                    </select>
                                    <input type="text" id="keyword2" name="keyword2" placeholder="输入关键词" />

                                    <label for="fuzziness">模糊度：</label>
                                    <select id="fuzziness" name="fuzziness">
                                        <option value="fuzzy">模糊</option>
                                        <option value="exact">精确</option>
                                    </select>

                                    <label for="dateFrom">月份从：</label>
                                    <input type="month" id="dateFrom" name="dateFrom" />
                                    <span>至</span>
                                    <input type="month" id="dateTo" name="dateTo" />

                                    <label for="itemsPerPage">每页显示：</label>
                                    <select id="itemsPerPage" name="itemsPerPage">
                                        <option value="15">15 条</option>
                                        <option value="30">30 条</option>
                                    </select>

                                    <button type="submit">检索</button>
                                </div>
                            </form>

                        `;

        // 替换现有内容
        document.querySelector('.search-box-section').innerHTML = advancedSearchHtml;
    });
});
// 加载 JSON 数据
fetch('/data/processedOutput.json') // 确保这个路径是正确的
    .then(response => response.json())
    .then(data => {
        // 遍历每个 article-item
        document.querySelectorAll('.article-item').forEach(item => {
            const id = item.getAttribute('data-id'); // 获取 data-id 属性值
            const articleData = data.find(article => article.id === parseInt(id)); // 查找对应的文章数据

            if (articleData) {
                // 更新标题和链接
                const titleElement = item.querySelector('.article-text a');
                titleElement.textContent = articleData.data.title; // 更新标题
                titleElement.href = articleData.data.url; // 更新链接
            }
        });
    })
    .catch(error => console.error('Error loading JSON:', error));

// 加载 JSON 数据
fetch('/data/processedOutput.json') // 确保这个路径是正确的
    .then(response => response.json())
    .then(data => {
        // 遍历每个 trending-text 元素
        document.querySelectorAll('.trending-text').forEach(item => {
            const id = item.getAttribute('data-id'); // 获取 data-id 属性值
            const articleData = data.find(article => article.id === parseInt(id)); // 查找对应的文章数据

            if (articleData) {
                // 更新标题和链接
                item.textContent = articleData.data.title; // 更新标题
                item.href = articleData.data.url; // 更新链接
            }
        });
    })
    .catch(error => console.error('Error loading JSON:', error));





    document.addEventListener('DOMContentLoaded', function() {
        // 找到导航栏中的推荐按钮
        document.querySelector('a[href="recommend.html"]').addEventListener('click', function(event) {
            event.preventDefault(); // 阻止默认行为（跳转）
    
            // 获取 article 区域
            const articleSection = document.querySelector('.article');
    
            if (articleSection) {
                // 平滑滚动到 article 区域的顶部
                articleSection.scrollIntoView({
                    behavior: 'smooth', // 平滑滚动
                    block: 'start' // 滚动到顶部
                });
            }
        });
    });
    



