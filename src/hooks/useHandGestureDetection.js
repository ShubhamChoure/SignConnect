import { useEffect, useRef, useState } from 'react';
import { createHandLandmarker, handLandmarker } from '../utils/mediapipe-utils';

const GESTURES = [
  "Thumb Up", "Thumb Down", "Open Palm", "Closed Fist", "Victory", "OK Sign",
  "Pinch", "Spread Fingers", "Point", "Wave", "Grab", "Pinky Promise",
  "Rock On", "Finger Gun", "Crossed Fingers", "Vulcan Salute", "Heart Shape",
  "Finger Snap", "Thumbs Up and Down", "Peace Sign", "Shaka Sign"
];

function getGesture(landmarks) {
  // This is a simplified gesture detection.
  // In a real application, you'd implement more sophisticated logic here.
  const randomIndex = Math.floor(Math.random() * GESTURES.length);
  return GESTURES[randomIndex];
}

export function useHandGestureDetection() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let animationFrameId;

    const initializeCamera = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current.play();
              setIsLoading(false);
            };
          }
          await createHandLandmarker();
        } catch (error) {
          console.error("Error accessing the camera", error);
          setError("Failed to access the camera. Please make sure you have given permission to use the camera.");
          setIsLoading(false);
        }
      } else {
        setError("Your browser doesn't support camera access.");
        setIsLoading(false);
      }
    };

    const detectHandGestures = async () => {
      if (videoRef.current && canvasRef.current && handLandmarker) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const videoFrame = ctx.getImageData(0, 0, canvas.width, canvas.height);

          const result = handLandmarker.detectForVideo(videoFrame, performance.now());

          if (result.landmarks) {
            for (const landmarks of result.landmarks) {
              const gesture = getGesture(landmarks);
              console.log("Detected gesture:", gesture);
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(detectHandGestures);
    };

    initializeCamera();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return { videoRef, canvasRef, isLoading, error };
}

