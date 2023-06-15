import React from "react";
import PDFViewer from "../../components/PDFViewer/PDFViewer";

const Report = () => {
  const currentUrl = window.location.href;
  let targetUrl = "../../assets/dataDocs/privacy-policy.pdf";

  if (currentUrl.includes("/report")) {
    targetUrl = "https://murrfecto.s3.eu-central-1.amazonaws.com/report.pdf";
  }
  if (currentUrl.includes("/privacy-policy")) {
    targetUrl = "../../assets/dataDocs/privacy-policy.pdf";
  }

  return (
    <div>
      <PDFViewer targetUrl={targetUrl} />
    </div>
  );
};

export default Report;
