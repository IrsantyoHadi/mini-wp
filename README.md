# mini-wp
## Deploy Link
http://miniwp.irsantyohadi.com/

## Endpoint

baseUrl = http:localhost:3000/
### *Doesn't Require Token*

#### User Routes
| Routes                | Method | Request Body                                           | Response Data      | Response Error                                                                                                            | Description                                 |
|-----------------------|--------|--------------------------------------------------------|--------------------|---------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| `/users/signup`       | POST   | `{ firstname , lastname , username, email, password }` | `{ access_token }` | 400 (`{email}` has been registered!) <br>400 (`{email}` is not a valid email!) <br>  (`${username}` has been registered!) | Register a new user                         |
| `/users/signin`       | POST   | `{ username, password }`                               | `{ access_token }` | 400 (Wrong email/password)                                                                                                | Log in and get an email verification!       |
| `/users/googleSignIn` | POST   | `{ id_token }`                                         | `{ access_token }` |                                                                                                                           | Sign in with Google and get a new password! |

### Token is required!

#### Article Routes (`{ headers: { token } }`)
| Routes                 | Method | Request Body                      | Response Success     | Response Error|Description                                                                                                                                 |
|------------------------|--------|-----------------------------------|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/articles/all`        | GET    | -                                 | `{ data }`           | 500 (Internal Server Error)|                                                                                                                               |
| `/articles/`           | POST   | `{title,content,userId,imageUrl}` | `${success message}` | 401(Invalid Token) <br> 401(Please Login) <br> 404 (Wrong User)|Create a new Article!                                                                      |
| `/articles/:articleId` | DELETE | -                                 | `{ deleted }`        | 401 (Invalid Token)<br> 401 (Please Login) <br> 401 (Unauthorized) <br> 404 (Wrong User) <br> 500 (Internal Server Error)|Delete an Article                |
| `/articles/`           | GET    |                                   |                      | 401 (Invalid Token)<br> 401 (Please Login) <br> 404 (Wrong User) <br> 500 (Internal Server Error)|for searchin articles and take article for spesific user |
| `/articles/:id`        | PUT    | -                                 | `{ updated }`        | 401 (Invalid Token) <br> 401 (Please login ) <br> 401 Unauthorized <br> 404 (Wrong User) <br> 500 (Internal Server Error)|Updated an article!              |