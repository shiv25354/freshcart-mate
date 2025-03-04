
import React, { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type Location = {
  id: string;
  name: string;
  address: string;
};

const savedLocations: Location[] = [
  {
    id: 'home',
    name: 'Home',
    address: '123 Main St, Anytown, CA 94538',
  },
  {
    id: 'work',
    name: 'Work',
    address: '456 Market St, Anytown, CA 94539',
  },
];

const LocationSelector = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location>(savedLocations[0]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-1.5 px-2 py-1 h-auto text-left"
        >
          <MapPin className="w-4 h-4 text-primary" />
          <div className="flex flex-col items-start">
            <span className="text-xs text-muted-foreground">Deliver to</span>
            <span className="font-medium text-sm truncate max-w-[150px]">
              {selectedLocation.name}
            </span>
          </div>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Saved Locations</h3>
            <div className="space-y-2">
              {savedLocations.map((location) => (
                <Button
                  key={location.id}
                  variant="outline"
                  className={cn(
                    "w-full justify-start h-auto py-3 px-3",
                    selectedLocation.id === location.id ? "border-primary bg-primary/5" : ""
                  )}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary mt-0.5" />
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{location.name}</span>
                      <span className="text-xs text-muted-foreground">{location.address}</span>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location-search">Search new location</Label>
            <div className="flex gap-2">
              <Input
                id="location-search"
                placeholder="Enter address or zip code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button size="sm">Search</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LocationSelector;
