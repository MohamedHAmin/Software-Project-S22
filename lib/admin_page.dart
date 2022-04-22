import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'home_page.dart';

class AdminPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _AdminPageState();
  }
}

class _TweetAndUserReports extends StatefulWidget {
  const _TweetAndUserReports({Key? key}) : super(key: key);

  @override
  State<_TweetAndUserReports> createState() => _TweetAndUserReportsState();
}

class _TweetAndUserReportsState extends State<_TweetAndUserReports> {
  @override
  Widget build(BuildContext context) {
    return Center(
        child: SingleChildScrollView(
      child: Column(
        children: [
          DataTable(columns: const [
            DataColumn(
                label: Text(
              'Reported Tweets',
              style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w800,
                  color: Color(0xff6d71ff)),
            )),
            DataColumn(
                label: Text(
              'Reported Users',
              style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w800,
                  color: Color(0xff6d71ff)),
            ))
          ], rows: const [
            DataRow(cells: [DataCell(Text('XXXX')), DataCell(Text('XXXX'))]),
            DataRow(cells: [DataCell(Text('XXXX')), DataCell(Text('XXXX'))]),
            DataRow(cells: [DataCell(Text('XXXX')), DataCell(Text('XXXX'))]),
            DataRow(cells: [DataCell(Text('XXXX')), DataCell(Text('XXXX'))]),
          ])
        ],
      ),
    ));
  }
}

class _AdminPageState extends State<AdminPage> {
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
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Container(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[_TweetAndUserReports()]),
          ),
        ),
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
