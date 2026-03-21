import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import {
  LandingPage,
  AuthPage,
  Dashboard,
  Wallet,
  Airtime,
  Data,
  Marketplace,
  Services,
  Settings,
  Profile,
  CreatePin,
  LightBills,
  Transactions,
  Rewards,
  AirtimeBuyback,
  GroupPayment,
  Loyalty,
  MoreServices,
  Admin,
  Notifications,
} from '@/pages';
import './App.css';
import { useAuth } from '@/context/AuthContext';


// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated} = useAuth()
  // const {LoaderComponent, showLoader, hideLoader}= Loader()
  
// loading ? showLoader:hideLoader
//   console.log(loading)
//   if (loading) {

//     return <LoaderComponent />
//   }

  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

// Public Route Component (redirects to dashboard if authenticated)
function PublicRoute({ children}: { children: React.ReactNode}) {
  const {isAuthenticated} = useAuth() 

  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route 
        path="/login" 
        element={
          <PublicRoute  >
            <AuthPage />      
          </PublicRoute>
        } 
      />
      <Route 
        path="/signup" 
        element={
          <PublicRoute  >
            <AuthPage />
          </PublicRoute>
        } 
      />

      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute  >
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/wallet" 
        element={
          <ProtectedRoute  >
            <Wallet />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/airtime" 
        element={
          <ProtectedRoute  >
            <Airtime />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/data" 
        element={
          <ProtectedRoute  >
            <Data />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/marketplace" 
        element={
          <ProtectedRoute   >
            <Marketplace />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/services" 
        element={
          <ProtectedRoute  >
            <Services />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute  >
            <Settings />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute  >
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/pin" 
        element={
          <ProtectedRoute  >
            <CreatePin />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/light-bills" 
        element={
          <ProtectedRoute  >
            <LightBills />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/transactions" 
        element={
          <ProtectedRoute  >
            <Transactions />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/rewards" 
        element={
          <ProtectedRoute  >
            <Rewards />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/airtime-buyback" 
        element={
          <ProtectedRoute  >
            <AirtimeBuyback />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/group-payment" 
        element={
          <ProtectedRoute  >
            <GroupPayment />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/loyalty" 
        element={
          <ProtectedRoute  >
            <Loyalty />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/more-services" 
        element={
          <ProtectedRoute  >
            <MoreServices />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute  >
            <Admin />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/notifications" 
        element={
          <ProtectedRoute  >
            <Notifications />
          </ProtectedRoute>
        } 
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
