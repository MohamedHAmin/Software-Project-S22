import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'settings_page.dart';
import 'NetworkHandler.dart';

class EditProfilePage extends StatefulWidget {
  @override
  _EditProfilePageState createState() => _EditProfilePageState();
}

class _EditProfilePageState extends State<EditProfilePage> {
  bool showPassword = false;
  File? profileAvater;
  File? banner;

  handleImageFromGallery1() async {
    try {
      final image = await ImagePicker().pickImage(source: ImageSource.gallery);
      if (image == null) return;

      final imageTemporary = File(image.path);
      setState(() => this.profileAvater = imageTemporary);
    } catch (e) {
      print(e);
    }
  }

  handleImageFromGallery2() async {
    try {
      final image = await ImagePicker().pickImage(source: ImageSource.gallery);
      if (image == null) return;

      final imageTemporary = File(image.path);
      setState(() => this.banner = imageTemporary);
    } catch (e) {
      print(e);
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  String screenName = '';
  onChangeFunction1(String newvalue1) {
    screenName = newvalue1;
  }

  /////////////////////////////////////////////////////////////////////////////
  String email = '';
  onChangeFunction2(String newvalue2) {
    email = newvalue2;
  }

  /////////////////////////////////////////////////////////////////////////////
  String birth = '';
  onChangeFunction3(String newvalue3) {
    birth = newvalue3;
  }

  /////////////////////////////////////////////////////////////////////////////
  String password = '';
  onChangeFunction4(String newvalue4) {
    password = newvalue4;
  }

  /////////////////////////////////////////////////////////////////////////////
  String location = '';
  onChangeFunction5(String newvalue5) {
    location = newvalue5;
  }

  /////////////////////////////////////////////////////////////////////////////

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        //backgroundColor: Color(0xff6d71ff),
        title: const Text(
          "Edit Profile",
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
        padding: const EdgeInsets.only(left: 16, top: 25, right: 16),
        child: GestureDetector(
          onTap: () {
            FocusScope.of(context).unfocus();
          },
          child: ListView(
            children: [
              const SizedBox(
                height: 5,
              ),
              Center(
                child: Stack(
                  children: [
                    Container(
                      width: 400,
                      height: 130,
                      child: banner != null
                          ? Image.file(
                              banner!,
                              width: 400,
                              height: 130,
                              fit: BoxFit.cover,
                            )
                          : Ink.image(
                              image: AssetImage('assets/Logo_no_bg.png'),
                            ),
                    ),
                    Positioned(
                        bottom: 0,
                        right: 0,
                        child: Container(
                          height: 50,
                          width: 50,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(
                              width: 4,
                              color: Theme.of(context).scaffoldBackgroundColor,
                            ),
                            color: Color(0xff6d71ff),
                          ),
                          child: IconButton(
                            icon: const Icon(
                              Icons.edit,
                              color: Colors.white,
                            ),
                            onPressed: () {
                              handleImageFromGallery2();
                            },
                          ),
                        )),
                  ],
                ),
              ),
              const SizedBox(
                height: 15,
              ),
              Center(
                child: Stack(
                  children: [
                    Container(
                      width: 130,
                      height: 130,
                      child: profileAvater != null
                          ? CircleAvatar(
                              radius: 10,
                              backgroundImage: FileImage(profileAvater!),
                            )
                          : const CircleAvatar(
                              radius: 10,
                              backgroundImage:
                                  AssetImage('assets/user_avatar.png'),
                            ),
                    ),
                    Positioned(
                        bottom: 0,
                        right: 0,
                        child: Container(
                          height: 50,
                          width: 50,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(
                              width: 4,
                              color: Theme.of(context).scaffoldBackgroundColor,
                            ),
                            color: Color(0xff6d71ff),
                          ),
                          child: IconButton(
                            icon: const Icon(
                              Icons.edit,
                              color: Colors.white,
                            ),
                            onPressed: () {
                              handleImageFromGallery1();
                            },
                          ),
                        )),
                  ],
                ),
              ),
              const SizedBox(
                height: 35,
              ),
              buildTextField("Full Name", 'Enter your Full Name', screenName,
                  onChangeFunction1, false, null),
              buildTextField("E-mail", 'Enter your E-mail', email,
                  onChangeFunction2, false, null),
              buildTextField(
                  "Birthday", 'd/m/y', birth, onChangeFunction3, false, null),
              buildTextField("Password", "********", password,
                  onChangeFunction4, true, 16),
              buildTextField("Location", 'city, country', location,
                  onChangeFunction5, false, null),
              const SizedBox(
                height: 35,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  OutlineButton(
                    padding: const EdgeInsets.symmetric(horizontal: 50),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20)),
                    onPressed: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => SettingsPageUI()));
                    },
                    child: const Text("CANCEL",
                        style: TextStyle(
                            fontSize: 14,
                            letterSpacing: 2.2,
                            color: Colors.black)),
                  ),
                  RaisedButton(
                    onPressed: () async {
                      /*if (await NetworkHandler.uploud_avatar(
                              NetworkHandler.userToken['ownerId'],
                              profileimage!) ==
                          true) {}

                      if (await NetworkHandler.uploud_banner(
                              NetworkHandler.userToken['ownerId'],
                              bannerimage!) ==
                          true) {}

                      if (await NetworkHandler.change_password(
                              NetworkHandler.userToken['ownerId'], password) ==
                          true) {}*/
                      if (await NetworkHandler.change_user_data(
                              NetworkHandler.userToken['ownerId'],
                              birth,
                              password,
                              location,
                              screenName,
                              email,
                              profileAvater!,
                              banner!) ==
                          true) {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => SettingsPageUI()));
                      }
                    },
                    color: Color(0xff6d71ff),
                    padding: const EdgeInsets.symmetric(horizontal: 50),
                    elevation: 2,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20)),
                    child: const Text(
                      "SAVE",
                      style: TextStyle(
                          fontSize: 14,
                          letterSpacing: 2.2,
                          color: Colors.white),
                    ),
                  )
                ],
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget buildTextField(String labelText, String placeholder, String newValue,
      Function onChangeMethode, bool isPasswordTextField, int? limit) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 35.0),
      child: TextField(
        onChanged: (newValue) {
          onChangeMethode(newValue);
        },
        maxLength: limit,
        obscureText: isPasswordTextField ? showPassword : false,
        decoration: InputDecoration(
            suffixIcon: isPasswordTextField
                ? IconButton(
                    onPressed: () {
                      setState(() {
                        showPassword = !showPassword;
                      });
                    },
                    icon: const Icon(
                      Icons.remove_red_eye,
                      color: Colors.grey,
                    ),
                  )
                : null,
            contentPadding: const EdgeInsets.only(bottom: 3),
            labelText: labelText,
            labelStyle: const TextStyle(
              color: Colors.black,
              fontWeight: FontWeight.bold,
            ),
            floatingLabelBehavior: FloatingLabelBehavior.always,
            hintText: placeholder,
            hintStyle: const TextStyle(
              fontSize: 16,
              color: Colors.grey,
            )),
      ),
    );
  }
}
