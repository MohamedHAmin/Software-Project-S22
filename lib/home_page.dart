import 'package:flutter/material.dart';
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
  Widget? embedded;
  final bool liked;
  final bool reTweet;
  final String? text;
  final String? name;
  final String? tag;

  _tweet(
      {Key? key,
      this.embedded,
      this.liked = false,
      this.reTweet = false,
      @required this.text,
      @required this.name,
      @required this.tag})
      : super(key: key);

  @override
  State<_tweet> createState() => _tweetState(liked);
}

class _tweetState extends State<_tweet> {
  bool liked = false;
  bool deleted = false;

  _tweetState(this.liked);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(children: <Widget>[
          CircleAvatar(
            backgroundImage: const AssetImage('assets/user_2.png'),
          ),
          TextButton(
              onPressed: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => ProfilePage2()));
              }, //Action to be added later
              child: Row(children: [
                Text('${widget.name}',
                    style: TextStyle(
                        color: Colors.black,
                        fontWeight: FontWeight.bold,
                        fontSize: 18))
              ])),
          Text('@${widget.tag}',
              style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                  color: Color(0xff9e9e9e))),
          Text(
            ' 23m',
            style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 8,
                color: Color(0xff9e9e9e)),
          ),
          if (widget.reTweet == true) ...[
            SizedBox(
              width: 20,
            ),
            Icon(
              Icons.loop,
              color: Colors.grey[800],
              size: 20,
            ),
            Text(
              ' Retweeted',
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 10,
                  color: Color(0xff9e9e9e)),
            )
          ],
        ]),
        Text(widget.text ?? ''),
        Align(
            alignment: Alignment.centerRight,
            child: Row(children: [
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
                    Icons.dvr,
                    size: 20,
                    color: Colors.black,
                  )),
              ElevatedButton(
                onPressed: () {
                  setState(() {
                    liked = !liked;
                  });
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
                      color: liked ? Color(0xff6d71ff) : Colors.white,
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
              ElevatedButton(
                onPressed: () {
                  setState(() {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => CreatePostScreenUI2()));
                  });
                },
                style: ElevatedButton.styleFrom(
                  shape: CircleBorder(),
                  primary: Colors.white,
                  fixedSize: Size(15, 15),
                ),
                child: Stack(
                  children: [
                    Icon(
                      Icons.repeat_on,
                      color: Colors.white,
                      size: 20,
                    ),
                    Icon(
                      Icons.repeat,
                      size: 20,
                      color: Colors.black,
                    ),
                  ],
                ),
              ),
              ElevatedButton(
                onPressed: () {
                  setState(() {
                    deleted = !deleted;
                  });
                },
                style: ElevatedButton.styleFrom(
                  shape: CircleBorder(),
                  primary: Colors.white,
                  fixedSize: Size(15, 15),
                ),
                child: Stack(
                  children: [
                    Icon(
                      Icons.delete_rounded,
                      color: deleted ? Colors.deepPurpleAccent : Colors.white,
                      size: 20,
                    ),
                    Icon(
                      Icons.delete_outline_outlined,
                      size: 20,
                      color: Colors.black,
                    ),
                  ],
                ),
              ),
            ])),
        SizedBox(
          height: 15,
        ),
        if (widget.embedded == null) ...[
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 75),
            child: Divider(
              color: Color(0xff6d71ff),
            ),
          )
        ] else ...[
          Container(
            padding: EdgeInsets.all(8),
            margin: EdgeInsets.all(8),
            decoration: BoxDecoration(
              border: Border.all(),
              borderRadius: BorderRadius.all(Radius.circular(8)),
            ),
            child: widget.embedded,
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

  Future<Column> tweetList() async {
    if (await NetworkHandler.getTimeline() == true) {
      List<Widget> tweets = [];
      for (Map<dynamic, dynamic> tweet in NetworkHandler.responseBody) {
        _tweet newTweet = _tweet(
            text: tweet['text'],
            name: tweet['authorId']['screenName'],
            tag: tweet['authorId']['tag'],
            liked: tweet['isliked']);

        List<Widget> images = [];

        for (Map<dynamic, dynamic> image in tweet['gallery']) {
          images.add(Image(
            image: NetworkImage(image['photo']),
            fit: BoxFit.fitWidth,
            width: 40,
            height: double.infinity,
          ));
        }

        if (images.isNotEmpty) {
          newTweet.embedded = GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: NeverScrollableScrollPhysics(),
            crossAxisSpacing: 5,
            mainAxisSpacing: 5,
            children: [...images],
          );
        }
        tweets.add(newTweet);
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
      drawer: Drawer(
        child: SingleChildScrollView(
          child: Container(
            child: Column(
              children: [
                MyHeaderDrawer(),
                MyDrawerList(),
              ],
            ),
          ),
        ),
      ),
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
          menuItem(2, "Admin Page", Icons.admin_panel_settings,
              currentPage == DrawerSections.admin ? true : false),
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
