import 'package:flutter/material.dart';
import 'home_page.dart';

class TweetViewPage2 extends StatefulWidget {
  Widget? viewedTweet;
  String? viewedTweetID;

  TweetViewPage2({Key? key, this.viewedTweet, this.viewedTweetID})
      : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return _TweetViewPage2State();
  }
}

class _TweetViewPage2State extends State<TweetViewPage2> {
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
                  widget.viewedTweet!,
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 75),
                    child: Divider(
                      color: Color(0xff6d71ff),
                    ),
                  )
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
