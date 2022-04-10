import 'package:flutter/material.dart';
import 'side_menu.dart';

import 'settings_page.dart';
import 'create_post_page.dart';

import 'profile_page.dart';

class HomePage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _HomePageState();
  }
}

class _HomePageState extends State<HomePage> {
  var currentPage = DrawerSections.home;

  @override
  Widget build(BuildContext context) {
    if (currentPage == DrawerSections.profile) {
      Future.delayed(Duration.zero, () async {
        Navigator.push(
            context, MaterialPageRoute(builder: (context) => ProfilePage()));
      });
    } else if (currentPage == DrawerSections.admin) {
      // Navigator.push(context, MaterialPageRoute(builder: (context) => AdminPage()));
    } else if (currentPage == DrawerSections.settings) {
      Future.delayed(Duration.zero, () async {
        Navigator.push(
            context, MaterialPageRoute(builder: (context) => Settings()));
      });
    }
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
      body: Container(
        child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
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
              Padding(
                  padding: EdgeInsets.symmetric(horizontal: 75),
                  child: Divider(
                    color: Color(0xff6d71ff),
                  )),
              Row(children: <Widget>[
                CircleAvatar(
                  backgroundImage: const AssetImage('assets/user_avatar.png'),
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
                  ' 12m',
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 8,
                      color: Color(0xff9e9e9e)),
                )
              ]),
              Text(
                  'Tweet 2 Content: this is only an example of the tweet text and will be updated later.')
            ]),

        // this container is for tweets
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
          Navigator.push(
              context, MaterialPageRoute(builder: (context) => CreatePost()));
        },
        backgroundColor: Color(0xff6d71ff),
        child: Icon(Icons.add_sharp),
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
