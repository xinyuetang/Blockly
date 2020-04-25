## Bolockly后端
(目前完成注册和登录)

### 数据库
- 使用mysql数据库, 请先自行安装mysql并创建名为"blockly"的数据库
- 通过sql目录下的文件建表, 目前仅user表
- 更改src/main/resource/application.properties文件中的登录mysql使用的用户名和密码(同时也可以更换运行端口)

### 当前项目结构(src/main/java)
- bean,实体类,(UserEntity)
- controller,控制类,提供各种resful访问调用,(UserController)
- service,服务器,实现逻辑业务,(UserService)
- mapper,数据库访问接口(使用mybatis),(UserMapper)

### 当前实现功能

#### 注册
- 映射地址为"/signin", 即访问"http://localhost:port/signin"
- 请求方式为post, 需要参数userName, password, 二者为字符串类型并且非空
- 返回值, 成功返回"success",失败返回"fail"(包括用户名已注册)
- 具体实现参见"src/main/java/controller/UserController"

#### 登录
- 映射地址为"/login", 即访问"http://localhost:port/login"
- 请求方式为post, 需要参数userName, password, 二者为字符串类型并且非空
- 返回值, 成功返回"success",失败返回"fail"
- 目前使用session保存了属性"user",值为对应的UserEntity对象,来保存登录状态
- 具体实现参见"src/main/java/controller/UserController"