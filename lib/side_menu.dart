import 'package:flutter/material.dart';

class MyHeaderDrawer extends StatefulWidget {
  final String? name;
  final String? tag;
  final String? avatarURL;

  const MyHeaderDrawer(
      {Key? key,
      @required this.name,
      @required this.tag,
      @required this.avatarURL})
      : super(key: key);

  @override
  _MyHeaderDrawerState createState() => _MyHeaderDrawerState();
}

class _MyHeaderDrawerState extends State<MyHeaderDrawer> {
  @override
  Widget build(BuildContext context) {
    return Container(
      //color: Color(0xffffffff),
      width: double.infinity,
      height: 200,
      padding: EdgeInsets.only(top: 20.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            margin: EdgeInsets.only(bottom: 10),
            height: 70,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              image: (widget.avatarURL != null)
                  ? DecorationImage(
                      image: NetworkImage((widget.avatarURL)!),
                    )
                  : const DecorationImage(
                      image: AssetImage('assets/user_avatar.png'),
                    ),
            ),
          ),
          Text(
            "${widget.name}",
            style: TextStyle(color: Color(0xff2b3dbc), fontSize: 20),
          ),
          Text(
            "@${widget.tag}",
            style: TextStyle(
              color: Color(0xff6d71ff),
              fontSize: 14,
            ),
          ),
        ],
      ),
    );
  }
}
