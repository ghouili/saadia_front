import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Cookies from "universal-cookie";
import moment from "moment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { AiOutlinePrinter } from "react-icons/ai";
import { path } from "../../utils/variables";
import swal from "sweetalert";

import CNSS_LOGO from "../../assets/images/cnss_logo.png";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  PDFViewer,
  PDFDownloadLink,
  pdf,
} from "@react-pdf/renderer";

const DeclarationCNSS = ({ data }) => {
  const cookies = new Cookies();
  //   const DocumentRef = useRef();
  // let user = cookies.get('user');
  let user = {
    _id: "645eb4a59af7d633d3252a73",
    cin: 12345678,
    email: "admin@gmail.com",
    nom: "admin",
    prenom: "admin",
    adress: "admin adress",
    tel: 12345678,
    password: "$2a$10$U5hXFH8GDsrkGBWE7cucU.ImvunYPQTd0ki/8QcBlWmOHQ8RfQXia",
    avatar: "02a562b0-f10f-11ed-8cc3-2125ddee75e1.png",
    role: "admin",
  };
  let DocumentRef = useRef();
  const MyDocument = () => (
    <Document ref={DocumentRef} id="document">
      <Page
        size="A4"
        style={{
          flexDirection: "column",
          backgroundColor: "#ffffff",
          padding: "1.5cm",
        }}
      >
        {/* <View style={styles.header}>
          <Image style={styles.logo} src={CNSS_LOGO} />
          <Text style={styles.title}>DEMANDE D'IMMATRICULATION</Text>
        </View> */}
        <View
          style={{
            marginBottom: "1cm",
          }}
        >
          <View style={{ marginBottom: "2cm", position: "relative" }}>
            <Image
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "auto",
                height: "3cm",
              }}
              src={CNSS_LOGO}
            />
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              DEMANDE D'IMMATRICULATION
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{}}>
              <Text style={{}}>Mat : {data && data.mat}</Text>
              <Text style={{ fontWeight: "bold" }}>DE TRAVAILLEUR SALARIE</Text>
            </View>
            <Text style={{ textAlign: "end", marginBottom: "8px" }}>
              Date d'effet : {data && data.date_emploi}
            </Text>
          </View>

          <Text style={{ textAlign: "center", marginBottom: "8px" }}>
            DEMANDE D'IMMATRICULATION
          </Text>
          <Text style={{ fontWeight: "bold" }}>L'employeur SEBNTN</Text>

          <Text>Nom ou Raison Sociale : SEBNTN</Text>
          <Text>Adresse : Jandouba</Text>
          <Text>
            Je soussigné : {user && user.nom} {user && user.prenom}
          </Text>
          <Text>certifie en ma qualité de : ????</Text>
          <Text>
            que M (me) : {data && data.nom_F} {data && data.prenom_E}
          </Text>
          <Text>
            est employé(e) à notre service en qualité de :{data && data.qualite}
          </Text>
          <Text>
            depuis le (indiquer le jour, le mois et l'année) :
            {data && data.date_emploi}
          </Text>
          <Text>au lieu de travail situé à l'adresse suivante : Jandouba.</Text>
          <Text>
            Je demande son immatriculation aux régimes de sécurité sociale et
            m’engage à informer la Caisse Nationale de tout changement de sa
            situation familiale ou professionnelle.
          </Text>
          {/* <Text style={{ textAlign: 'center', marginTop: '8px' }}>Fait à Jendouba le {Date()}</Text> */}
          <Text style={{ textAlign: "end", marginTop: "8px" }}>
            Fait à Jendouba le{" "}
            <Text style={{ fontWeight: "bold" }}>
              {moment().subtract(10, "days").calendar()}
            </Text>
          </Text>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1.5cm",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text>Cachet et signature</Text>
              <Text>_____________________</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text>Cachet et signature</Text>
              <Text>_____________________</Text>
            </View>
          </View>
          <View style={{ marginTop: "4px" }}>
            <Text style={{ fontWeight: "bold" }}>
              Renseignements concernant le travailleur
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text style={{ width: "50%" }}>
                Nom de famille : {data && data.nom_F}
              </Text>
              <Text style={{ width: "50%" }}>
                Prénom : {data && data.prenom_E}
              </Text>
              <Text style={{ width: "50%" }}>
                Prénom du père : {data && data.prenom_p}
              </Text>
              <Text style={{ width: "50%" }}>
                Prénom du grand-père : {data && data.prenom_gp}
              </Text>
              <Text style={{ width: "50%" }}>
                Nom de la mère : {data && data.nom_M}
              </Text>
              <Text style={{ width: "50%" }}>
                Prénom de la mère : {data && data.prenom_m}
              </Text>
              <Text style={{ width: "50%" }}>Sexe : {data && data.sexe}</Text>
              <Text style={{ width: "50%" }}>
                Nationalité : {data && data.nationalite}
              </Text>
              <Text style={{ width: "50%" }}>
                Date de naissance : {data && data.date_naiss}
              </Text>
              <Text style={{ width: "50%" }}>
                Lieu : {data && data.lieu_naiss}
              </Text>
              <Text style={{ width: "50%" }}>
                Pièce d'identité N° : {data && data.cin}
              </Text>
              <Text style={{ width: "50%" }}>
                type : carte d'identité nationale délivrée à Tunis le{" "}
                {data && data.date_delivre}
              </Text>
              <Text style={{ width: "50%" }}>
                Acte de naissance : Gouvernorat : {data && data.gouvernorat}
              </Text>
              <Text style={{ width: "50%" }}>
                Municipalité : {data && data.municipalite}
              </Text>
            </View>
            <Text>
              Etat civil (célibataire, marié, divorcé ou veuf) :{" "}
              {data && data.etat_civil}
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text style={{ width: "50%" }}>
                Arrondissement : {data && data.arrond}
              </Text>
              <Text style={{ width: "50%" }}>Année : {data && data.annee}</Text>
              <Text style={{ width: "50%" }}>Numéro : {data && data.num}</Text>
              <Text style={{ width: "50%" }}>
                Appt n° {data && data.appt_num}
              </Text>
              <Text style={{ width: "50%" }}>
                Imm n° {data && data.imm_num}
              </Text>
              <Text style={{ width: "50%" }}>Cité : {data && data.cite}</Text>
            </View>
            <Text>Adresse du domicile : {data && data.adr}</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text style={{ width: "50%" }}>
                Localité : {data && data.localite}
              </Text>
              <Text style={{ width: "50%" }}>
                Code Postal {data && data.c_p}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: "8px" }}>
            <Text style={{ fontWeight: "bold" }}>Pièces à fournir :</Text>
            <View style={{ marginLeft: "6px" }}>
              <Text>
                - Extrait d’acte de naissance du travailleur datant de moins de
                3 mois.
              </Text>
              <Text>
                - Copie de la Carte d’Identité Nationale ou de la Carte de
                séjour pour les étrangers.
              </Text>
            </View>
            <Text style={{ fontWeight: "bold", marginTop: "4px" }}>
              Très important :
            </Text>
            <Text>
              Pour inscrire les membres de sa famille, le salarié doit déposer,
              par l’intermédiaire de son employeur directement auprès de l’un
              des bureaux régionaux et locaux de la Caisse Nationale de Sécurité
              Sociale, un extrait d’acte de naissance datant de moins de 3 mois
              de son conjoint et de chaque enfant à sa charge.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  const generateAndSendPDF = async () => {
    const documentElement = document.getElementById("document");
    const contentHeight = documentElement.clientHeight;
    const pageHeight = 900; // Adjust this value based on the desired page height

    const canvas = await html2canvas(documentElement, {
      scale: 1,
    });

    const totalPages = Math.ceil(contentHeight / pageHeight);
    let pdf = new jsPDF("p", "pt", [canvas.width, pageHeight]);

    for (let page = 0; page < totalPages; page++) {
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = pageHeight;
      const pageContext = pageCanvas.getContext("2d");
      pageContext.drawImage(
        canvas,
        0,
        page * pageHeight,
        canvas.width,
        pageHeight,
        0,
        0,
        canvas.width,
        pageHeight
      );

      const imgData = pageCanvas.toDataURL("image/png");
      if (page !== 0) {
        pdf.addPage();
      }
      pdf.addImage(imgData, "PNG", 0, 0);
    }

    const pdfData = pdf.output("blob");
    // const myPdf = pdf({}); // important, without an argument it blows up
    // myPdf.updateContainer(MyDocument);
    // const blob = await myPdf.toBlob();
    // // const blob = await MyDocument.toBlob(); // Convert the PDF to a Blob
    // // const formData = new FormData();

    try {
      const formData = new FormData();
      formData.append("pdf", pdfData, "generated.pdf"); // Append the Blob to a FormData object
      // formData.append("pdf", pdfData, "declaration.pdf");
      // formData.append("pdf", pdfBlob, 'declaration.pdf');
      formData.append("date", moment().subtract(10, "days").calendar());
      formData.append("userid", user._id);
      formData.append("employeeid", user._id);

      fetch(`${path}document/add`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          if (data.success === true) {
            swal("Success!", data.message, "success");
          } else {
            swal("Error!", data.message, "warning");
          }
        })
        .catch((error) => {
          console.log(error);
          swal("Error!", "error", "warning");
        });
    } catch (error) {
      // Handle the error
    }
  };

  return (
    <div id="document" className="w-full" style={{ height: "78vh" }}>
      <PDFViewer width="100%" height="100%">
        <MyDocument />
      </PDFViewer>

      <PDFDownloadLink document={<MyDocument />} fileName="generated.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
      <br />
      <button onClick={generateAndSendPDF}>Send to API</button>
      {/* <button onClick={handleSave}>Generate PDF</button> */}
      {/* Rest of your component */}
    </div>
  );
};

export default DeclarationCNSS;
