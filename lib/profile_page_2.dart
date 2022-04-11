import 'dart:ui';

import 'package:flutter/material.dart';
import 'home_page.dart';

class ProfilePage2 extends StatefulWidget {
  const ProfilePage2({Key? key}) : super(key: key);

  @override
  State<ProfilePage2> createState() => _ProfilePage2State();
}

class _tweet extends StatefulWidget {
  const _tweet({Key? key}) : super(key: key);

  @override
  State<_tweet> createState() => _tweetState();
}

class _tweetState extends State<_tweet> {
  bool liked = false;
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(children: <Widget>[
          CircleAvatar(
            backgroundImage: const AssetImage('assets/user_2.png'),
          ),
          TextButton(
              onPressed: null, //Action to be added later
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
          )
        ]),
        Text(
            'Tweet Content: this is only an example of the tweet text and will be updated later.'),
        Align(
            alignment: Alignment.centerRight,
            child: ElevatedButton(
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
            )),
        SizedBox(
          height: 15,
        ),
        Padding(
            padding: EdgeInsets.symmetric(horizontal: 75),
            child: Divider(
              color: Color(0xff6d71ff),
            )),
      ],
    );
  }
}

class _ProfilePage2State extends State<ProfilePage2> {
  bool followed = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xffffffff),
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
      body: Column(
        children: [
          SizedBox(
            height: 20,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SizedBox(
                width: 25,
              ),
              CircleAvatar(
                backgroundImage: const AssetImage('assets/user_2.png'),
              ),
              SizedBox(
                width: 25,
              ),
              Text('Username',
                  style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 18)),
              SizedBox(
                width: 5,
              ),
              Text('@user_handle',
                  style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Color(0xff9e9e9e))),
              SizedBox(
                width: 40,
              ),
              ElevatedButton(
                onPressed: () {
                  setState(() {
                    followed = !followed;
                  });
                },
                style: ElevatedButton.styleFrom(
                  shape: CircleBorder(),
                  primary: followed ? Colors.red : Colors.green,
                  fixedSize: Size(20, 20),
                ),
                child: Icon(
                  followed
                      ? Icons.group_remove_outlined
                      : Icons.group_add_outlined,
                  color: Colors.white,
                  size: 20.0,
                ),
              )
            ],
          ),
          SizedBox(
            height: 10,
          ),
          Divider(
            color: Color(0xff6d71ff),
          ),
          SizedBox(
            height: 10,
          ),
          Container(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  _tweet(),
                  _tweet(),
                ]),

            // this container is for tweets
          ),
        ],
      ),
      bottomNavigationBar: BottomAppBar(
        color: const Color(0xffffffff),
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
