import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'NetworkHandler.dart';

import 'home_page.dart';
import 'tweet_page_2.dart';
import 'quote_post_page.dart';

import 'profile_page_2.dart';

class _tweet extends StatefulWidget {
  Widget? image;
  Widget? embeddedTweet;
  bool reTweet;
  final bool liked;
  final String? id;
  final String? ownerid;
  final String? text;
  final DateTime? postDate;
  final String? avatarURL;
  final String? name;
  final String? tag;

  _tweet(
      {Key? key,
      this.image,
      this.embeddedTweet,
      this.liked = false,
      this.reTweet = false,
      @required this.id,
      @required this.ownerid,
      @required this.text,
      @required this.postDate,
      @required this.avatarURL,
      @required this.name,
      @required this.tag})
      : super(key: key);

  @override
  State<_tweet> createState() => _tweetState(liked);
}

class _tweetState extends State<_tweet> {
  bool liked = false;

  _tweetState(this.liked);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: <
            Widget>[
          Row(
            children: [
              CircleAvatar(
                foregroundImage: (widget.avatarURL != null)
                    ? NetworkImage((widget.avatarURL)!)
                    : null,
                backgroundImage:
                    (widget.ownerid != NetworkHandler.userToken['ownerId'])
                        ? const AssetImage('assets/user_2.png')
                        : const AssetImage('assets/user_avatar.png'),
              ),
              TextButton(
                  onPressed: () {
                    if (widget.ownerid != NetworkHandler.userToken['ownerId']) {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) =>
                                  ProfilePage2(userID: widget.ownerid)));
                    } else {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => ProfilePage()));
                    }
                  }, //Action to be added later
                  child: Column(children: [
                    Text('${widget.name}',
                        style: TextStyle(
                            color: Colors.black,
                            fontWeight: FontWeight.bold,
                            fontSize: 18)),
                    Text('@${widget.tag}',
                        style: TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            color: Color(0xff9e9e9e))),
                  ])),
              if (widget.postDate != null) ...[
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      DateFormat("EEE, MMMM d, yyyy")
                          .format(widget.postDate!.toLocal()),
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 8,
                          color: Color(0xff9e9e9e)),
                    ),
                    Text(
                      DateFormat("hh:mm aaa '" +
                              widget.postDate!.toLocal().timeZoneName +
                              "'")
                          .format(widget.postDate!.toLocal()),
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 8,
                          color: Color(0xff9e9e9e)),
                    ),
                  ],
                )
              ],
              if (widget.embeddedTweet != null) ...[
                Icon(
                  Icons.loop,
                  color: Colors.grey[800],
                  size: 20,
                ),
                Text(
                  ' Retweet',
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 10,
                      color: Color(0xff9e9e9e)),
                )
              ],
            ],
          ),
          if (widget.reTweet != true) ...[
            Row(
              children: [
                ElevatedButton(
                  onPressed: () async {
                    if (await NetworkHandler.delete_post(widget.id!) == true) {
                      setState(() {});
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    shape: CircleBorder(),
                    primary: Colors.white,
                    fixedSize: Size(15, 15),
                  ),
                  child: Stack(
                    children: [
                      Icon(
                        Icons.delete_forever_outlined,
                        color: Colors.red,
                        size: 20,
                      ),
                      Icon(
                        Icons.delete_forever,
                        color: Colors.black,
                        size: 20,
                      )
                    ],
                  ),
                ),
                if (NetworkHandler.adminToken.isNotEmpty) ...[
                  ElevatedButton(
                    onPressed: () async {
                      if (await NetworkHandler.delete_post_admin(widget.id!) ==
                          true) {
                        setState(() {});
                      }
                    },
                    style: ElevatedButton.styleFrom(
                      shape: CircleBorder(),
                      primary: Colors.white,
                      fixedSize: Size(15, 15),
                    ),
                    child: Icon(
                      Icons.delete,
                      color: Colors.red,
                      size: 20,
                    ),
                  ),
                ],
              ],
            ),
          ],
        ]),
        Text(widget.text ?? ''),
        SizedBox(
          height: 15,
        ),
        if (widget.image != null) ...[
          Container(
            padding: EdgeInsets.all(8),
            margin: EdgeInsets.all(8),
            decoration: BoxDecoration(
              border: Border.all(),
              borderRadius: BorderRadius.all(Radius.circular(8)),
            ),
            child: widget.image,
          ),
        ],
        if (widget.embeddedTweet != null) ...[
          Container(
            padding: EdgeInsets.all(8),
            margin: EdgeInsets.all(8),
            decoration: BoxDecoration(
              border: Border.all(),
              borderRadius: BorderRadius.all(Radius.circular(8)),
            ),
            child: widget.embeddedTweet,
          ),
        ],
        if (widget.reTweet != true) ...[
          Align(
            alignment: Alignment.centerRight,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                ElevatedButton(
                    onPressed: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => TweetViewPage2(
                                    viewedTweet: _tweet(
                                        image: widget.image,
                                        embeddedTweet: widget.embeddedTweet,
                                        id: widget.id,
                                        ownerid: widget.ownerid,
                                        text: widget.text,
                                        postDate: widget.postDate,
                                        avatarURL: widget.avatarURL,
                                        name: widget.name,
                                        tag: widget.tag,
                                        liked: false,
                                        reTweet: true),
                                    viewedTweetID: widget.id,
                                  )));
                    },
                    style: ElevatedButton.styleFrom(
                      shape: CircleBorder(),
                      primary: Colors.white,
                      fixedSize: Size(35, 35),
                    ),
                    child: Icon(
                      Icons.comment,
                      size: 20,
                      color: Colors.black,
                    )),
                ElevatedButton(
                  onPressed: () {
                    _tweet quotedTweet = widget;
                    quotedTweet.reTweet = true;
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => CreatePostScreenUI2(
                                  quotedTweet: quotedTweet,
                                  quotedTweetID: quotedTweet.id,
                                )));
                  },
                  style: ElevatedButton.styleFrom(
                    shape: CircleBorder(),
                    primary: Colors.white,
                    fixedSize: Size(15, 15),
                  ),
                  child: Icon(
                    Icons.repeat,
                    color: Colors.black,
                    size: 20,
                  ),
                ),
                ElevatedButton(
                  onPressed: () async {
                    if (await NetworkHandler.toggleTweetLike(widget.id!) ==
                        true) {
                      if (liked == NetworkHandler.responseBody['isliked']) {
                        await NetworkHandler.toggleTweetLike(widget.id!);
                      }
                      setState(() {
                        liked = !liked;
                      });
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    shape: CircleBorder(),
                    primary: Colors.white,
                    fixedSize: Size(15, 15),
                  ),
                  child: Stack(
                    children: [
                      Icon(
                        Icons.thumb_up,
                        color: liked ? Colors.green : Colors.white,
                        size: 20,
                      ),
                      Icon(
                        Icons.thumb_up_outlined,
                        size: 20,
                        color: Colors.black,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 75),
            child: Divider(
              color: Color(0xff6d71ff),
            ),
          )
        ],
      ],
    );
  }
}

