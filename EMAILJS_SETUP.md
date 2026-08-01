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
   - Template ID copy karo (isko `VITE_EMAILJS_TEMPLATE_ID` mein daalna hai)

3. **⚠️ SABSE ZAROORI - "To Email" field set karo:**
   - Template ke **Settings** tab mein jao
   - **"To Email"** field mein yeh likho: `{{to_email}}`
   - Ya seedha apna email likh do: `Goswamirudra825@gmail.com`
   - **Agar yeh field khaali hai to EmailJS request accept kar lega par email
     kabhi nahi aayega** - email na aane ka sabse common reason yahi hai.
   - Code `to_email` param bhejta hai, isliye `{{to_email}}` best hai.

### Step 4: Public Key Copy Karo

1. **Account Settings mein jao:**
   - "Account" section mein jao
   - "General" tab mein jao
   - "Public Key" copy karo (yeh `YOUR_PUBLIC_KEY` ki jagah use hoga)

### Step 5: Keys ko .env Mein Add Karo

**Contact.jsx mein kuch bhi paste nahi karna hai** - component ab environment
variables se values padhta hai. Keys code mein likhne se wo git mein chali jaati
hain.

1. **Project root mein `.env` file banao** (`.env.example` copy kar lo):

```bash
cp .env.example .env
```

2. **`.env` mein teen values bharo:**

```
VITE_EMAILJS_SERVICE_ID=service_xxxxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
```

`.env` gitignored hai, to yeh commit nahi hogi.

3. **Teeno khaali nahi honi chahiye.** Ek bhi missing ho to form EmailJS use nahi
   karega - wo visitor ka mail app khol dega (message tab bhi milega, bas in-page
   send nahi hoga). Browser console mein exact missing variable ka naam dikhega.

### Step 5b: Vercel Mein Bhi Add Karo (Production Ke Liye)

Yeh step chhodne se **local par kaam karega par live site par nahi**.

1. Vercel dashboard → apna project → **Settings** → **Environment Variables**
2. Teeno variables add karo (Production, Preview, Development - sab select karo)
3. **Redeploy karo** - Vite in values ko build time par bundle mein daalta hai,
   isliye variable badalne ke baad naya deploy zaroori hai

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
   - `.env` mein teeno variables bhare hain? (aur Vercel mein bhi?)
   - Copy-paste mein koi space ya quote to nahi aa gaya?
   - `.env` badalne ke baad dev server restart kiya? (Vite restart par padhta hai)
   - Console mein `[contact] Not sending through EmailJS` warning aa rahi hai? Wo
     batayegi kaun si value missing hai.

4. **Template ka "To Email" field check karo:**
   - Settings tab mein `{{to_email}}` set hai? Yahi sabse common galti hai -
     EmailJS 200 OK deta hai par email kahin nahi jaata.

4. **Gmail Account Check Karo:**
   - Spam folder check karo
   - EmailJS se emails allow kiye hain?

## Alternative: Agar EmailJS Setup Nahi Karna Chahte

Agar EmailJS setup nahi karna chahte, to main Formspree ya koi aur service bhi setup kar sakta hoon. Batao!

## Support

Agar koi problem aaye to:
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com

