
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/lib/toast";

const OrderFooter = () => {
  const downloadReceipt = () => {
    toast.success("Receipt downloaded", {
      description: "Your receipt has been downloaded to your device",
      icon: <Download className="h-4 w-4" />,
    });
  };

  return (
    <nav className="fixed bottom-0 w-full bg-card border-t p-4">
      <Button className="w-full" size="lg" onClick={downloadReceipt}>
        <Download className="mr-2 h-4 w-4" />
        Download Receipt
      </Button>
    </nav>
  );
};

export default OrderFooter;
