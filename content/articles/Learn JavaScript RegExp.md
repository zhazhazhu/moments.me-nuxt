---
title: 学习JavaScript正则表达式
image:
description: 拖了好久的正则表达式，今天正式开始学习，学习教程是在B站上 "后盾人" up主
date: 2023-08-23
---

## 资料

[学习视频地址](https://www.bilibili.com/video/BV12J41147fC?p=1&vd_source=592632862ea7bedba526a0663cd513b6)

[mdn 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions)

## 开始

1. 选择符的使用 类似 js 里面的或者 ||

```javascript
const reg = /1(3|4|5|7|8|9)\d{9}/;

const tel = "13628486456";
console.log(reg.test(tel)); // true

const tel1 = "12628486456";
console.log(reg.test(tel1)); // false
```

2. 原子表与原子组中的选择符

```javascript
const reg = /[135]/;

const num = "1";
console.log(reg.test(num)); //true

const num2 = "12";
console.log(reg.test(num2)); //true

const num3 = "35";
console.log(reg.test(num3)); //true

const num4 = "22";
console.log(reg.test(num4)); //false
```

3. 转义

- . 除换行外任何字符 => \\. 小数点

```javascript
const reg = /[135]/;

const num = "1";
console.log(reg.test(num)); //true

const num2 = "12";
console.log(reg.test(num2)); //true

const num3 = "35";
console.log(reg.test(num3)); //true

const num4 = "22";
console.log(reg.test(num4)); //false

const reg1 = /https?:\/\/\w+\.\w+\.\w+/;

const url = "https://www.qzzhu.cn";
console.log(reg1.test(url)); //true
```

4. 字符边界约束

```javascript
let reg = /\d/;

let str = "abcrt23fda";
console.log(reg.test(str)); //true

let reg1 = /^\d/;
console.log(reg1.test(str)); //false
console.log(reg1.test("2fdsaf")); //true

let reg2 = /^\d$/;
console.log(reg2.test("2reafad")); //false
console.log(reg2.test("3")); //true

let reg3 = /^[a-z]{3,6}$/;
console.log(reg3.test("fdafd")); //true
console.log(reg3.test("fdafdf")); //true
console.log(reg3.test("fdafdff")); //false
```

5. 数值和空白元字符

```javascript
let reg = /\d+/g;
console.log("abc 2012 abc 2".match(reg)); // ['2012', '2']

let str = "张三: 010-12345678,李四: 030-1234567";
console.log(str.match(/\d{3}-\d{7,8}/g)); //['010-12345678', '030-1234567']

let str1 = "张三: 13488888888,李四: 15422222222";
console.log(str1.match(/1[3,4,5,6,7,9]\d{9}/g)); //[ '13488888888', '15422222222' ]

// \d 匹配数字
// \D 除了数字
console.log("abc 2012 ab 2".match(/\D+/g));

// \s 匹配空白
// \S 除了空白
console.log(/\s/.test("abc")); //false
console.log(/\s/.test(" abc")); //true
console.log(/\s/.test("\nabc")); //true

let str2 = " 张三: 13488888888, 李四: 15422222222 ";
console.log(str2.match(/[^\s:,\d]+/g)); //['张三', '李四']
```

6. w 与 W 元字符

```javascript
// \w 所有字母数字下划线
// \W 除去所有字母数字下划线

let reg = /\w+/;

console.log("abc 2021".match(reg)); //['abc']
console.log("abc 2021".match(/\w+/g)); //['abc', '2021']

let reg1 = /^[a-z]\w{4,9}$/;
console.log(reg1.test("2abcdefg")); //false
console.log(reg1.test("abcdefg")); //true
```
