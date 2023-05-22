import React, { useRef } from "react";
import axios from "axios";
import { AiOutlinePrinter } from "react-icons/ai";
import moment from "moment";
import { path } from "../../utils/variables";
import swal from "sweetalert";

import CNSS_LOGO from "../../assets/images/cnss_logo.png";
const Test_doc = ({ data }) => {
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

    const DocumentRef = useRef(null);
  
    const generatePdf = async () => {
      try {
        const htmlContent = DocumentRef.current.innerHTML;
  
        await axios.post(`${path}document/generate-pdf`, { htmlContent });
        console.log('PDF generated successfully.');
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    };

  return (
    <div className="w-full h-full">
      <div id="pdf-content" ref={DocumentRef} className=" w-full h-auto border">
        <div className="w-full h-full bg-white rounded-lg  p-8">
          <div className="relative flex items-center justify-center mb-8 pt-10">
            <img
              className="absolute top-0 left-0 w-auto h-32 "
              src={CNSS_LOGO}
              alt="Logo"
            />
            <h2 className="text-2xl font-bold">DEMANDE D'IMMATRICULATION</h2>
          </div>
          <div className="flex justify-between">
            <div className="">
              <p className="">Mat : {data && data.mat}</p>
              <p className="font-bold">DE TRAVAILLEUR SALARIE</p>
            </div>
            <p className="text-end mb-8">
              Date d'effet : {data && data.date_emploi}
            </p>
          </div>

          <p className="text-center mb-8">DEMANDE D'IMMATRICULATION</p>
          <p className="font-bold">L'employeur SEBNTN</p>

          <p>Nom ou Raison Sociale : SEBNTN</p>
          <p>Adresse : Jandouba</p>
          <p>
            Je soussigné : {user && user.nom} {user && user.prenom}
          </p>
          <p>certifie en ma qualité de : ????</p>
          <p>
            que M (me) : {data && data.nom_F} {data && data.prenom_E}
          </p>
          <p>
            est employé(e) à notre service en qualité de :{data && data.qualite}
          </p>
          <p>
            depuis le (indiquer le jour, le mois et l'année) :
            {data && data.date_emploi}
          </p>
          <p>au lieu de travail situé à l'adresse suivante : Jandouba.</p>
          <p>
            Je demande son immatriculation aux régimes de sécurité sociale et
            m’engage à informer la Caisse Nationale de tout changement de sa
            situation familiale ou professionnelle.
          </p>
          {/* <p className="text-center mt-8">Fait à Jendouba le {Date()}</p> */}
          <p className="text-end mt-8">
            Fait à Jendouba le <b>{moment().subtract(10, "days").calendar()}</b>
          </p>
          <div className="flex justify-between mt-6 mb-20">
            <div className="flex flex-col gap-8 justify-center items-center text-center">
              <p>Cachet et signature</p>
              <h1 className="text-2xl">.</h1>
            </div>
            <div className="flex flex-col gap-8 justify-center items-center text-center">
              <p>Cachet et signature</p>
              <h1 className="text-2xl">.</h1>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-bold">
              Renseignements concernant le travailleur
            </p>
            <div className="w-full grid grid-cols-2 gap-6">
              <p>Nom de famille : {data && data.nom_F}</p>
              <p>Prénom : {data && data.prenom_E}</p>
              <p>Prénom du père : {data && data.prenom_p}</p>
              <p>Prénom du grand-père :{data && data.prenom_gp}</p>
              <p>Nom de la mère : {data && data.nom_M}</p>
              <p>Prénom de la mère :{data && data.prenom_m}</p>
              <p>Sexe : {data && data.sexe}</p>
              <p>Nationalité : {data && data.nationalite}</p>
              <p>Date de naissance :{data && data.date_naiss}</p>
              <p>Lieu :{data && data.lieu_naiss}</p>
              <p>Pièce d'identité N° :{data && data.cin}</p>
              <p>
                type : carte d'identité nationale délivrée à Tunis le
                {data && data.date_delivre}
              </p>
              <p>Acte de naissance : Gouvernorat :{data && data.gouvernorat}</p>
              <p>Municipalité :{data && data.municipalite}</p>
            </div>
            <p>
              Etat civil (célibataire, marié, divorcé ou veuf) :
              {data && data.etat_civil}
            </p>
            <div className="w-2/3 grid grid-cols-3 gap-6">
              <p>Arrondissement :{data && data.arrond}</p>
              <p>Année :{data && data.annee}</p>
              <p>Numéro :{data && data.num}</p>
              <p>
                Appt n°
                {data && data.appt_num}{" "}
              </p>
              <p>
                Imm n°
                {data && data.imm_num}
              </p>
              <p>Cité :{data && data.cite} </p>
            </div>
            <p>Adresse du domicile :{data && data.adr}</p>
            <div className="w-2/3 grid grid-cols-2 gap-6">
              <p>Localité :{data && data.localite} </p>
              <p>
                Code Postal
                {data && data.c_p}
              </p>
            </div>
          </div>
          <div className="mt-8">
            <p className="font-medium ">Pièces à fournir :</p>
            <ul className="list-disc ml-6">
              <li>
                Extrait d’acte de naissance du travailleur datant de moins de 3
                mois.
              </li>
              <li>
                Copie de la Carte d’Identité Nationale ou de la Carte de séjour
                pour les étrangers.
              </li>
            </ul>
            <p className="font-medium mt-4">Très important :</p>
            <p>
              Pour inscrire les membres de sa famille, le salarié doit déposer,
              par l’intermédiaire de son employeur directement auprès de l’un
              des bureaux régionaux et locaux de la Caisse Nationale de Sécurité
              Sociale, un extrait d’acte de naissance datant de moins de 3 mois
              de son conjoint et de chaque enfant à sa charge.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <button
          type="button"
          // onClick={handelPrint}
          onClick={generatePdf}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 gap-1"
        >
          <AiOutlinePrinter />
          <span>Print</span>
        </button>
      </div>
    </div>
  );
};

export default Test_doc;
