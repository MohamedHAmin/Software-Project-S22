import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'theme.dart';
import 'edit_profile.dart';
import 'NetworkHandler.dart';

class SettingsPageUI extends StatefulWidget {
  const SettingsPageUI({Key? key}) : super(key: key);

  @override
  State<SettingsPageUI> createState() => _SettingsPageUIState();
}

class _SettingsPageUIState extends State<SettingsPageUI> {
  //////////////////////////////////////////////////////////////////////////////
  bool valNotify1 = false;

  onChangeFunction1(bool newvalue1) {
    setState(() {
      valNotify1 = newvalue1;
    });
  }

  /////////////////////////////////////////////////////////////////////////////
  bool valNotify2 = false;

  onChangeFunction2(bool newvalue2) {
    setState(() {
      valNotify2 = newvalue2;
    });
  }
  ///////////////////////////////////////////////////////////////

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        //backgroundColor: Color(0xff6d71ff),
        title: const Text(
          "Settings",
          style: TextStyle(fontSize: 22),
        ),
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: const Icon(
            Icons.arrow_back,
            color: Colors.white,
          ),
        ),
      ),
      body: Container(
        padding: const EdgeInsets.all(10),
        child: ListView(
          children: [
            const SizedBox(height: 40),
            Row(
              children: const [
                Icon(
                  Icons.person,
                  color: Color(0xff6d71ff),
                ),
                SizedBox(width: 10),
                Text(
                  "Account",
                  style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
                )
              ],
            ),
            const Divider(
              height: 20,
              thickness: 1,
            ),
            const SizedBox(
              height: 10,
            ),
            ////////////////////////////////////////////////////////////////////
            EditProfile('Edit Profile'),
            sliderbtn('Private Account Status', valNotify1, onChangeFunction1),
            sliderbtn('Hide Personal Data', valNotify2, onChangeFunction2),
            ///////////////////////////////////////////////////////////////////
            const SizedBox(
              height: 30,
            ),
            Row(
              children: const [
                Icon(Icons.color_lens, color: Color(0xff6d71ff)),
                SizedBox(width: 10),
                Text(
                  "Appearance",
                  style: TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                  ),
                )
              ],
            ),
            const Divider(
              height: 20,
              thickness: 1,
            ),
            const SizedBox(
              height: 10,
            ),
            //////////////////////////////////////////////////////
            changetheme("Dark Theme"),
            /////////////////////////////////////////////////////
            const SizedBox(height: 10),
            Center(
              child: OutlinedButton(
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 14),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                ),
                onPressed: () async {
                  if (await NetworkHandler.logout_1() == true) {
                    debugPrint(NetworkHandler.responseBody.toString());
                    Navigator.popUntil(context, (route) => route.isFirst);
                  } else {
                    debugPrint(NetworkHandler.responseBody.toString());
                  }
                },
                child: const Text(
                  "Logout from this Device",
                  style: TextStyle(
                      fontSize: 16, letterSpacing: 2.2, color: Colors.black),
                ),
              ),
            ),
            const SizedBox(height: 10),
            Center(
              child: OutlinedButton(
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 14),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                ),
                onPressed: () async {
                  if (await NetworkHandler.logout_2() == true) {
                    debugPrint(NetworkHandler.responseBody.toString());
                    Navigator.popUntil(context, (route) => route.isFirst);
                  } else {
                    debugPrint(NetworkHandler.responseBody.toString());
                  }
                },
                child: const Text(
                  "Logout from all Devices",
                  style: TextStyle(
                      fontSize: 16, letterSpacing: 2.2, color: Colors.black),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Padding changetheme(String title) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 20),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w500,
              color: Colors.grey[600],
            ),
          ),
          Transform.scale(
            scale: 0.7,
            child: Consumer<ThemeNotifier>(
              builder: (context, notifier, child) => CupertinoSwitch(
                activeColor: Color(0xff6d71ff),
                trackColor: Colors.grey,
                value: notifier.darkTheme,
                onChanged: (val) {
                  notifier.toggleTheme();
                },
              ),
            ),
          ),
        ],
      ),
    );
  }

  ////////////////////////////////////////////////////////////////////////////
  Padding sliderbtn(String title, bool value, Function onChangeMethode) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 20),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w500,
              color: Colors.grey[600],
            ),
          ),
          Transform.scale(
            scale: 0.7,
            child: CupertinoSwitch(
              activeColor: Color(0xff6d71ff),
              trackColor: Colors.grey,
              value: value,
              onChanged: (bool newValue) {
                onChangeMethode(newValue);
              },
            ),
          ),
        ],
      ),
    );
  }
  ///////////////////////////////////////////////////////////////////////////

  GestureDetector EditProfile(String title) {
    return GestureDetector(
      onTap: () {
        Navigator.push(context,
            MaterialPageRoute(builder: (context) => EditProfilePage()));
      },
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 20),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              title,
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w500,
                color: Colors.grey[600],
              ),
            ),
            const Icon(
              Icons.arrow_forward_ios,
              color: Colors.grey,
            ),
          ],
        ),
      ),
    );
  }
}
