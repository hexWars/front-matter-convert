// ----------------------------------------------------------------------
// 将./下所有的md文件的front matter，从支持hugo，转成支持astro
// ----------------------------------------------------------------------

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 获取./下所有md文件的路径和文件名
function getAllMdFiles(dirPath, fileList = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      getAllMdFiles(filePath, fileList);
    } else if (path.extname(filePath) === '.md') {
      fileList.push({
        name: file,
        path: filePath
      });
    }
  });

  return fileList;
}

const mdFiles = getAllMdFiles('./');

// console.log(mdFiles);

// 遍历文件列表所有文件
for (let index = 0; index < mdFiles.length; index++) {
  let mdFile = mdFiles[index];
  let str = fs.readFileSync(mdFile.path, 'utf8');
  // console.log(matter(str).data);

  // 读取并覆盖
  let json_data = matter(str).data;
  let content = matter(str).content;
  // console.log(json_data);
  // console.log(content);

// title：保留
// date：修改成pubDatetime
// draft：保留
// IMage-auto-upload：删除
// ShowToc：删除
// tags：保留
// categories：删除
// 需要增加：author,postSlug,featured,ogImage,description
  let new_content = "---\n";
  json_data.title = typeof json_data.title === 'undefined' ? '未知' : json_data.title;

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  json_data.date = typeof json_data.date === 'undefined' ? '2001-01-01' : json_data.date;
  json_data.date = new Date(json_data.date);
  json_data.date = formatDate(json_data.date);

  json_data.draft = typeof json_data.draft === 'undefined' ? 'false' : json_data.draft;

  new_content += "\ntitle: " + json_data.title;
  new_content += "\npubDatetime: " + json_data.date;
  new_content += "\ndraft: false";
  new_content += "\ntags:";
  let x1 = 0;
  for (let tag_index in json_data.tags) {
    x1 += 1;
    new_content += "\n  - " + json_data.tags[tag_index];
  }
  if (x1 == 0) {
    new_content += "\n  - 空";
  }
  new_content += "\nauthor: hexWars";
  new_content += "\npostSlug: " + json_data.title;
  new_content += "\nfeatured: false";
  new_content += "\nogImage: \"\"";
  new_content += "\ndescription: ";

  for (var tag_index in json_data.tags) {
    new_content += " " + json_data.tags[tag_index];
  }

  new_content += "\n---\n" + content;
  // console.log(new_content);
  
  fs.writeFile(mdFile.path, new_content, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  })
  // console.log(mdFile.name + ' convert success');
}





