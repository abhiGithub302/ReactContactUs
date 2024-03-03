import React, { useState } from "react";
import "./ContactUsForm.css";
import { IoIosContacts } from "react-icons/io";
import axios from 'axios';
import FileDownload from "js-file-download"

const ContactUsForm = () => {
  // State Initialization
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  

  // Input Change Handlers
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleCompanyNameChange = (e) => setCompanyName(e.target.value);
  const handleMobileNumberChange = (e) => setMobileNumber(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  // Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      firstName,
      email,
      companyName,
      mobileNumber,
      message,
    });

    // Example: Uncomment the following lines to send data to a server using Axios
    const data = {
      firstName,
      email,
      companyName,
      mobileNumber,
      message,
    };
    axios.post('/api/formEndpoint', data)
      .then(response => {
        setSent(true);
        alert("Form submitted successfully!");
        // console.log("Server response:", response.data);
        
      })
      .catch(error => {
        console.error("Error submitting form:", error);
      });

    // Reset the form after submission
    resetForm();
  };

  // Form Reset Handler
  const resetForm = () => {
    setFirstName("");
    setEmail("");
    setCompanyName("");
    setMobileNumber("");
    setMessage("");
    setTimeout(() => {
      setSent(false);
    }, 30000);
  };
  const download =(e)=>{
 e.preventDefault()
 axios({
  url:"http://localhost:3004",

  method:"GET",
  responseType:"blob"

 }).then((res)=>{
  FileDownload(res.data,"downloaded.jpg")
 })
  }
 
  

  // Render Method
  return (
    <div>
      <div className="contact-container">
        <div className="contact-form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="contactHead">
                <h1>Contact Us Form:</h1>
                <p>(Tell us a bit about yourself, and we'll get in touch as soon as we can.)</p>
              </div>
              <label htmlFor="firstName">Full Name:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                placeholder="Write Your Full Name"
                onChange={handleFirstNameChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Enter Your Email Address"
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="companyName">Company Name:</label>
              <input
                type="text"
                id="CompanyName"
                value={companyName}
                placeholder="Your Company Name"
                onChange={handleCompanyNameChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number:</label>
              <input
                type="tel"
                id="mobileNumber"
                value={mobileNumber}
                placeholder="Your Mobile Number"
                onChange={handleMobileNumberChange}
                maxLength={15}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                value={message}
                rows={12}
                placeholder="Write Your Message Here"
                onChange={handleMessageChange}
                required
              />
            </div>
            <div className={sent ? 'msg msgAppear' : 'msg'}>Thanks for Your Message !</div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="map-and-contact">
          <div className="contact-info">
            <h1>Contact Us:</h1>
            <br />
            <h2>It Infra Solutions</h2>
            {/* ... (omitting the contact-info JSX for brevity) ... */}
        </div>
        </div>
      </div>
      <button onClick={(e)=>download(e)}>Download</button>
    </div>
    
  );
};

export default ContactUsForm;
