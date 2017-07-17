MongoDB的安装与MongoDB服务配置
　　Mongo DB 是目前在IT行业非常流行的一种非关系型数据库(NoSql),其灵活的数据存储方式备受当前IT从业人员的青睐。Mongo DB很好的实现了面向对象的思想(OO思想),在Mongo DB中 每一条记录都是一个Document对象。Mongo DB最大的优势在于所有的数据持久操作都无需开发人员手动编写SQL语句,直接调用方法就可以轻松的实现CRUD操作。
一、安装：

　　1. 官网：http://www.mongodb.org/downloads，下载对应系统的32/64位msi格式安装包

　　2. 安装路径：例 D:\MongoDB （路径可选，但不宜过深）

　　3. 安装完的配置：

　　　　在D:\MongoDB\下新建data文件夹

　　　　在D:\MongoDB\data下新建db和log文件夹

　　　　在D:\MongoDB\data\log下新建MongoDB.log文件

二、启动：

　　1. 进入D:\MongoDB\bin，输入：

1
mongod --dbpath D:\MongoDB\data\db
作用：将mongodb的数据库文件创建到D:\MongoDB\Data\db目录

此时界面会停在

2016-10-26T14:55:37.044+0800 I NETWORK  [initandlisten] waiting for connections on port 27017

此时数据库就已经启动。

　　2. 新开一个cmd窗口，运行mongo.exe 程序 ，此时前一个窗口显示

2016-10-26T14:56:05.855+0800 I NETWORK  [initandlisten] connection accepted from 127.0.0.1:60584 #1 (1 connection now open)

现在就可以使用mongodb数据库了。

三、使用：

1. 在之前运行mongo.exe的cmd窗口中，输入use testdb 来创建testdb数据库。

2. 输入db.addUser("test","123")为testdb创建一个用户

注意：V3版本mongoDB已经不再使用addUser，而是采用了db.createUser

1
2
3
4
5
6
7
db.createUser(
   {
     user: "accountUser",
     pwd: "password",
     roles: [ "readWrite", "dbAdmin" ]
   }
)
