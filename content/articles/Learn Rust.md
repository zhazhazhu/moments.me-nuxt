---
title: Learn Rust
image:
description: 一门赋予每个人构建可靠且高效软件能力的语言
date: 2023-09-15 00:00
---

## 4.0 定义和实例化 struct (结构体)

1. 简单例子

```rs
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}
fn main() {
    let rect = Rectangle {
        width: 30,
        height: 30,
    };

    println!("{}", area(&rect));

    println!("{:#?}",rect)
}

fn area(rect: &Rectangle) -> u32 {
    return rect.width * rect.height;
}
```

2. struct 定义方法

```rs
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    //重点，这里的 &self 可以是引用也可以获取所有权，例如 self
    fn area(&self) -> u32 {
        return self.width * self.height;
    }
    fn perimeter(self) -> u32 {
        return (self.width + self.height) * 2;
    }
}

fn main() {
    let rect = Rectangle {
        width: 30,
        height: 30,
    };

    println!("{}", rect.area());

    println!("{:#?}", rect);

    println!("{}", rect.perimeter());
}
```

## 5.0 定义枚举

1. 简单示例

```rs
#[derive(Debug)]
enum IpAddrKind {
    V4,
    V6,
}

fn main() {
    let four = IpAddrKind::V4;
    let six = IpAddrKind::V6;
}
```

2. 可变的变体枚举

```rs
#[derive(Debug)]
//每个变体可以拥有不同的类型
enum IpAddrKind {
    V4(u8, u8, u8, u8),
    V6(String),
}

fn main() {
    let home1 = IpAddrKind1::V4(127, 1, 1, 1);
    let home2 = IpAddrKind1::V6(String::from("::1"));
}
```

3. 每个变体可以嵌入不同的类型(甚至可以继续是枚举)

```rs
#[derive(Debug)]
enum Message {
    Send(String),
    Move { x: i32, y: i32 },
}

impl Message {
    fn call(&self) {
        println!("{:?}", self);
    }
}

fn main() {
    let m = Message::Send(String::from("hello"));

    m.call()
}
```

## 6.0 Package 和 create

```rs
mod parent {
    pub fn get_parent() {}
    pub mod children {
        pub fn get_children() {}
    }
}

pub fn get_mod() {
    crate::parent::get_parent();
    crate::parent::children::get_children();
}
```

## 7.0 路径(Path)

- 绝对路径：从 create root 开始，使用 create 名或字面值 create
- 相对路径：从当前模块开始，使用 self , super 或当前模块的标识符
- 路径至少由一个标识符组成，标识符之间使用 :: 隔开

#### 私有边界 (privacy)

- Rust 中所有的条目 (函数, 方法, struct, enum, 模块, 常量) 默认都是私有的, 加上 pub 可转换为公共.

#### Super 关键字

```rs
fn server_order() {}

mod back_of_house {
    fn _children() {
        _cook_order();
        super::server_order();
    }

    fn _cook_order() {}
}
```

#### Use 关键字

- 可以使用 use 关键字讲路径导入到作用域内 (仍遵循私有性规则)

```rs
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}
```

#### pub use 关键字

- 在 use 前面加上 pub ,外部也可以访问 use 引用的模块

```rs
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}
//外面可访问 hosting
pub use crate::front_of_house::hosting;
```

#### as 关键字

- as 关键字可以为引入的路径指定本地的别名

```rs
use std::fmt::Result;
use std::io::Result as IoResult;

fn f1() -> Result {}

fn f2() -> IoResult {}
```

#### 使用嵌套路径清理大量的 use 语句

```rs
//before
use std::cmp::Ordering;
use std::io;
//after
use std::{cmp::Ordering, io};

//before
use std::io;
use std::io::Write;
//after
use std::io::{self, Write};
```

#### 通配符 \*

- 使用 \* 可以把路径中所有公共的条目都引入到作用域
- <p style="color: red">谨慎使用</p>

- <p style="color:blue">应用场景</p>

- - 测试，讲所有被测试的代码都引用到 tests 模块
- - 有时被用于预导入 (prelude) 模块

# 生命周期

## Rust 生命周期是一个全新的概念，这里只做简单记录，重要是要去自己理解，这里推荐去看

