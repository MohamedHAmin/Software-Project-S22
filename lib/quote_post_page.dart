import 'package:flutter/material.dart';
import 'dart:io';
import 'package:image_picker/image_picker.dart';
import 'home_page.dart';

class CreatePostScreenUI2 extends StatefulWidget {
  const CreatePostScreenUI2({Key? key}) : super(key: key);

  @override
  State<CreatePostScreenUI2> createState() => _CreatePostScreenUI2State();
}

class _CreatePostScreenUI2State extends State<CreatePostScreenUI2> {
  String _postText = '_';
  bool _loading = false;
  File? image;

  handleImageFromGallery() async {
    try {
      final image = await ImagePicker().pickImage(source: ImageSource.gallery);
      if (image == null) return;

      final imageTemporary = File(image.path);
      setState(() => this.image = imageTemporary);
    } catch (e) {
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        //backgroundColor: Color(0xff6d71ff),
        centerTitle: true,
        title: const Text(
          'Post',
          style: TextStyle(
            color: Colors.white,
            fontSize: 20,
          ),
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
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Row(
                children: <Widget>[
                  const CircleAvatar(
                    backgroundImage: AssetImage('assets/user_2.png'),
                  ),
                  TextButton(
                    onPressed: null, //Action to be added later
                    child: Row(
                      children: const [
                        Text('Username',
                            style: TextStyle(
                                color: Colors.black,
                                fontWeight: FontWeight.bold,
                                fontSize: 18))
                      ],
                    ),
                  ),
                  const Text('@user_handle',
                      style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          color: Color(0xff9e9e9e))),
                ],
              ),
              const SizedBox(height: 5),
              TextField(
                maxLength: 280,
                maxLines: 7,
                decoration: const InputDecoration(
                  hintText: 'Enter your Post Text',
                ),
                onChanged: (value) {
                  // function to be implemented
                  _postText = value;
                },
              ),
              const SizedBox(height: 10),
              /////////////////////////////////////////////////////////////////////////////
              Center(
                child: image != null
                    ? Image.file(
                        image!,
                        width: 160,
                        height: 160,
                        fit: BoxFit.cover,
                      )
                    : Ink.image(
                        image: const AssetImage('-'),
                      ),
              ),
              const SizedBox(height: 10),
/////////////////////////////////////////////////////////////////////////////////////////////////////////
              const Divider(
                height: 20,
                thickness: 1,
              ),
              Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Row(children: <Widget>[
                      const CircleAvatar(
                          //backgroundImage: AssetImage('assets/user_2.png'),
                          ),
                      TextButton(
                          onPressed: null, //Action to be added later
                          child: Row(children: const [
                            Text('Username',
                                style: TextStyle(
                                    color: Colors.black,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 18))
                          ])),
                      const Text('@user_handle',
                          style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                              color: Color(0xff9e9e9e))),
                      const Text(
                        ' 23m',
                        style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 8,
                            color: Color(0xff9e9e9e)),
                      )
                    ]),
                    const Text(
                        'Tweet Content: this is only an example of the tweet text and will be updated later.'),
                  ]),
              const Divider(
                height: 20,
                thickness: 1,
              ),
/////////////////////////////////////////////////////////////////////////////////////////////////////////
              const SizedBox(height: 10),
              Center(
                child: GestureDetector(
                  onTap: handleImageFromGallery,
                  child: Container(
                    height: 50,
                    width: 100,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      color: Colors.white,
                      border: Border.all(
                        color: Color(0xff6d71ff),
                        width: 3,
                      ),
                    ),
                    child: const Icon(
                      Icons.camera_alt,
                      size: 35,
                      color: Color(0xff6d71ff),
                    ),
                  ),
                ),
              ),
              ////////////////////////////////////////////////////////////////////////////////////////////////////////
              const SizedBox(height: 20),
              Center(
                child: OutlinedButton(
                  style: OutlinedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(horizontal: 14),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30),
                      ),
                      backgroundColor: Color(0xff6d71ff)),
                  onPressed: () async {
                    setState(() {
                      _loading = true;
                      Navigator.push(context,
                          MaterialPageRoute(builder: (context) => HomePage()));
                    });
                  },
                  child: const Text(
                    "Post",
                    style: TextStyle(
                        fontSize: 20, letterSpacing: 5, color: Colors.white),
                  ),
                ),
              ),
            ],
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
                  //Navigator.push(context,
                  // MaterialPageRoute(builder: (context) => HomePage()));
                },
                icon: const Icon(Icons.home),
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
