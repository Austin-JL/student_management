

## 创建课程


POST /course/create

```json
{
    "name": "Beginner",
    "cap": "12",
    "instructor": "gilbert"
    ...
}
```

## 创建课程日程 

POST /course/schedule/create

```json
{
    "_id": "",
    "start_date": "2021-01-01",
    "end_date": "2022-01-01",
    "shcedule": [
        {
            "day": "Monday",
            "start_time": "",
            "end_time": ""
        },
        ...
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


