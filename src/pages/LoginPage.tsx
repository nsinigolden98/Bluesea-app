import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import { AuthLayout } from '@/layouts';
import { useAuth } from '@/context/AuthContext';
import { useForm } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface SignupFormData {
  email: string;
  phone: string;
  name: string;
  surname: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

export function LoginPage() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const loginForm = useForm<LoginFormData>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: {
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address',
      },
      password: {
        required: true,
        minLength: 8,
        message: 'Password must be at least 8 characters',
      },
    },
    onSubmit: async (values) => {
      await login(values.email, values.password);
      navigate('/dashboard');
    },
  });

  const signupForm = useForm<SignupFormData>({
    initialValues: {
      email: '',
      phone: '',
      name: '',
      surname: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
    validationSchema: {
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address',
      },
      phone: {
        required: true,
        minLength: 10,
        message: 'Please enter a valid phone number',
      },
      name: {
        required: true,
        minLength: 2,
        message: 'Name is required',
      },
      surname: {
        required: true,
        minLength: 2,
        message: 'Surname is required',
      },
      password: {
        required: true,
        minLength: 8,
        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/,
        message: 'Password must be at least 8 characters with letters and numbers',
      },
      confirmPassword: {
        required: true,
        validate: (value: string): boolean | string => value === signupForm.values.password || 'Passwords do not match',
      },
      agreeTerms: {
        required: true,
        validate: (value: boolean): boolean | string => value === true || 'You must agree to the terms',
      },
    },
    onSubmit: async (values) => {
      await signup({
        email: values.email,
        phone: values.phone,
        name: values.name,
        surname: values.surname,
        password: values.password,
      });
      navigate('/dashboard');
    },
  });

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Log in</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
          </TabsList>

          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold text-muted-foreground">
              Welcome To BlueSea Mobile
            </h1>
          </div>

          <TabsContent value="login">
            <form onSubmit={loginForm.handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={loginForm.values.email}
                    onChange={loginForm.handleChange}
                    onBlur={loginForm.handleBlur}
                  />
                </div>
                {loginForm.touched.email && loginForm.errors.email && (
                  <p className="text-sm text-destructive">{loginForm.errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="login-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    value={loginForm.values.password}
                    onChange={loginForm.handleChange}
                    onBlur={loginForm.handleBlur}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {loginForm.touched.password && loginForm.errors.password && (
                  <p className="text-sm text-destructive">{loginForm.errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    name="rememberMe"
                    checked={loginForm.values.rememberMe}
                    onCheckedChange={(checked) => 
                      loginForm.setValue('rememberMe', checked as boolean)
                    }
                  />
                  <Label htmlFor="remember" className="text-sm font-normal">
                    Remember me
                  </Label>
                </div>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-bluesea-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full btn-bluesea-primary"
                disabled={loginForm.isSubmitting}
              >
                {loginForm.isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Log in'
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={signupForm.handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={signupForm.values.email}
                    onChange={signupForm.handleChange}
                    onBlur={signupForm.handleBlur}
                  />
                </div>
                {signupForm.touched.email && signupForm.errors.email && (
                  <p className="text-sm text-destructive">{signupForm.errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-phone">Phone</Label>
                <Input
                  id="signup-phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={signupForm.values.phone}
                  onChange={signupForm.handleChange}
                  onBlur={signupForm.handleBlur}
                />
                {signupForm.touched.phone && signupForm.errors.phone && (
                  <p className="text-sm text-destructive">{signupForm.errors.phone}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Name</Label>
                  <Input
                    id="signup-name"
                    name="name"
                    type="text"
                    placeholder="First name"
                    value={signupForm.values.name}
                    onChange={signupForm.handleChange}
                    onBlur={signupForm.handleBlur}
                  />
                  {signupForm.touched.name && signupForm.errors.name && (
                    <p className="text-sm text-destructive">{signupForm.errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-surname">Surname</Label>
                  <Input
                    id="signup-surname"
                    name="surname"
                    type="text"
                    placeholder="Last name"
                    value={signupForm.values.surname}
                    onChange={signupForm.handleChange}
                    onBlur={signupForm.handleBlur}
                  />
                  {signupForm.touched.surname && signupForm.errors.surname && (
                    <p className="text-sm text-destructive">{signupForm.errors.surname}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    className="pl-10 pr-10"
                    value={signupForm.values.password}
                    onChange={signupForm.handleChange}
                    onBlur={signupForm.handleBlur}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {signupForm.touched.password && signupForm.errors.password && (
                  <p className="text-sm text-destructive">{signupForm.errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-confirm">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="signup-confirm"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10"
                    value={signupForm.values.confirmPassword}
                    onChange={signupForm.handleChange}
                    onBlur={signupForm.handleBlur}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {signupForm.touched.confirmPassword && signupForm.errors.confirmPassword && (
                  <p className="text-sm text-destructive">{signupForm.errors.confirmPassword}</p>
                )}
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agree-terms"
                  name="agreeTerms"
                  checked={signupForm.values.agreeTerms}
                  onCheckedChange={(checked) => 
                    signupForm.setValue('agreeTerms', checked as boolean)
                  }
                />
                <Label htmlFor="agree-terms" className="text-sm font-normal leading-normal">
                  I agree to the{' '}
                  <Link to="#" className="text-bluesea-primary hover:underline">
                    Terms & Policy
                  </Link>
                </Label>
              </div>
              {signupForm.touched.agreeTerms && signupForm.errors.agreeTerms && (
                <p className="text-sm text-destructive">{signupForm.errors.agreeTerms}</p>
              )}

              <Button
                type="submit"
                className="w-full btn-bluesea-primary"
                disabled={signupForm.isSubmitting}
              >
                {signupForm.isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Sign up'
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => {/* TODO: Implement Google OAuth */}}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
