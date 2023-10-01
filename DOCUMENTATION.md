# Official Documentation For HNGX Chrome Extension API 🚀

The official documentaion

### Base Structure

For every request you make to my endpoint whether the request is successful or not, you would always get a structure like this

```json
{
  "code": 200,
  "status": "OK",
  "message": "Message from my endpoint",
  "data": {}
}
```

The message can be an error message or a success message, then the data would be populated for every successful request.

### Base URL

`https://localhost:2800/api/video`

### Endpoint actions

`Upload`, `GetAll` `GetById`, `Delete`

### Upload Endpoint

The upload endpoint takes another parameter which is `/upload` just for clarity.

**Upload Endpoint URL**`https://localhost:2800/api/video/upload`

The API endpoint expects a video file and a title property in the **Request Body**

```json
{
  "title": "Writing Unit Tests In NodeJS Recording"
}
```

and then a file which is the recorded video.

#### Success Response

If the request succeeds, the API would return the following.

```json
{
  "code": 200,
  "status": "OK",
  "message": "Video upload successful",
  "data": {
    "title": "Writing Unit Tests In NodeJS Recording",
    "transcript": "So, in the last section, you learned how to write unit tests. Unit tests are easy to write, they're fast to execute, and they're ideal for testing functions with zero or minimal dependency to external resources. But in real world applications, we need to work with one or more external resources. That's where integration tests come into the picture. With integration tests, we test our application code along with these external resources as a whole. So, to write integration tests, we need a real database. We populate this database with data for testing. Now, we send an HTTP request to an endpoint we want to test, and then make an assertion. That assertion may involve inspecting the response or the database. For example, if we send an HTTP POST request to create a new genre, in an integration test, we're going to look at our database and verify that this new genre is there. So that's the big picture. In the next lecture, we're going to make a few simple tweaks to our application and prepare it for integration testing.",
    "url": "localhost:2800/assets/bdffd525-50b1-414b-ba15-9f968b85f45e-181 Introduction.mp4",
    "_id": "65198db127a67a0db92a4d0c",
    "createdAt": "2023-10-01T15:18:09.856Z",
    "updatedAt": "2023-10-01T15:18:09.856Z"
  }
}
```

### Get All Videos Endpoint

The getAllVideos endpoint gets all the videos in the database, this is great if you want to display all the videos a user has recorded in the user's dashboard.

**Request URL**
`http://localhost:2800/api/video/`

**Example**
`localhost:2800/api/video/`

#### Success Response

If the request succeeds, the API would return the following.

```json
{
  "code": 200,
  "status": "OK",
  "message": "Videos fetched successfully",
  "data": [
    {
      "_id": "65173b1ea76617b607a00356",
      "title": "Webiste Hero Section Bug Fix",
      "transcript": "so the issue with the header is that you've to add an absolute positioning",
      "url": "localhost:2800/assets/09791925-20c0-4a23-b3fa-bfab467ffdf2-y2mate.com - Warriyo  Mortals feat Laura Brehm NCS Release.mp3",
      "createdAt": "2023-09-29T21:01:18.348Z",
      "updatedAt": "2023-09-29T21:01:18.348Z"
    },

    {
      "_id": "65198db127a67a0db92a4d0c",
      "title": "Writing Unit Tests in Node Js Recording",
      "transcript": "So, in the last section, you learned how to write unit tests. Unit tests are easy to write, they're fast to execute, and they're ideal for testing functions with zero or minimal dependency to external resources. But in real world applications, we need to work with one or more external resources. That's where integration tests come into the picture. With integration tests, we test our application code along with these external resources as a whole. So, to write integration tests, we need a real database. We populate this database with data for testing. Now, we send an HTTP request to an endpoint we want to test, and then make an assertion. That assertion may involve inspecting the response or the database. For example, if we send an HTTP POST request to create a new genre, in an integration test, we're going to look at our database and verify that this new genre is there. So that's the big picture. In the next lecture, we're going to make a few simple tweaks to our application and prepare it for integration testing.",
      "url": "localhost:2800/assets/bdffd525-50b1-414b-ba15-9f968b85f45e-181 Introduction.mp4",
      "createdAt": "2023-10-01T15:18:09.856Z",
      "updatedAt": "2023-10-01T15:18:09.856Z"
    },

    {
      "_id": "65199a1e19426728c0ab89a3",
      "title": "Test cases in TTD",
      "transcript": "All right, now let's brainstorm and write all the test cases that we can think of this is not a complete lease It may change or extend it later so When we send a post request to this endpoint How should this endpoint behave? Well, first of all, we want to make sure that only Authenticated users can call this endpoint. So this should return 401 or unauthorized if client is not logged in. That's one test case Assuming that the client is logged in. What is the next thing we need to check for? We want to make sure that customer ID is provided and if not, we want to return a bad request So you should return 400 if customer ID is not provided Similarly we want to make sure that movie ID is provided as well. So It should return 400 if movie ID is not provided It is possible that the client sends both the customer ID and movie ID, but we don't have a rental for this combination Then we want to return 404 or not found if no rental Found for this customer and movie What is the next possibility that we do have a rental but that rental is already processed in other words The customer already returned the movie in that case. We want to return 400 which means this is a bad request So return 400 if rental already processed So These are all the negative cases Now, let's take a look at positive cases if we get to this point, that means we're processing a valid return so we should return 200 if This is a valid request We should also set the return date. So set the return date Next we need to calculate the rental fee. So calculate The rental fee We should also add the movie back to the stock so increase the stock and Finally, what should we return to the client in the body of the response? We can return the summary of the rental so return the rental So this is the rental with all the properties set date out date returned rental fee and so on So these are the initial test cases that I can think of over the next few lectures We're going to implement each of these test cases one by one",
      "url": "localhost:2800/assets/1e678471-f029-4d25-a43c-52a0f7e5ceb6-200 Test Cases.mp4",
      "createdAt": "2023-10-01T16:11:10.443Z",
      "updatedAt": "2023-10-01T16:11:10.443Z"
    }
  ]
}
```

