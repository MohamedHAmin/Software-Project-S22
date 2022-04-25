import 'package:flutter/material.dart';
import 'home_page.dart';
import 'quote_post_page.dart';

class _tweet extends StatefulWidget {
  final Widget? embedded;
  final bool reTweet;
  const _tweet({Key? key, this.embedded, this.reTweet = false})
      : super(key: key);

  @override
  State<_tweet> createState() => _tweetState();
}

class _tweetState extends State<_tweet> {
  bool liked = false;
  bool deleted = false;
  bool reported = false;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(children: <Widget>[
          CircleAvatar(
            backgroundImage: const AssetImage('assets/user_avatar.png'),
          ),
          TextButton(
              onPressed: () {
                /*MISSING PATH*/
              },
              child: Row(children: [
                Text('Username',
                    style: TextStyle(
                        color: Colors.black,
                        fontWeight: FontWeight.bold,
                        fontSize: 18))
              ])),
          Text('@user_handle',
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
        Text(
            'Tweet Content: this is only an example of the tweet text and will be updated later.'),
        Align(
            alignment: Alignment.centerRight,
            child: Row(children: [
              ElevatedButton(
                onPressed: () {
                  setState(() {
                    liked = !liked;
                    /*MISSING PATH*/
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
                  if (!deleted) {
                    showDialog(
                      context: context,
                      builder: (context) => AlertDialog(
                        title: Text('Delete?'),
                        content:
                            Text('Are you sure you want to delete this tweet?'),
                        actions: <Widget>[
                          TextButton(
                            child: Text('Yes'),
                            onPressed: () {
                              setState(() {
                                deleted = true;
                                Navigator.pop(context);
                              });
                            },
                          ),
                          TextButton(
                            child: Text('No'),
                            onPressed: () {
                              Navigator.pop(context);
                            },
                          ),
                        ],
                      ),
                    );
                  } else {
                    showDialog(
                      context: context,
                      builder: (context) => AlertDialog(
                        title: Text('Report?'),
                        content: Text('You have already reported this tweet'),
                        actions: <Widget>[
                          TextButton(
                            child: Text('OK'),
                            onPressed: () {
                              Navigator.pop(context);
                            },
                          ),
                        ],
                      ),
                    );
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
              ElevatedButton(
                onPressed: () {
                  if (!reported) {
                    showDialog(
                      context: context,
                      builder: (context) => AlertDialog(
                        title: Text('Report?'),
                        content:
                            Text('Are you sure you want to report this tweet?'),
                        actions: <Widget>[
                          TextButton(
                            child: Text('Yes'),
                            onPressed: () {
                              setState(() {
                                reported = true;
                                Navigator.pop(context);
                              });
                            },
                          ),
                          TextButton(
                            child: Text('No'),
                            onPressed: () {
                              Navigator.pop(context);
                            },
                          ),
                        ],
                      ),
                    );
                  } else {
                    showDialog(
                      context: context,
                      builder: (context) => AlertDialog(
                        title: Text('Report?'),
                        content: Text('You have already reported this tweet'),
                        actions: <Widget>[
                          TextButton(
                            child: Text('OK'),
                            onPressed: () {
                              Navigator.pop(context);
                            },
                          ),
                        ],
                      ),
                    );
                  }
                },
                style: ElevatedButton.styleFrom(
                  shape: CircleBorder(),
                  primary: Colors.white,
                  fixedSize: Size(20, 20),
                ),
                child: Icon(
                  Icons.outlined_flag,
                  color: reported ? Colors.red : Color(0xff6d71ff),
                  size: 20.0,
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

class TweetViewPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _TweetViewPageState();
  }
}

class _TweetViewPageState extends State<TweetViewPage> {
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
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Container(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  _tweet(
                    embedded: GridView.count(
                      crossAxisCount: 2,
                      shrinkWrap: true,
                      physics: NeverScrollableScrollPhysics(),
                      crossAxisSpacing: 5,
                      mainAxisSpacing: 5,
                      children: [
                        Image(
                          image: NetworkImage(
                              'https://i.kym-cdn.com/photos/images/newsfeed/001/839/575/d69.jpg'),
                          fit: BoxFit.fitWidth,
                          width: 40,
                          height: double.infinity,
                        ),
                        Image(
                          image: NetworkImage(
                              'https://i.kym-cdn.com/photos/images/newsfeed/001/839/575/d69.jpg'),
                          fit: BoxFit.fitWidth,
                          width: 40,
                          height: double.infinity,
                        ),
                      ],
                    ),
                  ),
                ]),
          ),
        ),
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
}
