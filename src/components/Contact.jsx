import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // EmailJS Configuration - Yeh values aapko EmailJS dashboard se milengi
  // Option 1: Environment variables use karo (recommended)
  // .env file mein yeh add karo:
  // VITE_EMAILJS_SERVICE_ID=your_service_id
  // VITE_EMAILJS_TEMPLATE_ID=your_template_id
  // VITE_EMAILJS_PUBLIC_KEY=your_public_key
  
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
  
  // Option 2: Direct values yahan add kar sakte ho (agar .env use nahi karna)
  // const SERVICE_ID = 'service_xxxxxxxxx';
  // const TEMPLATE_ID = 'template_xxxxxxxxx';
  // const PUBLIC_KEY = 'xxxxxxxxxxxxxxxxxxxx';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear status when user starts typing
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS se email send karo
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'Goswamirudra825@gmail.com', // Aapka email jahan message aana chahiye
        },
        PUBLIC_KEY
      );

      console.log('Email sent successfully!', result);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Success message 5 seconds baad hide ho jayega
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      
      // Error message 5 seconds baad hide ho jayega
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>
              I'm always open to discussing new projects, creative ideas, or opportunities
              to be part of your visions. Feel free to reach out!
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <h4>Email</h4>
                  <a href="https://mail.google.com/mail/?view=cm&to=Goswamirudra825@gmail.com" target="_blank" rel="noopener noreferrer">Goswamirudra825@gmail.com</a>
                </div>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <div>
                  <h4>Phone</h4>
                  <a href="tel:+917880243673">+91 7880243673</a>
                </div>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <h4>Location</h4>
                  <p>12/A Choice Palace, Near Gopur Chauraha<br />Indore, M.P. 452012</p>
                </div>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            {submitStatus === 'success' && (
              <div className="form-message success">
                ✅ Thank you! Your message has been sent successfully. I'll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="form-message error">
                ❌ Sorry, there was an error sending your message. Please try again or contact me directly at Goswamirudra825@gmail.com
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

