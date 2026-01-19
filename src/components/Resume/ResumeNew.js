import React, { useState, useEffect } from "react";
import { Container, Row, Spinner, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import Particle from "../Particle";

// Path to the PDF file in the public directory
const pdfPath = "/cv_sejal wattamwar.pdf";

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [width, setWidth] = useState(1200);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); // Track current page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Direct download link to the PDF file
  const downloadUrl = process.env.PUBLIC_URL + '/cv_sejal wattamwar.pdf';

  useEffect(() => {
    // Handle window resize
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log(`PDF loaded with ${numPages} pages`);
    setNumPages(numPages);
    setLoading(false);
  };


  
  const onDocumentLoadError = (error) => {
    console.error('Error while loading PDF:', error);
    setError('Failed to load PDF. Please try again later.');
    setLoading(false);
  };

  return (
    <div className="resume-container">
      <Container fluid className="resume-section">
        <Particle />
        <Row className="resume justify-content-center">
          {loading && (
            <div className="text-center my-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading resume...</span>
              </Spinner>
              <p className="mt-2">Loading resume...</p>
            </div>
          )}
          
          {error && (
            <Alert variant="danger" className="w-75 mx-auto">
              {error}
            </Alert>
          )}

          <Document
            file={pdfPath}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="text-center my-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading PDF...</span>
                </Spinner>
              </div>
            }
            error={
              <Alert variant="danger" className="w-75 mx-auto">
                Failed to load PDF. Please make sure the file exists at: {pdfPath}
              </Alert>
            }
            className="pdf-document"
          >
            <div style={{ 
              position: 'relative',
              minHeight: '500px',
              display: 'flex',
              justifyContent: 'center',
              margin: '0 auto',
              maxWidth: width > 786 ? '70%' : '100%'
            }}>
              {/* Download Button */}
            <div className="text-center mb-3">
              <a
                href={downloadUrl}
                download="cv_sejal wattamwar.pdf"
                className="btn btn-primary"
                style={{ minWidth: '200px' }}
              >
                <AiOutlineDownload className="me-2" />
                Download PDF
              </a>
            </div>

            <div key={`page-${pageNumber}`}>
                <Page 
                  pageNumber={pageNumber}
                  width={width > 786 ? Math.min(width * 0.7, 1000) : width * 0.95}
                  renderTextLayer={false}
                  renderAnnotationLayer={true}
                  loading={
                    <div className="text-center my-5">
                      <Spinner animation="border" variant="primary" />
                      <p>Loading page {pageNumber}...</p>
                    </div>
                  }
                />
                {numPages > 1 && (
                  <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                      disabled={pageNumber <= 1}
                    >
                      Previous
                    </Button>
                    <span className="text-muted">
                      Page {pageNumber} of {numPages}
                    </span>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
                      disabled={pageNumber >= numPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Document>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
