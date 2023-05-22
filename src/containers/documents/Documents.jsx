import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { path } from "../../utils/variables";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
  Select,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { IoTrashOutline } from "react-icons/io5";
import { VscOpenPreview } from "react-icons/vsc";
import { BiEdit } from "react-icons/bi";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";

import NewDoc from "../../assets/images/new.png";
import { DeclarationCNSS } from "../../components";
import Test_doc from "../../components/documents/Test_doc";
import moment from "moment";
import Zoompdf from "../../components/documents/Zoompdf";

const Documents = () => {
  const dec_acc_doc =
    "http://localhost:5000/emp_cnss/pdf/8761b780-f653-11ed-b56a-3bebb8e7ac1f.pdf";

  const cookies = new Cookies();
  let user = cookies.get("user");

  const [employee, setEmployee] = useState([]);
  const [docItems, setDocItems] = useState(null);
  const [data, setData] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState([]);
  const [typeSearch, setTypeSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [openDoc, setOpenDoc] = useState(false);
  const [selected_EmpId, setSelected_EmpId] = useState(null);
  const [selected_Doc_type, setSelected_Doc_type] = useState(null);
  const [selected_type, setSelected_type] = useState(null);
  const [formValues, setFormValues] = useState({});

  //wzoom::
  const [openZ, setOpenZ] = useState(false);
  const [pdfZ, setpdfZ] = useState(null);

  const handleOpenZ = () => {
    setOpenZ(!openZ);
  };
  //image related
  const [File, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();
  let subtitle;

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

  const handleOpen = () => setOpen(!open);
  const handleOpenDoc = () => setOpenDoc(!openDoc);

  const openDocsDialog = (item) => {
    // setDocItems(item);
  };

  const CancelDialog = () => {
    setOpen(!open);
    setOpenDoc(false);
    setDocItems(null);
    setSelected_Doc_type(null);
    setSelected_EmpId(null);
    setPreviewUrl(null);
    setFile(null);
    setFormValues({});
  };

  // const Update_document = (item) => {
  //   console.log(item);
  //   setFormValues(item);
  //   setOpen(true);
  // };

  const fetchEmployee = async () => {
    const result = await axios.get(`${path}employee`);
    setEmployee(result.data.data);
    // console.log(result.data.data);
  };

  const fetchdata = async () => {
    const result = await axios.get(`${path}document`);
    setMasterData(result.data.data);
    setfilterData(result.data.data);
    // console.log(result.data.data);
  };

  useEffect(() => {
    fetchEmployee();
    fetchdata();
  }, []);

  const SelectEmployee = async (id) => {
    setSelected_EmpId(id);
    let emp;

    emp = employee.filter((item) => {
      return item._id === id;
    });

    console.log(emp[0]);
    setDocItems(emp[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('handelsubmi');
    if (!docItems || !selected_EmpId || !selected_Doc_type || !File) {
      return alert(
        "we need u to choose the employee, select the document type and select a File"
      );
    }
    let url, result;
    const formData = new FormData();
    if (File) {
      // formData.append("image", previewUrl);
      formData.append("pdf", File);
    }
    formData.append("type", selected_Doc_type);
    formData.append("employeeid", selected_EmpId);
    // formData.append("date", moment().subtract(10, "days").calendar());
    formData.append("userid", user._id);

    url = `${path}document/add`;
    result = await axios.post(url, formData);

    console.log(result.data);
    if (result.data.success === true) {
      swal("Success!", result.data.message, "success");
      fetchdata();
      CancelDialog();
    } else {
      swal("Error!", result.data.message, "warning");
    }
  };

  const GeneratePDF = async () => {
    if (!docItems || !selected_EmpId || !selected_Doc_type) {
      return alert(
        "we need u to choose the employee and select the document type!!! "
      );
    }

    const result = await axios.get(
      `${path}document/pdf/${user._id}/${selected_EmpId}/${selected_Doc_type}`
    );

    if (result.data.success) {
      swal("Success!", result.data.message, "success");
      fetchdata();
      handleOpenDoc();
      CancelDialog();
    } else {
      swal("Error!", result.data.message, "warning");
    }
  };

  const delete_document = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this file?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      const result = await axios.delete(`${path}document/${id}`);

      if (result.data.success === true) {
        swal("Poof! Utilisateur supprimé avec succés!", {
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
          <span className="">Products</span>
        </div>
        <div className="w-fit flex gap-4 items-center">
          <div className="w-fit">
            <Select
              label="Select Document type"
              value={typeSearch}
              onChange={(v) => setTypeSearch(v)}
            >
              <Option value="">All</Option>
              <Option value="declaration cnss">Declaration CNSS</Option>
              <Option value="stagaire cnss">Declaration Stagaire CNSS</Option>
              <Option value="civp">Contrat Civp</Option>
            </Select>
          </div>
          <div className="relative flex w-full max-w-[24rem]">
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
            <Button
              size="sm"
              className="!absolute right-1 top-1 rounded bg-blue-700"
            >
              Search
            </Button>
          </div>
          {user?.role === "admin" ? null : (
            <button
              className=" relative w-40 inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 "
              onClick={() => setOpen(!open)}
            >
              <span className="relative w-full px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                New
              </span>
            </button>
          )}
        </div>
      </div>

      {filterData.length !== 0 ? null : (
        <div className="w-full h-96 flex items-center justify-center border bg-white rounded-md shadow">
          <h1 className="text-3xl font-bold text-gray-700">
            No Data to Diplay
          </h1>
        </div>
      )}
      <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filterData
          .slice(0)
          .reverse()
          .map(({ _id, date, pdf, userid, type, employeeid }, index) => {
            if (typeSearch !== "" && typeSearch !== type) {
              return;
            }
            let emp = employee.filter((item) => {
              return item._id === employeeid;
            });
            console.log(emp[0]);
            return (
              <div key={index} className="bg-white shadow  rounded-md p-4">
                <div className="w-full flex items-center justify-center text-lg  font-medium">
                  <h2>{type}</h2>
                </div>
                <div className="w-full flex items-center justify-center  font-medium">
                  <h2>
                    {emp[0]?.nom_F} {emp[0]?.prenom_E}
                  </h2>
                </div>
                <div className="w-full flex items-center justify-center  font-medium text-gray-700 text-sm -mt-1">
                  <span>{emp[0]?.cin}</span>
                </div>
                <div className="w-fit mt-4 flex flex-col gap-2 ">
                  {pdf !== "" ? null : (
                    <div className="w-full text-sm font-medium">
                      <h2>Still Missing</h2>
                    </div>
                  )}

                  <embed
                    src={`${path}uploads/files/${pdf}`}
                    // src={`${path}document/show/${pdf}`}
                    typeof="application/pdf"
                    type="application/pdf"
                    width="100%"
                    height="400px"
                    className="rounded-md"
                  />

                  <div className="w-full border my-2 " />
                  <div className="flex justify-between w-full text-gray-700 items-center font-medium text-lg px-5 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setpdfZ(pdf);
                        handleOpenZ();
                      }}
                      className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 "
                    >
                      <span className="relative flex items-center gap-1  px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                        <VscOpenPreview />
                        Consult
                      </span>
                    </button>
                    {user?.role === "admin" ? null : (
                      <button
                        type="button"
                        onClick={() => delete_document(_id)}
                        className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-red-500 group-hover:from-pink-500 group-hover:to-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 "
                      >
                        <span className="relative flex items-center gap-1 px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                          <IoTrashOutline />
                          Delete
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <Fragment>
        <Dialog open={open} handler={CancelDialog}>
          <DialogHeader>New Document</DialogHeader>
          <DialogBody divider>
            <div
              className="flex flex-col gap-4 overflow-auto "
              style={{ height: "80vh" }}
            >
              <div className="w-full flex items-center justify-between pt-1">
                <div className="w-fit ">
                  <Select
                    label="Select Employee"
                    value={selected_EmpId}
                    onChange={(v) => SelectEmployee(v)}
                  >
                    {employee.map(({ _id, nom_F, prenom_E }) => {
                      // console.log({ _id, nom_F, prenom_E });
                      return (
                        <Option key={_id} value={_id}>
                          {nom_F} {prenom_E}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
                <div className="w-fit  pt-2">
                  <Select
                    label="Select Document type"
                    value={selected_Doc_type}
                    onChange={(v) => setSelected_Doc_type(v)}
                  >
                    <Option value="declaration_cnss">Declaration CNSS</Option>
                    <Option value="stagaire_cnss">
                      Declaration Stagaire CNSS
                    </Option>
                    <Option value="civp">Contrat Civp</Option>
                  </Select>
                </div>
              </div>
              <div className="h-full ">
                <Tabs
                  id="custom-animation"
                  value="generate"
                  className="h-full "
                >
                  <TabsHeader>
                    <Tab key="generate" value="generate">
                      Gnerate Document
                    </Tab>
                    <Tab key="upload" value="upload">
                      Upload Document
                    </Tab>
                  </TabsHeader>
                  <TabsBody
                    animate={{
                      initial: { y: 250 },
                      mount: { y: 0 },
                      unmount: { y: 250 },
                    }}
                    className="h-full"
                  >
                    <TabPanel
                      key="generate"
                      value="generate"
                      className="h-full "
                    >
                      <div className="w-full   h-full flex  justify-center">
                        <div
                          className="w-auto relative "
                          style={{ height: "52vh" }}
                        >
                          <object
                            data={`${path}document/files/dec_acc.pdf`}
                            // data={selected_Doc_type === 'declaration_cnss' ?  }
                            // alt="product_pic"
                            aria-label="document"
                            className=" h-full object-cover object-center rounded-md"
                            style={{ maxHeight: "100%", maxWidth: "100%" }}
                          />
                          <img
                            src={NewDoc}
                            alt=""
                            className="absolute -top-10 -left-4 w-40 h-auto"
                          />
                        </div>
                      </div>
                      <div className="flex z-30 -mt-16 gap-10 justify-end items-center">
                        <Button
                          variant="text"
                          color="red"
                          onClick={CancelDialog}
                          className="mr-1"
                        >
                          <span>Cancel</span>
                        </Button>
                        <Button
                          variant="gradient"
                          color="blue"
                          // disabled={!selected_Doc_type || !selected_EmpId ? 'true' : 'false'}
                          onClick={GeneratePDF}
                        >
                          <span>Create</span>
                        </Button>
                      </div>
                    </TabPanel>
                    <TabPanel key="upload" value="upload">
                      <form onSubmit={handleSubmit}>
                        <div
                          className="flex items-center justify-center"
                          style={{ height: "52vh" }}
                        >
                          {previewUrl ? (
                            <div
                              className=" relative w-40 h-hidden rounded-md shadow-inner mx-auto "
                              style={{ height: "36vh" }}
                            >
                              <object
                                data={previewUrl}
                                // alt="product_pic"
                                aria-label="Patent"
                                className="h-full object-cover object-center rounded-md"
                                style={{ maxHeight: "100%", maxWidth: "100%" }}
                              />
                              <label
                                htmlFor="patentID"
                                className="absolute p-1 rounded-full bg-purple-50 border border-white -bottom-3 -left-3 text-gray-700 cursor-pointer"
                              >
                                <BiEdit size={20} />
                                <input
                                  type="file"
                                  name="patent"
                                  id="patentID"
                                  className="hidden"
                                  accept=".jpg,.png,.jpeg,.pdf"
                                  ref={filePickerRef}
                                  onChange={pickedHandler}
                                />
                              </label>
                            </div>
                          ) : (
                            <div className="w-full flex justify-center items-center pb-6 ">
                              <label
                                htmlFor="patentID"
                                className="mx-auto w-fit flex flex-col items-center justify-center rounded-lg border-2 border-gray-700 p-4 text-gray-700 cursor-pointer"
                              >
                                <HiOutlineDocumentArrowUp size={30} />
                                <input
                                  type="file"
                                  name="patent"
                                  id="patentID"
                                  className="hidden"
                                  accept=".jpg,.png,.jpeg,.pdf"
                                  ref={filePickerRef}
                                  onChange={pickedHandler}
                                />
                                <span className="text-gray-700 font-medium">
                                  Select Document
                                </span>
                              </label>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-10 justify-end items-center">
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
                            color="blue"
                            // disabled={!selected_Doc_type || !selected_EmpId ? 'true' : 'false'}
                          >
                            <span>Create</span>
                          </Button>
                        </div>
                      </form>
                    </TabPanel>
                  </TabsBody>
                </Tabs>
              </div>
            </div>
          </DialogBody>
        </Dialog>
      </Fragment>
      <Zoompdf
        handleOpen={handleOpenZ}
        open={openZ}
        pdf={pdfZ}
        close={setpdfZ}
      />
    </div>
  );
};

export default Documents;
