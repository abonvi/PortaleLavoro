import React, { useState } from 'react';
import { PersonalInfo } from './PersonalInfo';
import { DocumentUpload } from './DocumentUpload';
import { VideoRecorder } from './VideoRecorder';

interface ApplicationFormProps {
  positionId: string;
  onSubmit: (data: any) => void;
}

export function ApplicationForm({ positionId, onSubmit }: ApplicationFormProps) {
  const [personalInfo, setPersonalInfo] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    indirizzo: '',
  });

  const [cv, setCv] = useState<File | null>(null);
  const [letteraMotivazionale, setLetteraMotivazionale] = useState<File | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('positionId', positionId);
    formData.append('personalInfo', JSON.stringify(personalInfo));
    
    if (cv) {
      formData.append('cv', cv);
    }
    
    if (letteraMotivazionale) {
      formData.append('letteraMotivazionale', letteraMotivazionale);
    }
    
    if (videoBlob) {
      formData.append('videoPresentazione', videoBlob, 'video-presentazione.webm');
    }

    onSubmit(formData);
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <PersonalInfo
        values={personalInfo}
        onChange={handlePersonalInfoChange}
      />

      <div className="space-y-6">
        <DocumentUpload
          label="Curriculum Vitae"
          onChange={(file) => setCv(file)}
        />

        <DocumentUpload
          label="Lettera Motivazionale"
          onChange={(file) => setLetteraMotivazionale(file)}
        />
      </div>

      <VideoRecorder />

      <div className="pt-4">
        <button
          type="submit"
          className="w-full btn-primary"
        >
          Invia Candidatura
        </button>
      </div>
    </form>
  );
}