- [前端](#前端)
  * [运行方式](#运行方式)
  * [项目结构及文件说明](#项目结构及文件说明)
  * [关键功能的实现细节](#关键功能的实现细节)
    + [UI框架](#ui框架)
    + [动画演示](#动画演示)
    + [导航守卫](#导航守卫)
    + [编程可视化](#编程可视化)
    + [设计学习场景](#设计学习场景)
    + [历史记录](#历史记录)
- [后端](#后端)
  * [运行方式](#运行方式)
  * [数据库](#数据库)
  * [项目结构](#项目结构)
  * [实现功能](#实现功能)
    + [用户相关](#用户相关)
    + [游戏相关](#游戏相关)
    + [房间相关](#房间相关)
- [前后端接口文档](#前后端接口文档)
- [附加功能-协同学习](#附加功能-协同学习)
- [人员分工及贡献比例](#人员分工及贡献比例)
- [项目部署](#项目部署)

-------------

# 前端
## 运行方式
1. 使用npm全局安装angular/cli
2.  在angular目录下
```
npm install
ng serve --open 或者 npm run start
```
## 项目结构及文件说明
+ src 
  + app
    + auth //登录状态认证
    	+ auth.guard.ts  导航守卫
    + components //angular组件
    	+ animation 动画板块
    	+ blockly blockly板块
    	+ header 导航栏
    	+ home 首页
    	+ list-of-games 游戏列表
    	+ login 登录页面
    	+ quick-start 使用向导
    	+ register 注册页面
    	+ start-step 新手指南页面
    	+ user-info 用户信息页面
    	+ vedio-room 开房间视频/协同学习板块
        
    + models //模型
    	+ game.ts 游戏
    	+ history.ts 游戏历史场景
    	+ record.ts 游玩记录
    	+ user.ts 用户 
    + service //服务
    	+ game.service.ts
    	存储游戏基本信息,提供获取游戏场景,
        上传保存游戏场景,上传保存操作记录的服务
    	+ in-memory-data.service 
    	前后端调连之前使用的mock数据 
    	+ user-validator.directive.ts
    	用户名和密码的合法性检查
    	+ user.service.ts
    	提供获取用户个人信息,获取用户操作记录,登录,注册,登出服务
        + userShared.service.ts 共享数据:登录状态
    + app-routing.module.ts   路由
    + app.component.css
    + app.component.html
    + app.component.ts
    + app.module.ts
  + assets //资源文件夹
## 关键功能的实现细节
### UI框架
使用 https://material.angular.io
### 动画演示
根据动作积木的使用考虑动画的执行：
```
// angular\src\app\components\animation\animation.component.ts
  runOne(code: string) {
    this.clearOne();
    const employee = document.getElementById('employee');
    const letterA = document.getElementById('letterA');
    const letterB = document.getElementById('letterB');
    const letterC = document.getElementById('letterC');
    if (code === '10') {
      gameOne(employee, letterA, 0);
    } else if (code === '1010') {
      gameOne(employee, letterA, 0).onComplete(() => {
        gameOne(employee, letterB, 1);
      });
    } else if (code === '101010') {
      gameOne(employee, letterA, 0).onComplete(() => {
        gameOne(employee, letterB, 1).onComplete(() => {
          gameOne(employee, letterC, 2);
        });
      });
    }
  }
```
使用tween.js完成2D动画的操作：
+ angular\src\assets\animation\tween.min.js     2D动画tween.js库压缩版
+ angular\src\assets\animation\animation.js     自定义动画js(使用tween.js)
```
// 拆分每一次移动，从而组成动画
function gameOne(employee, letter, letterId) {
    var letterPosition = { x: 0, y: 0 };
    var offsetY = letterId * 60;
    var employeeOne = commonTween({ x: 130, y: 200 }, { x: letterPosition.x, y: offsetY }, employee, 1000);
    var employeeTwo = commonTween({ x: letterPosition.x, y: offsetY }, { x: letterPosition.x+middleWidth-40, y: offsetY }, employee, 3000);
    var employeeThree = commonTween({ x: letterPosition.x+middleWidth, y: offsetY },{ x: 130, y: 200 }, employee, 1000);
    var letterOne = commonTween(letterPosition, { x: letterPosition.x+middleWidth, y: letterPosition.y }, letter, 3000);
    var letterTwo = commonTween({ x: letterPosition.x+middleWidth, y: letterPosition.y }, { x: letterPosition.x+middleWidth+100, y: letterPosition.y }, letter, 1000);
    employeeOne.onComplete(function(){
        employeeTwo.start();
        letterOne.start();
    });
    employeeTwo.onComplete(function(){
        letterTwo.start();
    });
    letterTwo.onComplete(function(){
        employeeThree.start();
    })
    employeeOne.start();
    return employeeThree;
}
```

### 导航守卫
未登录则跳转到登录页面:
```
checkLogin(): boolean{
    let islogin = false;
    this.userSharedService.isLogin.subscribe(data => {
      islogin = data;
    });
    if (!islogin){
      this.router.navigate(['login']);
    }
    return islogin;
  }
```
### 编程可视化 
#### blockly 注入
```
// angular\src\app\components\blockly\blockly.component.ts

this.workspace = Blockly.inject('blocklyDiv', {
      readOnly: false,
      media: '../media/',
      trashcan: true,
      move: {
        scrollbars: true,
        drag: true,
        wheel: true
      },
      maxBlocks: 20,
      toolbox: this.game.toobox
    });
```
#### 自定义block
```
// angular\src\assets\blockly\custom_block.js

Blockly.defineBlocksWithJsonArray([
    //Game0 收发室初级
    {
        "type": "game0_pick",
        "message0": "从接收处拿取排在第一的信件",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 315,
        "tooltip": "",
        "helpUrl": ""
    },
    ......略
    //Game1 收发室高级
    {
        "type": "game1_pick",
        "message0": "从接收处拿取排在第一的信件",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 315,
        "tooltip": "",
        "helpUrl": ""
    }
      ......略
]
);

```

#### blockly 代码生成及游戏结果判断
```
// angular\src\assets\blockly\custom_block.js

//游戏收发室初级:判断结果是否为‘101010’
Blockly.JavaScript['game0_pick'] = function (block) {
    return '1';
};
Blockly.JavaScript['game0_put'] = function (block) {
    return '0';
};
//游戏收发室高级: 判断结果是否为‘141232’*3遍
Blockly.JavaScript['game1_loop'] = function(block){
    var loop_content = Blockly.JavaScript.statementToCode(block, 'DO').trim();
    var times  = block.getFieldValue('TIMES');

    let code = "";
    for(let i=0;i<times;i++){
        code += loop_content;
    }
    return code;

}
Blockly.JavaScript['game1_pick'] = function (block) {    
    return '1';
};
Blockly.JavaScript['game1_put'] = function (block) {
    return '2';
};
Blockly.JavaScript['game1_pick_from_table'] = function (block) {
    return '3';
};
Blockly.JavaScript['game1_put_to_table'] = function (block) {
    return '4';
};

```

### 设计学习场景

#### 场景一:收发室初级

<img src="https://github.com/xinyuetang/Blockly/blob/master/imgs/game0.png" width = "350" height = "400" alt="game0" align=center />

#### 场景二:收发室高级

<img src="https://github.com/xinyuetang/Blockly/blob/master/imgs/game1.png" width = "350" height = "450" alt="game1" align=center />

### 历史记录
点击游戏面板中的“保存”按钮则将游戏场景上传到服务器保存
```
//保存历史记录
save(): void {
    this.game.xmlData = Blockly.Xml.domToText(
      Blockly.Xml.workspaceToDom(this.workspace)
    );
    this.gameService.saveHistory(this.gameId, this.game.xmlData).subscribe((data) => {
      if (data != null){ 
        console.log('saving the program - ', JSON.stringify(this.game.name));
  	}
    });
 }
 ```
 进入游戏界面时自动加载历史记录
```
//加载历史记录
if (this.game.xmlData) {
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(this.game.xmlData),
        this.workspace
      );
    };
  
```


----------
# 后端
## 运行方式
1. 在Blockly目录下
```
mvn spring-boot:run
```
## 数据库
- 使用mysql数据库, 请先自行安装mysql并创建名为"blockly"的数据库
- 通过sql目录下的文件建表
- 更改src/main/resource/application.properties文件中的登录mysql使用的用户名和密码(同时也可以更换运行端口)

## 项目结构
src/main/java
- bean,实体类,(UserEntity)
- controller,控制类,提供各种resful访问调用,(UserController)
- service,服务器,实现逻辑业务,(UserService)
- mapper,数据库访问接口(使用mybatis),(UserMapper)

## 实现功能

### 用户相关

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

#### 查看个人信息
- 映射地址为"/data/user/information", 即访问"http://localhost:port/data/user/information"
- 请求方式为get
- 返回值, 参见接口文档
- 从session中读取"userId", 再以id访问数据库得到用户信息,返回给前端
- 如果没有登陆, 则session中无法获取到"userId", 请求将返回错误

#### 查看用户操作记录
- 映射地址为"/data/user/record", 即访问"http://localhost:port/data/user/record"
- 请求方式为get
- 返回值, 参见接口文档
- 从session中读取"userId", 返回所有record构成的List
- 如果没有登陆, 请求将返回错误
- ps: 后端始终将操作记录中的日期和时间作为字符串处理,
以免出Java和MySQL中类型转换可能出现的问题, 所以前端的参数直接以字符串给出即可,
同时前端收到的也是字符串, 所以请留意对这两个量的处理。

#### 添加用户操作记录
- 映射地址为"/data/user/record", 即访问"http://localhost:port/data/user/record"
- 请求方式为post(与查看用户操作记录的映射地址相同, 但是二者的请求方式不同)
- 参数和返回值, 参见接口文档
- 在数据库中增加一条记录, 成功返回true

### 游戏相关

#### 存储历史场景
- 映射地址为"/data/game/save", 即访问"http://localhost:port/data/game/save"
- 请求方式为post
- 参数和返回值, 参见接口文档
- history是以longtext的类型存在数据表中的, 后端始终将其作为字符串来处理
- history只存储最近的历史,即每次save会覆盖原来的历史
- history表把userId和gameId一起作为主键, insert时使用"on duplicate key update", 保证上一条描述的行为正确

#### 加载历史场景
- 映射地址为"/data/game/load", 即访问"http://localhost:port/data/game/load"
- 请求方式为get
- 参数gameId (现在userId从session中取得)
- 查询对应的history并返回给前端即可, 没有对应记录返回空字符串""


### 房间相关
(使用springboot websocket)

以下两个接口的访问地址相同ws://localhost:8080/room/{connectParam} ,用connectParam参数做区别
#### 创建房间
- connectParam为gameId即一个整数时, 例如ws://localhost:8080/room/{1} ,创建一个该游戏的房间
- 创建成功时, 服务器将通过websocket连接返回房间的Id, 该Id是一个随机生成的8位字母和数字的组合字符串


#### 加入房间
- connectParam为roomId即一个长度为8的字母和数字的组合字符串时, 例如ws://localhost:8080/room/{abcd1234} ,加入该id对应的游戏房间
- 一个房间只能加入2人, 成功时返回信息"连接成功。",房间不存在或者已有2人加入, 将连接失败并得到对应的提示
- 加入房间后, 两用户通过websocket发送的消息,会通过服务器转发给对方, 以此为前端提供一人的操作被另一人共享的功能
- 目前websocket服务器的消息发送均是字符形式, 所以需要前端判断收到消息内容


----------
# 前后端接口文档
云端访问地址: https://www.zybuluo.com/lishuyang/note/1697828
### 用户注册
 + URL:`/data/user/register`
 + 方法:`POST`
 + 参数
    
    |参数|描述|补充|
    |:-:|:-:|:-:|
    |userName|用户昵称|后端判断用户名不能重复|
    |password|用户密码|前端判断密码不能少于6个字符|
    |email|用户邮箱|前端判断邮箱格式|
    |date|注册日期|字符串,如1999-01-28|
    

 + 返回值
    
    ```
    {
         "result": true
         //注册成功
    }
    ```
    
    ```
    {
        "result": false,
        //注册失败
        "message": "用户名已被使用"
        
    }
    ```
    
### 用户登录
 + URL:`/data/user/login`
 + 方法:`GET`
 + 参数
    
    |参数|描述|
    |:-:|:-:|
    |userName|用户昵称|
    |password|用户密码|

 + 返回值
    
    ```
    {
         "result": true,
         //登录成功
         "userId": 3
        //用户在数据库中的ID
    }
    ```
    
    ```
    {
        "result": false,
        //注册失败
        "message": "用户不存在"
    }
    ```

### 用户登出
 + URL:`/data/user/logout`
 + 方法:`GET`
 + 参数:无
 + 返回值:
 
    ```
    {
         "result": true
         //登出成功
    }
    ```
    
    ```
    {
        "result": false,
        //登出失败
        "message": "用户未登录"
        
    }
    ```

### 查看用户个人信息
 + URL:`/data/user/information`
 + 方法:`GET`
 + 参数:无
 + 返回值:
 
    ```
    {
         "result": true,
         "userName":  "admin",
         "date": "1999-01-28",
         //注册日期
         "email": "abc@com"
    }
    ```

### 查看用户操作记录
 + URL:`data/user/record`
 + 方法:`GET`
 + 参数:无
 + 返回值:

    ```
    {
        "result": true,
        "records":[
            {
                "gameId": 0,
                "date": 2020-04-28,
                "time": 9:19:44,
                "status": false
                //游戏状态:通过/未通过
            },
            {
                "gameId": 0,
                "date": 2020-04-28,
                "time": 19:00:00,
                "status": true
            },
            {
                "gameId": 1,
                "date": 2020-04-29,
                "time": 12:00:00,
                "status": false
            }
        ]
    }
    ```
    
### 添加用户操作记录
 + URL:`data/user/record`
 + 说明:添加每一次游戏记录
 + 方法:`POST`
 + 参数:

    |参数|描述|
    |:-:|:-:|
    |gameId|游戏ID|
    |date|操作日期|
    |time|操作时间|
    |status|游戏状态|

 + 返回值:

    ```
    {
        "result": true
    }
    ```

### 存储历史场景
 + URL:`/data/game/save`
 + 说明:这里的string ‘history’可能比较长:)
 + 目前只有两个游戏,ID 为0,1
 + history只存储最近的历史,即每次save会覆盖原来的历史
 + 方法:`POST`
 + 参数:
 
    |参数|描述|
    |:-:|:-:|
    |gameId|游戏ID|
    |history|游戏历史|

 + 返回值

    ```
    {
        "result": true
    }
    ```
 
### 加载历史场景
 + URL:`/data/game/load`
 + 说明:当该游戏没有历史记录时,result=true,返回空数据即可
 + 方法:`GET`
 + 参数:
    
    |参数|描述|
    |:-:|:-:|
    |gameId|游戏ID|

 + 返回值:
    
    ```
    {
        "result": true,
        "history": ""
    }
    ```
---------

# 附加功能-协同学习
后台管理页面: http://49.235.35.92:8759/
## 信令服务器 
+ 信令服务器用于传递客户端之间的会话控制信息与网络配置参数
+ 信令服务器与客户端通信参数
    ```
        EVENT_TYPE:CLIENT_RTC_EVENT|SERVER_RTC_EVENT|CLIENT_USER_EVENT|SERVER_USER_EVENT
        msg{
            type:CLIENT_USER_EVENT_LOGIN|SERVER_USER_EVENT_UPDATE_USERS|OPERATING|CLIENT_USER_EVENT_FINISH
            payload:{} 
        }       
    ```

## stun与turn服务器
+ 
    ```
    "iceServers": [
        { url: 'stun:stun.ekiga.net' },
        { url: 'turn:turnserver.com', username: 'user', credential: 'pass' }
    ]
    ```
## 视频协助
### 视频房间
为每位用户生成8位的随机字符串作为userID, 亦为其拥有房间的RoomID，离开房间会失去房间所有权
+ 房间创建 

    ```js
    /**
     * 用户登录
     * @param {String} loginName 用户名
     */
    export function login(loginName) {
        localUser = loginName;
        sendUserEvent({
            type: CLIENT_USER_EVENT_LOGIN,
            payload: {
                loginName: loginName
            }
        });
    }
    ```
+ 加入房间
    ```js
  export async function linkRemoteRoom(remoteId) {
        remoteUser = remoteId;
        await startVideoTalk(remoteUser);
  }
    ```
+ 离开房间    
离开房间时，会将与远程建立连接时的变量如remoteUser，peerConnection都置空，并停止媒体流数据的获取，恢复视频窗口关闭状态

### 实现
+ 音视频信息采集接口MediaDevices.getUserMedia()    
通过MediaDevices.getUserMedia() 获取用户多媒体权限时，仅工作于以下三种环境：
  + localhost 域
  + 开启了 HTTPS 的域
  + 使用 file:/// 协议打开的本地文件
其他情况下，比如在一个 HTTP 站点上，navigator.mediaDevices 的值为 undefined。
而此次的pj基于使用的是http协议，因此需要开启在chrome中开启相应的flag才能正常使用该接口

+ 开启Flag    
通过传递相应参数来启动 Chrome 中 **Insecure origins treated as secure** 并将其添加进入白名单
  + 打开 chrome://flags/#unsafely-treat-insecure-origin-as-secure
  + 将该 flag 切换成 enable 状态
  + 输入框中填写需要开启的域名与接口，譬如 "http://49.235.35.92:8759, http://49.235.35.92:4200"，多个以逗号分隔
  + 重启浏览器后生效 

## 控制协助
   通过OPERATING类型的消息，由服务器进行鼠标移动数据的转发，接收端则解析数据进行同步     

    ```js
      onOperate(event) :void{
        if(event.type==Blockly.Events.BLOCK_MOVE&&remoteUser!=''){
          
        let workspace  = Blockly.Workspace.getById(event.workspaceId);
        let tmp = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
        
          var msg = {
            type: 'OPERATING',
            payload: {
                content: tmp,
                target: remoteUser
            }};
          socket.emit('CLIENT_USER_EVENT', JSON.stringify(msg));
          console.log("--- blockly send change ---");
          console.log(tmp);
          workspace.removeChangeListener(this);
        }
      }    
    ```
---------
# 人员分工及贡献比例
+ 唐昕悦(前端, 25%)
blockly板块,
blockly协同学习功能,
游戏信息板块(game-description) ,
游戏列表板块(list-of-games),
编写 Markdown文档

+ 李舒阳(前端, 25%)
导航栏优化(header)
首页(home),
登录注册登出(login,register),
QuikStart界面(quick-start),
个人信息界面(user-info),
动画演示(animation)

+ 杨辉 (后端, 25%)
实现后端所有的接口

+ 夏应锋 (后端, 25%)
使用coturn实现p2p WebRTC(视频聊天功能)
使用Docker部署项目到公有云上
--------
# 项目部署
## 信令服务器部署
信令服务器是基于node.js实现的，而其功能较为单一轻便，因此直接使用screen + npm start完成其在服务器端的部署
```
screen -S videoScreen
npm install
npm start
Ctrl + A + D 
```
## 后端SpringBoot项目的docker部署
### 打包项目
+ 建立数据库
    + 在Linux服务器上安装Mysql
    + 建立相应的database——blockly与table——user/history/record
    ```
    CREATE DATABASE blockly;
    USE blockly;
      
    DROP TABLE IF EXISTS `user`;
    CREATE TABLE `user`(
      `id` INT (11) PRIMARY KEY NOT NULL ,
      `name` VARCHAR(255) NOT NULL UNIQUE,
      `pwd` VARCHAR(255) NOT NULL,
      `email` VARCHAR(255),
      `avatar` VARCHAR(255) DEFAULT '/',
      `date` VARCHAR(255)
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;
    
    ALTER TABLE `user` MODIFY `id` INT(11) AUTO_INCREMENT,AUTO_INCREMENT=1;

  
    DROP TABLE IF EXISTS `history`;
    CREATE TABLE `history`(
      `userId` INT(11) NOT NULL ,
      `gameId` INT(11) NOT NULL ,
      `history` LONGTEXT,
      FOREIGN KEY (userId) REFERENCES user(id),
      PRIMARY KEY (userId,gameId)
    )
  
    
    DROP TABLE IF EXISTS `record`;
    CREATE TABLE `record`(
      `userId` INT(11) NOT NULL ,
      `gameId` INT(11) NOT NUll ,
      `date` CHAR(255) NOT NULL ,
      `time` CHAR(255) NOT NULL ,
      `status` BOOLEAN NOT NULL DEFAULT FALSE ,
      FOREIGN KEY (userId) REFERENCES user(id)
    )
    ```
    + 为root账号提供远程访问权限

+ 执行maven命令生成jar包
    ```
    mvn clean
    mvn build
    ```
+ 将jar包部署到Linux服务器
    + 使用ssh将jar包上传到Linux服务器上
    + 编写Dockerfile
    ```
    FROM java:8
    #FROM frolvlad/alpine-oraclejdk8:slim
    VOLUME /tmp
    ADD Blockly-0.0.1-SNAPSHOT.jar spring-boot-docker.jar
    EXPOSE 8080
    RUN sh -c 'touch /spring-boot-docker.jar'
    ENV JAVA_OPTS=""
    ENTRYPOINT ["java", "-jar", "/spring-boot-docker.jar"]
    ```
    + 创建 docker 镜像并启动容器
    ```
    sudo docker build -t blockly2.0 .
    sudo docker run -d -p 8080:8080 blockly2.0
    ```
  
## 前端Angular项目的部署
+ 使用SSH将angular项目文件发送到云主机
+ 在云主机上编译并部署    
    由于nodejs服务器默认host为127.0.0.1，仅允许通过本地网关回环访问，未开放远程访问权限，因此需要在启动命令后加上参数host: 0.0.0.0
    ```
    cnpm install
    ng serve --host 0.0.0.0
    ```



