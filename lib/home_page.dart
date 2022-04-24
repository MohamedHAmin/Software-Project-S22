import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'NetworkHandler.dart';
import 'side_menu.dart';

import 'settings_page.dart';
import 'create_post_page.dart';

import 'profile_page.dart';
import 'profile_page_2.dart';
import 'admin_page.dart';
import 'tweet_page_2.dart';
import 'quote_post_page.dart';

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
        Row(children: <Widget>[
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
                  Navigator.push(context,
                      MaterialPageRoute(builder: (context) => ProfilePage2()));
                } else {
                  Navigator.push(context,
                      MaterialPageRoute(builder: (context) => ProfilePage()));
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
            SizedBox(
              width: 10,
            ),
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
            SizedBox(
              width: 50,
            ),
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
                              builder: (context) => TweetViewPage2()));
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

class HomePage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _HomePageState();
  }
}

class _HomePageState extends State<HomePage> {
  var currentPage = DrawerSections.home;
  String? name;
  String? tag;
  String? avatarURL;

  Future<bool> updateProfile() async {
    if (await NetworkHandler.getMyProfile(
            NetworkHandler.userToken['ownerId']) ==
        true) {
      name = NetworkHandler.responseBody['screenName'];
      tag = NetworkHandler.responseBody['tag'];
      avatarURL = NetworkHandler.responseBody['profileAvater']['url'];
    }
    return true;
  }

  Future<Column> tweetList() async {
    if (await NetworkHandler.getTimeline() == true) {
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
    if (currentPage == DrawerSections.profile) {
      Future.delayed(Duration.zero, () async {
        Navigator.push(
            context, MaterialPageRoute(builder: (context) => ProfilePage()));
      });
    } else if (currentPage == DrawerSections.admin) {
      Future.delayed(Duration.zero, () async {
        Navigator.push(
            context, MaterialPageRoute(builder: (context) => AdminPage()));
      });
    } else if (currentPage == DrawerSections.settings) {
      Future.delayed(Duration.zero, () async {
        Navigator.push(
            context, MaterialPageRoute(builder: (context) => SettingsPageUI()));
      });
    }
    return Scaffold(
      appBar: AppBar(
        //backgroundColor: const Color(0xffffffff),
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              'assets/Logo_no_bg.png',
              height: 100,
            ),
          ],
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: FutureBuilder<Widget>(
              future: tweetList(),
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  return snapshot.data ?? Column();
                } else {
                  return Center(child: CircularProgressIndicator());
                }
              }),
        ),
      ),
      drawer: FutureBuilder<bool>(
          future: updateProfile(),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return Drawer(
                child: SingleChildScrollView(
                  child: Container(
                    child: Column(
                      children: [
                        MyHeaderDrawer(
                            name: name, tag: tag, avatarURL: avatarURL),
                        MyDrawerList(),
                      ],
                    ),
                  ),
                ),
              );
            } else {
              return Center(child: CircularProgressIndicator());
            }
          }),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(context,
              MaterialPageRoute(builder: (context) => CreatePostScreenUI()));
        },
        backgroundColor: Color(0xff6d71ff),
        child: Icon(Icons.add_sharp),
      ),
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

  Widget MyDrawerList() {
    return Container(
      padding: EdgeInsets.only(
        top: 15,
      ),
      child: Column(
        // shows the list of menu drawer
        children: [
          menuItem(1, "Profile", Icons.account_circle,
              currentPage == DrawerSections.profile ? true : false),
          if (NetworkHandler.adminToken.isNotEmpty) ...[
            menuItem(2, "Admin Page", Icons.admin_panel_settings,
                currentPage == DrawerSections.admin ? true : false)
          ],
          menuItem(3, "Settings", Icons.settings,
              currentPage == DrawerSections.settings ? true : false),
        ],
      ),
    );
  }

  Widget menuItem(int id, String title, IconData icon, bool selected) {
    return Material(
      color: selected ? Colors.grey[300] : Colors.transparent,
      child: InkWell(
        onTap: () {
          Navigator.pop(context);
          setState(() {
            if (id == 1) {
              currentPage = DrawerSections.profile;
            } else if (id == 2) {
              currentPage = DrawerSections.admin;
            } else if (id == 3) {
              currentPage = DrawerSections.settings;
            }
          });
        },
        child: Padding(
          padding: EdgeInsets.all(15.0),
          child: Row(
            children: [
              Expanded(
                child: Icon(
                  icon,
                  size: 20,
                  color: Colors.black,
                ),
              ),
              Expanded(
                flex: 3,
                child: Text(
                  title,
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 16,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

enum DrawerSections {
  home,
  profile,
  admin,
  settings,
}
