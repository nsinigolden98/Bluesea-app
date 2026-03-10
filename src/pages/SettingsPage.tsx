import { useState } from 'react';
import { Settings, Lock, Moon, Sun, Bell, Shield, Eye, EyeOff, Loader2, Check } from 'lucide-react';
import { MainLayout } from '@/layouts';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export function SettingsPage() {
  const { resolvedTheme, toggleTheme } = useTheme();
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
  });

  // Security states
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangePin, setShowChangePin] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [pinSuccess, setPinSuccess] = useState(false);

  // Password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // PIN form
  const [pinForm, setPinForm] = useState({
    currentPin: '',
    newPin: '',
    confirmPin: '',
  });
  const [isChangingPin, setIsChangingPin] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) return;
    
    setIsChangingPassword(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsChangingPassword(false);
    setShowChangePassword(false);
    setPasswordSuccess(true);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handlePinChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pinForm.newPin !== pinForm.confirmPin) return;
    
    setIsChangingPin(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsChangingPin(false);
    setShowChangePin(false);
    setPinSuccess(true);
    setPinForm({ currentPin: '', newPin: '', confirmPin: '' });
  };

  return (
    <MainLayout>
      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences and security</p>
        </div>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              {resolvedTheme === 'dark' ? (
                <Moon className="w-5 h-5 text-bluesea-primary" />
              ) : (
                <Sun className="w-5 h-5 text-bluesea-primary" />
              )}
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark theme
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="h-10 w-10"
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-bluesea-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive updates via email
                </p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, email: checked }))
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive updates via SMS
                </p>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, sms: checked }))
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications
                </p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, push: checked }))
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Marketing Emails</p>
                <p className="text-sm text-muted-foreground">
                  Receive promotional offers and updates
                </p>
              </div>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, marketing: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-bluesea-primary" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-muted-foreground">
                  Update your account password
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowChangePassword(true)}
              >
                <Lock className="w-4 h-4 mr-2" />
                Change
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Transaction PIN</p>
                <p className="text-sm text-muted-foreground">
                  Change your 4-digit transaction PIN
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowChangePin(true)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Change
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Change Password Dialog */}
        <Dialog open={showChangePassword} onOpenChange={setShowChangePassword}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Enter your current password and a new password
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handlePasswordChange} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <div className="relative">
                  <Input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>New Password</Label>
                <div className="relative">
                  <Input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <div className="relative">
                  <Input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowChangePassword(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 btn-bluesea-primary"
                  disabled={
                    isChangingPassword ||
                    !passwordForm.currentPassword ||
                    !passwordForm.newPassword ||
                    passwordForm.newPassword !== passwordForm.confirmPassword
                  }
                >
                  {isChangingPassword ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    'Change Password'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Change PIN Dialog */}
        <Dialog open={showChangePin} onOpenChange={setShowChangePin}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Transaction PIN</DialogTitle>
              <DialogDescription>
                Enter your current PIN and a new 4-digit PIN
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handlePinChange} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Current PIN</Label>
                <Input
                  type="password"
                  maxLength={4}
                  value={pinForm.currentPin}
                  onChange={(e) => setPinForm(prev => ({ ...prev, currentPin: e.target.value.replace(/\D/g, '') }))}
                  placeholder="Enter current PIN"
                />
              </div>

              <div className="space-y-2">
                <Label>New PIN</Label>
                <Input
                  type="password"
                  maxLength={4}
                  value={pinForm.newPin}
                  onChange={(e) => setPinForm(prev => ({ ...prev, newPin: e.target.value.replace(/\D/g, '') }))}
                  placeholder="Enter new 4-digit PIN"
                />
              </div>

              <div className="space-y-2">
                <Label>Confirm New PIN</Label>
                <Input
                  type="password"
                  maxLength={4}
                  value={pinForm.confirmPin}
                  onChange={(e) => setPinForm(prev => ({ ...prev, confirmPin: e.target.value.replace(/\D/g, '') }))}
                  placeholder="Confirm new PIN"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowChangePin(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 btn-bluesea-primary"
                  disabled={
                    isChangingPin ||
                    pinForm.currentPin.length !== 4 ||
                    pinForm.newPin.length !== 4 ||
                    pinForm.newPin !== pinForm.confirmPin
                  }
                >
                  {isChangingPin ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    'Change PIN'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Success Dialogs */}
        <Dialog open={passwordSuccess} onOpenChange={setPasswordSuccess}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">Password Changed!</DialogTitle>
              <DialogDescription className="text-center">
                Your password has been updated successfully
              </DialogDescription>
            </DialogHeader>
            <div className="text-center py-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <Button
              className="w-full btn-bluesea-primary"
              onClick={() => setPasswordSuccess(false)}
            >
              Done
            </Button>
          </DialogContent>
        </Dialog>

        <Dialog open={pinSuccess} onOpenChange={setPinSuccess}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">PIN Changed!</DialogTitle>
              <DialogDescription className="text-center">
                Your transaction PIN has been updated successfully
              </DialogDescription>
            </DialogHeader>
            <div className="text-center py-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <Button
              className="w-full btn-bluesea-primary"
              onClick={() => setPinSuccess(false)}
            >
              Done
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
