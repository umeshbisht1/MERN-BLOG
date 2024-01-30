import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextInput, Alert } from "flowbite-react";
import { useRef } from "react";
import {Link} from 'react-router-dom'
import { CircularProgressbar } from "react-circular-progressbar";
import {
  updateSuccess,
  updateFailure,
  updateStart,
  deleteFailure,
  deleteStart,
  deleteSuccess,
  signInSuccess,
  signoutSuccess,
} from "../redux/user/user.slice.js";
import { Modal } from "flowbite-react";
import { app } from "../Firebase.js";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

function Profile() {
  const currentUser = useSelector((state) => state.user.currentUser.data);
  const loading=useSelector(state=>state.user.loading)
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageurl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [showModel, setShowmodel] = useState(false);
  const dispatch = useDispatch();
  const fileref = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageurl(URL.createObjectURL(file));
    }
  };
  // upload image in firebase
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  // submit th update section
  const handlesubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(formData).length === 0) {
      console.log("error");
      return;
    }
    // connect to backend
    try {
      dispatch(updateStart());
      console.log("umesh", formData);
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) dispatch(updateFailure(data.message));
      else dispatch(updateSuccess(data));
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };
  // filling th evalues of the input feild in input feild
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  //function to upload in
  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageurl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageurl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };
  const handledelete = async () => {
    setShowmodel(false);
    try {
      dispatch(deleteStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteFailure(data.message));
        return;
      }
      dispatch(deleteSuccess());
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };
  const handlesignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else dispatch(signoutSuccess());
    } catch (error) {
      console.log("error occured in signout");
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileref}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => fileref.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        ></TextInput>
        <TextInput
          type="email"
          id="username"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        ></TextInput>
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        ></TextInput>
        <Button type="submit" gradientDuoTone="purpleToBlue" outline disabled={loading||imageFileUploading}>
          {loading?'Loading..':'Update'}
        </Button>
        {
          currentUser.isAdmin&&(<Link to='/create-post'>
          <Button type="button" gradientDuoTone='purpleToPink' className="w-full" > Create a Post </Button>
          </Link>)
        }
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={() => setShowmodel(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span className="cursor-pointer" onClick={handlesignout}>
          Sign-Out
        </span>
      </div>
      <Modal
        show={showModel}
        onClose={() => setShowmodel(false)}
        popup
        size="md"
      >
        <Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"></HiOutlineExclamationCircle>
            </div>
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure You want to delete account
            </h3>
            <div className=" flex justify-between">
              <Button color="failure" onClick={handledelete}>
                {" "}
                Yes Delete
              </Button>
              <Button onClick={() => setShowmodel(false)}> Cancel</Button>
            </div>
          </Modal.Body>
        </Modal.Header>
      </Modal>
    </div>
  );
}

export default Profile;
