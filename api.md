

## 1. 创建课程


POST /courseRegister

```json
{
    //level can only be lower case
    "name": "beginner",
    "cap": 12,
    "instructor": "gilbert"
    ...
}
```

## 2. 创建课程日程 

POST /courseRegister/addTime

```json
{
    "start_date" : "2021-11-09 EST",
    "end_date" : "2021-12-09 EST",
    "schedules": [
        {
            "day": 1,
            "start_time" : "4 PM",
            "end_time": "5 PM"
        },

        {
            "day": 3,
            "start_time" : "2 PM",
            "end_time": "3 PM"
        }
    ]
}
```

start_date -> end_date for loop
cur_date for shedule -> Monday

insert {
    id: id
    date: cur_date
    start
    ... 
}

schema

```json
{
    "course_id": "",
    "date": "",
    "start_time": "",
    "end_time": "",
}
```

## 3. 创建学生

```json

POST /studentRegister

```json
{
    "name": "Austin Zhang",
    "email": "austin.jl.zhang@gmail.com",
    "phone": "5197816693",
    "gender": "Male",
    "age": 3,
    "invoice": "#3223332",
    "level" : "beginnner"
    ...
}


```

## 为学生添加课程

coure 的 cap - 1 (未完成)

```json

POST /studentRegister/addSchedule

```json
{
    "invoice": "#3223332",
    "level": "beginner",
    "days": [1,3,5],

    ...
}


```

## Review student

```json
{
    "invoice": ""
    
}

## Remain api

课程的删除

schedule的删除

student的删除

student 的请假

student 的补课

student 的search

student 的 update


点名

学生的login

需要一个记录学生请假的东西



