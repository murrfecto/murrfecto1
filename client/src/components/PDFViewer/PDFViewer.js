import React, {useState, useEffect} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';
import axios from 'axios';
import './PDFViewer.scss';
import {Loading} from "notiflix";
import {useMediaQuery} from "@mui/material";

// Встановіть URL робітника pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfUrl, setPdfUrl] = useState(null);

    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    const isExtraSmallScreen = useMediaQuery('(max-width: 600px)');
    const isTinyScreen = useMediaQuery('(max-width: 420px)');

    const pageHeight = isTinyScreen ? '400' : isExtraSmallScreen ? '500' : isSmallScreen ? '630' : '900';

    useEffect(() => {
        const fetchPDF = async () => {
            try {
                Loading.standard({
                    backgroundColor: "rgba(208, 190, 196, 0.8)",
                    svgColor: "#4B3542",
                });
                const proxyUrl = 'https://api.allorigins.win/raw?url=';
                const targetUrl = 'https://murrfecto.s3.eu-central-1.amazonaws.com/report.pdf';
                const response = await axios.get(proxyUrl + targetUrl, {
                    responseType: 'blob',
                });
                const url = URL.createObjectURL(response.data);
                setPdfUrl(url);
                Loading.remove();
            } catch (error) {
                console.log('Помилка завантаження PDF:', error);
                Loading.remove();
            }
        };

        fetchPDF();
    }, []);

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offSet) {
        setPageNumber(prevPageNumber => prevPageNumber + offSet);
    }

    function changePageBack(e) {
        e.preventDefault();
        changePage(-1);
    }

    function changePageNext(e) {
        e.preventDefault();
        changePage(+1);
    }

    return (
        <div className="PDFViewer">
            <div className="PDFViewer__container">
                <div className="PDFViewer__container_navigation">
                    <div className="PDFViewer__container_navigation-pages">
                        <p> Сторінка {pageNumber} з {numPages} </p></div>
                    <div
                        className="PDFViewer__container_navigation-buttons">
                        {pageNumber > 1 &&
                        <button onClick={changePageBack}>Попередня
                            сторінка</button>}
                        {pageNumber < numPages &&
                            <button onClick={changePageNext}> наступна
                                сторінка </button>} </div>
                </div>

                <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page height={pageHeight} pageNumber={pageNumber}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}/>

                </Document>
            </div>
        </div>
    );
};

export default PDFViewer;
