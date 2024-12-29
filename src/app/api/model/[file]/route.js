import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

// This function handles the GET request
export async function GET(request, { params }) {
  // Ensure params is awaited before using it
  const { file } = await params;  // await the params to ensure async resolution

  // Define the directory where model files are stored
  const modelDir = path.join(process.cwd(), 'public', 'gesture_recognition_model');
  const filePath = path.join(modelDir, file);

  // Check if the requested file exists in the model directory
  if (!fs.existsSync(filePath)) {
    return new NextResponse('File not found', { status: 404 });
  }

  // Read the file content synchronously
  const fileContent = fs.readFileSync(filePath);

  // Determine the correct content type based on the file extension
  const contentType = file.endsWith('.json') ? 'application/json' : 'application/octet-stream';

  // Return the file content with the appropriate content type
  return new NextResponse(fileContent, {
    status: 200,
    headers: {
      'Content-Type': contentType,
    },
  });
}

