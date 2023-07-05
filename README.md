# 简介

本人博客，从hugo迁移至astro时，需要批量将front matter修改，本项目是为了解决该问题写出的工具，请根据需要酌情修改源代码

感谢[gray-matter](https://github.com/jonschlinkert/gray-matter)

# 使用

已经安装好node,并执行以下命令

```cmd
node convert.js
```

会默认递归搜索`./`下所有文件夹，找出所有的md文件，自动转换front matter

修改情况：
- 保留：title,draft,tags
- 修改：date修改成pubDatetime
- 删除：Image-auto-upload,ShowToc,categories
- 增加：author,postSlug,featured,ogImage,description

注意自行修改author等信息

