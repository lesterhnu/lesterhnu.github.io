---
title: 手把手教你用axum开发博客系统一：万物始于「hello,world」
description: 用rust语言开发博客系统
sticky: 1
tags:
 - rust
 - blog
 - axum
---

# 手把手教你用axum开发博客系统一：万物始于「hello,world」

## 创建新项目

```shell
cargo new axum-blog

```

## 添加依赖库

1. 添加axum依赖

```toml
...
[dependencies.axum]
version = "0.7.5"
...

```

1. `axum`是异步的web框架，需要有一个异步运行时，目前还没有官方的异步方案，但是有社区开发的库，其中就包括`tokio`，`axum`也是由`tokio` 的项目组开发并开源，所以异步运行时直接选择`tokio`

```toml
# Cargo.toml
# 默认打开tokio的全部特性;
...
[dependencies.tokio]
version = "1.38.1"
features = ["full"]
...

```

## 创建第一个路由

```rust
use axum::{routing::get, Router};

#[tokio::main]
async fn main() {
    // 创建路由
    let app = Router::new().route("/ping", get(ping));
    // 设置监听地址
    let tcp_listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();

    axum::serve(tcp_listener, app).await.expect("启动失败");
}

async fn ping() -> &'static str {
    "Hello,World"
}

```

* 执行 `cargo run` 然后在浏览器访问 [`http://127.0.0.1:3000/ping`](http://127.0.0.1:3000/ping) 可以成功访问

> 现在我们已经成功创建了一个基于axum的web项目，接下来我们将在此基础上创建一个完整的个人博客系统；
