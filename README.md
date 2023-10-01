# HNGX Chrome Extension Backend API 🚀

This is the **API** for the **HNGX Frontend Chrome Extension Task**

## Documentation 📖\*

This is a brief documentation of the **HNGX Frontend Chrome Extension Task API** for more concise documentation please see the [Documentation](./DOCUMENTATION.md)

#### Base Structure

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

#### Base URL

`https://localhost:2800/api/video`

#### Endpoint actions

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
