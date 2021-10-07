import React, {useState, useContext} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Link from '@oracle-cx-commerce/react-components/link';
import Modal from '@oracle-cx-commerce/react-components/modal';

/*
 * Uncomment the following line to get the parameter substitution
 * function, e.g. t(someParameterizedResourceString, "someValue").
 */
import {t} from '@oracle-cx-commerce/utils/generic';

import css from './styles.css';

const MainWidget = props => {
  const [display, setDisplay] = useState();
  const [showModal, setShowModal] = useState(false);

  function handleVideoLink() {
    const temp = (
      <iframe
        width="853"
        height="480"
        src="https://www.youtube.com/embed/w7ejDZ8SWv8"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    );
    setDisplay(temp);
  }

  // function handleDownloadLink(){
  //   window.location.href = "https://cors-anywhere.herokuapp.com/https://docs.oracle.com/en/cloud/saas/cx-commerce/21c/uoccs/using-oracle-commerce.pdf";
  // }

  function handleDownloadLink() {
    fetch(
      'https://cors-anywhere.herokuapp.com/https://docs.oracle.com/en/cloud/saas/cx-commerce/21c/uoccs/using-oracle-commerce.pdf',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf'
        }
      }
    )
      .then(response => response.blob())
      .then(blob => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `using-oracle-commerce.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  }

  function handleModalOpening() {
    setShowModal(true);
  }
  
  function handleModalClosing(){
    setShowModal(false);
  }

  return (
    <Styled id="MainWidget" css={css}>
      <div className="MainWidget">
        <p> Click on the below links!</p>
        <ul>
          <li>
            <Link className="link" onClick={handleVideoLink}>1. Learn React</Link>
            <div>{display}</div>
          </li>
          <li>
            {/* <a
              href="https://docs.oracle.com/en/cloud/saas/cx-commerce/21c/dosfa/developing-open-storefront-framework-applications-oracle-commerce.pdf"
              download
            >
              2. Download PDF
            </a> */}
            <Link className="link" onClick={handleDownloadLink}>2. Download PDF</Link>
          </li>
          <li>
            <Link className="link" onClick={handleModalOpening}>3. Show popup</Link>
          </li>
        </ul>
        <Modal show={showModal} title="It's working!!!!" onClose={handleModalClosing}></Modal>
      </div>
    </Styled>
  );
};

export default MainWidget;
