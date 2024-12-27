'use client'

import { useHandGestureDetection } from '@/hooks/useHandGestureDetection'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function HandGestureDetection() {
  const { videoRef, canvasRef, isLoading, error } = useHandGestureDetection()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Hand Gesture Detection</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="w-full aspect-video rounded-lg" />
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-0 pb-[56.25%]"
            >
              <video
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-cover"
                playsInline
                muted
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </motion.div>
          )}
          <p className="mt-4 text-center text-sm text-gray-500">
            Perform hand gestures in front of the camera. Detected gestures will be logged to the console.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}