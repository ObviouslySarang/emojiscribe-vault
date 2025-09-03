import { useState } from 'react';
import { Eye, EyeOff, Copy, Edit, Trash2, Globe, Mail, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { textToEmoji, getPasswordStrength } from '@/utils/emojiEncryption';

export interface PasswordEntryType {
  id: string;
  title: string;
  website?: string;
  email?: string;
  username: string;
  password: string;
  category: string;
  lastUsed: Date;
  createdAt: Date;
  isFavorite?: boolean;
}

interface PasswordEntryProps {
  entry: PasswordEntryType;
  onEdit: (entry: PasswordEntryType) => void;
  onDelete: (id: string) => void;
}

export function PasswordEntry({ entry, onEdit, onDelete }: PasswordEntryProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const { toast } = useToast();

  const passwordStrength = getPasswordStrength(entry.password);
  const emojiPassword = textToEmoji(entry.password);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy manually",
        variant: "destructive"
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'social': return '👥';
      case 'work': return '💼';
      case 'finance': return '💰';
      case 'shopping': return '🛒';
      case 'entertainment': return '🎮';
      case 'personal': return '👤';
      default: return '🔒';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'social': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'work': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'finance': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'shopping': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'entertainment': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card className="glass-hover animate-fade-in group">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{getCategoryIcon(entry.category)}</div>
            <div>
              <h3 className="font-semibold text-lg">{entry.title}</h3>
              {entry.website && (
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Globe className="w-3 h-3" />
                  <span>{entry.website}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(entry)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive"
              onClick={() => onDelete(entry.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Category and Strength */}
        <div className="flex items-center justify-between mb-4">
          <Badge className={`${getCategoryColor(entry.category)} border`}>
            {entry.category}
          </Badge>
          
          <div className="flex items-center space-x-2">
            <Shield className={`w-4 h-4 text-${passwordStrength.color}`} />
            <span className={`text-sm font-medium text-${passwordStrength.color}`}>
              {passwordStrength.label}
            </span>
          </div>
        </div>

        {/* Credentials */}
        <div className="space-y-3">
          {entry.email && (
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-white/10">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{entry.email}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(entry.email!, 'Email')}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-white/10">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Username:</span>
              <span className="text-sm">{entry.username}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(entry.username, 'Username')}
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>

          <div className="p-3 rounded-lg bg-muted/20 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Password:</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEmoji(!showEmoji)}
                  className="text-xs"
                >
                  {showEmoji ? 'Hide' : 'Show'} Emoji
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(entry.password, 'Password')}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            {showEmoji && (
              <div className="emoji-sequence mb-2 text-center">
                {emojiPassword}
              </div>
            )}
            
            <div className="font-mono text-sm">
              {showPassword ? entry.password : '•'.repeat(entry.password.length)}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
          <span>Last used: {entry.lastUsed.toLocaleDateString()}</span>
          <span>Created: {entry.createdAt.toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}