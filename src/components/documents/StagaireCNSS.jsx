import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
const StagaireCNSS = () => {
  const DocumentRef = useRef();

  const handelPrint = useReactToPrint({
    content: () => DocumentRef.current,
    documentTitle: "Declaration CNSS",
    onAfterPrint: () => alert("printed successfully"),
  });
  return (
    <div>
      <button onClick={handelPrint}>Print</button>
    </div>
  );
};

export default StagaireCNSS;
