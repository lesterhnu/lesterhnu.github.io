---
title: 手把手教你用axum开发博客系统四：thiserror 错误处理
tags:
 - rust
 - 错误处理
 - axum

---

# 使用thiserror库统一第三方包错误

> 在Rust 基础教程中，我们学习到rust的基本错误处理方式，可以用`?` 语法糖来方便快捷地向上抛出错误,。 本章将和大家一起学习封装统一的错误响应，并使用 `thiserror` 库统一转换第三方包的错误类型为我们自定义的错误类型；
> 

## 导入依赖

```rust
# Cargo.toml
...
[dependencies.thiserror]
version = "1.0.63"
...
```

## 创建自定义错误类型

```rust
// error.rs 为方便管理，我们单独创建一个文件(模块) 管理错误类型相关代码
use thiserror::Error;

#[derive(Debug,Error)]
pub enum MyError{
	// error注解是thiserror 库 提供的宏函数，里面可以添加错误信息
    #[error("default error")]
	Default,
	// 利用enum的特性，错误类型里面可以接受元组，并在文本信息里填充
	#[error("error info:{1}")]
	WithCodeMsg(i32,String),
	
	
}

```

因为我们的目标是将`MyError` 作为统一错误类型，而在代码中我们需要使用第三方库，这些库抛出的错误可能并非标准库的错误，而是像`MyError`一样的自定义错误，因此我们需要通过实现 `From` 将MyError 和第三方库里的错误具备相互转化的能力

`thiserror` 提供了快速实现`From` 的方法

```rust
use thiserror::Error;

#[derive(Debug,Error)]
pub enum MyError{
	#[error("db error {0}")]
	DatabaseError(#[from] sea_orm::DbErr)
}
```

## 将错误通过接口返回

在`axum` 中，需要为返回内容 实现 `IntoResponse` ,这样axum才会正确识别hanlder的响应

```rust
use axum::Json
use thiserror::Error;

#[derive(Debug, Error)]
pub enum MyError {
    #[error("error info:{1}")]
    WithCodeMsg(i32, String),
    #[error("default error")]
    Default,
    #[error("dberror:{0}")]
    DbError(#[from] sea_orm::DbErr),
}

// 新建结构体可作为json对象返回
#[derive(Debug,Serialize)]
struct ErrResp {
	code:i32,
	msg:String,
}

impl axum::response::IntoResponse for MyError {
    fn into_response(self) -> Response {
        let code = match self {
		        // 自定义返回的code和msg
            MyError::WithCodeMsg(c,ref _m ) => {
                c
            },
            // 自定义code 和默认msg
            MyError::DbError(_) => -2,
            // 默认code和msg
            _ => -1,
        };
        // 转换错误信息为String
        let msg = self.to_string();
        // 返回json
        Json(ErrResp { code, msg }).into_response()
    }
}
```

示例

```rust
...
// 编写handler
pub async fn get_error()->MyError{
	MyError::WithCodeMsg(-1,"error".to_string())
}
...
```

直接请求后获得错误响应：

```json
{
    "code": -1,
    "msg": "error info:error"
}
```