### Get By Id Endpoint

The getById endpoint returns only video based on the id passed from the request parameters not the body.

**Request URL**
`http://localhost:2800/api/video/:id`

**Example**
`localhost:2800/api/video/65199a1e19426728c0ab89a3`

#### Success Response

If the request succeeds, the API would return the following.

```json
{
  "code": 200,
  "status": "OK",
  "message": "Video fetched successfully",
  "data": {
    "_id": "65199a1e19426728c0ab89a3",
    "title": "Test cases in TTD",
    "transcript": "All right, now let's brainstorm and write all the test cases that we can think of this is not a complete lease It may change or extend it later so When we send a post request to this endpoint How should this endpoint behave? Well, first of all, we want to make sure that only Authenticated users can call this endpoint. So this should return 401 or unauthorized if client is not logged in. That's one test case Assuming that the client is logged in. What is the next thing we need to check for? We want to make sure that customer ID is provided and if not, we want to return a bad request So you should return 400 if customer ID is not provided Similarly we want to make sure that movie ID is provided as well. So It should return 400 if movie ID is not provided It is possible that the client sends both the customer ID and movie ID, but we don't have a rental for this combination Then we want to return 404 or not found if no rental Found for this customer and movie What is the next possibility that we do have a rental but that rental is already processed in other words The customer already returned the movie in that case. We want to return 400 which means this is a bad request So return 400 if rental already processed So These are all the negative cases Now, let's take a look at positive cases if we get to this point, that means we're processing a valid return so we should return 200 if This is a valid request We should also set the return date. So set the return date Next we need to calculate the rental fee. So calculate The rental fee We should also add the movie back to the stock so increase the stock and Finally, what should we return to the client in the body of the response? We can return the summary of the rental so return the rental So this is the rental with all the properties set date out date returned rental fee and so on So these are the initial test cases that I can think of over the next few lectures We're going to implement each of these test cases one by one",
    "url": "localhost:2800/assets/1e678471-f029-4d25-a43c-52a0f7e5ceb6-200 Test Cases.mp4",
    "createdAt": "2023-10-01T16:11:10.443Z",
    "updatedAt": "2023-10-01T16:11:10.443Z"
  }
}
```

### Delete Endpoint

You can also delete a specific video based on the ID of the video. The delete endpoint delets a video based on the id passed from the request parameters not the body.

**Request URL**
`http://localhost:2800/api/video/:id`

**Example**
`localhost:2800/api/video/65199a1e19426728c0ab89a3`

#### Success Response

If the video was successfully deleted, then the API would return

```json
{
  "code": 200,
  "status": "OK",
  "message": "Video deleted successfully",
  "data": {}
}
```

#### Error Response

If the id doesn't exist or there was an issue with the request you made, you should get one of the following response

**Video Not Found**
The id provided did not match a video in the database.

```json
{
  "code": 404,
  "status": "Not Found",
  "message": "Video not found",
  "data": {}
}
```

**An Error Occured**
An internal server error

```json
{
  "code": 500,
  "status": "Internal Server Error",
  "message": "Something went wrong, please try again later!",
  "data": {}
}
```

**Route Not Found**
You made a wrong request

```json
{
  "code": 404,
  "status": "Not Found",
  "message": "Route not found",
  "data": {}
}
```
