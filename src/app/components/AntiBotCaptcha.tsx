import React from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

interface AntiBotProps {
  onSuccess: (token: string) => void;
  onError: () => void;
}

export const AntiBotCaptcha: React.FC<AntiBotProps> = ({ onSuccess, onError }) => {
  return (
    <div className="my-3 flex justify-center">
      <Turnstile
        siteKey="1x00000000000000000000AA" // Clé de test Cloudflare
        onSuccess={onSuccess}
        onError={onError}
        options={{
          theme: 'dark',
          language: 'fr',
        }}
      />
    </div>
  );
};
