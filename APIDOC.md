# TravelScheduler api doc

## User

#### POST /api/user/register

request

```
body: {
    username,
    email
}
```

response

```
body: {
    success: true,
    message: "",
    data: {
        user_id,
    }
}
```

## Travel

#### GET /api/travel/get1

request

```
session: {
    user_id,
}
```

response

```
body: {
    success: true,
    message: ""
    data: {
        travels: [
            travel_id,
            travel_name,
            travel_date,
            travel_peoplenum,
            travel_description,
            travel_done,
            group_id,
        ]
    }
}
```

#### GET /api/travel/get2

request

```
headers: {
    travel_id,
}
```

response

```
body: {
    success: true,
    message: "",
    data: {
        travel_id,
        travel_name,
        travel_date,
        travel_peoplenum,
        travel_description,
        travel_done,
        id,     //if (user_id == null) id = group_id  else id = user_id
        name,   //if (user_id == null) name = group_name  else id = user_name
        days: [
            {
                spots: [
                    {
                        spot_id,
                        spot_name,
                        spot_location,
                        spot_rank,
                        spot_openhour,
                        spot_description,
                        spot_arrive_time,
                        spot_start_time,
                        spot_transportation,  // "" if terminus
                        spot_tag_id,
                        spot_tag_name,
                        spot_tag_color,
                    }
                ]
            }
        ]
    }
}
```

#### POST /api/travel/create

request

```
session: {
    user_id,
}

body: {
    travel_name,
    group_id,
    travel_date,
    travel_peoplenum,
    travel_description,
    travel_done,
}
```

response

```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### DELETE /api/travel/delete

request

```
body: {
    travel_id
}
```

response

```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### PUT /api/travel/edit

request

```
body: {
    travel_id,
    travel_name,
    travel_date,
    travel_peoplenum,
    travel_description,
    travel_done,
    group_id,
}
```

response

```
body: {
    success: true,
    message: "",
    data: {}
}
```

## Spot

#### GET1 /api/spot/get1

request

```
session: {
    user_id,
}
```

response

```
body: {
    success: true,
    message: "",
    data: {
        undone_spots: [
            {
                spot_id,
                spot_name,
                spot_location,
                spot_longtitude,
                spot_latitude,
                spot_rank,
                spot_openhour,
                spot_description,

            }
        ],
        done_spots: [
            {
                spot_id,
                spot_name,
                spot_location,
                spot_longtitude,
                spot_latitude,
                spot_rank,
                spot_openhour,
                spot_description,

            }
        ],
        star_spots: [
            {
                spot_id,
                spot_name,
                spot_location,
                spot_longtitude,
                spot_latitude,
                spot_rank,
                spot_openhour,
                spot_description,

            }
        ],
    }

```
#### GET2 /api/spot/get2
request

```
headers: {
    travel_id,
}
```

response

```
body: {
    success: true,
    message: "",
    data: {
        spots: [
            {
                has_id,
                arrive_id, 
                spot_id,
                spot_name,
                spot_location,
                spot_longtitude,
                spot_latitude,
                spot_transportation,
                spot_rank,
                spot_openhour,
                spot_description,
                spot_tag_name,
                spot_tag_color,
                spot_done
            }
        ]
    }
}
```
#### POST /api/spot/create

request

```
session: {
    user_id,
}

body: {
    spot_name: (string),
    spot_latitude: (float),
    spot_longtitude: (float),
    spot_location: (string),
    spot_rank: (float),
    spot_openhour: (string),
    spot_description: (string),
    spot_tag_name: (string),
    spot_tag_color: (string),
    arrive_id: (string),
    spot_transportation: (string),
    spot_start_time: (datetime),
    spot_arrive_time: (datetime),
    travel_id: (string)
}
```

response

```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### PUT /api/spot/edit

request

```
body: {
    has_id: (string),
    spot_id: (string),
    spot_description: (string),
    spot_tag_name: (string),
    spot_transportation: (string),
    spot_start_time: (datetime),
    spot_arrive_time: (datetime),
    arrive_id: (string),
    travel_id: (string),
    spot_star: (將spot納入star: true;
                將spot移除star: false;
                與star無關: null)
}
```

response

```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### DELETE /api/spot/delete

request

```
body: {
    has_id: (string)
}
```

response

```
body: {
    success: true,
    message: "",
    data: {}
}
```

## Group

#### GET /api/group/

request

```
session: {
    user_id
}
```

response

```
body: {
    success: true,
    message: "",
    data: {
        groups: [
            {
                group_id,
                group_name.
                group_description,
                group_peoplenum,
                group_creator_id,
                group_creator_name,
                members: [
                    {
                        user_id,
                        username,
                    }
                ]
            }
        ]
    }
}
```

#### POST /api/group/create

request

```
body: {
    group_name,
    group_description,
}
```

response

```
body: {
    success: true,
    message: "",
    data: {
        group_id,
    }
}
```

#### POST /api/group/join

request

```
body: {
    group_id,
    user_id,
}
```

response

```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### DELETE /api/group/kick

request

```
body: {
    user_id,
    group_id,
}
```

response

```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### PUT /api/group/edit

request

```
body: {
    group_id,
    group_name,
    group_description,
}
```

response

```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### DELETE /api/group/delete

request

```
body: {
    group_id,
}
```

response

```
body: {
    success: true,
    message: "",
    data: {}
}
```

## TAG

#### GET /api/tag/

request
```
none
```

response
```
body: {
    success: true,
    message: "",
    data: {
        tags: [
            {
                tag_id,
                tag_name,
                tag_color,
            }
        ]
    }
}

```

## Error return

response

```
body: {
    success: false,
    message: "",
    data: {}
}
```
