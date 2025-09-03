import { Shield, Settings, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SecureEmoHeaderProps {
  onAddPassword: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export function SecureEmoHeader({ onAddPassword, onSearch, searchQuery }: SecureEmoHeaderProps) {
  return (
    <header className="glass-hover border-b border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Secure Emo
            </h1>
            <p className="text-muted-foreground text-sm">
              Enterprise Password Manager with Emoji Encryption
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="icon" className="glass-hover">
            <Settings className="w-4 h-4" />
          </Button>
          
          <Button onClick={onAddPassword} className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
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
          className="pl-10 glass border-white/20 focus:border-primary/50"
        />
      </div>
    </header>
  );
}