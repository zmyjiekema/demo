# marked.js

## 链接

- [marked.js @ github](https://github.com/markedjs/marked)

## Install

```
npm install marked
```

## Use

```javascript
//引用
import marked from 'marked';

fetch('./test.md')
  .then(function(response) {
    return response.text();
  })
  .then((text) => {
    //   使用
    document.getElementById('result').innerHTML = marked(text);
  });
```

## Table

| 表头   | 表头   |
| ------ | ------ |
| 单元格 | 单元格 |
| 单元格 | 单元格 |
| 单元格 | 单元格 |
| 单元格 | 单元格 |

## Markdown 高级技巧

![图片](https://wac-cdn.atlassian.com/dam/jcr:dcec6f2b-7380-4efb-9294-0292c3a52918/BBorgImage-2.png?cdnVersion=1787)

使用 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd> 重启电脑
