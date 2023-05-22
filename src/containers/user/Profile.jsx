import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

import {
  FaUser,
  FaEnvelope,
  FaAddressCard,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { BsPhone } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";

import { path } from "../../utils/variables";

const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [picture, setPicture] = useState("");
  const [cin, setCIN] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [adress, setAdress] = useState("");
  const [newPassword, setNewPassword] = useState(null);
  const [oldPassword, setOldPassword] = useState(null);
  const [id, setId] = useState(null);
  const [errors, setErrors] = useState({
    picture: null,
    CIN: null,
    nom: null,
    prenom: null,
    email: null,
    tel: null,
    adress: null,
    role: null,
  });

  //image related
  const [File, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();
  let subtitle;

  useEffect(() => {
    if (!File) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(File);
  }, [File]);

  // handelie uploading image:::
  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    /* props.onInput(props.id, pickedFile, fileIsValid); */
  };

  const fetchdata = async (id) => {
    const result = await axios.get(`${path}user/${id}`);
    if (!result.data.success) {
      return swal("Error!!", result.data.message, "error");
    }
    setUser(result.data.data);
    setEmail(result.data.data.email);
    setNom(result.data.data.nom);
    setPrenom(result.data.data.prenom);
    setCIN(result.data.data.cin);
    setAdress(result.data.data.adress);
    setTel(result.data.data.tel);
    setPicture(result.data.data.avatar);
  };

  useEffect(() => {
    let id = params.id;
    setId(id);
    fetchdata(id);
  }, []);

  const onchange = (e) => {
    if (e.target.name === "nom") {
      setNom(e.target.value);
      if (e.target.value === "") {
        // errors.email = "Please enter a valid email address";
        setErrors((prevState) => ({
          ...prevState,
          nom: "The name name musnt be empty",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          nom: null,
        }));
      }
    } else if (e.target.name === "prenom") {
      setPrenom(e.target.value);
      if (e.target.value === "") {
        // errors.password = "Password must be at least 8 characters long";
        setErrors((prevState) => ({
          ...prevState,
          prenom: "The name name musnt be empty",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          prenom: null,
        }));
      }
    } else if (e.target.name === "tel") {
      setTel(e.target.value);
      if (e.target.value === "") {
        // errors.password = "Password must be at least 8 characters long";
        setErrors((prevState) => ({
          ...prevState,
          tel: "The name name musnt be empty",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          tel: null,
        }));
      }
    } else if (e.target.name === "adress") {
      setAdress(e.target.value);
      if (e.target.value === "") {
        // errors.password = "Password must be at least 8 characters long";
        setErrors((prevState) => ({
          ...prevState,
          adress: "The name name musnt be empty",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          adress: null,
        }));
      }
    } else if (e.target.name === "oldpassword") {
      setOldPassword(e.target.value);
    } else if (e.target.name === "newpassword") {
      setNewPassword(e.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('handelsubmi');
    if (
      errors.nom != null ||
      errors.prenom != null ||
      errors.tel != null ||
      errors.adress != null ||
      errors.qte != null
    ) {
      return swal("Error!", "check your Inputs", "error");
    }

    let url, result;
    const formData = new FormData();
    if (File) {
      // formData.append("image", previewUrl);
      formData.append("avatar", File);
    }
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("tel", tel);
    formData.append("adress", adress);
    formData.append("userid", user._id);
    if (oldPassword) {
      formData.append("oldpassword", oldPassword);
      formData.append("newpassword", newPassword);
    }      

    url = `${path}user/${id}`;
    result = await axios.put(url, formData);
    console.log(result.data);
    if (result.data.success === true) {
      swal("Success!", result.data.message, "success");
      fetchdata(id);
      // window.location.reload();
    } else {
      swal("Error!", result.data.message, "warning");
    }
  };

  return (
    <div className="p-10 w-full flex gap-10">
      <div className=" bg-white shadow border rounded-md flex justify-center w-3/5">
        <div className="flex flex-col gap-4 p-4">
          <div className="mr-8">
            {user.avatar && (
              <img
                src={`${path}uploads/images/${user.avatar}`}
                alt={`${user.nom} avatar`}
                className="w-32 h-autou rounded-full "
              />
            )}
          </div>
          <div className="flex gap-2 items-center text-2xl font-bold">
            {user.nom && <h1>{user.nom}</h1>}
            {user.prenom && <h1>{user.prenom}</h1>}
          </div>
          <div className="flex gap-2 items-center text-gray-500">
            <FaEnvelope />
            {user.email && <h1>{user.email}</h1>}
          </div>
          <div className="flex gap-2 items-center text-gray-500">
            <FaAddressCard />
            {user.cin && <h1>{user.cin}</h1>}
          </div>
          <div className="flex gap-2 items-center text-gray-500">
            <BsPhone />
            {user.tel && <h1>{user.tel}</h1>}
          </div>
          <div className="flex gap-2 items-center text-gray-500">
            <FaMapMarkerAlt />
            {user.adress && <h1>{user.adress}</h1>}
          </div>
        </div>
      </div>
      <div className="w-full bg-white shadow border rounded-md flex justify-center p-4">
        <form onSubmit={handleSubmit}>
          <div className="">
            {previewUrl ? (
              <div className=" rounded-md w-fit shadow-inner mx-auto ">
                <img
                  src={previewUrl}
                  // src={`https://i.pinimg.com/564x/22/7d/73/227d73d1ca2d45a6b4f196dc916b54a3.jpg`}
                  className="h-16 w-auto object-cover object-center rounded-md"
                  alt="avatr"
                />
              </div>
            ) : picture ? (
              <div className=" relative w-fit rounded-md shadow-inner mx-auto ">
                <img
                  src={`${path}uploads/images/${picture}`}
                  alt="product_pic"
                  className="h-24 w-auto object-cover object-center rounded-md"
                />
                <label
                  htmlFor="pictureID"
                  className="absolute p-1 rounded-full bg-purple-50 border border-white -bottom-3 -left-3 text-gray-700 cursor-pointer"
                >
                  <BiEdit size={20} />
                  <input
                    type="file"
                    name="picture"
                    id="pictureID"
                    className="hidden"
                    accept=".jpg,.png,.jpeg"
                    ref={filePickerRef}
                    onChange={pickedHandler}
                  />
                </label>
              </div>
            ) : (
              <div className="w-full flex justify-center items-center pb-6 ">
                <label
                  htmlFor="pictureID"
                  className="mx-auto w-fit flex flex-col items-center justify-center rounded-lg border-2 border-gray-700 p-4 text-gray-700 cursor-pointer"
                >
                  <FiUpload size={30} />
                  <input
                    type="file"
                    name="picture"
                    id="pictureID"
                    className="hidden"
                    accept=".jpg,.png,.jpeg"
                    ref={filePickerRef}
                    onChange={pickedHandler}
                  />
                  <span className="text-gray-700">Select a picture</span>
                </label>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {/* company */}
              <div className="w-96">
                <label
                  htmlFor="nomID"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name:
                </label>
                <input
                  type="text"
                  name="nom"
                  id="nomID"
                  value={nom}
                  onChange={(e) => onchange(e)}
                  placeholder="Company"
                  className="block w-2/3 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                     dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {/* Model */}
              <div className="w-96">
                <label
                  htmlFor="prenomlID"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  fisrt Name:
                </label>
                <input
                  type="text"
                  name="prenom"
                  id="prenomID"
                  value={prenom}
                  onChange={(e) => onchange(e)}
                  placeholder="Model"
                  className="block p-2 w-2/3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {/* SOP */}
              <div className="w-96">
                <label
                  htmlFor="cinID"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  cin:
                </label>
                <input
                  type="number"
                  name="cin"
                  id="cinID"
                  value={cin}
                  onChange={(e) => onchange(e)}
                  placeholder="CIN"
                  disabled
                  className="block w-2/3 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {/* EOP */}
              <div className="w-96">
                <label
                  htmlFor="telID"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number:
                </label>
                <input
                  type="number"
                  name="tel"
                  id="telID"
                  value={tel}
                  onChange={(e) => onchange(e)}
                  placeholder="Phone number"
                  className="block w-2/3 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {/* Capacity */}
              <div className="w-96">
                <label
                  htmlFor="emailID"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  email:
                </label>
                <input
                  type="text"
                  name="email"
                  id="emailID"
                  value={email}
                  onChange={(e) => onchange(e)}
                  placeholder="Example@gmail.com"
                  disabled
                  className="block w-2/3 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {/* Price */}
              <div className="w-96">
                <label
                  htmlFor="AdressID"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Adress:
                </label>
                <input
                  type="text"
                  name="adress"
                  id="AdressID"
                  value={adress}
                  onChange={(e) => onchange(e)}
                  placeholder="Adress"
                  className="block w-2/3 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {/* pass */}
              <div className="w-96">
                <label
                  htmlFor="OPasswordID"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New password:
                </label>
                <input
                  type="password"
                  name="oldpassword"
                  id="OPasswordID"
                  value={oldPassword}
                  onChange={(e) => onchange(e)}
                  placeholder="Old Password"
                  className="block w-2/3 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {/* pass */}
              <div className="w-96">
                <label
                  htmlFor="NPasswordID"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New password:
                </label>
                <input
                  type="password"
                  name="newpassword"
                  id="NPasswordID"
                  value={newPassword}
                  onChange={(e) => onchange(e)}
                  placeholder="New Password"
                  className="block w-2/3 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="w-full flex gap-6 justify-end pt-4">
              <button
                type="button"
                // onClick={() => CloseModal()}
                className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2 text-center "
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center "
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
