import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:http/testing.dart';

class NetworkHandler {
  static const String BaseURL =
      'http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api';

  static bool mocked = false;
  static dynamic responseBody = {};

  static Map<dynamic, dynamic> userToken = {};
  static Map<dynamic, dynamic> adminToken = {};

  static final http.Client _client = http.Client();
  static final http.Client _mockClient =
      MockClient((http.Request request) async {
    String requestURL = (request.url.toString()).substring(BaseURL.length);
    Map<dynamic, dynamic> requestBody = json.decode(request.body);

    http.Response response;

    switch (requestURL) {
      case '/user/login':
        {
          if (requestBody['email_or_username'] == 'Admin' &&
              requestBody['password'] == 'Admin') {
            response = http.Response(
                json.encode({
                  "user": {
                    "_id": "625dc6a5e9ead7eb1d687ddb",
                    "screenName": "user117",
                    "tag": "3omda",
                    "birthDate": "1970-01-01T00:00:00.000Z",
                    "isPrivate": false,
                    "verified": true,
                    "profileAvater": null,
                    "banner": null,
                    "followercount": 0,
                    "followingcount": 0,
                    "createdAt": "2022-04-18T20:14:29.769Z",
                    "updatedAt": "2022-04-18T20:18:58.122Z",
                    "__v": 0,
                    "id": "625dc6a5e9ead7eb1d687ddb"
                  },
                  "token": {
                    "token":
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVkYzZhNWU5ZWFkN2ViMWQ2ODdkZGIiLCJpYXQiOjE2NTAzMTMxNjR9.ezkXPC4cbseKar9MZvLUyiyHs7Tr9qyKO4XhEk9tEaY",
                    "ownerId": "625dc6a5e9ead7eb1d687ddb",
                    "_id": "625dc7cce9ead7eb1d687de6",
                    "createdAt": "2022-04-18T20:19:24.222Z",
                    "updatedAt": "2022-04-18T20:19:24.222Z",
                    "__v": 0,
                    "id": "625dc7cce9ead7eb1d687de6"
                  }
                }),
                200);
          } else {
            response = http.Response(
                json.encode({
                  "error": "Error: unable to login",
                }),
                400);
          }
          break;
        }
      case '/user/signup':
        {
          if (requestBody['tag'] == 'Admin') {
            response = http.Response(
                json.encode({
                  "error": "Error: User already exists",
                }),
                400);
          } else {
            response = http.Response(
                json.encode({
                  "status": "success",
                }),
                201);
          }
          break;
        }

      default:
        {
          response = http.Response(
              json.encode({
                "error": "Error: Bad Request",
              }),
              403);
          break;
        }
    }

    return response;
  });

  static Future<bool> login(String username, String password) async {
    http.Request request = http.Request(
      'POST',
      Uri.parse('$BaseURL/user/login'),
    );
    request.body = json.encode({
      "email_or_username": username,
      "password": password,
    });
    request.headers.addAll({
      "Content-Type": "application/json",
    });

    http.Response response = await http.Response.fromStream(
        await (mocked ? _mockClient.send(request) : _client.send(request)));

    responseBody = json.decode(response.body);

    /**/
    userToken = responseBody['token'] ?? {};
    adminToken = responseBody['user']['adminToken'] ?? {};
    /**/

    return response.statusCode == 200;
  }

  static Future<bool> signup(
      String username, String email, String password, DateTime birthday) async {
    http.Request request = http.Request(
      'POST',
      Uri.parse('$BaseURL/user/signup'),
    );
    request.body = json.encode({
      "screenName": username,
      "email": email,
      "password": password,
      "tag": username
    });
    request.headers.addAll({
      "Content-Type": "application/json",
    });

    http.Response response = await http.Response.fromStream(
        await (mocked ? _mockClient.send(request) : _client.send(request)));

    responseBody = json.decode(response.body);

    return response.statusCode == 201;
  }

  static Future<bool> logout_1() async {
    http.Request request = http.Request(
      'DELETE',
      Uri.parse('$BaseURL/user/logout'),
    );
    request.body = json.encode({});
    request.headers.addAll({
      "Content-Type": "application/json",
      "Authorization": userToken['token'],
    });

    http.Response response = await http.Response.fromStream(
        await (mocked ? _mockClient.send(request) : _client.send(request)));

    /**/
    //responseBody = json.decode(response.body);
    responseBody = {'success': response.statusCode == 200};
    /**/

    return response.statusCode == 200;
  }

  static Future<bool> logout_2() async {
    http.Request request = http.Request(
      'DELETE',
      Uri.parse('$BaseURL/user/logoutall'),
    );
    request.body = json.encode({});
    request.headers.addAll({
      "Content-Type": "application/json",
      "Authorization": userToken['token'],
    });

    http.Response response = await http.Response.fromStream(
        await (mocked ? _mockClient.send(request) : _client.send(request)));

    /**/
    //responseBody = json.decode(response.body);
    responseBody = {'success': response.statusCode == 200};
    /**/

    return response.statusCode == 200;
  }

