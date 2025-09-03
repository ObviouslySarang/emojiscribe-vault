import { useState } from 'react';
import { X, Eye, EyeOff, RefreshCw, Shield } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { textToEmoji, getPasswordStrength } from '@/utils/emojiEncryption';
import { PasswordEntryType } from './PasswordEntry';

interface AddPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: Omit<PasswordEntryType, 'id' | 'createdAt' | 'lastUsed'>) => void;
  editEntry?: PasswordEntryType;
}

const CATEGORIES = [
  'Personal', 'Work', 'Social', 'Finance', 'Shopping', 'Entertainment', 'Other'
];

export function AddPasswordModal({ isOpen, onClose, onSave, editEntry }: AddPasswordModalProps) {
  const [formData, setFormData] = useState({
    title: editEntry?.title || '',
    website: editEntry?.website || '',
    email: editEntry?.email || '',
    username: editEntry?.username || '',
    password: editEntry?.password || '',
    category: editEntry?.category || 'Personal',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const passwordStrength = getPasswordStrength(formData.password);
  const emojiPassword = textToEmoji(formData.password);

  const generatePassword = () => {
    const chars = {
      lower: 'abcdefghijklmnopqrstuvwxyz',
      upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };
    
    const allChars = chars.lower + chars.upper + chars.numbers + chars.symbols;
    let password = '';
    
    // Ensure at least one character from each set
    password += chars.lower[Math.floor(Math.random() * chars.lower.length)];
    password += chars.upper[Math.floor(Math.random() * chars.upper.length)];
    password += chars.numbers[Math.floor(Math.random() * chars.numbers.length)];
    password += chars.symbols[Math.floor(Math.random() * chars.symbols.length)];
    
    // Fill remaining length
    for (let i = password.length; i < 16; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    // Shuffle the password
    const shuffled = password.split('').sort(() => Math.random() - 0.5).join('');
    setFormData(prev => ({ ...prev, password: shuffled }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.username || !formData.password) return;
    
    onSave({
      ...formData,
      isFavorite: false,
    });
    
    // Reset form
    setFormData({
      title: '',
      website: '',
      email: '',
      username: '',
      password: '',
      category: 'Personal',
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-white/20 max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-primary" />
            <span>{editEntry ? 'Edit Password' : 'Add New Password'}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="e.g. Gmail, Facebook, Bank..."
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="glass border-white/20"
              required
            />
          </div>

          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              placeholder="https://example.com"
              value={formData.website}
              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
              className="glass border-white/20"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="glass border-white/20"
            />
          </div>

          <div>
            <Label htmlFor="username">Username *</Label>
            <Input
              id="username"
              placeholder="your_username"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              className="glass border-white/20"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="glass border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass border-white/20">
                {CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="password">Password *</Label>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEmoji(!showEmoji)}
                  className="text-xs"
                >
                  {showEmoji ? 'Hide' : 'Show'} Emoji
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={generatePassword}
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Generate
                </Button>
              </div>
            </div>
            
            {showEmoji && formData.password && (
              <div className="emoji-sequence mb-2 text-center">
                {emojiPassword}
              </div>
            )}
            
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter a strong password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="glass border-white/20 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              </Button>
            </div>
            
            {formData.password && (
              <div className="flex items-center justify-between mt-2">
                <Badge className={`${passwordStrength.color === 'security-success' ? 'security-success' : 
                                  passwordStrength.color === 'security-warning' ? 'security-warning' : 
                                  'security-critical'} border`}>
                  <Shield className="w-3 h-3 mr-1" />
                  {passwordStrength.label}
                </Badge>
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      passwordStrength.score >= 80 ? 'bg-green-500' :
                      passwordStrength.score >= 60 ? 'bg-blue-500' :
                      passwordStrength.score >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${passwordStrength.score}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 glass border-white/20"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
              disabled={!formData.title || !formData.username || !formData.password}
            >
              {editEntry ? 'Update' : 'Save'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}