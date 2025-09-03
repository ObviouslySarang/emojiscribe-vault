import { useState, useMemo } from 'react';
import { SecureEmoHeader } from '@/components/SecureEmoHeader';
import { PasswordEntry, PasswordEntryType } from '@/components/PasswordEntry';
import { AddPasswordModal } from '@/components/AddPasswordModal';
import { LoginPage } from '@/components/auth/LoginPage';
import { RegisterPage } from '@/components/auth/RegisterPage';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter, Grid, List, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration
const DEMO_PASSWORDS: PasswordEntryType[] = [
  {
    id: '1',
    title: 'Gmail',
    website: 'gmail.com',
    email: 'john.doe@gmail.com',
    username: 'john.doe',
    password: 'SecurePass123!',
    category: 'Personal',
    lastUsed: new Date(2024, 0, 15),
    createdAt: new Date(2023, 11, 1),
    isFavorite: true,
  },
  {
    id: '2',
    title: 'GitHub',
    website: 'github.com',
    username: 'john_dev',
    password: 'MyCode@2024#Strong',
    category: 'Work',
    lastUsed: new Date(2024, 0, 14),
    createdAt: new Date(2023, 10, 15),
  },
  {
    id: '3',
    title: 'Bank of America',
    website: 'bankofamerica.com',
    username: 'johndoe123',
    password: 'B@nk1ng$ecure456',
    category: 'Finance',
    lastUsed: new Date(2024, 0, 10),
    createdAt: new Date(2023, 9, 20),
  },
  {
    id: '4',
    title: 'Netflix',
    website: 'netflix.com',
    email: 'john.doe@gmail.com',
    username: 'john.doe',
    password: 'Flix&Chill789!',
    category: 'Entertainment',
    lastUsed: new Date(2024, 0, 13),
    createdAt: new Date(2023, 8, 5),
  },
];

const CATEGORIES = ['All', 'Personal', 'Work', 'Social', 'Finance', 'Shopping', 'Entertainment', 'Other'];

const Index = () => {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
};

function AuthenticatedApp() {
  const { user, isLoading, signOut } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [passwords, setPasswords] = useState<PasswordEntryType[]>(DEMO_PASSWORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<PasswordEntryType | undefined>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth pages if not authenticated
  if (!user) {
    if (authMode === 'register') {
      return (
        <RegisterPage
          onRegisterSuccess={() => setAuthMode('login')}
          onSwitchToLogin={() => setAuthMode('login')}
        />
      );
    }

    return (
      <LoginPage
        onLoginSuccess={() => {}} // Auth context handles this
        onSwitchToRegister={() => setAuthMode('register')}
      />
    );
  }

  // Filter passwords based on search and category
  const filteredPasswords = useMemo(() => {
    return passwords.filter(password => {
      const matchesSearch = searchQuery === '' || 
        password.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        password.website?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        password.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        password.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || password.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [passwords, searchQuery, selectedCategory]);

  const handleAddPassword = (newPassword: Omit<PasswordEntryType, 'id' | 'createdAt' | 'lastUsed'>) => {
    const password: PasswordEntryType = {
      ...newPassword,
      id: Date.now().toString(),
      createdAt: new Date(),
      lastUsed: new Date(),
    };
    
    setPasswords(prev => [password, ...prev]);
    toast({
      title: "Password saved!",
      description: `${password.title} has been added to your vault`,
    });
  };

  const handleEditPassword = (entry: PasswordEntryType) => {
    setEditingEntry(entry);
    setIsAddModalOpen(true);
  };

  const handleUpdatePassword = (updatedPassword: Omit<PasswordEntryType, 'id' | 'createdAt' | 'lastUsed'>) => {
    if (!editingEntry) return;
    
    setPasswords(prev => prev.map(p => 
      p.id === editingEntry.id 
        ? { ...updatedPassword, id: editingEntry.id, createdAt: editingEntry.createdAt, lastUsed: new Date() }
        : p
    ));
    
    setEditingEntry(undefined);
    toast({
      title: "Password updated!",
      description: `${updatedPassword.title} has been updated`,
    });
  };

  const handleDeletePassword = (id: string) => {
    const password = passwords.find(p => p.id === id);
    setPasswords(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Password deleted",
      description: `${password?.title} has been removed from your vault`,
      variant: "destructive"
    });
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setEditingEntry(undefined);
  };

  const getCategoryCount = (category: string) => {
    if (category === 'All') return passwords.length;
    return passwords.filter(p => p.category === category).length;
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <SecureEmoHeader
          onAddPassword={() => setIsAddModalOpen(true)}
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          onSignOut={signOut}
          userEmail={user?.email || ''}
        />

        <div className="flex gap-6 p-6">
          {/* Sidebar */}
          <div className="w-64 space-y-4">
            {/* Categories */}
            <div className="card-hover p-4 rounded-xl">
              <div className="flex items-center space-x-2 mb-3">
                <Filter className="w-4 h-4 text-primary" />
                <h3 className="font-semibold">Categories</h3>
              </div>
              <div className="space-y-2">
                {CATEGORIES.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    className={`w-full justify-between ${
                      selectedCategory === category 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-accent/50'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <span>{category}</span>
                    <Badge variant="secondary" className="bg-muted">
                      {getCategoryCount(category)}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Security Stats */}
            <div className="card-hover p-4 rounded-xl">
              <div className="flex items-center space-x-2 mb-3">
                <Lock className="w-4 h-4 text-primary" />
                <h3 className="font-semibold">Security Overview</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Passwords</span>
                  <span className="font-semibold">{passwords.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Strong Passwords</span>
                  <span className="font-semibold text-green-400">
                    {passwords.filter(p => p.password.length >= 12).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Weak Passwords</span>
                  <span className="font-semibold text-red-400">
                    {passwords.filter(p => p.password.length < 8).length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-semibold">
                  {selectedCategory === 'All' ? 'All Passwords' : `${selectedCategory} Passwords`}
                </h2>
                <Badge variant="secondary" className="bg-muted">
                  {filteredPasswords.length}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Password Grid/List */}
            {filteredPasswords.length === 0 ? (
              <div className="card-hover rounded-xl p-12 text-center">
                <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No passwords found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? 'Try adjusting your search terms' : 'Add your first password to get started'}
                </p>
                <Button 
                  onClick={() => setIsAddModalOpen(true)}
                >
                  Add Password
                </Button>
              </div>
            ) : (
              <div className={`grid gap-4 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredPasswords.map((password, index) => (
                  <div key={password.id} style={{ animationDelay: `${index * 0.1}s` }}>
                    <PasswordEntry
                      entry={password}
                      onEdit={handleEditPassword}
                      onDelete={handleDeletePassword}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <AddPasswordModal
          isOpen={isAddModalOpen}
          onClose={handleModalClose}
          onSave={editingEntry ? handleUpdatePassword : handleAddPassword}
          editEntry={editingEntry}
        />
      </div>
    </div>
  );
};

export default Index;