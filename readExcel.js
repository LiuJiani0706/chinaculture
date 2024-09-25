
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

async function readXlsxFile() {
    const dataPath = path.join(__dirname, 'data', 'think_tank.xlsx'); // 替换为你的文件名
    const outputPath = path.join(__dirname, 'data', 'output.json'); // 输出 JSON 文件路径
    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile(dataPath);
    const worksheet = workbook.worksheets[0]; // 选择第一个工作表
    const jsonData = [];

    worksheet.eachRow((row, rowNumber) => {
        jsonData.push(row.values);
    });

    // 将数据写入 JSON 文件
    fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2), 'utf-8');
    console.log(`数据已保存到 ${outputPath}`);
}

// 调用函数
readXlsxFile();
