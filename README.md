# The Backend for mobile social media app


## Login End Point
- [POST - https://forum.nascomsoft.com/api/v1/user/login](https://forum.nascomsoft.com/api/v1/user/login)

- Post JSON Data
```
{
	"email": "yohanaabana02@gmail.com",
	"password": "2222222222"
}
```
### Reponse
- Success Response
```
{
	"token": "Auth token",
	"user": {
		"email": "yohanaabana02@gmail.com",
		"fullName": "Yohanna Abana"
	}
}
```
- Error Response
```
{
	"success": false,
	"message": "Email address or Password is not correct"
}
```

## Register End Point

- [POST - https://forum.nascomsoft.com/api/v1/user/register](https://forum.nascomsoft.com/api/v1/user/register)

- Post JSON Data
```
{
	"fullName": "Yohanna Abana",
	"email": "yohanaabana02@gmail.com",
	"password": "2222222222"
}
```

### Response
- Success Response
```
{
	"success": true,
	"message": "User registered successfully"
}
```
- Error Response
```
{
	"success": false,
	"message": "Email address already registered"
}
```

## Get User Info End Point

- [GET - https://forum.nascomsoft.com/api/v1/user](https://forum.nascomsoft.com/api/v1/user)
- **Header** - authorization = Bearer token

### Response

- Success Response
```
{
	"user": {
		"id": "6403427a7e7b2d882b0ee2b2",
		"fullName": "Yohanna Abana",
		"email": "yohanaabana02@gmail.com"
	}
}
```

- Error Response
```
{
	"success": false,
	"message": "Not Authorized"
}
```

## Create Post End Point

- [POST - https://forum.nascomsoft.com/api/v1/posts](https://forum.nascomsoft.com/api/v1/posts)

- **Header** - authorization = Bearer token

- Post JSON Data
```
{
	"text": "Post message"
}
```

### Response

- Success Response
```
{
	"_id": "6406e0977483a99abf80b92c",
	"text": "Post message",
	"author": {
		"_id": "64037e7e456d15335cc21a0e",
		"fullName": "Yohanna Abana",
		"email": "yohanaabana02@gmail.com"
	},
	"comments": [],
	"createdAt": "2023-03-07T06:58:31.887Z"
}
```

- Error Response
```
{
	"success": false,
	"message": "Not Authorized"
}
```

## Fetch All Post End Point

- [GET - https://forum.nascomsoft.com/api/v1/posts](https://forum.nascomsoft.com/api/v1/posts)

- **Header** - authorization = Bearer token

### Response

- Success Response
```
[
	{
		"_id": "6406e0937483a99abf80b927",
		"text": "Post 2",
		"author": {
			"_id": "64037e7e456d15335cc21a0e",
			"fullName": "Yohanna Abana",
			"email": "yohanaabana02@gmail.com"
		},
		"comments": [],
		"createdAt": "2023-03-07T06:58:27.915Z"
	},
	{
		"_id": "6406dfe7f3a478a6559d01b5",
		"text": "Post 1",
		"author": {
			"_id": "64037e7e456d15335cc21a0e",
			"fullName": "Yohanna Abana",
			"email": "yohanaabana02@gmail.com"
		},
		"comments": [],
		"createdAt": "2023-03-07T06:55:35.211Z"
	}
]
```

- Error Response
```
{
	"success": false,
	"message": "Not Authorized"
}
```

## Fetch Single Post End Point

- [GET - https://forum.nascomsoft.com/api/v1/posts/<<post_id>>](https://forum.nascomsoft.com/api/v1/posts/<<post_id>>)

- **Header** - authorization = Bearer token

### Response

- Success Response
```
{
	"_id": "6406e0937483a99abf80b927",
	"text": "Post 2",
	"author": {
		"_id": "64037e7e456d15335cc21a0e",
		"fullName": "Yohanna Abana",
		"email": "yohanaabana02@gmail.com"
	},
	"comments": [],
	"createdAt": "2023-03-07T06:58:27.915Z"
}
```

- Error Response
```
{
	"success": false,
	"message": "Post not found"
}
```
or
```
{
	"success": false,
	"message": "Not Authorized"
}
```