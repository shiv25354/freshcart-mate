
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeliveryInstructionsProps {
  instructions: string;
  contactless: boolean;
}

const DeliveryInstructions = ({ instructions, contactless }: DeliveryInstructionsProps) => {
  return (
    <section className="bg-card p-4 border-b">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Delivery Instructions</h2>
        <Button variant="link" className="text-sm h-auto p-0">
          Edit
        </Button>
      </div>
      <div className="bg-muted p-3 rounded-lg">
        <p className="text-sm">{instructions}</p>
        {contactless && (
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <Shield className="h-4 w-4 mr-2" />
            <span>Contactless Delivery Selected</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default DeliveryInstructions;
