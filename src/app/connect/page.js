'use client';

import { useEffect, useRef, useState } from 'react';
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import * as tf from '@tensorflow/tfjs';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { HAND_CONNECTIONS } from '@mediapipe/hands';

export default function ConnectPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [prediction, setPrediction] = useState('None');
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [handLandmarker, setHandLandmarker] = useState(null);
  const [gestureModel, setGestureModel] = useState(null);
  const [labelEncoder, setLabelEncoder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModels = async () => {
      try {
        // Load HandLandmarker Model from MediaPipe
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );

        const handLandmarkerInstance = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task", 
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 2
        });
        
        // Set the handLandmarker instance
        setHandLandmarker(handLandmarkerInstance);

        // Load Gesture Recognition Model (TensorFlow.js)
        const model = await tf.loadLayersModel('/api/model/model.json');
        setGestureModel(model);
        
        // Initialize Label Encoder
        setLabelEncoder([
          'A', 'B', 'C', 'D', 'DEL', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'NOTHING', 'O', 'P', 'Q', 'R', 'S', 'SPACE', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ]);

        setLoading(false);
      } catch (error) {
        console.error('Error loading models:', error);
        setLoading(false);
      }
    };

    loadModels();
  }, []);

  const enableWebcam = async () => {
    if (webcamRunning) {
      setWebcamRunning(false);
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    } else {
      const constraints = { video: true };
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener('loadeddata', predictWebcam);
        setWebcamRunning(true);
      } catch (err) {
        console.error("Error accessing the webcam:", err);
      }
    }
  };

  let lastVideoTime = -1;

  const predictWebcam = () => {
    if (!videoRef.current || !canvasRef.current || !handLandmarker || !gestureModel) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const startTimeMs = performance.now();
    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime;
      const results = handLandmarker.detectForVideo(video, startTimeMs);

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (results.landmarks) {
        for (const landmarks of results.landmarks) {
          // Draw the landmarks and connectors
          drawConnectors(ctx, landmarks, HAND_CONNECTIONS, { color: "#00FF00", lineWidth: 5 });
          drawLandmarks(ctx, landmarks, { color: "#FF0000", lineWidth: 2 });

          // Extract hand features for gesture prediction
          const handFeatures = extractHandFeatures(landmarks);
          const inputTensor = tf.tensor([handFeatures]);

          // Predict gesture
          const prediction = gestureModel.predict(inputTensor);
          const predictedGestureIndex = prediction.argMax(-1).dataSync()[0];
          const predictedGesture = labelEncoder[predictedGestureIndex] || 'Unknown';

          setPrediction(predictedGesture);
        }
      }

      ctx.restore();
    }

    if (webcamRunning) {
      window.requestAnimationFrame(predictWebcam);
    }
  };

  const extractHandFeatures = (landmarks) => {
    return landmarks.flatMap(landmark => [landmark.x, landmark.y, landmark.z]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Hand Gesture Recognition</h1>
      <div className="flex flex-col items-center">
        <button
          onClick={enableWebcam}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          {webcamRunning ? 'Disable Webcam' : 'Enable Webcam'}
        </button>
        <div className="relative">
          <video
            ref={videoRef}
            className="rounded-lg shadow-lg"
            autoPlay
            playsInline
            style={{ width: '640px', height: '480px' }}
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 rounded-lg"
            style={{ width: '640px', height: '480px' }}
          />
        </div>
        {loading ? (
          <div className="text-center text-lg text-blue-600">Loading models...</div>
        ) : (
          <div className="mt-4 text-xl font-semibold text-blue-600">
            Prediction: {prediction}
          </div>
        )}
      </div>
    </div>
  );
}

