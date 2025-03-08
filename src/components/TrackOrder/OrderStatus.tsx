
interface OrderStatusProps {
  eta: string;
  distance: string;
}

const OrderStatus = ({ eta, distance }: OrderStatusProps) => {
  return (
    <section className="bg-card p-4 border-b">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Estimated Arrival</p>
          <p className="text-xl font-semibold">{eta}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Distance</p>
          <p className="text-xl font-semibold">{distance}</p>
        </div>
      </div>
    </section>
  );
};

export default OrderStatus;
