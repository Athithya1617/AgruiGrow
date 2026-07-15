import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, HelpCircle, Key, Eye, EyeOff, Trash2, Check, AlertCircle } from 'lucide-react';
import './AIAssistant.css';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I am Vivasaayi AI, your digital farming assistant. How can I help you optimize your crop layouts, soil nutrients, irrigation schedules, or pest management today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  const [apiKey, setApiKey] = useState(() => {
    const envKey = import.meta.env?.VITE_GEMINI_API_KEY;
    if (envKey) return envKey;
    return localStorage.getItem('gemini_api_key') || '';
  });
  const [tempKeyInput, setTempKeyInput] = useState('');
  const [showKey, setShowKey] = useState(false);

  const faqPrompts = [
    { question: 'Explain natural pest sprays', answer: 'Organic options include a 1-2% Neem Oil spray mixed with warm water and a few drops of dish soap, or a garlic-chilli tea spray. These disrupt pest feeding and breeding patterns without damaging soil mycelium.' },
    { question: 'How to manage acidic soil?', answer: 'For highly acidic soils (pH < 5.5), apply agricultural lime (calcium carbonate) or wood ashes. Lime raises pH, enhancing phosphorus availability. Perform a soil test before applying to target an optimal pH of 6.0-7.0.' },
    { question: 'What is crop rotation?', answer: 'Crop rotation is the practice of planting different crops sequentially on the same plot. Rotating cereals (wheat, corn) with legumes (soybeans, peas) helps replenish nitrogen naturally and interrupts weed and pest cycles.' },
    { question: 'Best irrigation for tomatoes?', answer: 'Tomatoes benefit most from sub-surface drip irrigation. They need consistent watering (approx 2.5cm per week) without overhead spraying, which causes fungal leaf spot and early blight.' }
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const callGeminiAPI = async (text, history) => {
    try {
      const historyWithoutGreeting = history.filter(msg => msg.id !== 1);
      const formattedContents = historyWithoutGreeting.map(msg => ({
        role: msg.sender === 'bot' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      formattedContents.push({
        role: 'user',
        parts: [{ text }]
      });

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: formattedContents,
          systemInstruction: {
            parts: [{
              text: "You are Vivasaayi AI, a digital farming assistant for AgriGrow. Help the farmer with crop recommendations, soil nutrients (NPK), irrigation, pest management, and general agronomy advice. Keep answers practical, clear, and relevant to farming. You can speak in Tamil if requested by the user."
            }]
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const botResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!botResponseText) {
        throw new Error("No response text received from Gemini.");
      }

      return botResponseText;
    } catch (error) {
      console.error("Gemini API call failed:", error);
      throw error;
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { id: messages.length + 1, sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    if (apiKey) {
      try {
        const botResponse = await callGeminiAPI(text, [...messages, userMsg]);
        setMessages(prev => [...prev, { id: prev.length + 1, sender: 'bot', text: botResponse }]);
      } catch (error) {
        setMessages(prev => [...prev, { 
          id: prev.length + 1, 
          sender: 'bot', 
          text: `Error communicating with Gemini: ${error.message}. Please check your API Key or connection.` 
        }]);
      } finally {
        setIsTyping(false);
      }
    } else {
      // Look for matching answers or default
      setTimeout(() => {
        let responseText = "That is a great agronomy question! For specialized inquiries on soil profiles and crop variants, try checking our Crop Catalog or Fertilizer Manager. If you are describing an infection, take a photo and upload it in the Disease Diagnostic panel.";
        
        const matchedFaq = faqPrompts.find(faq => text.toLowerCase().includes(faq.question.toLowerCase()) || faq.question.toLowerCase().includes(text.toLowerCase()));
        if (matchedFaq) {
          responseText = matchedFaq.answer;
        } else if (text.toLowerCase().includes('fertilizer') || text.toLowerCase().includes('npk')) {
          responseText = 'Balanced chemical or organic NPK fertilization is crucial. Use our Fertilizer Manager to calculate precise rates in kilograms matching your specific soil classification.';
        } else if (text.toLowerCase().includes('weather') || text.toLowerCase().includes('rain')) {
          responseText = 'Current crop advisories suggest delaying sprays or chemical applications if heavy rain is forecasted. Check the Weather Center for real-time local UV and soil moistures.';
        }

        setMessages(prev => [...prev, { id: prev.length + 1, sender: 'bot', text: responseText }]);
        setIsTyping(false);
      }, 1000);
    }
  };

  return (
    <div className="container main-content ai-page animate-fade-in">
      <header className="page-header mb-6">
        <h1 className="page-title"><Bot size={32} /> Vivasaayi AI Assistant</h1>
        <p className="page-subtitle">Ask your digital farming helper for organic remedies, crop rotations, soil amendments, and irrigation tips.</p>
      </header>

      <div className="ai-chat-layout">
        {/* Left Column: FAQ templates and settings */}
        <div className="ai-sidebar">
          {/* Gemini Configuration Card */}
          <div className="card api-settings-card mb-4 animate-fade-in">
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Key size={18} className="text-green" /> Gemini Configuration
            </h3>
            {import.meta.env?.VITE_GEMINI_API_KEY ? (
              <div className="api-status-row success mb-2" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--green)' }}>
                <Check size={16} /> <span className="font-semibold text-sm">Active (.env Key)</span>
              </div>
            ) : apiKey ? (
              <div>
                <div className="api-status-row success mb-3" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--green)' }}>
                  <Check size={16} /> <span className="font-semibold text-sm">Active (Browser Storage)</span>
                </div>
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm w-full d-flex align-items-center justify-center gap-1"
                  onClick={() => {
                    localStorage.removeItem('gemini_api_key');
                    setApiKey('');
                    setTempKeyInput('');
                  }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                >
                  <Trash2 size={14} /> Remove API Key
                </button>
              </div>
            ) : (
              <div>
                <div className="api-status-row warning mb-3" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)' }}>
                  <AlertCircle size={16} /> <span className="font-semibold text-sm">Simulated Mode Active</span>
                </div>
                <p className="text-muted text-xs mb-3" style={{ fontSize: '12px', lineHeight: '1.4' }}>
                  Enter a Google Gemini API Key to enable real-time agricultural AI responses. You can get a free key from <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="text-green font-semibold underline" style={{ color: 'var(--primary)' }}>Google AI Studio</a>.
                </p>
                <div className="form-group mb-3" style={{ position: 'relative' }}>
                  <input 
                    type={showKey ? "text" : "password"} 
                    placeholder="Enter AI API Key..." 
                    className="input text-sm w-full"
                    style={{ paddingRight: '40px' }}
                    value={tempKeyInput}
                    onChange={(e) => setTempKeyInput(e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="absolute-right-btn"
                    onClick={() => setShowKey(!showKey)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      color: 'var(--text-muted)',
                      padding: '4px'
                    }}
                  >
                    {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <button 
                  type="button" 
                  className="btn btn-primary btn-sm w-full"
                  onClick={() => {
                    if (tempKeyInput.trim()) {
                      localStorage.setItem('gemini_api_key', tempKeyInput.trim());
                      setApiKey(tempKeyInput.trim());
                    }
                  }}
                >
                  Save API Key
                </button>
              </div>
            )}
          </div>

          <div className="card faq-sidebar-card">
            <h3 className="card-title"><HelpCircle size={18} className="text-green" /> Common Farming Queries</h3>
            <p className="db-card-subtitle text-muted mb-4">Click to query the AI assistant immediately:</p>
            <div className="faq-buttons-list">
              {faqPrompts.map((faq, idx) => (
                <button 
                  key={idx} 
                  className="btn btn-secondary faq-prompt-btn"
                  onClick={() => handleSendMessage(faq.question)}
                >
                  <span>{faq.question}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Chat Box */}
        <div className="ai-chat-pane">
          <div className="card chat-box-card">
            {/* Header info */}
            <div className="chat-box-header d-flex align-items-center gap-2 mb-4">
              <Bot size={20} className="text-green" />
              <span className="font-semibold text-sm">Vivasaayi AI Assistant</span>
              <span className="live-pulse"></span>
            </div>

            {/* Messages body */}
            <div className="chat-messages-body">
              {messages.map((msg) => (
                <div className={`chat-bubble-wrapper msg-${msg.sender}`} key={msg.id}>
                  <div className="chat-avatar-circle">
                    {msg.sender === 'bot' ? <Bot size={14} /> : <User size={14} />}
                  </div>
                  <div className="chat-bubble-content">
                    <p className="bubble-text">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="chat-bubble-wrapper msg-bot">
                  <div className="chat-avatar-circle">
                    <Bot size={14} />
                  </div>
                  <div className="chat-bubble-content bubble-typing">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef}></div>
            </div>

            {/* Input form */}
            <form 
              className="chat-input-row mt-4" 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
            >
              <input 
                type="text" 
                placeholder="Ask about fertilizer ratios, neem spray, soil pH..." 
                className="input chat-input-field"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit" className="btn btn-primary chat-send-btn">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIAssistant;
