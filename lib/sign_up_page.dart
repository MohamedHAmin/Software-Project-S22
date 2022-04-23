import 'package:flutter/material.dart';
import 'package:project_sw/NetworkHandler.dart';

DateTime _birthDay = DateTime.now();

class SignupPage extends StatelessWidget {
  final _formKey = GlobalKey<FormState>();
  final _usernameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      //backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0,
        //backgroundColor: Colors.white,
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: Icon(
            Icons.arrow_back_ios_rounded,
            size: 20,
            color: Colors.black,
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: 40),
          height: MediaQuery.of(context).size.height - 50,
          width: double.infinity,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[
              Column(
                children: <Widget>[
                  Text(
                    "Sign up",
                    style: TextStyle(
                      fontSize: 30,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  Text(
                    "Create an account, It's free ",
                    style: TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                        color: Colors.grey[700]),
                  )
                ],
              ),
              Column(
                children: <Widget>[
                  _buildForm(),
                  BirthDate(),
                ],
              ),
              Container(
                padding: EdgeInsets.only(top: 3, left: 3),
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(50),
                    border: Border(
                      bottom: BorderSide(color: Colors.black),
                      top: BorderSide(color: Colors.black),
                      left: BorderSide(color: Colors.black),
                      right: BorderSide(color: Colors.black),
                    )),
                child: MaterialButton(
                  minWidth: double.infinity,
                  height: 60,
                  onPressed: () async {
                    if (_formKey.currentState!.validate()) {
                      debugPrint('All validations passed!!!');
                      debugPrint(NetworkHandler.mocked.toString());

                      if (await NetworkHandler.signup(
                              _usernameController.text,
                              _emailController.text,
                              _passwordController.text,
                              _birthDay) ==
                          true) {
                        debugPrint(NetworkHandler.responseBody.toString());

                        showDialog(
                          context: context,
                          builder: (context) => AlertDialog(
                            title: Text('Please check your E-mail'),
                            content: Text(
                                'Success!\nYour new account will be ready as soon as you verify your E-mail address.\nJust click the link.'),
                            actions: <Widget>[
                              TextButton(
                                child: Text('OK'),
                                onPressed: () {
                                  Navigator.popUntil(
                                      context, (route) => route.isFirst);
                                },
                              ),
                            ],
                          ),
                        );
                      } else {
                        debugPrint(NetworkHandler.responseBody.toString());
                      }
                    } else
                      return;
                  },
                  color: Color(0xff6d71ff),
                  // elevation: 0,
                  shape: RoundedRectangleBorder(
                    side: BorderSide(color: Colors.deepPurpleAccent),
                    borderRadius: BorderRadius.circular(50),
                  ),
                  child: const Text(
                    "Create Account",
                    style: TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 18,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Form _buildForm() {
    return Form(
      key: _formKey,
      child: Column(
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextFormField(
              maxLength: 16,
              controller: _usernameController,
              validator: (value) {
                if (value!.isEmpty) {
                  return 'Username cannot be empty';
                }
                return null;
              },
              decoration: InputDecoration(
                labelText: 'Username',
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10.0)),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextFormField(
              controller: _emailController,
              validator: (value) {
                if (value!.isEmpty) {
                  return 'Email cannot be empty!';
                }
                return null;
              },
              decoration: InputDecoration(
                labelText: 'Email',
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10.0)),
              ),
            ),
          ),
          SizedBox(
            height: 22,
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextFormField(
              maxLength: 16,
              obscureText: true,
              controller: _passwordController,
              validator: (value) {
                if (value!.isEmpty) {
                  return 'Password cannot be empty!';
                } else if (value.length < 6) {
                  return 'Password must be at least 6 characters long!';
                } else if (value.length == 6) {
                  return 'Password is weak! Write a stronger one.';
                } else if (value.length > 6 && value.length < 10) {
                  return 'Password is weak! Write a stronger one.';
                } else if (value.length > 10 && value.length < 13) {
                  return 'Password is Average. Make it stronger!';
                }
                return null;
              },
              decoration: InputDecoration(
                labelText: 'Password',
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10.0)),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextFormField(
              maxLength: 16,
              obscureText: true,
              controller: _confirmPasswordController,
              validator: (value) {
                if (value != _passwordController.value.text) {
                  return 'Passwords do not match!';
                }
                return null;
              },
              decoration: InputDecoration(
                labelText: 'Confirm Password',
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10.0)),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class BirthDate extends StatefulWidget {
  @override
  State<BirthDate> createState() => _BirthDateState();
}

class _BirthDateState extends State<BirthDate> {
  DateTime Birthdate = DateTime.now();
  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
        helpText: 'Enter your Birthdate',
        context: context,
        initialDate: Birthdate,
        firstDate: DateTime(1950, 1),
        lastDate: DateTime(2101));
    if (picked != null && picked != Birthdate) {
      setState(() {
        Birthdate = picked;
        _birthDay = Birthdate;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      SizedBox(
        height: 80,
        width: 100,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Text("${Birthdate.toLocal()}".split(' ')[0]),
            const SizedBox(
              height: 10.0,
            ),
            ElevatedButton(
                onPressed: () => _selectDate(context),
                child: Icon(Icons.date_range),
                style: ElevatedButton.styleFrom(
                    primary: Color(0xff6d71ff),
                    fixedSize: Size(800, 20),
                    shape: StadiumBorder())
                //Text('Select date'),
                ),
          ],
        ),
      ),
    ]);
  }
}