  static Future<bool> getTimeline() async {
    http.Request request = http.Request(
      'GET',
      Uri.parse('$BaseURL/timeline'),
    );
    request.body = json.encode({});
    request.headers.addAll({
      "Content-Type": "application/json",
      "Authorization": userToken['token'],
    });

    http.Response response = await http.Response.fromStream(
        await (mocked ? _mockClient.send(request) : _client.send(request)));

    responseBody = json.decode(response.body);

    return response.statusCode == 200;
  }

  static Future<bool> getProfileTweets(String id) async {
    http.Request request = http.Request(
      'GET',
      Uri.parse('$BaseURL/tweet/user/$id'),
    );
    request.body = json.encode({});
    request.headers.addAll({
      "Content-Type": "application/json",
      "Authorization": userToken['token'],
    });

    http.Response response = await http.Response.fromStream(
        await (mocked ? _mockClient.send(request) : _client.send(request)));

    responseBody = json.decode(response.body);

    return response.statusCode == 200;
  }

  static Future<bool> getMyProfile(String id) async {
    http.Request request = http.Request(
      'GET',
      Uri.parse('$BaseURL/profile/$id/me'),
    );
    request.body = json.encode({});
    request.headers.addAll({
      "Content-Type": "application/json",
      "Authorization": userToken['token'],
    });

    http.Response response = await http.Response.fromStream(
        await (mocked ? _mockClient.send(request) : _client.send(request)));

    responseBody = json.decode(response.body);

    return response.statusCode == 200;
  }

  static Future<bool> getUserProfile(String id) async {
    http.Request request = http.Request(
      'GET',
      Uri.parse('$BaseURL/profile/$id'),
    );
    request.body = json.encode({});
    request.headers.addAll({
      "Content-Type": "application/json",
      "Authorization": userToken['token'],
    });

    http.Response response = await http.Response.fromStream(
        await (mocked ? _mockClient.send(request) : _client.send(request)));

    responseBody = json.decode(response.body);

    return response.statusCode == 200;
  }

  static Future<bool> getTweet(String id) async {
    http.Request request = http.Request(
      'GET',
      Uri.parse('$BaseURL/tweet/$id'),
    );
    request.body = json.encode({});
    request.headers.addAll({
      "Content-Type": "application/json",
      "Authorization": userToken['token'],
    });

    http.Response response = await http.Response.fromStream(
        await (mocked ? _mockClient.send(request) : _client.send(request)));

    responseBody = json.decode(response.body);

    return response.statusCode == 200;
  }

  static Future<bool> getFollowers(String id) async {
    http.Request request = http.Request(
      'GET',
      Uri.parse('$BaseURL/user/$id/follower'),
    );
    request.body = json.encode({});
    request.headers.addAll({
      "Content-Type": "application/json",
      "Authorization": userToken['token'],
    });

    http.Response response = await http.Response.fromStream(
        await (mocked ? _mockClient.send(request) : _client.send(request)));

    responseBody = json.decode(response.body);

    return response.statusCode == 200;
  }

  static Future<bool> getFollowings(String id) async {
    http.Request request = http.Request(
      'GET',
      Uri.parse('$BaseURL/user/$id/following'),
    );
    request.body = json.encode({});
    request.headers.addAll({
      "Content-Type": "application/json",
      "Authorization": userToken['token'],
    });

    http.Response response = await http.Response.fromStream(
        await (mocked ? _mockClient.send(request) : _client.send(request)));

    responseBody = json.decode(response.body);

    return response.statusCode == 200;
  }

  static Future<bool> create_post(
      String text, bool imageCheck, List<File?> images) async {
    http.MultipartRequest request = http.MultipartRequest(
      'POST',
      Uri.parse('$BaseURL/tweet'),
    );
    request.fields.addAll({
      "text": text,
      "imageCheck": imageCheck.toString(),
    });
    request.headers.addAll({
      "Content-Type": "application/json",
      "Authorization": userToken['token'],
    });

    for (File? image in images) {
      if (image != null) {
        request.files
            .add(await http.MultipartFile.fromPath('image', image.path));
      }
    }

    http.Response response = await http.Response.fromStream(
        await (mocked ? _mockClient.send(request) : _client.send(request)));

    responseBody = json.decode(response.body);

    return response.statusCode == 200;
  }

  static Future<bool> quote_post(String text, String quotedTweetID,
      bool imageCheck, List<File?> images) async {
    http.Request request = http.Request(
      'POST',
      Uri.parse('$BaseURL/retweet'),
    );
    request.body = json.encode({
      "text": text,
      "retweetedTweet": quotedTweetID,
    });
    request.headers.addAll({
      "Content-Type": "application/json",
      "Authorization": userToken['token'],
    });

    http.Response response = await http.Response.fromStream(
        await (mocked ? _mockClient.send(request) : _client.send(request)));

    responseBody = json.decode(response.body);

    return response.statusCode == 200;
  }

