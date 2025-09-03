import { Shield, Lock } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 border border-primary/20">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Secure Emo</h1>
          <p className="text-gray-600">Enterprise Password Manager</p>
        </div>

        {/* Auth Card */}
        <div className="card-elevated rounded-xl p-8 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-6">
            <Lock className="w-5 h-5 text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-600">{subtitle}</p>
            </div>
          </div>

          {children}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Secured with end-to-end encryption and emoji-based master passwords
        </p>
      </div>
    </div>
  );
}