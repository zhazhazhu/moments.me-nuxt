---
title: Deref 和 Drop
image:
description: 认识 Deref 和 Drop
date: 2024-1-2
---

- Deref 可以让智能指针像引用那样工作，这样你就可以写出同时支持智能指针和引用的代码，例如 *T
- Drop 允许你指定智能指针超出作用域后自动执行的代码，例如做一些数据清除等收尾工作


## Deref 解引用
### 问
我们为什么需要自动解引用？

### 答
```rust [main.rs]
#[derive(Debug)]
struct Person {
    name: String,
    age: u8
}

impl Person {
    fn new(name: String, age: u8) -> Self {
        Person { name, age}
    }

    fn display(self: &mut Person, age: u8) {
        let Person{name, age} = &self; 
    }
}
```
以上代码，display方法中 self 本身就是一个可变借用类型，这里再次引用，类型就应该为 &&mut Person, 然后我们又将其和 Person 类型进行匹配，取出其中的值。这里就用到了 Deref 这个 trait

```rust [main.rs]
use std::ops::Deref;

struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}

impl<T> Deref for MyBox<T> {
    type Target = T;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

fn main() {
    let x = MyBox::new(1);

    assert_eq!(5, *x);
}
```
观察以上代码，可以看到 assert_eq!(5, *x) 这一行 *x 最终转换的结果类型就是 i32, 如果没有 Deref 的话, 将会是 *(&x.0), 所以显而易见 Deref 的强大之处, Deref 还可以连续的隐式 Deref 转换, 我们接着往下看

#### 连续的隐式 Deref 转换

- 以下代码中 &s: &String -> &str, Deref转换了一次
```rust [main.rs]
fn main() {
    let s = String::from("hello world");
    // String 实现了 Deref 特征, 可以在需要时自动被转换为 &str 类型
    // &s 实际的类型是 &String, 但他被传给display 函数时, 自动通过 Deref 转换成了 &str
    // 值得注意一点是必须通过 &s 的方式触发, 仅引用类型才会触发 Deref 
    display(&s);
}

fn display(s: &str) {
    println!("{}",s);
}
```

- 以下代码中 &s: &MyBox -> &String -> &str, Deref转换了两次
```rust [main.rs]
fn main() {
    let s = MyBox::new(String::from("hello world"));
    display(&s)
}

fn display(s: &str) {
    println!("{}",s);
}
```
想象一下, 如果没有Deref将会是什么样子
```rust [main.rs]
fn main() {
    let s = MyBox::new(String::from("hello world"));
    display(&(*s)[..])
}

fn display(s: &str) {
    println!("{}",s);
}
```

#### 经过以上示例，我们可以得出结论: rust 会自动 Deref 直到找到合适的类型为止。

*三种 Deref 转换*

1. 当 T: Deref<Target=U>，可以将 &T 转换成 &U，也就是我们上面看到的例子
2. 当 T: DerefMut<Target=U>，可以将 &mut T 转换成 &mut U, 要实现这个必须要先实现 Deref 特征
3. 当 T: Deref<Target=U>，可以将 &mut T 转换成 &U


## Drop 释放资源

### 问
我们为什么需要释放资源？

### 答
在一些无垃圾回收(GC)语言中，我们需要在一个变量无需被使用的时候，手动释放他解放内存，如果忘记了，就会发生内存泄漏，俗称 OMM.而在 rust 中，你可以指定一个变量超出作用域是执行特定代码。

#### 一个简单的示例
```rust [main.rs]
struct HasDrop1;
struct HasDrop2;
impl Drop for HasDrop1 {
    fn drop(&mut self) {
        println!("Dropping HasDrop1!");
    }
}
impl Drop for HasDrop2 {
    fn drop(&mut self) {
        println!("Dropping HasDrop2!");
    }
}
struct HasTwoDrops {
    one: HasDrop1,
    two: HasDrop2,
}
impl Drop for HasTwoDrops {
    fn drop(&mut self) {
        println!("Dropping HasTwoDrops!");
    }
}

struct Foo;

impl Drop for Foo {
    fn drop(&mut self) {
        println!("Dropping Foo!")
    }
}

fn main() {
    let _x = HasTwoDrops {
        two: HasDrop2,
        one: HasDrop1,
    };
    let _foo = Foo;
    println!("Running!");
}
```

```console
Running!
Dropping Foo!
Dropping HasTwoDrops!
Dropping HasDrop1!
Dropping HasDrop2!
```

*手动 Drop 释放*
```rust [main.rs]
#[derive(Debug)]
struct Foo;

impl Drop for Foo {
    fn drop(&mut self) {
        println!("Dropping Foo!")
    }
}

fn main() {
    let foo = Foo;
    drop(foo); //手动释放
    // println!("Running!:{:?}", foo); //报错，借用了所有权被转移的值
}
```

*在绝大多数情况下，我们都无需手动去 drop 以回收内存资源，因为 Rust 会自动帮我们完成这些工作，它甚至会对复杂类型的每个字段都单独的调用 drop 进行回收！但是确实有极少数情况，需要你自己来回收资源的，例如文件描述符、网络 socket 等，当这些值超出作用域不再使用时，就需要进行关闭以释放相关的资源，在这些情况下，就需要使用者自己来解决 Drop 的问题。*


#### 互斥的 Copy 和 Drop
我们无法为一个类型同时实现 Copy 和 Drop 特征。因为实现了 Copy 的特征会被编译器隐式的复制，因此非常难以预测析构函数执行的时间和频率。因此这些实现了 Copy 的类型无法拥有析构函数。