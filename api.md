

## 创建课程


POST /course/create

```json
{
    //level can only be lower case
    "name": "beginner",
    "cap": "12",
    "instructor": "gilbert"
    ...
}
```

## 创建课程日程 

POST /course/schedule/create

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


