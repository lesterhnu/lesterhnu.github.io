---
title: 手把手教你用axum开发博客系统三：使用tracing记录日志
describe: 记录日志是我们开发过程中必不可少的一步，良好规范的日志有助于我们快速排查定位遇到的问题；
tags:
 - rust
 - tracing
 - 日志
 - axum
top: 1
sticky: 2
---





# 【Rust Web开发系列】使用tracing 记录日志
>
> 记录日志是我们开发过程中必不可少的一步，良好规范的日志有助于我们快速排查定位遇到的问题；
>

## 添加依赖

---

```toml
...
[dependencies]
time = {version="0.3.36",features=["formatting", "parsing", "macros", "std", "local-offset"]}
tracing = "0.1.40"
tracing-appender = "0.2.3"
tracing-subscriber={version = "0.3.18",features = ["local-time", "time", "env-filter"]}
...
```

## 配置logger

### 配置日志级别

tracing-subscriber 通过EnvFilter过滤日志，低于配置级别的日志不会显示

```rust
use tracing_appender::{non_blocking::WorkerGuard, rolling};
use tracing_subscriber::{
    fmt::{self,time::OffsetTime}, 
    layer::SubscriberExt, 
    util::SubscriberInitExt, 
    EnvFilter, 
    Registry};
use time::{macros::format_description, UtcOffset};

fn init_logger()->WorkerGuard{
    // 配置日志过滤器
    let env_filter = EnvFilter::try_from_default_env()
        .unwrap_or_else(|_| EnvFilter::new("info"));
    // 配置日志时间格式
    // 配置时区为东8区，
    let offset = UtcOffset::from_hms(8, 0, 0).unwrap_or(UtcOffset::UTC);
    // 时间格式为  年-月-日 时:分:秒 格式
    let logger_time = OffsetTime::new(
        offset,
        format_description!("[year]-[month]-[day] [hour]:[minute]:[second]"),
    );
    
    // 配置日志样式
    let format_layer = fmt::layer()
        .with_file(true) // 在日志中添加当前文件信息
        .with_timer(logger_time.clone()) // 日志中配置时间格式
        .pretty() // 增强日志可读性
        .with_writer(std::io::stdout);// 日志输出到控制台
    
    // format_layer是配置显示到终端的日志格式，
    // 如果我们要同时输出日志到文件里，使用tracing-appender是常用的做法
    
    // tracing-appender 提供的rolling模块，
    // 可以配置日志的自动滚动周期，如下配置表示日志文件保存在logs目录下，日志名称为app.log+时间
    let file_appender = rolling::daily("logs", "app.log");
    let (non_blocking_appender, guard) = tracing_appender::non_blocking(file_appender);
    // 配置输出到文件的日志样式
    let file_layer = fmt::layer()
        .with_file(true) //打印文件信息
        .with_timer(logger_time) //打印时间
        .with_ansi(false)// 很多文本编辑器对颜色的处理不好，所以文件中禁用日志颜色
        .with_writer(non_blocking_appender);// 新增文件writer
    
    
    Registry::default()
    .with(env_filter)
    .with(format_layer)
    .with(file_layer)
    .init();
    // 还记得这个guard变量么，这是一个守卫，生命周期需要贯穿整个主进程，所以我们在最后将他作为返回参数返回
    guard
}

// 配置完成了，最后看看效果吧
fn main(){
    // 初始化日志
    let _guard = init_logger();
    
    // 日志级别配置为 "info"，所以debug级别的日志不会打印
    tracing::debug!("debug"); 
    tracing::info!("info");
    tracing::warn!("warn");
    tracing::error!("error");
  
}
```

效果展示

![Snipaste_2024-07-26_23-17-17.jpg](https://upload-images.jianshu.io/upload_images/15584055-1f0cdd815c3e6606.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
