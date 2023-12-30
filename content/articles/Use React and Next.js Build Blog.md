---
title: 使用 Vue 和 Nuxt.js 构建的博客
image:
  src: 
  alt: Zhazhazhu moments
description: 这个项目主要是我自己学习React,所以上手重构一下我自己的博客，也许之前的就不用了，采用这一版，这里主要记录一下我自己重头写 Vue 和Nuxt 碰到的问题
date: 2023-6-21
head:
  meta:
    - name: 'keywords'
      content: 'vue, nuxt'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Zhazhazhu'
    - name: 'copyright'
      content: '© 2022 Zhazhazhu'
---

## 使用到的模块

#### 环境配置

<tag>MacOS</tag>
<tag>Node@18.15.0</tag>
<tag>Pnpm@8.6.1</tag>

#### 主要工具

<tag>React@18.2.0</tag>
<tag>Next@13.4.6</tag>
<tag>Typescript@5.1.3</tag>
<tag>Unocss@0.53.1</tag>
<tag>Dayjs@1.11.8</tag>

#### Markdown 处理

<tag>Markdown-it@13.0.1</tag>
<tag>Gray-matter@4.0.3</tag>

#### Icons

<tag>React-icons@4.9.0</tag>

#### 样式处理

<tag>Postcss@8.4.24</tag>
<tag>Github-markdown-css@5.2.0</tag>

<br />

> 我们开始吧 =>

首先说说使用下来的感受吧，我之前是使用 <a href="https://vuejs.org/">Vue</a>,Vue 主要是基于.vue 文件模版的形式编写,当然现在 Vue3 对 Jsx 支持的也很好，为什么开始接触 React 呢，一是目前市面上 React 还是偏多(可能有我主观的感觉,但是我的博客我说了算。。。),所以也算跟风吧，但是之前使用 Vue3 的 Tsx 对类型支持总有些地方不是很好，例如在 Tsx 里面 expose 导出原生没有类型提示(目前可以通过 ComponentPublicInstance 的方式补充),还有对函数式组件也不是很友好,当然并不是说 Vue 比 React 差，互相都有优缺点，凭你自己意愿想用谁就用谁(Jquery 都可以)

## 说明
<tag>博客</tag>
Next.js 客户端默认入口文件在 app/layout.tsx(这里的说明是不包含 src 目录的), 主页在 app/page.tsx,如果你想自定义模版，这个项目就是自定义的，Next.js 自定义入口也是有规定，必须在 pages/\_app.tsx，解析Markdown使用到了 <a href="https://github.com/markdown-it/markdown-it">Markdown-it</a> 来处理，Markdown 头部解析使用了 <a href="https://github.com/jonschlinkert/gray-matter">gray-matter</a>，Markdown 样式使用了 <a href="https://github.com/sindresorhus/github-markdown-css">github-markdown-css</a>，
博客评论使用了 <a href="https://github.com/gitalk/gitalk">gitalk</a>，这个是基于Github的 issues 功能扩展的，支持多平台登陆，有兴趣可以去仓库看看，


<tag>收藏</tag>
类似于网站的书签，数据维护在 ./source/projects.json，设计在json文件中也是易于后期维护，组件会自动解析json渲染


<tag>相册</tag>
存放一些生活照片，数据维护在 ./source/photo.json，设计以上同理，这里的照片一部分是存在github，图片上传使用了我自己写的 <a href="/posts/TmV4dC5qcyBjcmVhdGUgYmxvZy5tZA==">Github-Markdown</a>，还有一部分直接取了自己Github的一个文件下的所有的照片