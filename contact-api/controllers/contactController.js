import nodemailer from "nodemailer";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create transporter
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // HTML email template matching your webpage style
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
            /* Import fonts similar to your webpage */
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f8f9fa;
            }
            
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            }
            
            .email-header {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                padding: 40px 30px;
                text-align: center;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .brand-title {
                font-family: 'Playfair Display', serif;
                font-size: 32px;
                font-weight: 600;
                color: #ffffff;
                margin-bottom: 8px;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .brand-subtitle {
                font-size: 14px;
                color: rgba(255, 255, 255, 0.8);
                font-weight: 300;
                letter-spacing: 1px;
                text-transform: uppercase;
            }
            
            .email-content {
                background: #ffffff;
                padding: 40px 30px;
            }
            
            .submission-title {
                font-family: 'Playfair Display', serif;
                font-size: 24px;
                font-weight: 600;
                color: #2d3748;
                margin-bottom: 8px;
            }
            
            .submission-subtitle {
                font-size: 14px;
                color: #718096;
                margin-bottom: 30px;
                font-weight: 400;
            }
            
            .contact-details {
                background: #f7fafc;
                border-radius: 12px;
                padding: 25px;
                margin-bottom: 25px;
                border-left: 4px solid #667eea;
            }
            
            .detail-item {
                display: flex;
                margin-bottom: 15px;
                align-items: flex-start;
            }
            
            .detail-item:last-child {
                margin-bottom: 0;
            }
            
            .detail-label {
                font-weight: 600;
                color: #4a5568;
                min-width: 80px;
                font-size: 14px;
                margin-right: 15px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .detail-value {
                color: #2d3748;
                font-weight: 400;
                word-break: break-word;
                flex: 1;
            }
            
            .message-section {
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 20px;
                margin-top: 20px;
            }
            
            .message-label {
                font-weight: 600;
                color: #4a5568;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 10px;
                display: block;
            }
            
            .message-content {
                color: #2d3748;
                line-height: 1.7;
                white-space: pre-wrap;
                font-size: 15px;
            }
            
            .email-footer {
                background: #2d3748;
                padding: 30px;
                text-align: center;
                color: #a0aec0;
            }
            
            .footer-text {
                font-size: 13px;
                line-height: 1.5;
                margin-bottom: 15px;
            }
            
            .footer-brand {
                font-family: 'Playfair Display', serif;
                font-size: 18px;
                font-weight: 500;
                color: #ffffff;
                margin-bottom: 5px;
            }
            
            .divider {
                height: 1px;
                background: linear-gradient(to right, transparent, #e2e8f0, transparent);
                margin: 25px 0;
            }
            
            /* Responsive styles */
            @media only screen and (max-width: 600px) {
                .email-container {
                    margin: 10px;
                    border-radius: 12px;
                }
                
                .email-header {
                    padding: 30px 20px;
                }
                
                .brand-title {
                    font-size: 28px;
                }
                
                .email-content {
                    padding: 30px 20px;
                }
                
                .contact-details {
                    padding: 20px;
                }
                
                .detail-item {
                    flex-direction: column;
                    align-items: flex-start;
                }
                
                .detail-label {
                    margin-bottom: 5px;
                    margin-right: 0;
                }
                
                .email-footer {
                    padding: 25px 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <!-- Header Section -->
            <div class="email-header">
                <h1 class="brand-title">Avani & Dvara</h1>
                <p class="brand-subtitle">The Company</p>
            </div>
            
            <!-- Content Section -->
            <div class="email-content">
                <h2 class="submission-title">New Contact Form Submission</h2>
                <p class="submission-subtitle">You have received a new inquiry through your website</p>
                
                <div class="contact-details">
                    <div class="detail-item">
                        <span class="detail-label">Name:</span>
                        <span class="detail-value">${name}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Email:</span>
                        <span class="detail-value">
                            <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
                        </span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Phone:</span>
                        <span class="detail-value">
                            <a href="tel:${phone}" style="color: #667eea; text-decoration: none;">${phone}</a>
                        </span>
                    </div>
                </div>
                
                <div class="divider"></div>
                
                <div class="message-section">
                    <span class="message-label">Message:</span>
                    <div class="message-content">${message}</div>
                </div>
            </div>
            
            <!-- Footer Section -->
            <div class="email-footer">
                <div class="footer-brand">Avani & Dvara</div>
                <p class="footer-text">
                    This email was sent from your website contact form.<br>
                    Please respond directly to the customer's email address above.
                </p>
            </div>
        </div>
    </body>
    </html>
    `;

    // Email options with both HTML and text versions
    let mailOptions = {
      from: `"Avani & Dvara Contact Form" <${process.env.EMAIL_USER}>`, 
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      html: htmlTemplate,
      text: `
        NEW CONTACT FORM SUBMISSION
        ===========================

        You have a new contact form submission from your website:

        Name: ${name}
        Email: ${email}
        Phone: ${phone}

        Message:
        ${message}

        ---
        This email was sent from your Avani & Dvara website contact form.
        Please respond directly to the customer's email address: ${email}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Contact form sent successfully" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};