const fs = require('fs');
const path = require('path');

// 请替换为 processedOutput.json 文件的实际路径
const filePath = 'data/processedOutput.json'; // 修改这里

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        const jsonData = JSON.parse(data);
        
        // 转换数据格式
        const processedData = jsonData.map(article => {
            return {
                id: article.id,
                data: {
                    title: article.data[1] ? article.data[1].trim() : "",  // 添加 null 检查
                    url: article.data[2] ? article.data[2].trim() : "",   // 添加 null 检查
                    website: article.data[3] ? article.data[3].trim() : "", // 添加 null 检查
                    publish_date: article.data[4] ? article.data[4].trim() : "", // 添加 null 检查
                    scraped_date: article.data[5] ? article.data[5].trim() : "", // 添加 null 检查
                    author: article.data[6] ? article.data[6].trim() : "", // 添加 null 检查
                    text: article.data[7] ? article.data[7].trim() : ""    // 添加 null 检查
                }
            };
        });

        // 将更新后的数据写回文件
        fs.writeFile(filePath, JSON.stringify(processedData, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing file:', writeErr);
            } else {
                console.log('Data successfully updated in processedOutput.json');
            }
        });
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
});
