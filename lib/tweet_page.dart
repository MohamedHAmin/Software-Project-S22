import 'package:flutter/material.dart';
import 'home_page.dart';

class TweetViewPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _TweetViewPageState();
  }
}

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

class _TweetViewPageState extends State<TweetViewPage> {
  @override
  Widget build(BuildContext context) {
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
          child: Container(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  _tweet(
                    embedded: null,
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
