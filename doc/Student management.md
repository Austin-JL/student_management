



### Student interface 



- 学生通过姓名 生日 invoice#进行验证登录



#### log in 

| Name                    | xxx      |
| :---------------------- | -------- |
|                         |          |
| Brith(ddmmyyyy)         | 01012009 |
| * Invoice (optional id) |          |
|                         |          |



#### student main page

- [Leave request](#Leave request)
- [class schedule](#class schedule) *（optional）



#### Leave request

- 根据学生的信息结合学生选择的日期在_DB_中寻找学生所选日期的所有课程

| Date   | 日历（仅可选择学生课程阶段内时间） |
| ------ | ---------------------------------- |
| Course | （下拉菜单）                       |

- (optional function)  学生在_textbox_ 中填写请假原因

##### 请假  (请假时间大于24h并且可以请假)

- 学生请假成功，
- 根据学生的信息_DB_中匹配学生可以选择的补课课程 
  - 补课时间范围为学生上课的日期长度
  - 补课时间在课程注册时录入

| Date | 日历 |
| ---- | ---- |

#### Leave request ending page

##### ending page v1

- 如果学生请假时间小于24h 或者无补课

##### ending page v2

- 学生选择完补课的日期
  - 向后台发送notification





### Staff and instructor interface

#### Main page

- [Course registration](#Course registration)

- [Student registration](#Student registration)
- [Course search](#Course search)
- [Student search](#Student search)
- [Roll call system](#Roll call system)





#### Course registration

- 录入课程信息 
- 需要信息如下

| class name     |      |
| -------------- | ---- |
| Instructor     |      |
| class ID (key) |      |
| 上课时间       |      |
| 补课时间       |      |
| 课程人数       |      |
|                |      |

#### Student registration

- 注册学生信息
- 需要信息如下

| student name   | Oliver                   |
| -------------- | ------------------------ |
| Class          | Almighty                 |
| Age            | 1 eon                    |
| Phone#         | 12323345678              |
| Email          | onlygodonearth@gmail.com |
| 上课时间       |                          |
| Invoice number | #1                       |
| Gender         |                          |
|                |                          |





#### Student search 

- 这个功能用于根据学生的姓名 年龄 Birth 以及invoice # 查询学生信息
- 查询到学生后 有两个功能

##### 学生上课记录

- 给出指定时间段内学生的上课记录

##### student info update page

- 对学生的信息进行修改





#### Course search

- 根据课程id查询课程信息

| Class Name                         | Almighty                                       |
| ---------------------------------- | ---------------------------------------------- |
| Instructor                         |                                                |
| Avaliable cap（课程人数-请假人数） |                                                |
| class id                           |                                                |
| class schedule                     |                                                |
| student info                       | [student info page v2](#student info page v2]) |
|                                    |                                                |
|                                    |                                                |

##### student info page v2

| Name   | Age   | Gender | Invoice# | 学生上课记录                   |
| ------ | ----- | ------ | -------- | ------------------------------ |
| Oliver | 1 eon | God    | #1       | [学生上课记录](#学生上课记录]) |
|        |       |        |          |                                |

- sort 根据不同标准对学生名单进行sort
- filter 根据姓名 年龄 等信息搜索特定学生

##### （功能）class info update 

- 对课程信息进行修改





#### 点名系统



| Name   | Invoice # | Age   | Contact     | Check box |
| ------ | --------- | ----- | ----------- | --------- |
| Oliver | #1        | 1 eon | 12323345678 |           |
|        |           |       |             |           |
| 、     |           |       |             |           |



- 点击check box 后台将确认并记录学生的上课信息