  static Future<bool> delete_post(String id) async {
    http.Request request = http.Request(
      'DELETE',
      Uri.parse('$BaseURL/tweet/$id'),
    );
    request.body = json.encode({});
    request.headers.addAll({
      "Content-Type": "application/json",
      "Authorization": userToken['token'],
    });

    http.Response response = await http.Response.fromStream(
        await (mocked ? _mockClient.send(request) : _client.send(request)));

    /**/
    //responseBody = json.decode(response.body);
    responseBody = {'success': response.statusCode == 200};
    /**/

    return response.statusCode == 200;
  }

  static Future<bool> delete_post_admin(String id) async {
    http.Request request = http.Request(
      'DELETE',
      Uri.parse('$BaseURL/tweet/$id'),
    );
    request.body = json.encode({});
    request.headers.addAll({
      "Content-Type": "application/json",
      "Authorization": adminToken['token'],
    });

    http.Response response = await http.Response.fromStream(
        await (mocked ? _mockClient.send(request) : _client.send(request)));

    /**/
    //responseBody = json.decode(response.body);
    responseBody = {'success': response.statusCode == 200};
    /**/

    return response.statusCode == 200;
  }

  /*
  static Future<bool> quote_post(String text, String quotedTweetID,
      bool imageCheck, List<File?> images) async {
    http.MultipartRequest request = http.MultipartRequest(
      'POST',
      Uri.parse('$BaseURL/retweet'),
    );
    request.fields.addAll({
      "text": text,
      "retweetedTweet": quotedTweetID,
      "imageCheck": imageCheck.toString(),
    });
    request.headers.addAll({
      "Content-Type": "application/json",
      "Authorization": userToken['token'],
    });

    for (File? image in images) {
      if (image != null) {
        request.files
            .add(await http.MultipartFile.fromPath('image', image.path));
      }
    }

    http.Response response = await http.Response.fromStream(
        await (mocked ? _mockClient.send(request) : _client.send(request)));

    responseBody = json.decode(response.body);

    return response.statusCode == 200;
  }
  */

  static Future<bool> toggleTweetLike(String id) async {
    http.Request request = http.Request(
      'PUT',
      Uri.parse('$BaseURL/tweet/$id/like'),
    );
    request.body = json.encode({});
    request.headers.addAll({
      "Content-Type": "application/json",
      "Authorization": userToken['token'],
    });

    http.Response response = await http.Response.fromStream(
        await (mocked ? _mockClient.send(request) : _client.send(request)));

    responseBody = json.decode(response.body);

    return response.statusCode == 201;
  }

  static Future<bool> toggleUserFollow(
      String followerid, String followingid, bool isfollowing) async {
    http.Request request = http.Request(
      'POST',
      Uri.parse(
          '$BaseURL/user/$followerid/${(isfollowing) ? 'unfollow' : 'follow'}/$followingid'),
    );
    request.body = json.encode({});
    request.headers.addAll({
      "Content-Type": "application/json",
      "Authorization": userToken['token'],
    });

    http.Response response = await http.Response.fromStream(
        await (mocked ? _mockClient.send(request) : _client.send(request)));

    responseBody = json.decode(response.body);

    return response.statusCode == 200;
  }

  static Future<bool> banUser_admin(String id, int duration) async {
    http.Request request = http.Request(
      'POST',
      Uri.parse('$BaseURL/admin/ban/$id'),
    );
    request.body = json.encode({
      "duration": duration,
    });
    request.headers.addAll({
      "Content-Type": "application/json",
      "Authorization": adminToken['token'],
    });

    http.Response response = await http.Response.fromStream(
        await (mocked ? _mockClient.send(request) : _client.send(request)));

    responseBody = json.decode(response.body);

    return response.statusCode == 200;
  }

  static Future<bool> change_user_data(
      String id,
      String birth,
      String password,
      String location,
      String screenName,
      String email,
      File profileAvater,
      File banner) async {
    http.MultipartRequest request = http.MultipartRequest(
      'PUT',
      Uri.parse('$BaseURL/profile/$id'),
    );
    request.fields.addAll({
      "birth": birth,
      "password": password,
      "location": location,
      "screenName": screenName,
      "email": email,
    });
    request.headers.addAll({
      "Content-Type": "application/json",
      "Authorization": userToken['token'],
    });
    request.files
        .add(await http.MultipartFile.fromPath('image', profileAvater.path));
    request.files.add(await http.MultipartFile.fromPath('image', banner.path));

    http.Response response = await http.Response.fromStream(
        await (mocked ? _mockClient.send(request) : _client.send(request)));

    responseBody = json.decode(response.body);

    return response.statusCode == 200;
  }
}
