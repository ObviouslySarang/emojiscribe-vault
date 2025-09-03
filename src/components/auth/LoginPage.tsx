import { useState } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from './AuthLayout';
import { EmojiMasterPassword } from './EmojiMasterPassword';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onSwitchToRegister: () => void;
}

export function LoginPage({ onLoginSuccess, onSwitchToRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'email' | 'emoji'>('email');
  const [userMasterEmojis, setUserMasterEmojis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    
    try {
      // First authenticate with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Get user's master emoji password
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('master_password_emojis')
        .eq('id', authData.user.id)
        .single();

      if (profileError) throw profileError;

      setUserMasterEmojis(profile.master_password_emojis);
      setStep('emoji');
      
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmojiVerification = (emojis: string) => {
    if (emojis === userMasterEmojis) {
      toast({
        title: 'Welcome back!',
        description: 'Successfully logged into your secure vault'
      });
      onLoginSuccess();
    }
  };

  if (step === 'emoji') {
    return (
      <AuthLayout
        title="Verify Identity"
        subtitle="Enter your 4-emoji master password"
      >
        <EmojiMasterPassword
          mode="verify"
          targetEmojis={userMasterEmojis}
          onComplete={handleEmojiVerification}
        />
        
        <Button
          variant="outline"
          onClick={() => setStep('email')}
          className="w-full mt-4"
        >
          Back to Email Login
        </Button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your secure vault"
    >
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={!email || !password || isLoading}
        >
          {isLoading ? 'Signing in...' : 'Continue to Emoji Verification'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-primary hover:underline font-medium"
          >
            Sign up here
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}