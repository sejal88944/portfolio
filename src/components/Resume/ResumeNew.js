import React, { useState, useEffect } from "react";
import { Container, Row, Spinner, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const pdf = "/documents/sejal-wattamwar-resume.pdf";

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [width, setWidth] = useState(1200);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); // Current page number
  const [isLastPage, setIsLastPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('/sejal wattamwar(8446218623).pdf');

  useEffect(() => {
    // Add timestamp to prevent caching
    setPdfUrl(`/sejal wattamwar(8446218623).pdf?t=${Date.now()}`);
    // Handle window resize
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setIsLastPage(pageNumber >= numPages);
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
            file={pdfUrl}
            onError={(error) => {
              console.error('PDF error:', error);
              setError(`Failed to load PDF. Please check if the file exists at: ${pdfUrl}`);
            }}
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
                Failed to load PDF. Please try again later.
              </Alert>
            }
            className="pdf-document"
          >
            <Page 
              pageNumber={pageNumber} 
              width={width > 786 ? width * 0.7 : width * 0.9}
              renderTextLayer={false}
              renderAnnotationLayer={true}
              onLoadSuccess={() => {
                setIsLastPage(pageNumber >= numPages);
              }}
            />
          </Document>
        </Row>

        <Row className="mt-4 justify-content-center">
          <div className="text-center">
            <Button
              variant="primary"
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-3"
              style={{ width: '250px' }}
            >
              <AiOutlineDownload className="me-2" />
              Download CV
            </Button>
            {numPages > 1 && (
              <div className="d-flex justify-content-center align-items-center gap-3 mt-2">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
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
                  onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                  disabled={isLastPage}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
