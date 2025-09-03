import { useState } from 'react';
import { Mail, Eye, EyeOff, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from './AuthLayout';
import { EmojiMasterPassword } from './EmojiMasterPassword';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { getPasswordStrength } from '@/utils/emojiEncryption';
import { Badge } from '@/components/ui/badge';

interface RegisterPageProps {
  onRegisterSuccess: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterPage({ onRegisterSuccess, onSwitchToLogin }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'details' | 'emoji'>('details');
  const [masterEmojis, setMasterEmojis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const passwordStrength = getPasswordStrength(formData.password);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Password mismatch',
        description: 'Passwords do not match',
        variant: 'destructive'
      });
      return;
    }

    if (passwordStrength.score < 60) {
      toast({
        title: 'Weak password',
        description: 'Please choose a stronger password',
        variant: 'destructive'
      });
      return;
    }

    setStep('emoji');
  };

  const handleEmojiSetup = async (emojis: string) => {
    setMasterEmojis(emojis);
    setIsLoading(true);

    try {
      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create user profile with emoji master password
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: authData.user.id,
            email: formData.email,
            master_password_emojis: emojis,
          });

        if (profileError) throw profileError;

        toast({
          title: 'Account created!',
          description: 'Please check your email to verify your account',
        });

        onRegisterSuccess();
      }
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'emoji') {
    return (
      <AuthLayout
        title="Set Master Password"
        subtitle="Create your 4-emoji master password"
      >
        <EmojiMasterPassword
          mode="setup"
          onComplete={handleEmojiSetup}
          isLoading={isLoading}
        />
        
        <Button
          variant="outline"
          onClick={() => setStep('details')}
          className="w-full mt-4"
          disabled={isLoading}
        >
          Back to Account Details
        </Button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join Secure Emo password manager"
    >
      <form onSubmit={handleDetailsSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          
          {formData.password && (
            <div className="flex items-center justify-between mt-2">
              <Badge className={`${
                passwordStrength.score >= 80 ? 'status-success' :
                passwordStrength.score >= 60 ? 'bg-blue-50 text-blue-700 border-blue-200' :
                passwordStrength.score >= 40 ? 'status-warning' : 'status-critical'
              }`}>
                {passwordStrength.label}
              </Badge>
              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    passwordStrength.score >= 80 ? 'bg-green-500' :
                    passwordStrength.score >= 60 ? 'bg-blue-500' :
                    passwordStrength.score >= 40 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${passwordStrength.score}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={!formData.email || !formData.password || !formData.confirmPassword}
        >
          Continue to Emoji Setup
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-primary hover:underline font-medium"
          >
            Sign in here
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}