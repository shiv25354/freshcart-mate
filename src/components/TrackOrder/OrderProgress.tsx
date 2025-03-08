
import { Check, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ProgressStep {
  id: number;
  status: string;
  time: string;
  completed: boolean;
  icon: string;
}

interface OrderProgressProps {
  progress: ProgressStep[];
}

const OrderProgress = ({ progress }: OrderProgressProps) => {
  const navigate = useNavigate();

  const getStatusIcon = (status: string, completed: boolean) => {
    switch (status) {
      case 'check':
        return completed ? 
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <Check className="h-4 w-4 text-primary" />
          </div> :
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <Check className="h-4 w-4 text-muted-foreground" />
          </div>;
      case 'truck':
        return <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <Truck className="h-4 w-4 text-blue-600" />
        </div>;
      default:
        return <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center" />;
    }
  };

  return (
    <section className="bg-card p-4 border-b">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold">Order Progress</h2>
        <Button variant="link" className="text-sm h-auto p-0" onClick={() => navigate(`/orders`)}>
          View Details
        </Button>
      </div>
      
      <div className="space-y-6">
        {progress.map((step, index) => (
          <div key={step.id} className="flex items-start">
            {getStatusIcon(step.icon, step.completed)}
            <div className="ml-3 flex-1">
              <p className="font-medium">{step.status}</p>
              <p className="text-sm text-muted-foreground">{step.time}</p>
            </div>
            {index !== progress.length - 1 && (
              <div className="absolute ml-4 h-6 w-[1px] bg-muted-foreground/20 top-8 left-4" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderProgress;
