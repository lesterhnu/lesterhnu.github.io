---
title: "手把手教你用axum开发博客系统二：使用模板引擎"
description: "使用模板引擎，实现博客系统的前端页面"
tags:
 - rust
 - blog
 - askama
---


# 手把手教你用axum开发博客系统二：使用模板引擎

> 现在的大部分web项目都是前后端分离的，但是，对于一个后端开发来说，额外去学习vue,react等前端框架还是需要投入不少的时间，虽然说多学点总没坏处，但是对于仅有几个页面的简单项目（比如本教程的个人博客系统），还是更推荐使用语言自带的模板引擎；




## 选择模板引擎

`crates.io`上来看，`template-engine` 分类下，下载量较多的有

- tinytemplate
- handlebars
- tera
- askama

笔者最先接触的是`askama`, 使用下来也比较接近其他语言的模板引擎，所以本教程就使用`askama` 作为示例；

## 创建第一个模板并发布

---

1. 添加项目依赖

```toml
...
[dependencies.askama]
version = "0.12.1"
features = ["with-axum"]
[dependencies.askama_axum]
version = "0.4.0"
...
```

1. 创建第一个模板

> 1). askama读取模板文件的根路径默认为根目录下的 `templates` 目录(可通过配置文件配置，在此我们使用默认配置)，
2). 模板路径为 `templates/index.html`
> 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    Hello,{{name}}
</body>
</html>
```

1. 在rust中导入模板
    
    ```rust
    ...
    use askama_axum::Template;
    
    #[derive(Template,Debug)]
    #[template(path="index.html")]
    struct IndexTemplate{
    	name:String,
    }
    ...
    ```
    
2. 将模板通过axum路由返回并渲染到页面

```rust
...
// 创建路由handler
async fn index() -> Html<String> {
    let index = IndexTemplate {
        name: "World".to_string(),
    };
    let s = index.render().unwrap().into();
    s
}
...
```

完整代码：

```rust
use askama_axum::Template;
use axum::{response::Html, routing::get, Router};

#[derive(Debug, Template)]
#[template(path = "index.html")]
pub struct IndexTemplate {
    name: String,
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/", get(index));
    let tcp_listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    axum::serve(tcp_listener, app).await.expect("启动失败");
}

async fn index() -> Html<String> {
    let index = IndexTemplate {
        name: "World".to_string(),
    };
    let s = index.render().unwrap().into();
    s
}

```

浏览器访问`http://localhost:3000` 可看到 Hello,World