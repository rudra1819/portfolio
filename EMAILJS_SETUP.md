# EmailJS Setup Guide (Hindi/Hinglish)

## Kya Kya Kiya Gaya Hai?

✅ EmailJS package install kar diya
✅ Contact form ko EmailJS se connect kar diya
✅ Success/Error messages add kiye
✅ Loading state add kiya

## Ab Kya Karna Hai?

### Step 1: EmailJS Account Banao

1. **EmailJS Website par jao:**
   - https://www.emailjs.com/ par jao
   - "Sign Up" button par click karo
   - Free account banao (200 emails/month free)

2. **Account Verify Karo:**
   - Email verification karo
   - Account setup complete karo

### Step 2: Email Service Add Karo

1. **EmailJS Dashboard mein jao:**
   - Login karo
   - "Email Services" section mein jao
   - "Add New Service" button par click karo

2. **Gmail Service Add Karo:**
   - "Gmail" select karo
   - "Connect Account" par click karo
   - Apna Gmail account connect karo (Goswamirudra825@gmail.com)
   - Service ID copy karo (yeh `YOUR_SERVICE_ID` ki jagah use hoga)

### Step 3: Email Template Banao

1. **Templates Section mein jao:**
   - "Email Templates" section mein jao
   - "Create New Template" par click karo

2. **Template Setup Karo:**
   - Template Name: "Portfolio Contact Form"
   - Subject: "New Message from Portfolio - {{from_name}}"
   - Content:
   ```
   You have received a new message from your portfolio website.
   
   Name: {{from_name}}
   Email: {{from_email}}
   
   Message:
   {{message}}
   
   ---
   This message was sent from your portfolio contact form.
   ```
   - Template ID copy karo (yeh `YOUR_TEMPLATE_ID` ki jagah use hoga)

### Step 4: Public Key Copy Karo

1. **Account Settings mein jao:**
   - "Account" section mein jao
   - "General" tab mein jao
   - "Public Key" copy karo (yeh `YOUR_PUBLIC_KEY` ki jagah use hoga)

### Step 5: Code Mein Values Add Karo

1. **Contact.jsx file kholo:**
   - `src/components/Contact.jsx` file kholo
   - Line 13-15 par yeh values update karo:

```javascript
const SERVICE_ID = 'service_xxxxxxxxx'; // Apna Service ID yahan paste karo
const TEMPLATE_ID = 'template_xxxxxxxxx'; // Apna Template ID yahan paste karo
const PUBLIC_KEY = 'xxxxxxxxxxxxxxxxxxxx'; // Apna Public Key yahan paste karo
```

### Step 6: Test Karo

1. **Development Server Start Karo:**
   ```bash
   npm run dev
   ```

2. **Form Test Karo:**
   - Browser mein portfolio kholo
   - Contact section mein jao
   - Form fill karo
   - "Send Message" button par click karo
   - Apne Gmail inbox mein check karo - message aana chahiye!

## Important Notes

- **Free Plan:** 200 emails/month free hain
- **Security:** Public Key safe hai, frontend mein use kar sakte ho
- **Rate Limiting:** Zyada requests se rate limit hit ho sakti hai
- **Email Format:** Template mein jo format set kiya hai, wahi email mein dikhega

## Troubleshooting

### Agar Email Nahi Aa Raha:

1. **Console Check Karo:**
   - Browser console (F12) mein errors check karo
   - Koi error dikh raha hai?

2. **EmailJS Dashboard Check Karo:**
   - "Logs" section mein check karo
   - Koi failed request dikh raha hai?

3. **Values Verify Karo:**
   - SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY sahi hain?
   - Copy-paste mein koi space to nahi aa gaya?

4. **Gmail Account Check Karo:**
   - Spam folder check karo
   - EmailJS se emails allow kiye hain?

## Alternative: Agar EmailJS Setup Nahi Karna Chahte

Agar EmailJS setup nahi karna chahte, to main Formspree ya koi aur service bhi setup kar sakta hoon. Batao!

## Support

Agar koi problem aaye to:
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com