class ProfilePage extends StatefulWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  String? name;
  String? tag;
  String? avatarURL;
  String? bannerURL;
  int? followers;
  int? followings;

  Future<bool> updateProfile() async {
    if (await NetworkHandler.getMyProfile(
            NetworkHandler.userToken['ownerId']) ==
        true) {
      name = NetworkHandler.responseBody['screenName'];
      tag = NetworkHandler.responseBody['tag'];
      avatarURL = NetworkHandler.responseBody['profileAvater']['url'];
      bannerURL = NetworkHandler.responseBody['banner']['url'];
      followers = NetworkHandler.responseBody['followercount'];
      followings = NetworkHandler.responseBody['followingcount'];
    }

    return true;
  }

  Future<Column> followerList() async {
    List<Widget> Followers = [];
    if (await NetworkHandler.getFollowers(
            NetworkHandler.userToken['ownerId']) ==
        true) {
      for (Map<dynamic, dynamic> followerinfo in NetworkHandler.responseBody) {
        Followers.add(
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              CircleAvatar(
                foregroundImage: (followerinfo['profileAvater']['url'] != null)
                    ? NetworkImage(followerinfo['profileAvater']['url']!)
                    : null,
                backgroundImage: const AssetImage('assets/user_2.png'),
              ),
              SizedBox(
                width: 20,
              ),
              TextButton(
                onPressed: () {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) =>
                              ProfilePage2(userID: followerinfo['_id'])));
                },
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('${followerinfo['screenName']}',
                        style: TextStyle(
                            color: Colors.black,
                            fontWeight: FontWeight.bold,
                            fontSize: 18)),
                    Text('@${followerinfo['tag']}',
                        style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: Color(0xff9e9e9e))),
                  ],
                ),
              ),
            ],
          ),
        );
        Followers.add(Divider(
          color: Color(0xff6d71ff),
        ));
      }
    }
    return Column(
      children: [...Followers],
    );
  }

  Future<Column> followingList() async {
    List<Widget> Followings = [];
    if (await NetworkHandler.getFollowings(
            NetworkHandler.userToken['ownerId']) ==
        true) {
      for (Map<dynamic, dynamic> followinginfo in NetworkHandler.responseBody) {
        Followings.add(
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              CircleAvatar(
                  foregroundImage: (followinginfo['followingId']
                              ['profileAvater']['url'] !=
                          null)
                      ? NetworkImage(
                          followinginfo['followingId']['profileAvater']['url']!)
                      : null,
                  backgroundImage: const AssetImage('assets/user_2.png')),
              SizedBox(
                width: 20,
              ),
              TextButton(
                onPressed: () {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => ProfilePage2(
                              userID: followinginfo['followingId']['_id'])));
                },
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('${followinginfo['followingId']['screenName']}',
                        style: TextStyle(
                            color: Colors.black,
                            fontWeight: FontWeight.bold,
                            fontSize: 18)),
                    Text('@${followinginfo['followingId']['tag']}',
                        style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: Color(0xff9e9e9e))),
                  ],
                ),
              ),
            ],
          ),
        );
        Followings.add(Divider(
          color: Color(0xff6d71ff),
        ));
      }
    }

    return Column(
      children: [...Followings],
    );
  }

  Future<Column> tweetList() async {
    if (await NetworkHandler.getProfileTweets(
            NetworkHandler.userToken['ownerId']) ==
        true) {
      List<dynamic> listoftweetsinfo = NetworkHandler.responseBody;
      List<Widget> tweets = [];
      for (Map<dynamic, dynamic> tweetinfo in listoftweetsinfo) {
        tweets.add(createNewTweet(tweetinfo, false));
      }

      return Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ...tweets,
        ],
      );
    } else {
      return Column();
    }
  }

  _tweet createNewTweet(Map<dynamic, dynamic> tweetinfo, bool isRetweet) {
    _tweet newTweet = _tweet(
        id: tweetinfo['_id'],
        ownerid: tweetinfo['authorId']['_id'],
        text: tweetinfo['text'],
        postDate: DateTime.tryParse(tweetinfo['createdAt'] ?? ''),
        avatarURL: tweetinfo['authorId']['profileAvater']['url'],
        name: tweetinfo['authorId']['screenName'],
        tag: tweetinfo['authorId']['tag'],
        liked: isRetweet ? false : tweetinfo['isliked'],
        reTweet: isRetweet);

    List<Widget> images = [];

    for (Map<dynamic, dynamic> image in tweetinfo['gallery']) {
      images.add(
        GestureDetector(
          child: Image(
            image: NetworkImage(image['photo']),
            fit: BoxFit.fitWidth,
            width: 40,
            height: double.infinity,
          ),
          onTap: () {
            showDialog(
              context: context,
              builder: (context) => AlertDialog(
                backgroundColor: Colors.black54,
                content: Image(
                  image: NetworkImage(image['photo']),
                  fit: BoxFit.fitWidth,
                  width: 1000,
                  height: double.infinity,
                ),
              ),
            );
          },
        ),
      );
    }

    if (images.isNotEmpty) {
      newTweet.image = GridView.count(
        crossAxisCount: 2,
        shrinkWrap: true,
        physics: NeverScrollableScrollPhysics(),
        crossAxisSpacing: 5,
        mainAxisSpacing: 5,
        children: [...images],
      );
    }

    if (tweetinfo['retweetedTweet'] != null) {
      newTweet.embeddedTweet =
          createNewTweet(tweetinfo['retweetedTweet'], true);
    }

    return newTweet;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        //backgroundColor: const Color(0xffffffff),
        centerTitle: true,
        title: Image.asset(
          'assets/Logo_no_bg.png',
          height: 100,
        ),
      ),
      body: FutureBuilder<bool>(
          future: updateProfile(),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return CustomScrollView(
                slivers: [
                  SliverAppBar(
                    floating: false,
                    pinned: false,
                    snap: false,
                    automaticallyImplyLeading: false,
                    backgroundColor: Colors.white,
                    toolbarHeight: 200,
                    expandedHeight: 200,
                    flexibleSpace: FlexibleSpaceBar(
                      background: (bannerURL != null)
                          ? Image(
                              image: NetworkImage(bannerURL!),
                              fit: BoxFit.fitWidth,
                              width: double.infinity,
                              height: 200,
                            )
                          : const Image(
                              image: AssetImage('assets/Logo_no_bg.png'),
                              fit: BoxFit.fitWidth,
                              width: double.infinity,
                              height: 200,
                            ),
                    ),
                  ),
                  SliverAppBar(
                    floating: false,
                    pinned: true,
                    snap: false,
                    automaticallyImplyLeading: false,
                    //backgroundColor: Colors.white,
                    toolbarHeight: 100,
                    title: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            CircleAvatar(
                              foregroundImage: (avatarURL != null)
                                  ? NetworkImage(avatarURL!)
                                  : null,
                              backgroundImage:
                                  const AssetImage('assets/user_avatar.png'),
                            ),
                            Column(
                              children: [
                                Text('$name',
                                    style: TextStyle(
                                        color: Colors.black,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 18)),
                                Text('@$tag',
                                    style: TextStyle(
                                        fontSize: 18,
                                        fontWeight: FontWeight.bold,
                                        color: Color(0xff9e9e9e))),
                              ],
                            ),
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          mainAxisSize: MainAxisSize.max,
                          children: [
                            TextButton(
                              onPressed: () {},
                              child: Text(
                                'Tweets\n?',
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                    color: Color(0xff9e9e9e)),
                              ),
                            ),
                            TextButton(
                              onPressed: () {},
                              child: Text(
                                'Likes\n?',
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                    color: Color(0xff9e9e9e)),
                              ),
                            ),
                            TextButton(
                              onPressed: () async {
                                showDialog(
                                  context: context,
                                  builder: (context) => AlertDialog(
                                    title: Text('Followers'),
                                    content: SingleChildScrollView(
                                      child: FutureBuilder<Widget>(
                                          future: followerList(),
                                          builder: (context, snapshot) {
                                            if (snapshot.hasData) {
                                              return snapshot.data ?? Column();
                                            } else {
                                              return Center(
                                                  child:
                                                      CircularProgressIndicator());
                                            }
                                          }),
                                    ),
                                  ),
                                );
                              },
                              child: Text(
                                'Followers\n$followers',
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                    color: Color(0xff9e9e9e)),
                              ),
                            ),
                            TextButton(
                              onPressed: () async {
                                showDialog(
                                  context: context,
                                  builder: (context) => AlertDialog(
                                    title: Text('Followings'),
                                    content: SingleChildScrollView(
                                      child: FutureBuilder<Widget>(
                                          future: followingList(),
                                          builder: (context, snapshot) {
                                            if (snapshot.hasData) {
                                              return snapshot.data ?? Column();
                                            } else {
                                              return Center(
                                                  child:
                                                      CircularProgressIndicator());
                                            }
                                          }),
                                    ),
                                  ),
                                );
                              },
                              child: Text(
                                'Following\n$followings',
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                    color: Color(0xff9e9e9e)),
                              ),
                            ),
                            if (NetworkHandler.adminToken.isNotEmpty) ...[
                              TextButton(
                                onPressed: () {},
                                child: Text(
                                  'Reports\n?',
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.red),
                                ),
                              ),
                            ],
                          ],
                        ),
                      ],
                    ),
                  ),
                  SliverList(
                    delegate: SliverChildListDelegate([
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 20),
                        child: FutureBuilder<Widget>(
                            future: tweetList(),
                            builder: (context, snapshot) {
                              if (snapshot.hasData) {
                                return snapshot.data ?? Column();
                              } else {
                                return Center(
                                    child: CircularProgressIndicator());
                              }
                            }),
                      ),
                    ]),
                  ),
                ],
              );
            } else {
              return Center(child: CircularProgressIndicator());
            }
          }),
      bottomNavigationBar: BottomAppBar(
        //color: const Color(0xffffffff),
        child: Container(
          margin: const EdgeInsets.only(left: 30.0, right: 30.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            mainAxisSize: MainAxisSize.max,
            children: <Widget>[
              IconButton(
                onPressed: () {
                  Navigator.push(context,
                      MaterialPageRoute(builder: (context) => HomePage()));
                },
                icon: Icon(Icons.home),
                iconSize: 35,
              ),
              const IconButton(
                onPressed: null,
                icon: Icon(Icons.search),
                iconSize: 35,
              ),
              const IconButton(
                onPressed: null,
                icon: Icon(Icons.notifications_active),
                iconSize: 35,
              )
            ],
          ),
        ),
      ),
    );
  }
}
