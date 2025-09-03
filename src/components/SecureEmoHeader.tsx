import { Shield, Settings, Plus, Search, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SecureEmoHeaderProps {
  onAddPassword: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  onSignOut?: () => Promise<void>;
  userEmail?: string;
}

export function SecureEmoHeader({ onAddPassword, onSearch, searchQuery, onSignOut, userEmail }: SecureEmoHeaderProps) {
  const userInitials = userEmail ? userEmail.charAt(0).toUpperCase() + userEmail.split('@')[0].charAt(1)?.toUpperCase() : 'U';

  return (
    <header className="card-elevated border-b p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Secure Emo
            </h1>
            <p className="text-muted-foreground text-sm">
              Enterprise Password Manager with Emoji Encryption
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {userEmail && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 p-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-sm">{userInitials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm hidden md:block">{userEmail}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="flex items-center space-x-2 text-destructive focus:text-destructive"
                  onClick={onSignOut}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          <Button onClick={onAddPassword} className="hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4 mr-2" />
            Add Password
          </Button>
        </div>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search passwords, websites, or categories..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-10 border-border focus:border-primary/50"
        />
      </div>
    </header>
  );
}