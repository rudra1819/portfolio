# Certificate Feature Setup Guide (Hindi/Hinglish)

## Kya Kya Banaya Gaya Hai?

✅ **Certificate Detail Page** - Jab koi certificate click karega, to ek separate page khulega
✅ **Download Feature** - Certificate download karne ki facility
✅ **Routing** - React Router se proper navigation
✅ **Responsive Design** - Mobile aur desktop dono par kaam karega

## Kaise Kaam Karta Hai?

### 1. Certificate Card Click Karo
- Certifications section mein jo certificates dikh rahe hain, un par click karo
- Click karne se certificate detail page khul jayega

### 2. Certificate Detail Page
- Yahan certificate ki full details dikhengi
- Certificate image dikhegi
- Download button se certificate download ho sakta hai

### 3. Download Feature
- "Download Certificate" button par click karo
- Certificate automatically download ho jayega

## Apne Certificates Add Kaise Kare?

### Step 1: Certificate Images Add Karo
1. Apne certificate ki photo/scan karo
2. `public/certificates/` folder mein jao
3. Images ko yeh names se save karo:
   - `generative-ai-certificate.jpg` (Microsoft & LinkedIn certificate ke liye)
   - `discrete-math-certificate.jpg` (Discrete Mathematics ke liye)
   - `math-2-3-certificate.jpg` (Mathematics 2 & 3 ke liye)
   - `internship-certificate.jpg` (Internship certificate ke liye)

### Step 2: PDF Files Add Karo (Optional)
- Agar aap chahte ho ki log PDF download kar sake, to PDF files bhi add kar sakte ho
- Same names rakho, bas extension `.pdf` hona chahiye

### Step 3: File Format
- Images: JPG, PNG (JPG recommended)
- PDFs: PDF format
- File size: Images 1-2 MB, PDFs 5 MB tak

## Example URLs

Jab aap certificate add kar doge, to URLs yeh hongi:
- Certificate 1: `http://localhost:5173/certificate/1`
- Certificate 2: `http://localhost:5173/certificate/2`
- Certificate 3: `http://localhost:5173/certificate/3`
- Certificate 4: `http://localhost:5173/certificate/4`

## Testing

1. Development server start karo: `npm run dev`
2. Browser mein `http://localhost:5173` kholo
3. Certifications section mein jao
4. Kisi bhi certificate card par click karo
5. Certificate detail page khul jayega
6. Download button test karo

## Important Notes

- Agar image nahi milti hai, to automatically placeholder image show hogi
- Aap baad mein bhi images add kar sakte ho - bas file ko `public/certificates/` folder mein copy karo
- Certificate detail page par sidebar nahi dikhega (full page view ke liye)
- Mobile par bhi sab theek se kaam karega

## Future Improvements (Agar Chaho To)

- Certificate verification link add kar sakte ho
- Certificate sharing feature
- Print certificate option
- Certificate expiry date (agar applicable ho)

