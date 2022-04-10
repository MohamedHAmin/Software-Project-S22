import 'dart:ui';

import 'package:flutter/material.dart';
import 'home_page.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
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
                backgroundImage: const AssetImage('assets/user_avatar.png'),
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
                width: 25,
              ),
              ElevatedButton(
                onPressed: () {
                  setState(() {
                    followed = !followed;
                  });
                },
                style: ElevatedButton.styleFrom(
                    shape: CircleBorder(),
                    primary: followed ? Colors.red : Colors.green),
                child: Icon(
                  followed
                      ? Icons.group_remove_outlined
                      : Icons.group_add_outlined,
                  color: Colors.white,
                  size: 25.0,
                ),
              )
            ],
          ),
          SizedBox(
            height: 20,
          ),
          Divider(
            color: Color(0xff6d71ff),
          ),
          SizedBox(
            height: 20,
          ),
          Container(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Row(children: <Widget>[
                    CircleAvatar(
                      backgroundImage:
                          const AssetImage('assets/user_avatar.png'),
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
                      'Tweet Content: this is only an example of the tweet text and will be updated later.')
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
