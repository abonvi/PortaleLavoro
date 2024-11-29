import React, { useState, useRef, useEffect } from 'react';
import { Video, StopCircle, X } from 'lucide-react';

interface VideoRecorderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecordingComplete: (videoBlob: Blob) => void;
}

function VideoRecorderModal({ isOpen, onClose, onRecordingComplete }: VideoRecorderModalProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [timeLeft, setTimeLeft] = useState(120);
  const timerRef = useRef<number>();

  useEffect(() => {
    if (isOpen) {
      startCamera();
    }
    return () => {
      stopEverything();
    };
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: true
      });
      
      setStream(mediaStream);
      setError('');
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Errore accesso alla webcam:', err);
      setError('Impossibile accedere alla webcam. Verifica che sia collegata e che tu abbia dato i permessi necessari.');
    }
  };

  const startRecording = () => {
    if (!stream) return;

    chunksRef.current = [];
    try {
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp8,opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        onRecordingComplete(blob);
      };

      mediaRecorder.start(1000);
      setIsRecording(true);
      setTimeLeft(120);
      
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error('Errore avvio registrazione:', err);
      setError('Impossibile avviare la registrazione. Riprova.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const stopEverything = () => {
    stopRecording();
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleClose = () => {
    stopEverything();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        
        <div className="relative bg-white rounded-2xl w-full max-w-2xl">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold gradient-text">
                Registra Video Presentazione
              </h3>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {error ? (
              <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-xl">
                {error}
              </div>
            ) : (
              <div className="aspect-video bg-black rounded-xl overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Tempo rimanente: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </div>

              <div className="flex space-x-4">
                {!isRecording ? (
                  <button
                    type="button"
                    onClick={startRecording}
                    disabled={!stream || !!error}
                    className="btn-primary"
                  >
                    <Video className="h-5 w-5 mr-2" />
                    Inizia Registrazione
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="inline-flex items-center px-6 py-3 rounded-xl font-medium text-white shadow-sm transition-all duration-300 bg-red-600 hover:bg-red-700"
                  >
                    <StopCircle className="h-5 w-5 mr-2" />
                    Ferma Registrazione
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VideoRecorder() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<Blob | null>(null);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);

  const handleRecordingComplete = (videoBlob: Blob) => {
    setRecordedVideo(videoBlob);
    setIsModalOpen(false);

    if (videoPreviewRef.current) {
      const url = URL.createObjectURL(videoBlob);
      videoPreviewRef.current.src = url;
    }
  };

  const removeVideo = () => {
    setRecordedVideo(null);
    if (videoPreviewRef.current) {
      URL.revokeObjectURL(videoPreviewRef.current.src);
      videoPreviewRef.current.src = '';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold gradient-text">Video Presentazione</h3>
      <p className="text-sm text-gray-600">
        Registra un breve video di presentazione (max 2 minuti)
      </p>

      {!recordedVideo ? (
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="btn-primary"
        >
          <Video className="h-5 w-5 mr-2" />
          Registra Video
        </button>
      ) : (
        <div className="mt-4 border rounded-xl overflow-hidden bg-gray-50">
          <video
            ref={videoPreviewRef}
            controls
            className="w-full aspect-video"
          />
          <div className="p-4 border-t flex justify-between items-center">
            <span className="text-sm text-gray-600">Video registrato</span>
            <button
              type="button"
              onClick={removeVideo}
              className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 transition-colors"
            >
              <X className="h-4 w-4 mr-2" />
              Rimuovi
            </button>
          </div>
        </div>
      )}

      <VideoRecorderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRecordingComplete={handleRecordingComplete}
      />
    </div>
  );
}