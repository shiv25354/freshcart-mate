
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HomeSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const HomeSearch = ({ searchQuery, setSearchQuery }: HomeSearchProps) => {
  return (
    <div className="relative mb-6">
      <Input
        className="pl-10 pr-4 rounded-full"
        placeholder="Search for groceries..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  );
};

export default HomeSearch;
