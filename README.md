# 🎥 Live Object Detection Webcam App

**Real-time object detection directly in your browser using TensorFlow.js and the COCO-SSD model**

🚀 **Live Demo:**  
👉 https://live-object-detection-system.vercel.app/

A modern, fully client-side web application that uses your webcam to detect **80+ common object classes in real time**, complete with bounding boxes, confidence scores, FPS counter, and a live list of detected objects.

Built using **HTML, CSS, JavaScript, and TensorFlow.js**

---

## ✨ Features

- Real-time object detection using your webcam
- COCO-SSD pre-trained model (80+ object classes)
- Bounding boxes with class labels and confidence percentage
- Live FPS (Frames Per Second) monitoring
- Dynamic list of detected objects with counts
- Clean, modern, responsive UI with gradient styling
- Start / Stop camera controls with proper status handling
- Graceful handling of camera permissions
- Smooth detection loop using `requestAnimationFrame`
- Fully client-side — runs entirely in the browser

---

## 🚀 Tech Stack

- **TensorFlow.js** — Machine learning in the browser
- **COCO-SSD** — Pre-trained object detection model
- **HTML5 Canvas** — Drawing bounding boxes
- **JavaScript (ES6+)** — Detection logic and animation loop
- **CSS** — Custom modern styling (Tailwind-inspired)
- **MediaDevices API** — Webcam access

---

## 🛠️ How to Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Vedantrajhans/Live-Object-Detection-System.git
cd Live-Object-Detection-System
2️⃣ Run using a local server (recommended)

Option 1: VS Code Live Server
Install Live Server extension

Right-click index.html

Click Open with Live Server

Option 2: Using Node.js

npx serve .

Option 3: Using Python

python -m http.server 8000

Open in browser:
http://localhost:8000

⚠️ Note: Webcam access may require HTTPS. Local servers or platforms like Vercel / Netlify are recommended.

📂 Project Structure
csharp
Copy code
live-object-detection/
├── index.html        # Main UI and layout
├── script.js         # Detection logic & TensorFlow model handling
├── style.css         # Modern responsive styling
└── README.md         # Project documentation
⚡ Performance Notes
Best performance on desktop Chrome / Edge

Mobile devices may run slower due to hardware limits

Model is cached after first load (works offline afterward)

Typical FPS: 15–35 FPS on modern laptops

🌟 Future Enhancements
Confidence threshold slider

Support for custom models (Teachable Machine)

Snapshot capture of detections

Voice alerts for detected objects

Full-screen mobile mode

Dark mode toggle

👨‍💻 About Me
I'm Vedant Rajhans, a Full-Stack Web Developer and B.Tech CSE student passionate about building fast, scalable, and intelligent web applications.

🔧 Tech I Work With
React, Next.js

Node.js, Express

MongoDB, MySQL

Tailwind CSS

AI & ML integration in web apps

I enjoy experimenting with AI-powered systems, automation, and real-time applications while continuously improving through hands-on projects and hackathons.

📬 Connect With Me
GitHub: https://github.com/Vedantrajhans

LinkedIn: https://www.linkedin.com/in/vedant-rajhans-0218682b8/

Email: vedant.rajhans23@gmail.com

⭐ If you like this project, don’t forget to give it a star!
Happy detecting 🚀
```
