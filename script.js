// Global variables
let model = null;
let video = null;
let canvas = null;
let ctx = null;
let isDetecting = false;
let stream = null;

// FPS calculation
let lastFrameTime = Date.now();
let frameCount = 0;
let fps = 0;

// DOM elements
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const statusDiv = document.getElementById("status");
const fpsDisplay = document.getElementById("fps");
const objectCountDisplay = document.getElementById("objectCount");
const objectList = document.getElementById("objectList");

// Initialize on page load
window.addEventListener("load", async () => {
  video = document.getElementById("webcam");
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  // Set up event listeners
  startBtn.addEventListener("click", startDetection);
  stopBtn.addEventListener("click", stopDetection);

  // Load the model
  await loadModel();
});

// Load COCO-SSD model
async function loadModel() {
  try {
    updateStatus("Loading AI model...", "loading");
    model = await cocoSsd.load();
    updateStatus('Model loaded! Click "Start Camera" to begin', "ready");
    console.log("COCO-SSD model loaded successfully");
  } catch (error) {
    console.error("Error loading model:", error);
    updateStatus("Error loading model. Please refresh the page.", "error");
  }
}

// Start camera and detection
async function startDetection() {
  if (!model) {
    alert("Model is still loading. Please wait...");
    return;
  }

  try {
    updateStatus("Starting camera...", "loading");

    // Request camera access
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
      audio: false,
    });

    video.srcObject = stream;

    // Wait for video to be ready
    await new Promise((resolve) => {
      video.onloadedmetadata = () => {
        resolve();
      };
    });

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Update UI
    startBtn.disabled = true;
    stopBtn.disabled = false;
    updateStatus("Detecting objects...", "ready");

    // Start detection loop
    isDetecting = true;
    detectFrame();
  } catch (error) {
    console.error("Error accessing camera:", error);
    updateStatus("Camera access denied or not available", "error");
  }
}

// Stop detection
function stopDetection() {
  isDetecting = false;

  // Stop video stream
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
  }

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Reset UI
  startBtn.disabled = false;
  stopBtn.disabled = true;
  updateStatus('Camera stopped. Click "Start Camera" to resume', "");
  objectList.innerHTML = "";
  objectCountDisplay.textContent = "Objects: 0";
  fpsDisplay.textContent = "FPS: 0";
}

// Main detection loop
async function detectFrame() {
  if (!isDetecting) return;

  try {
    // Perform object detection
    const predictions = await model.detect(video);

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw predictions
    drawPredictions(predictions);

    // Update object list
    updateObjectList(predictions);

    // Update stats
    objectCountDisplay.textContent = `Objects: ${predictions.length}`;
    updateFPS();
  } catch (error) {
    console.error("Detection error:", error);
  }

  // Continue detection loop
  requestAnimationFrame(detectFrame);
}

// Draw bounding boxes and labels
function drawPredictions(predictions) {
  predictions.forEach((prediction) => {
    const [x, y, width, height] = prediction.bbox;

    // Draw bounding box
    ctx.strokeStyle = "#00ff00";
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, width, height);

    // Draw label background
    const label = `${prediction.class} (${Math.round(
      prediction.score * 100
    )}%)`;
    ctx.font = "18px Arial";
    const textWidth = ctx.measureText(label).width;

    ctx.fillStyle = "#00ff00";
    ctx.fillRect(x, y - 30, textWidth + 10, 30);

    // Draw label text
    ctx.fillStyle = "#000000";
    ctx.fillText(label, x + 5, y - 10);
  });
}

// Update detected objects list
function updateObjectList(predictions) {
  // Count objects by class
  const objectCounts = {};
  predictions.forEach((pred) => {
    const className = pred.class;
    if (objectCounts[className]) {
      objectCounts[className].count++;
      objectCounts[className].confidence = Math.max(
        objectCounts[className].confidence,
        pred.score
      );
    } else {
      objectCounts[className] = {
        count: 1,
        confidence: pred.score,
      };
    }
  });

  // Generate HTML
  objectList.innerHTML = "";
  Object.entries(objectCounts).forEach(([className, data]) => {
    const tag = document.createElement("div");
    tag.className = "object-tag";
    tag.innerHTML = `
            <span class="object-name">${className}</span>
            <span class="object-confidence">
                Count: ${data.count} | ${Math.round(data.confidence * 100)}%
            </span>
        `;
    objectList.appendChild(tag);
  });
}

// Calculate and update FPS
function updateFPS() {
  frameCount++;
  const currentTime = Date.now();
  const elapsed = currentTime - lastFrameTime;

  if (elapsed >= 1000) {
    fps = Math.round((frameCount * 1000) / elapsed);
    fpsDisplay.textContent = `FPS: ${fps}`;
    frameCount = 0;
    lastFrameTime = currentTime;
  }
}

// Update status message
function updateStatus(message, className = "") {
  statusDiv.textContent = message;
  statusDiv.className = `status ${className}`;
}

// Handle page visibility (pause when tab is hidden)
document.addEventListener("visibilitychange", () => {
  if (document.hidden && isDetecting) {
    // Optionally pause detection when tab is hidden
    console.log("Tab hidden - detection continues");
  }
});
