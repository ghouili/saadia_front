import React, { useEffect, useState, Fragment } from "react";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import { path } from "../../utils/variables";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input,
} from "@material-tailwind/react";

import { BsPersonVcard, BsPhone, BsPencilSquare } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";
import { TfiLocationPin } from "react-icons/tfi";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineBadge } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";
import { SlOptionsVertical } from "react-icons/sl";

import { InputField, DeclarationCNSS } from "../../components";

const Employee = () => {
  const cookies = new Cookies();
  let user = cookies.get("user");

  const [open, setOpen] = useState(false);
  const [openDoc, setOpenDoc] = useState(false);
  const [docItems, setDocItems] = useState({});
  const [data, setData] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState([]);
  const [formValues, setFormValues] = useState({
    nom_F: "",
    nom_M: "",
    prenom_E: "",
    prenom_p: "",
    prenom_gp: "",
    prenom_m: "",
    sexe: "",
    nationalite: "",
    date_naiss: "",
    lieu_naiss: "",
    etat_civil: "",
    cin: "",
    nationale: "",
    type: "",
    acte_naiss: "",
    municipalite: "",
    arrond: "",
    annee: "",
    adr: "",
    appt_num: "",
    imm_num: "",
    cite: "",
    localite: "",
    c_p: "",
    num: "",
    fax: "",
    identif: "",
    id_cnss: "",
    niveau: "",
    diplome: "",
    specialite: "",
    date: "",
    rip: "",
    compte_courrent: "",
    plan: "",
    stage: "",
    periode_contrat: "",
    compte: "",
    gouvernorat: "",
    mat: "",
    num_acte: "",
    date_delivre: "",
    qualite: "",
    pays: "",
    envoi_objet: "",
    type_envoi: "",
    envoi_numero: "",
    position_acc: "",
    nature_acc: "",
    lieu: "",
    heure: "",
    date_arret_travail: "",
    periode: "",
    date_rec: "",
    etat: "",
    etat_normal: "",
    residence: "",
    effet_acc: "",
    date_acc: "",
    date_emploi: "",
    activite: "",
    num_employees: "",
    description: "",
    causes: "",
    acc: "",
  });

  /// fitering data using seaarch input ::
  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = Object.values(item).join(" ").toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterData(newData);
      setSearch(text);
    } else {
      setfilterData(masterData);
      setSearch(text);
    }
  };

  const handleOpen = () => setOpen(!open);
  const handleOpenDoc = () => setOpenDoc(!openDoc);

  const openDocsDialog = (item) => {
    setDocItems(item);
    setOpenDoc(!openDoc);
  };

  const CancelDialog = () => {
    setOpen(!open);
    setFormValues({
      nom_F: "",
      nom_M: "",
      prenom_E: "",
      prenom_p: "",
      prenom_gp: "",
      prenom_m: "",
      sexe: "",
      nationalite: "",
      date_naiss: "",
      lieu_naiss: "",
      etat_civil: "",
      cin: "",
      nationale: "",
      type: "",
      acte_naiss: "",
      municipalite: "",
      arrond: "",
      annee: "",
      adr: "",
      appt_num: "",
      imm_num: "",
      cite: "",
      localite: "",
      c_p: "",
      num: "",
      fax: "",
      identif: "",
      id_cnss: "",
      niveau: "",
      diplome: "",
      specialite: "",
      date: "",
      rip: "",
      compte_courrent: "",
      plan: "",
      stage: "",
      periode_contrat: "",
      compte: "",
      gouvernorat: "",
      mat: "",
      num_acte: "",
      date_delivre: "",
      qualite: "",
      pays: "",
      envoi_objet: "",
      type_envoi: "",
      envoi_numero: "",
      position_acc: "",
      nature_acc: "",
      lieu: "",
      heure: "",
      date_arret_travail: "",
      periode: "",
      date_rec: "",
      etat: "",
      etat_normal: "",
      residence: "",
      effet_acc: "",
      date_acc: "",
      date_emploi: "",
      activite: "",
      num_employees: "",
      description: "",
      causes: "",
      acc: "",
    });
  };

  const Update_Employee = async (item) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: `Are you sure that you want to Update ${item.prenom_E} Data?`,
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      console.log(item);
      setFormValues(item);
      setOpen(true);
    }
  };

  const fetchdata = async () => {
    const result = await axios.get(`${path}employee`);
    // setData(result.data.data);
    setMasterData(result.data.data);
    setfilterData(result.data.data);
    // console.log(result.data.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission

    console.log(formValues);
    let url, meth;
    if (formValues._id) {
      url = `${path}employee/${formValues._id}`;
      meth = "PUT";
    } else {
      url = `${path}employee/add`;
      meth = "POST";
    }
    try {
      const response = await fetch(url, {
        method: meth,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      const result = await response.json();

      // console.log(result);
      if (result.success === true) {
        fetchdata();
        swal("Success!", result.message, "success");
      } else {
        return swal("Error!", result.message, "error");
      }
    } catch (error) {
      console.error(error);
      return swal(
        "Error!",
        "Something went wrong. Please try again later.",
        "error"
      );
    }
  };

  const delete_employee = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this Employee?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      const result = await axios.delete(`${path}employee/${id}`);

      if (result.data.success === true) {
        swal("Poof! Employee supprimé avec succés!", {
          icon: "success",
        });
        fetchdata();
      } else {
        swal("Error!", result.data.message, "warning");
      }
    }
  };

  return (
    <div className="relative flex flex-col gap-4 p-6">
      <div className="flex flex-row justify-between items-center px-4 py-2 bg-white rounded-md">
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <Link to="/" className="font-medium hover:text-blue-900">
            Dashboard
          </Link>
          <span className="font-medium">/</span>
          <span className="">Employees</span>
        </div>
        <div className="flex gap-4 items-center">
          <Input
            type="search"
            label="Search Documents.."
            value={search}
            onChange={(e) => searchFilter(e.target.value)}
            className="pr-24 border-blue-700"
            containerProps={{
              className: "min-w-0",
            }}
          />
          {user?.role === "admin" ? (
            <button
              className=" relative w-20 inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 "
              onClick={handleOpen}
            >
              <span className="relative w-full px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                New
              </span>
            </button>
          ) : null}
        </div>
      </div>
      {filterData.length !== 0 ? null : (
        <div className="w-full h-96 flex items-center justify-center border bg-white rounded-md shadow">
          <h1 className="text-3xl font-bold text-gray-700">
            No Data to Diplay
          </h1>
        </div>
      )}
      <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
        {filterData
          .slice(0)
          .reverse()
          .map((item) => {
            return (
              <div
                key={item._id}
                className="bg-white shadow border rounded-md p-4"
              >
                <div className="w-full flex justify-center gap-4 items-center text-xl font-semibold text-blue-950">
                  <h2>{item.nom_F}</h2>
                  <h2>{item.prenom_E}</h2>
                </div>
                <div className="w-full flex justify-center items-center gap-2 text-sm font-medium text-gray-700">
                  <BsPersonVcard size={20} />
                  <h2>{item.cin}</h2>
                </div>

                <div className="w-full flex  items-center  text-gray-700">
                  <BsPhone size={20} />
                  <h2>{item.num_employees}</h2>
                </div>
                <div className="w-full flex  items-center  text-gray-700">
                  <TfiLocationPin size={20} />
                  <h2>{item.adr} </h2>
                </div>

                {/* <div className="w-full flex  items-center  text-gray-700">
                  <SlBadge size={20} />
                  <h2>Client</h2>
                </div> */}

                <div className="w-full border my-2 "></div>
                <div
                  className={`flex justify-${
                    user && user.role !== "admin" ? "end" : "between"
                  } w-full
                 text-gray-700 items-center font-medium text-lg px-5 pt-1`}
                >
                  {user?.role === "admin" ? (
                    <button
                      type="button"
                      className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 "
                      onClick={() => Update_Employee(item)}
                    >
                      <span className="relative flex items-center gap-1  px-2 py-1 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                        <BsPencilSquare />
                        Update
                      </span>
                    </button>
                  ) : null}

                  {user?.role === "admin" ? (
                    <button
                      type="button"
                      onClick={() => delete_employee(item._id)}
                      className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-red-500 group-hover:from-pink-500 group-hover:to-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 "
                    >
                      <span className="relative flex items-center gap-1 px-2 py-1 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0 ">
                        <IoTrashOutline />
                        Delete
                      </span>
                    </button>
                  ) : null}
                  <Menu placement="bottom-start">
                    <MenuHandler>
                      <Button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span className="relative px-1 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          <SlOptionsVertical size={16} />
                        </span>
                      </Button>
                    </MenuHandler>
                    <MenuList>
                      <MenuItem
                        className="flex gap-1"
                        onClick={() => openDocsDialog(item)}
                      >
                        {" "}
                        <HiOutlineDocumentText size={16} />{" "}
                        <span>Decalaration CNSS</span>
                      </MenuItem>
                      <MenuItem className="flex gap-1">
                        {" "}
                        <HiOutlineDocumentText size={16} />{" "}
                        <span>Next Document</span>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              </div>
            );
          })}
      </div>

      <Fragment>
        <Dialog
          open={open}
          size="xl"
          handler={handleOpen}
          className="overflow-auto max-h-screen"
        >
          <DialogHeader>Create a new Employee</DialogHeader>
          <form onSubmit={handleSubmit}>
            <DialogBody divider>
              <div className="grid grid-cols-3 gap-4">
                <InputField
                  type="text"
                  label="First Name:"
                  name="nom_F"
                  placeholder="First Name"
                  value={formValues.nom_F}
                  onChange={handleInputChange}
                />
                <InputField
                  type="text"
                  label="Middle Name:"
                  name="nom_M"
                  placeholder="Middle Name"
                  value={formValues.nom_M}
                  onChange={handleInputChange}
                />
                <InputField
                  type="text"
                  label="Employee First Name:"
                  name="prenom_E"
                  placeholder="Employee First Name"
                  value={formValues.prenom_E}
                  onChange={handleInputChange}
                />
                <InputField
                  type="text"
                  label="Prefix of the Father's Name:"
                  name="prenom_p"
                  placeholder="Prefix of the Father's Name"
                  value={formValues.prenom_p}
                  onChange={handleInputChange}
                />
                <InputField
                  type="text"
                  label="Prefix of the Grandfather's Name:"
                  name="prenom_gp"
                  placeholder="Prefix of the Grandfather's Name"
                  value={formValues.prenom_gp}
                  onChange={handleInputChange}
                />
                <InputField
                  type="text"
                  label="Prefix of the Mother's Name:"
                  name="prenom_m"
                  placeholder="Prefix of the Mother's Name"
                  value={formValues.prenom_m}
                  onChange={handleInputChange}
                />
                {/* <InputField
                  type="text"
                  label="Sex:"
                  name="sexe"
                  placeholder="Sex"
                  value={formValues.sexe}
                  onChange={handleInputChange}
                /> */}

                <div>
                  <label
                    htmlFor="sexe"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sex
                  </label>
                  <select
                    id="sexe"
                    value={formValues.sexe}
                    onChange={handleInputChange}
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                  sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Fmale</option>
                  </select>
                </div>
                <InputField
                  type="text"
                  label="Nationality:"
                  name="nationalite"
                  placeholder="Nationality"
                  value={formValues.nationalite}
                  onChange={handleInputChange}
                />
                <InputField
                  type="date"
                  label="Date of Birth:"
                  name="date_naiss"
                  placeholder="Date of Birth"
                  value={formValues.date_naiss}
                  onChange={handleInputChange}
                />
                <InputField
                  type="text"
                  label="Place of Birth:"
                  name="lieu_naiss"
                  placeholder="Place of Birth"
                  value={formValues.lieu_naiss}
                  onChange={handleInputChange}
                />
                <InputField
                  type="text"
                  label="Marital Status:"
                  name="etat_civil"
                  placeholder="Marital Status"
                  value={formValues.etat_civil}
                  onChange={handleInputChange}
                />
                <InputField
                  type="number"
                  label="CIN:"
                  name="cin"
                  placeholder="CIN"
                  value={formValues.cin}
                  onChange={handleInputChange}
                />
                <InputField
                  type="text"
                  label="National :"
                  name="nationale"
                  placeholder="National Card Number"
                  value={formValues.nationale}
                  onChange={handleInputChange}
                />
                <InputField
                  type="text"
                  label="Type:"
                  name="type"
                  placeholder="Type"
                  value={formValues.type}
                  onChange={handleInputChange}
                />
                <InputField
                  type="text"
                  label="Birth Certificate:"
                  name="acte_naiss"
                  placeholder="Birth Certificate"
                  value={formValues.acte_naiss}
                  onChange={handleInputChange}
                />
                <InputField
                  type="text"
                  label="Municipality:"
                  name="municipalite"
                  placeholder="Municipality"
                  value={formValues.municipalite}
                  onChange={handleInputChange}
                />
                <InputField
                  type="text"
                  label="Arrondissement:"
                  name="arrond"
                  placeholder="Arrondissement"
                  value={formValues.arrond}
                  onChange={handleInputChange}
                />
                <InputField
                  type="text"
                  label="Year:"
                  name="annee"
                  placeholder="Year"
                  value={formValues.annee}
                  onChange={handleInputChange}
                />
                <InputField
                  type="text"
                  label="Address:"
                  name="adr"
                  placeholder="Address"
                  value={formValues.adr}
                  onChange={handleInputChange}
                />

                <InputField
                  type="number"
                  label="Apartment Number:"
                  name="appt_num"
                  placeholder="Apartment Number"
                  value={formValues.appt_num}
                  onChange={handleInputChange}
                />

                <InputField
                  type="number"
                  label="Building Number:"
                  name="imm_num"
                  placeholder="Building Number"
                  value={formValues.imm_num}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="City:"
                  name="cite"
                  placeholder="City"
                  value={formValues.cite}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Locality:"
                  name="localite"
                  placeholder="Locality"
                  value={formValues.localite}
                  onChange={handleInputChange}
                />

                <InputField
                  type="number"
                  label="Postal Code:"
                  name="c_p"
                  placeholder="Postal Code"
                  value={formValues.c_p}
                  onChange={handleInputChange}
                />

                <InputField
                  type="number"
                  label="Number:"
                  name="num"
                  placeholder="Number"
                  value={formValues.num}
                  onChange={handleInputChange}
                />

                <InputField
                  type="number"
                  label="Fax:"
                  name="fax"
                  placeholder="Fax"
                  value={formValues.fax}
                  onChange={handleInputChange}
                />

                <InputField
                  type="number"
                  label="Identification:"
                  name="identif"
                  placeholder="Identification"
                  value={formValues.identif}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="CNSS ID:"
                  name="id_cnss"
                  placeholder="CNSS ID"
                  value={formValues.id_cnss}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Level:"
                  name="niveau"
                  placeholder="Level"
                  value={formValues.niveau}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Diploma:"
                  name="diplome"
                  placeholder="Diploma"
                  value={formValues.diplome}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Speciality:"
                  name="specialite"
                  placeholder="Speciality"
                  value={formValues.specialite}
                  onChange={handleInputChange}
                />

                <InputField
                  type="date"
                  label="Date:"
                  name="date"
                  placeholder="Date"
                  value={formValues.date}
                  onChange={handleInputChange}
                />

                <InputField
                  type="number"
                  label="RIP:"
                  name="rip"
                  placeholder="RIP"
                  value={formValues.rip}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Current Account:"
                  name="compte_courrent"
                  placeholder="Current Account"
                  value={formValues.compte_courrent}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Plan:"
                  name="plan"
                  placeholder="Plan"
                  value={formValues.plan}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Stage:"
                  name="stage"
                  placeholder="Stage"
                  value={formValues.stage}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Contract Period:"
                  name="periode_contrat"
                  placeholder="Contract Period"
                  value={formValues.periode_contrat}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Account:"
                  name="compte"
                  placeholder="Account"
                  value={formValues.compte}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Governorate:"
                  name="gouvernorat"
                  placeholder="Governorate"
                  value={formValues.gouvernorat}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Mat:"
                  name="mat"
                  placeholder="Mat"
                  value={formValues.mat}
                  onChange={handleInputChange}
                />

                <InputField
                  type="number"
                  label="Act Number:"
                  name="num_acte"
                  placeholder="Act Number"
                  value={formValues.num_acte}
                  onChange={handleInputChange}
                />

                <InputField
                  type="date"
                  label="Date Delivered:"
                  name="date_delivre"
                  placeholder="Date Delivered"
                  value={formValues.date_delivre}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Qualité:"
                  name="qualite"
                  placeholder="Qualité"
                  value={formValues.qualite}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Pays:"
                  name="pays"
                  placeholder="Pays"
                  value={formValues.pays}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Objet d'envoi:"
                  name="envoi_objet"
                  placeholder="Objet d'envoi"
                  value={formValues.envoi_objet}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Type d'envoi:"
                  name="type_envoi"
                  placeholder="Type d'envoi"
                  value={formValues.type_envoi}
                  onChange={handleInputChange}
                />

                <InputField
                  type="number"
                  label="Numéro d'envoi:"
                  name="envoi_numero"
                  placeholder="Numéro d'envoi"
                  value={formValues.envoi_numero}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Position d'accident:"
                  name="position_acc"
                  placeholder="Position d'accident"
                  value={formValues.position_acc}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Nature d'accident:"
                  name="nature_acc"
                  placeholder="Nature d'accident"
                  value={formValues.nature_acc}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Lieu:"
                  name="lieu"
                  placeholder="Lieu"
                  value={formValues.lieu}
                  onChange={handleInputChange}
                />

                <InputField
                  type="time"
                  label="Heure:"
                  name="heure"
                  placeholder="Heure"
                  value={formValues.heure}
                  onChange={handleInputChange}
                />

                <InputField
                  type="date"
                  label="Date d'arrêt de travail:"
                  name="date_arret_travail"
                  placeholder="Date d'arrêt de travail"
                  value={formValues.date_arret_travail}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Period:"
                  name="periode"
                  placeholder="Period"
                  value={formValues.periode}
                  onChange={handleInputChange}
                />

                <InputField
                  type="date"
                  label="Hiring Date:"
                  name="date_rec"
                  placeholder="Hiring Date"
                  value={formValues.date_rec}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Status:"
                  name="etat"
                  placeholder="Status"
                  value={formValues.etat}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Normal Status:"
                  name="etat_normal"
                  placeholder="Normal Status"
                  value={formValues.etat_normal}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Residence:"
                  name="residence"
                  placeholder="Residence"
                  value={formValues.residence}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Consequence of Accident:"
                  name="effet_acc"
                  placeholder="Consequence of Accident"
                  value={formValues.effet_acc}
                  onChange={handleInputChange}
                />

                <InputField
                  type="date"
                  label="Accident Date:"
                  name="date_acc"
                  placeholder="Accident Date"
                  value={formValues.date_acc}
                  onChange={handleInputChange}
                />

                <InputField
                  type="date"
                  label="Employment Date:"
                  name="date_emploi"
                  placeholder="Employment Date"
                  value={formValues.date_emploi}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Activity:"
                  name="activite"
                  placeholder="Activity"
                  value={formValues.activite}
                  onChange={handleInputChange}
                />

                <InputField
                  type="number"
                  label="Number of Employees:"
                  name="num_employees"
                  placeholder="Number of Employees"
                  value={formValues.num_employees}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Description:"
                  name="description"
                  placeholder="Description"
                  value={formValues.description}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Causes:"
                  name="causes"
                  placeholder="Causes"
                  value={formValues.causes}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Acc:"
                  name="acc"
                  placeholder="Acc"
                  value={formValues.acc}
                  onChange={handleInputChange}
                />
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={CancelDialog}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button
                type="submit"
                variant="gradient"
                color="green"
                // onClick={CancelDialog}
              >
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </form>
        </Dialog>
      </Fragment>

      <Fragment>
        <Dialog
          open={openDoc}
          size="xl"
          handler={handleOpenDoc}
          className="overflow-auto max-h-screen"
        >
          <DialogHeader>Generate Document</DialogHeader>
          <DeclarationCNSS data={docItems} />
          <DialogBody divider></DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpenDoc}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            {/* <Button
              type="submit"
              variant="gradient"
              color="green"
              onClick={handleOpenDoc}
            >
              <span>Generate</span>
            </Button> */}
          </DialogFooter>
        </Dialog>
      </Fragment>
    </div>
  );
};

export default Employee;
