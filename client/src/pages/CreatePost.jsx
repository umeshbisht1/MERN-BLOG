import React, { useState } from "react";
import { FileInput, TextInput, Select, Button, Alert } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [ImageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [ImageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publisherror,setPublishError]=useState(null);
  const handleUploadImage = async () => {
    if (!file) {
      setImageFileUploadError("please upload the file");
      return;
    }
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const UploadTask = uploadBytesResumable(storageRef, file);
      UploadTask.on(
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
        },
        () => {
          getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUploadProgress(null);
            setImageFileUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageFileUploadError("error occured in uploading the file");
      setImageFileUploadProgress(null);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!formData) {
      setPublishError("fill all the feilds properly");
      return;
    }
    try {
      const data = await fetch("/api/post/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const res=await data.json();
      console.log(res);
      if(!data.ok)
      {
        setPublishError(data.mesage);
        console.log(`error occured in uploading the post ${data.mesage}`);
        return;
      }
      if(data.ok)
      {
        setPublishError(null)
      }
    } catch (error) {
      setPublishError("Something went wrong bawa");
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          ></TextInput>
          <Select
            onChange={(e) =>
              setFormData({ ...formData,  category: e.target.value })
            }
          >
            <option value="uncategorized"> Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="React.js">React.js</option>
            <option value="Next.js">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          ></FileInput>
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={ImageFileUploadProgress}
          >
            {ImageFileUploadProgress ? (
              <div className="w-16 h-16 object-cover">
                <CircularProgressbar
                  value={ImageFileUploadProgress}
                  text={`${ImageFileUploadProgress || 0}%`}
                ></CircularProgressbar>
              </div>
            ) : (
              " Upload Image"
            )}
          </Button>
        </div>
        {ImageFileUploadError && (
          <Alert color="failure">{ImageFileUploadError}</Alert>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write Something..."
          className="h-72 mb-12"
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
        {
      publisherror && <Alert className="mb-5" color='failure'>{publisherror}</Alert>
     }
      </form>
     
    </div>

  );
}
