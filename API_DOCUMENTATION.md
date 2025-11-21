# E-Commerce API 文档

## 概述

本文档描述了电商系统前后端交互的完整API接口规范，包括购物车管理、订单结算和用户认证等功能。

## 目录

1. [购物车管理 API](#购物车管理-api)
2. [订单结算 API](#订单结算-api)
3. [用户认证 API](#用户认证-api)

---

## 购物车管理 API

### 接口地址
```
POST https://api.gmailjc.com/public/api/cart/cart.php
```

### 功能说明
管理用户购物车，支持添加、更新、删除商品

### 请求头
```
Content-Type: application/json
Authorization: Bearer {token}  (可选，如果用户已登录)
```

### 请求参数

#### 添加商品到购物车
```json
{
  "action": "add",
  "goods_id": 12345,
  "goods_name": "天然水晶手链女",
  "goods_image": "https://example.com/image.jpg",
  "price": 68.82,
  "quantity": 2
}
```

#### 更新商品数量
```json
{
  "action": "update",
  "goods_id": 12345,
  "quantity": 3
}
```

#### 删除商品
```json
{
  "action": "remove",
  "goods_id": 12345
}
```

#### 获取购物车列表 (可选功能)
```json
{
  "action": "list"
}
```

### 请求参数说明

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `action` | string | 是 | 操作类型：`add`/`update`/`remove`/`list` |
| `goods_id` | integer | 是 | 商品ID |
| `goods_name` | string | add时必填 | 商品名称 |
| `goods_image` | string | add时必填 | 商品图片URL |
| `price` | number | add时必填 | 商品单价 |
| `quantity` | integer | add/update时必填 | 商品数量 |
| `attributes` | object | 否 | 商品属性，如 `{"Size": "L", "Color": "Red"}` |
| `item_id` | string | remove/update时推荐 | 唯一购物车项ID（用于区分同商品不同属性） |

### 成功响应

**状态码**: 200

#### 添加/更新/删除成功
```json
{
  "status": 200,
  "code": 200,
  "message": "操作成功",
  "data": {
    "cart_id": 789,
    "goods_id": 12345,
    "quantity": 2,
    "attributes": {"Size": "L"},
    "updated_at": "2024-01-15 10:30:00"
  }
}
```

#### 获取购物车列表响应
```json
{
  "status": 200,
  "code": 200,
  "message": "success",
  "data": {
    "items": [
      {
        "cart_id": 789,
        "item_id": "12345-{\"Size\":\"L\"}",
        "goods_id": 12345,
        "goods_name": "天然水晶手链女",
        "goods_image": "https://example.com/image.jpg",
        "price": 68.82,
        "quantity": 2,
        "attributes": {"Size": "L"},
        "subtotal": 137.64
      }
    ],
    "total_quantity": 2,
    "total_amount": 137.64
  }
}
```

### 错误响应

**状态码**: 400/401/500

```json
{
  "status": 400,
  "code": 400,
  "message": "商品不存在或已下架",
  "data": null
}
```

### 常见错误码

| 错误码 | 说明 |
|--------|------|
| 400 | 请求参数错误 |
| 401 | 未登录或token无效（如果需要认证） |
| 404 | 商品不存在 |
| 500 | 服务器内部错误 |

---

## 订单结算 API

### 接口地址
```
POST https://api.gmailjc.com/public/api/cart/checkout.php
```

### 功能说明
处理订单结算，创建新订单

### 请求头
```
Content-Type: application/json
Authorization: Bearer {token}  (可选，如果用户已登录)
```

### 请求参数

```json
{
  "user_id": 1001,
  "email": "user@example.com",
  "shipping_address": {
    "first_name": "John",
    "last_name": "Doe",
    "phone": "+1234567890",
    "country": "United States",
    "state": "California",
    "city": "Los Angeles",
    "address": "123 Main Street, Apt 4B",
    "zip_code": "90001"
  },
  "items": [
    {
      "goods_id": 12345,
      "goods_name": "天然水晶手链女",
      "price": 68.82,
      "quantity": 2,
      "attributes": {"Size": "L"},
      "subtotal": 137.64
    }
  ],
  "subtotal": 237.63,
  "shipping_fee": 10.00,
  "total": 247.63
}
```

### 请求参数说明

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `user_id` | integer | 否 | 用户ID（登录用户） |
| `email` | string | 是 | 联系邮箱 |
| `shipping_address` | object | 是 | 收货地址信息 |
| `items` | array | 是 | 订单商品列表 |
| `items[].attributes` | object | 否 | 商品属性 |
| `subtotal` | number | 是 | 商品总金额 |
| `shipping_fee` | number | 是 | 运费 |
| `total` | number | 是 | 订单总金额 |

### 成功响应

**状态码**: 200

```json
{
  "status": 200,
  "code": 200,
  "message": "订单创建成功",
  "data": {
    "order_id": "ORD20240115103000123",
    "order_no": "202401151030001234567",
    "status": "pending",
    "total": 247.63,
    "created_at": "2024-01-15 10:30:00",
    "payment_url": "/payment/ORD20240115103000123"
  },
  "order_id": "ORD20240115103000123"
}

### 获取订单详情

#### 接口地址
```
GET https://api.gmailjc.com/public/api/cart/order.php?order_id={order_id}
```

#### 功能说明
根据订单ID获取订单详情，用于支付页面显示

#### 请求参数
| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `order_id` | string | 是 | 订单ID |

#### 成功响应
```json
{
  "status": 200,
  "code": 200,
  "message": "success",
  "data": {
    "order_id": "ORD20240115103000123",
    "order_no": "202401151030001234567",
    "status": "pending",
    "total": 247.63,
    "email": "user@example.com",
    "items": [
      {
        "goods_id": 12345,
        "goods_name": "天然水晶手链女",
        "price": 68.82,
        "quantity": 2,
        "attributes": {"Size": "L"},
        "subtotal": 137.64
      }
    ],
    "created_at": "2024-01-15 10:30:00"
  }
}
```
```

---

## 支付 API

### 获取支付方式

#### 接口地址
```
GET https://api.gmailjc.com/public/api/payment/methods.php
```
### 支付处理

#### 接口地址
```
POST https://api.shopindream.shop/public/api/payment/process.php
```

#### 功能说明
处理订单支付请求

#### 请求参数
| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `order_id` | string | 是 | 订单ID |
| `payment_method` | string | 是 | 支付方式 (stripe, paypal, crypto) |
| `payment_details` | object | 是 | 支付详情对象 |

**payment_details 对象结构 (Stripe):**
| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `country` | string | 是 | 国家/地区 |
| `card_number` | string | 是 | 卡号 |
| `card_expiry` | string | 是 | 有效期 (MM/YY) |
| `card_cvc` | string | 是 | CVC安全码 |
| `card_holder` | string | 是 | 持卡人姓名 |

**请求示例:**
```json
{
  "order_id": "ORD20251122040824796",
  "payment_method": "stripe",
  "payment_details": {
    "country": "United States",
    "card_number": "424242424242424242",
    "card_expiry": "12/25",
    "card_cvc": "123",
    "card_holder": "John Doe"
  }
}
```

#### 成功响应
```json
{
  "code": 200,
  "message": "Payment successful",
  "data": {
    "transaction_id": "txn_1234567890"
  }
}
```
#### 功能说明
获取当前可用的支付方式列表

#### 响应示例
```json
{
  "status": 200,
  "code": 200,
  "data": [
    {
      "id": "stripe",
      "name": "Credit/Debit Card",
      "type": "credit_card",
      "icon": "card",
      "enabled": true
    },
    {
      "id": "paypal",
      "name": "PayPal",
      "type": "paypal",
      "icon": "paypal",
      "enabled": true
    },
    {
      "id": "crypto",
      "name": "Cryptocurrency",
      "type": "crypto",
      "icon": "bitcoin",
      "enabled": true
    }
  ]
}
```

### 处理支付

#### 接口地址
```
POST https://api.gmailjc.com/public/api/payment/process.php
```

#### 请求参数
```json
{
  "order_id": "ORD20240115103000123",
  "payment_method": "stripe",
  "payment_details": {
    "card_number": "...",
    "expiry": "...",
    "cvc": "..."
  }
}
```

#### 成功响应
```json
{
  "status": 200,
  "code": 200,
  "message": "Payment successful"
}
```

---

## 用户认证 API

### 用户注册

#### 接口地址
```
POST https://api.gmailjc.com/public/api/user/reg.php
```

#### 功能说明
新用户注册账号

#### 请求头
```
Content-Type: application/json
```

#### 请求参数

```json
{
  "username": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "phone": "+1234567890"
}
```

#### 请求参数说明

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `username` | string | 是 | 用户名，2-100字符 |
| `email` | string | 是 | 邮箱地址，必须唯一 |
| `password` | string | 是 | 密码，至少6字符 |
| `phone` | string | 否 | 手机号码 |

#### 成功响应

**状态码**: 200

```json
{
  "status": 200,
  "code": 200,
  "message": "注册成功",
  "data": {
    "user": {
      "user_id": 1001,
      "username": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "avatar": "https://example.com/default-avatar.png",
      "created_at": "2024-01-15 10:30:00"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 错误响应

```json
{
  "status": 400,
  "code": 400,
  "message": "邮箱已被注册",
  "data": {
    "error": "email_exists",
    "field": "email"
  }
}
```

### 用户登录

#### 接口地址
```
POST https://api.gmailjc.com/public/api/user/login.php
```

#### 功能说明
用户登录验证

#### 请求头
```
Content-Type: application/json
```

#### 请求参数

```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

#### 请求参数说明

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `email` | string | 是 | 邮箱地址 |
| `password` | string | 是 | 登录密码 |

#### 成功响应

**状态码**: 200

```json
{
  "status": 200,
  "code": 200,
  "message": "登录成功",
  "data": {
    "user": {
      "user_id": 1001,
      "username": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "avatar": "https://example.com/avatar.png",
      "created_at": "2024-01-15 10:30:00"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 响应字段说明

| 字段名 | 类型 | 说明 |
|--------|------|------|
| `user.user_id` | integer | 用户ID |
| `user.username` | string | 用户名 |
| `user.email` | string | 邮箱 |
| `user.phone` | string | 手机号 |
| `user.avatar` | string | 头像URL |
| `user.created_at` | string | 注册时间 |
| `token` | string | JWT认证令牌 |

#### 错误响应

```json
{
  "status": 401,
  "code": 401,
  "message": "邮箱或密码错误",
  "data": {
    "error": "invalid_credentials"
  }
}
```

### 常见错误码

| 错误码 | 说明 |
|--------|------|
| 400 | 请求参数错误 |
| 401 | 认证失败，邮箱或密码错误 |
| 409 | 邮箱已被注册 |
| 422 | 数据验证失败 |
| 500 | 服务器内部错误 |

---

## 通用说明

### 认证机制

登录成功后，服务器会返回JWT token，客户端需要：
1. 将token保存到localStorage
2. 后续请求在Header中携带token：`Authorization: Bearer {token}`

### 错误处理

所有接口都遵循统一的错误响应格式：
```json
{
  "status": {错误状态码},
  "code": {错误代码},
  "message": "{错误描述}",
  "data": {
    "error": "{错误类型}",
    "details": "{详细错误信息}"
  }
}
```

### 数据验证

- 所有字符串字段会自动trim去除首尾空格
- 邮箱必须符合标准格式
- 密码最少6个字符
- 价格和金额保留2位小数
- 数量必须为正整数

### 安全建议

1. **HTTPS**: 所有API请求必须使用HTTPS
2. **Token管理**: Token应安全存储，定期更新
3. **输入验证**: 前端和后端都需要验证输入
4. **XSS防护**: 对用户输入进行转义
5. **SQL注入防护**: 使用参数化查询

---

## 测试建议

### 购物车测试场景
- 添加商品到空购物车
- 添加已存在的商品（数量累加）
- 更新商品数量
- 删除商品
- 购物车为空时结算

### 结算测试场景
- 正常下单流程
- 库存不足处理
- 地址信息验证
- 多商品订单
- 游客下单（无user_id）

### 认证测试场景
- 正常注册和登录
- 重复邮箱注册
- 错误密码登录
- Token过期处理
- 修改密码

---

## 版本历史

### v1.0.0 (2024-01-15)
- 初始版本
- 购物车基础功能
- 订单结算功能
- 用户认证功能