[认识 Rust 生命周期](https://course.rs/basic/lifetime.html)

---

> **生命周期标注并不会改变任何引用的实际作用域 -- 鲁迅**

- Rust 每个引用都有自己的生命周期
- 引用保持有效的作用域
- 大多数情况声明周期是隐式可被推断的
- 当引用的生命周期可能以不同的方式互相关联时：手动标注生命周期

> **生命周期标注**

- &i32 //一个引用
- &'a i32 //带有显式生命周期的引用
- &'a mut i32 //带有显式生命周期的可变引用

> **编译器使用 3 个规则在没有显式标注生命周期的情况下，来确定引用的生命周期**

- 规则 1：每个引用类型的参数都有自己的生命周期
- 规则 2：如果只有 1 个输入生命周期参数，那么该生命周期被赋给所有的输出生命周期参数
- 规则 3：如果有多个输入生命周期参数，但其中一个是 &self 或 &mut self（是方法），那么 self 的生命周期会被斌给所有的输出生命周期参数

## Rust 智能指针

> **一个变量在内存中包含的是一个地址(指向其他数据)**

### 引用计数 (reference counting) 只能指针类型

- 通过记录所有者的数量，使一份数据被多个所有者同时持有
- 并在没有任何所有者时自动清理数据

> 智能指针的例子

- String 和 Vec<T>
- 都拥有一片内存区域，且允许用户对其操作
- 还拥有元数据（例如容量等）
- 提供额外的功能或保障 (String 保障其数据是合法的 UTF-8 编码)

### 使用 BOX<T> 来指向 Heap(堆内存) 上的数据

> Box<T ＞ 的常用场景

- 在编译时，某类型的大小无法确定。但使用该类型时，上下文却需要知道它的确切大小。
- 当你有大量数据，想移交所有权，但需要确保在操作时数据不会被复制。
- 使用菜个值时，你只关心它是否实现了特定的 trait，而不关心它的具体类型。

## 8.0 常用的集合 (Vector, String, HashMap)

### 8.1 Vector

- 使用 Vec\<T\>
- - 由标准库提供
- - 可存储多个值
- - 只能存储相同类型的数据
- - 值在内存中连续存放

- 向 Vector 里添加值 push

```rs
// let v: Vec<i32> = Vec::new();
let mut v = vec![1, 2, 3];
v.push(1);
```

- 读取 Vector 里的值

- - 使用索引

```rs
let mut v = vec![1, 2, 3];
let third: &i32 = &v[2];
```

- - 使用 get

```rs
let mut v = vec![1, 2, 3];
match v.get(2) {
    Some(third) => println!("{}", third),
    None => println!("no find"),
}
```

- 所有权和借用规则
- - 不能在作用域内同时拥有可变和不可变引用,就是说如果有其他变量借用了(使用 & 引用), 那么这时的之前的 Vector 声明的将不能修改

```rs
let mut v = vec![1, 2, 3];
let third: &i32 = &v[2];// 借用了
v.push(2); // error,错误
```

### 8.2 String

- 很多 Vec<T> 的操作都可用于 String
- String::new() 函数
- 初始化创建 String
- - to_string() 方法，可用于实现了 Display trait 的类型，包括字符串字面值

```rs
let mut s1 = "hello world".to_string();
```

- - String::from() 函数，从字面量创建 String

```rs
let mut s = String::from("hello world");
```

- 更新 String
- - push_str() 方法，把一个字符串切片附加到 String
- - push() 方法，把一个字符附加到 String

```rs
let mut s = String::from("hello world");
s.push_str(" hi");
s.push('1');
```

- - \+ 连接字符串

```rs
let s1= String::from("hello ");
let s2 = String::from("world");
let s3 = s1 + &s2;
```

- - format 连接多个字符串，他不会取参数的所有权，所以这些参数以后仍然可以继续使用 (推荐用法)

```rs
let s1 = String::from("tic");
let s2 = String::from("tac");
let s3 = String::from("toc");
let s4 = format!("{}-{}-{}", s1, s2, s3);
println!("{}", s4);
```

> **_String 是对 Vec<u8> 的包装_**

```rs
let length = String::from("hello").len();
println!("{}", length) // 5
```

- Rust 有 3 种看待字符串的方式
- - 字节
- - 标量值
- - 字形簇

- 切割 String ，必须谨慎使用，如果切割时跨越了字符边界，程序就会 panic

```rs
let s = String::from("hello");
println!("{}", &s[0..4]); //hell
```

- 遍历 String 的方法

```rs
let s = String::from("hello");
//对于标量值
for b in s.chars() {
    println!("{}", b);
}
//对于字节
for b in s.bytes() {
    println!("{}", b);
}
```

### 8.3 HashMap

> **_ HashMap<K,V> , 键值对的形式存储数据，一个 Key 对应一个 Value _**

- 创建空 HashMap:new() 函数
- 添加数据 insert() 方法

```rs
let mut map = HashMap::new();
map.insert(String::from("Key"), String::from("Value"));
```

- 访问 HashMap 中的值

```rs
let mut map = HashMap::new();
map.insert(String::from("Key"), String::from("Value1"));
let key = String::from("Key");
let value = map.get(&key);
match value {
    Some(s) => println!("{}", s),
    None => println!("None"),
}
```

- 遍历 HashMap

```rs
let mut map = HashMap::new();
map.insert(String::from("Key"), String::from("Value1"));
let key = String::from("Key");
let value = map.get(&key);
for (k, v) in &map {
    println!("key:{},value:{}", k, v);
}
```

- 在 HashMap 中所有的 K 必须是同一种类型，所有的 V 必须是同一种类型

```rs
let teams = vec![String::from("Blue"), String::from("Yellow")];
let intial_scores = vec![10, 50];
let scores: HashMap<_, _> = teams.iter().zip(intial_scores.iter()).collect();
```

- HashMap 和所有权

> <p style="color: red">对于实现了 Copy frait 的类型（例如132），值会被复制到 HashMap 中</p>
> <p style="color: red">对于拥有所有权的值（例如 String)，值会被移动，所有权会转移给 HashMap</p>
> <p style="color: red">如果将值的引用插入到 HashMap，值本身不会移动</p>

