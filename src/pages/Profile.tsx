
import React from 'react';
import { User, Settings, LogOut, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/lib/toast';
import ToastDemo from '@/components/demo/ToastDemo';

const Profile = () => {
  const handleLogout = () => {
    toast.info("Logged out", {
      description: "You have been successfully logged out",
    });
  };

  const handleToggle = () => {
    toast.success("Setting updated", {
      description: "Your notification preferences have been saved",
    });
  };

  return (
    <div className="min-h-screen pt-16 pb-20 px-4 md:px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-medium mt-8 mb-6">Profile</h1>
      
      <div className="bg-card shadow-sm rounded-xl overflow-hidden mb-6">
        <div className="p-6 flex items-center space-x-4">
          <div className="bg-primary/10 p-4 rounded-full">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">John Doe</h2>
            <p className="text-muted-foreground">john.doe@example.com</p>
          </div>
        </div>
        
        <Separator />
        
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive order updates</p>
              </div>
            </div>
            <Switch onCheckedChange={handleToggle} defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Settings className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Account Settings</p>
                <p className="text-sm text-muted-foreground">Update your preferences</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
          
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
      
      {/* Toast Demo Component */}
      <div className="bg-card shadow-sm rounded-xl overflow-hidden mb-6">
        <ToastDemo />
      </div>
    </div>
  );
};

export default Profile;
