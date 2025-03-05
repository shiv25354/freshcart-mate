
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CheckoutHeaderProps {
  title: string;
  backUrl: string;
}

const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({ title, backUrl }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center gap-2 mb-6 mt-8">
      <Button variant="ghost" size="icon" onClick={() => navigate(backUrl)}>
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <h1 className="text-2xl font-medium">{title}</h1>
    </div>
  );
};

export default CheckoutHeader;