```rs
let field_name = String::from("Favorite color");
let field_value = String::from("Blue");
let mut map1: HashMap<&String, &String> = HashMap::new();
// map1.insert(field_name, field_value); //error
map1.insert(&field_name, &field_value);
println!("{} , {}", field_name, field_value);
```

### 9.1 Result 枚举

```rs
enum Result<T,E> {
  Ok(T),
  Err(E),
}
```

```rs
let file = File::open("text.txt");
let file = match file {
    Ok(f) => f,
    Err(error) => {
        panic!("error opening file,{:?}", error);
    }
};
println!("{:?}", file);
```

### 10.1 Trait

- 向 Rust 编译器描述某种类型可以与其他类型共享的功能
- Trait Bounds (约束), 泛型类型参数指定为了实现了特定行为的类型
- Trait 与其他语言的接口(interface) 类似

> **定义一个 Trait**

```rs
pub trait Summary {
  fn summarize(&self) -> String;
}
```

> **在类型上实现 Trait**

```rs
pub trait Summary {
    fn summarize(&self) -> String;
}
struct NewsArticle {
    pub title: String,
}
impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        return format!("{}", self.title);
    }
}
```

> Trait 默认实现

```rs
pub trait Summary {
    fn summarize(&self) -> String {
        return String::from("hello summarize");
    }
}
pub struct NewsArticle {
    pub title: String,
}
impl Summary for NewsArticle {}
```

- 默认实现里可以调用 Trait 中其他的方法，即使这些方法还没有默认实现

```rs
pub trait Summary {
    fn summarize_author(&self) -> String;

    fn summarize(&self) -> String {
        return format!("{}", self.summarize_author());
    }
}
pub struct NewsArticle {
    pub title: String,
    pub author: String,
}
impl Summary for NewsArticle {
    fn summarize_author(&self) -> String {
        return format!("{}", self.author);
    }
}
```

> **函数 Trait 作为参数**

1. impl Trait 语法： 适用于简单情况

```rs
pub trait Summary {
    fn summarize_author(&self) -> String;

    fn summarize(&self) -> String {
        return format!("{}", self.summarize_author());
    }
}
pub struct NewsArticle {
    pub title: String,
    pub author: String,
}
impl Summary for NewsArticle {
    fn summarize_author(&self) -> String {
        return format!("{}", self.author);
    }
}
pub struct Tweet {
    username: String,
    password: String,
}
impl Summary for Tweet {
    fn summarize_author(&self) -> String {
        return format!("{} , {}", self.username, self.password);
    }
}
pub fn notify(item: impl Summary) {
    println!("{}", item.summarize_author())
}
```

2. **Trait bound 语法：可用于复杂情况**

```rs
use std::fmt::{Debug, Display};

pub trait Summary {
    fn summarize_author(&self) -> String;

    fn summarize(&self) -> String {
        return format!("{}", self.summarize_author());
    }
}
pub struct NewsArticle {
    pub title: String,
    pub author: String,
}
impl Summary for NewsArticle {
    fn summarize_author(&self) -> String {
        return format!("{}", self.author);
    }
}
pub struct Tweet {
    username: String,
    password: String,
}
impl Summary for Tweet {
    fn summarize_author(&self) -> String {
        return format!("{} , {}", self.username, self.password);
    }
}
//trait bound 语法
pub fn notify<T: Summary + Display>(item: T) {
    println!("{}", item.summarize_author())
}
//impl trait 语法
pub fn notify1(item: impl Summary + Display) {
    println!("{}", item.summarize_author())
}
//trait bound 使用 where 子句
pub fn notify2<T, U>(item1: T, item2: U) -> String
where
    T: Summary + Display,
    U: Clone + Debug + Summary,
{
    return format!("{}{:?}", item1.summarize(), item2.clone());
}
```
