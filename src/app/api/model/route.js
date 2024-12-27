// src/app/api/model/route.js
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  const modelPath = path.join(process.cwd(), 'public', 'gesture_recognition_model', 'model.json');
  const modelData = fs.readFileSync(modelPath, 'utf8');

  return new NextResponse(modelData, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}