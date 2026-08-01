import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Contact.css';

const CONTACT_EMAIL = 'Goswamirudra825@gmail.com';

// Set these in .env to send through EmailJS (see EMAILJS_SETUP.md).
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// All three are required. Previously these fell back to 'YOUR_SERVICE_ID'
// placeholders, which meant an unconfigured form still fired a request that could
// only ever fail - so every visitor got an error and their message was lost.
const isEmailJsConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

// Fallback path: hand the message to the visitor's own mail client with
// everything pre-filled, so it still reaches the inbox when EmailJS is not set up
// or is failing.
const buildMailtoUrl = ({ name, email, message }) => {
  const subject = `Portfolio enquiry from ${name || 'a visitor'}`;
  const body = `${message}\n\n---\nFrom: ${name} <${email}>`;

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const Contact = () => {
  const [revealRef, isRevealed] = useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [mailtoUrl, setMailtoUrl] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear status when user starts typing
    if (submitStatus) setSubmitStatus(null);
  };

  // Opens the visitor's mail client with the message pre-filled, and keeps the URL
  // so the UI can show a link too - the automatic open is sometimes blocked, and a
  // silently dropped message would be the worst outcome here.
  const fallBackToMailClient = () => {
    const url = buildMailtoUrl(formData);
    setMailtoUrl(url);
    setSubmitStatus('fallback');
    window.location.href = url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setMailtoUrl(null);

    // Nothing to send through, so go straight to the mail client rather than
    // firing a request that cannot succeed.
    if (!isEmailJsConfigured) {
      fallBackToMailClient();
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: CONTACT_EMAIL,
        },
        PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 6000);
    } catch (error) {
      // A rejected send should not lose the message either.
      console.error('[contact] EmailJS send failed, falling back to mail client:', error);
      fallBackToMailClient();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div
          ref={revealRef}
          className={`contact-content reveal-stagger ${isRevealed ? 'is-revealed' : ''}`}
        >
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
              <div className="form-message success" role="status">
                ✅ Thank you! Your message has been sent successfully. I&apos;ll get back to you soon.
              </div>
            )}

            {submitStatus === 'fallback' && (
              <div className="form-message info" role="status">
                📨 Opening your email app with the message ready to send. If nothing
                opened,{' '}
                <a href={mailtoUrl}>click here</a> or email me directly at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

