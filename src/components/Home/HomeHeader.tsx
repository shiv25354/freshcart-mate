
import { Link } from 'react-router-dom';
import LocationSelector from '@/components/LocationSelector';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const HomeHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <LocationSelector />
      
      <div className="flex gap-2">
        <Link to="/search">
          <Button variant="outline" size="icon" className="rounded-full">
            <Search className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeHeader;
