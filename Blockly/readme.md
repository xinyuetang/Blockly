## Bolockly后端
(目前完成注册和登录)
(根据文档修改了访问地址、请求方式和返回信息,修改了数据库新增头像图片路径和邮箱地址,新增查看个人信息请求处理)
(前后端接口文档:https://www.zybuluo.com/lishuyang/note/1697828)
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
- 映射地址为"/data/user/register", 即访问"http://localhost:port/data/user/register"
- 请求方式为post, 需要参数userName, password, 二者为字符串类型并且非空。(目前还没有加入邮箱和头像文件路径)
- 返回值, 参见接口文档
- 具体实现参见"src/main/java/controller/UserController"

#### 登录
- 映射地址为"/data/user/login", 即访问"http://localhost:port/data/user/login"
- 请求方式为get, 需要参数userName, password, 二者为字符串类型并且非空
- 返回值, 参见接口文档
- 目前使用session保存了属性"userId",值为对应的userId,来保存登录状态
- 具体实现参见"src/main/java/controller/UserController"

#### 登出
- 映射地址为"/data/user/logout", 即访问"http://localhost:port/data/user/logout"
- 请求方式为get
- 返回值, 参见接口文档
- 将session中保存的属性"userId"移除
- 具体实现参见"src/main/java/controller/UserController"