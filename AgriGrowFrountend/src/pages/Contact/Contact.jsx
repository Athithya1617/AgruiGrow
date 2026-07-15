import { useState } from 'react';
import { Mail, Send, ChevronDown, CheckCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const faqs = [
    { q: 'Is my diary and economics log data stored safely?', a: 'Yes. All calculations, budget journals, and daily logs are stored locally in your browser’s localStorage. No farm data is uploaded to remote servers, securing your privacy.' },
    { q: 'How accurate are the fertilizer and seed calculators?', a: 'They are calibrated using standard scientific agricultural guidelines (NPK values per hectare for loamy soils). However, soil variances exist. Always cross-reference recommendations with local soil test results.' },
    { q: 'How do I request a soil laboratory analysis test?', a: 'Find nearby labs using our Local Services search page, call their phone helpline, or visit them to submit a dry soil core sample.' },
    { q: 'Can I use AgriGrow offline on my mobile device?', a: 'AgriGrow is designed with client-side calculators. Once loaded, the diaries, calculators, crop catalogs, and calendars will function offline without internet access.' }
  ];

  return (
    <div className="container main-content contact-page animate-fade-in">
      <header className="page-header mb-6">
        <h1 className="page-title"><Mail size={32} /> Help & FAQ Support</h1>
        <p className="page-subtitle">Submit feedback queries, check our help desk accordion files, or dial agricultural helplines directly.</p>
      </header>

      <div className="contact-layout-grid mb-6">
        {/* Left Form: Feedback */}
        <div className="contact-col">
          {submitted ? (
            <div className="card submitted-success-card text-center d-flex align-items-center justify-center py-6">
              <div>
                <CheckCircle className="text-green mb-4" size={48} />
                <h2>Message Sent Successfully!</h2>
                <p className="text-muted mt-2">Our support agronomists will review your query and reach out shortly.</p>
              </div>
            </div>
          ) : (
            <form className="card contact-form" onSubmit={handleSubmit}>
              <h3 className="card-title">Send Query Message</h3>
              <p className="db-card-subtitle text-muted mb-4">We answer agricultural and technical queries within 24 hours</p>

              <div className="form-group mb-4">
                <label className="form-label">Full Name</label>
                <input type="text" placeholder="Your name" className="input" required />
              </div>

              <div className="form-group mb-4">
                <label className="form-label">Email Address</label>
                <input type="email" placeholder="email@example.com" className="input" required />
              </div>

              <div className="form-group mb-4">
                <label className="form-label">Query category</label>
                <select className="select">
                  <option value="general">General Advisory Question</option>
                  <option value="bug">Technical Bug Report</option>
                  <option value="subsidy">Government Schemes Inquiries</option>
                  <option value="partnership">Cooperative/Partnership requests</option>
                </select>
              </div>

              <div className="form-group mb-6">
                <label className="form-label">Message Details</label>
                <textarea rows="4" placeholder="Detail your farming questions or feedback..." className="textarea" required />
              </div>

              <button type="submit" className="btn btn-primary w-full">
                <Send size={16} /> Submit Query
              </button>
            </form>
          )}
        </div>

        {/* Right Info: Accordion FAQ and Helplines */}
        <div className="contact-col">
          {/* Helplines Card */}
          <div className="card helplines-card mb-6">
            <h3 className="card-title">Agriculture Helplines</h3>
            <div className="helpline-items-list mt-4">
              <div className="helpline-row-item d-flex align-items-center gap-4">
                <span className="helpline-icon-wrap">📞</span>
                <div>
                  <span className="helpline-name block font-semibold">CREED Krishi Vigyan Kendra Helpline</span>
                  <span className="helpline-no block text-green font-bold">+91 9751280089</span>
                  <span className="helpline-loc block text-xs text-muted" style={{ marginTop: '2px', lineHeight: '1.3' }}>
                    4CP3+PWG, Unnamed Rd, Udayanatham West, Cholamadevi, Tamil Nadu 612902
                  </span>
                </div>
              </div>
              <div className="helpline-row-item d-flex align-items-center gap-4 mt-4">
                <span className="helpline-icon-wrap">📧</span>
                <div>
                  <span className="helpline-name block font-semibold">AgriGrow Support Email</span>
                  <span className="helpline-no block text-green font-bold">support@agrigrow.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Accordion FAQ Card */}
          <div className="card faq-accordion-card">
            <h3 className="card-title">Frequently Asked Questions</h3>
            <div className="faq-accordions-group mt-4">
              {faqs.map((faq, idx) => (
                <div 
                  className={`faq-acc-item ${activeFaq === idx ? 'expanded' : ''}`} 
                  key={idx}
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <div className="faq-acc-header d-flex justify-between align-items-center">
                    <span className="faq-question-txt font-semibold">{faq.q}</span>
                    <ChevronDown size={16} className="acc-arrow" />
                  </div>
                  {activeFaq === idx && (
                    <div className="faq-acc-body animate-fade-in">
                      <p className="faq-answer-txt text-sm text-muted">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
