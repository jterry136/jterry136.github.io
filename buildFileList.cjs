const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'public', 'posts');
const outputFile = path.join(__dirname, 'public', 'filelist.txt');

function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            getAllFiles(filePath, fileList);
        } else {
            // Store relative path from /public/posts
            fileList.push(path.relative(postsDir, filePath));
        }
    });
    return fileList;
}

const allFiles = getAllFiles(postsDir);
fs.writeFileSync(outputFile, allFiles.join('\n'), 'utf8');
console.log(`Wrote ${allFiles.length} filenames to ${outputFile}`);