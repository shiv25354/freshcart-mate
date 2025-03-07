
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface HomeSectionProps { 
  title: string;
  icon: React.ComponentType<any>;
  children: React.ReactNode;
  viewAllLink: string;
  className?: string;
  isPageLoaded?: boolean;
}

const HomeSection = ({ 
  title, 
  icon: Icon, 
  children, 
  viewAllLink, 
  className = "",
  isPageLoaded = true
}: HomeSectionProps) => (
  <section className={`py-6 ${className}`}>
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <Icon className="w-5 h-5 mr-2 text-primary" />
        <h2 className="text-xl font-medium">{title}</h2>
      </div>
      <Link to={viewAllLink}>
        <Button variant="ghost" className="flex items-center group">
          View All
          <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
    {children}
  </section>
);

export default HomeSection;
