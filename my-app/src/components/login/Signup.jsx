import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import classes from "./Styles/Signup.module.css";
import Navbar from "./navbar";
import { Avatar } from "@material-ui/core";
import Addpic from "./Addpic";

/**
 *
 *
 * @returns Returns 2 signup forms , First One with necessary data [screenName , Tag , Email and Password]
 *  and the Second One which is optional to fill it or not contains [Birthdate, Phone Number, Biography, Location, Links for websites and a bottun to add profile picture] 
 * and a button to signup 
 */
const Signup = () => {
  const [error2, setError2] = useState(false);
  const [error1, setError1] = useState(false);
  const [next, setNext] = useState(false);
  const [userData, setUserData] = useState();
  const formdata = new FormData();
  const avaterformdata = new FormData();

  const [banner, setbanner] = useState();
  console.log("🚀 ~ file: Signup.jsx ~ line 25 ~ Signup ~ banner", banner);
  const [avatar, setavatar] = useState();
  console.log("🚀 ~ file: Signup.jsx ~ line 29 ~ Signup ~ avatar", avatar)
  const addAavater = (avater) => {
    setavatar(avater);
  };

  const addBanner = (baner) => {
    setbanner(baner);
  };

  const initialValues1 = {
    screenName: "",
    tag: "",
    email: "",
    password: "",
  };

  const initialValues2 = {
    phoneNumber: "",
    birth: { date: "" },
    Biography: "",
    location: { place: "" },
    website: "",
  };

  const Navigate = useNavigate();

  const validationSchema1 = Yup.object().shape({
    password: Yup.string()
      .matches(/^(\S+$)/, "You entered a space ,please remove it")
      .min(6)
      .max(16)
      .required("Enter Your Password"),
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    screenName: Yup.string().min(3).required("Enter Your screenName"),
    tag: Yup.string()
      .matches(/^(\S+$)/, "You entered a space ,please remove it")
      .required("Tag is required"),
  });

  const validationSchema2 = Yup.object().shape({
    // phoneNumber: Yup.string().matches(
    //   /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    //   "Phone number is not valid"
    // ),
    Biography: Yup.string(),
    // birth: { date: Yup.string().matches(/^(\S+$)/, 'you entered a space ,please remove it') }
  });
  const onSubmit1 = (data) => {
    setUserData(data);
    setNext(true);
  };

  const onSubmit2 = async(data) => {
    try {
        
        console.log(document.querySelector("#BD").value);

    data.screenName = userData.screenName;
    data.email = userData.email;
    data.password = userData.password;
    data.tag = userData.tag;

    data.birth.date = document.querySelector("#BD").value;
    console.log("🚀 ~ file: Signup.jsx ~ line 81 ~ onSubmit2 ~ data", data);

    data.location.place = document.getElementById("Loc").value;

    console.log(data);

    const signupRes=await axios
      .post("http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/user/signup", data)
    console.log("🚀 ~ file: Signup.jsx ~ line 100 ~ onSubmit2 ~ signupRes", signupRes)

      const userID = signupRes.data._id.toString();
      console.log("🚀 ~ file: Signup.jsx ~ line 96 ~ .then ~ userID", userID);
      
      if(banner){
          
        formdata.append("image", banner);
        const bannerRes =await axios
        .put(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${userID}/banner`, formdata)
        console.log("🚀 ~ file: Signup.jsx ~ line 109 ~ onSubmit2 ~ bannerRes", bannerRes)
      }
      if(avatar){
          
        avaterformdata.append("image", avatar);
        const avatarRes =await axios
        .put(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${userID}/avater`, avaterformdata)
        console.log("🚀 ~ file: Signup.jsx ~ line 115 ~ onSubmit2 ~ avatarRes", avatarRes)

      }

      alert("Please check your email");

      Navigate("/");
    } catch (err) {
        console.log("🚀 ~ file: Signup.jsx ~ line 127 ~ onSubmit2 ~ err", err)
        if (err.response.data.error.includes("tag")) {
            setError2("tag already used");
            setNext(false);
          } else {
            setError1("email already used");
            setNext(false);
          }
    }
    
      
 // navigate to login
   /*    })
      .catch((err) => {
        console.log(err.response.data.error);
        if (err.response.data.error.includes("tag")) {
          setError2("tag already used");
          setNext(false);
        } else {
          setError1("email already used");
          setNext(false);
        }
      }); */
  };

  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.imageContainer}>
          <img src="https://cdn.discordapp.com/attachments/949620839647698964/954738917968609290/d5acdefc-2d8c-41a4-b067-706cf76ee3aa.jpg"></img>
        </div>

        <div className={classes.signupContainer}>
          <div className={classes.title}>Signup Form </div>

          {!next && (
            <Formik
              initialValues={initialValues1}
              validationSchema={validationSchema1}
              onSubmit={onSubmit1}
            >
              <Form>
                <div className={classes.field}>
                  <Field
                    name="screenName"
                    placeholder="screenName"
                    autoComplete="off"
                  />
                </div>
                <ErrorMessage
                  name="screenName"
                  component="span"
                  className={classes.error}
                />

                <div className={classes.field}>
                  <Field name="tag" placeholder="Tag" autoComplete="off" />
                </div>
                <ErrorMessage
                  name="tag"
                  component="span"
                  className={classes.error}
                />
                {error2 === false ? (
                  <span></span>
                ) : (
                  <span className={classes.error}>{error2}</span>
                )}

                <div className={classes.field}>
                  <Field name="email" placeholder="Email" autoComplete="off" />
                </div>
                <ErrorMessage
                  name="email"
                  component="span"
                  className={classes.error}
                />
                {error1 === false ? (
                  <span></span>
                ) : (
                  <span className={classes.error}>{error1}</span>
                )}

                <div className={classes.field}>
                  <Field
                    type="password"
                    name="password"
                    placeholder="password"
                    autoComplete="off"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="span"
                  className={classes.error}
                />

                {/* <Avatar src="/apple-touch-icon.png" sx={{ width: 200, height: 75, cursor: "pointer" }} /> */}

                <div>
                  <button className={classes.btnsup} type="submit">
                    Next{" "}
                  </button>
                </div>
              </Form>
            </Formik>
          )}
          {next && (
            <Formik
              initialValues={initialValues2}
              validationSchema={validationSchema2}
              onSubmit={onSubmit2}
            >
              <Form>
                <div className={classes.field}>
                  <Field
                    id="BD"
                    type="date"
                    name="birthDate"
                    placeholder="dd/mm/yyyy"
                    autoComplete="off"
                  ></Field>
                </div>
                <ErrorMessage
                  name="birthDate"
                  component="span"
                  className={classes.error}
                />

                <div className={classes.field}>
                  <Field
                    name="phoneNumber"
                    placeholder="Phone Number"
                    autoComplete="off"
                  ></Field>
                </div>
                <ErrorMessage
                  name="phoneNumber"
                  component="span"
                  className={classes.error}
                />

                <div className={classes.field}>
                  <Field
                    id="bio"
                    name="Biography"
                    placeholder="Biography"
                    autoComplete="off"
                  ></Field>
                </div>
                <ErrorMessage
                  name="Biography"
                  component="span"
                  className={classes.error}
                />

                <div className={classes.field}>
                  <Field
                    id="Loc"
                    name="dummylocation"
                    placeholder="Location"
                    autoComplete="off"
                  ></Field>
                </div>
                <ErrorMessage
                  name="Location"
                  component="span"
                  className={classes.error}
                />

                <div className={classes.field}>
                  <Field
                    id="Link"
                    name="website"
                    placeholder="You can put any website link here"
                    autoComplete="off"
                  ></Field>
                </div>
                <ErrorMessage
                  name="Link"
                  component="span"
                  className={classes.error}
                />

                <div>
                  <button
                    className={classes.btnsup1}
                    type="button"
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    {" "}
                    Add photo
                  </button>
                  {openModal && (
                    <Addpic
                      closeModal={setOpenModal}
                      Abanner={addBanner}
                      Aavatar={addAavater}
                    />
                  )}
                </div>

                <div>
                  <button className={classes.btnsup1} type="submit">
                    Signup
                  </button>
                </div>
              </Form>
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};
export default Signup;

//npm install react-easy-crop --save
//npm i react-image-crop --save
