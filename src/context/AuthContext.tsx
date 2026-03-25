import React, { createContext, useContext, useState, useCallback, useEffect} from 'react';
import {
  type User,
  type AuthState,
  type LoginFormData,
  type SignupFormData,
  postRequest,
  deleteCookie,
  getRequest,
  setCookie,
  ENDPOINTS,
  API_BASE
} from '@/types';
import { useGoogleLogin, type TokenResponse } from '@react-oauth/google'
import { TransactionsData } from '@/data';
import {token} from '@/types'
interface AuthContextType extends AuthState {
  login: (data: LoginFormData) => Promise<string>;
  signup: (data: SignupFormData) => Promise<boolean>;
  logout: () => void;
  googleLogin: () => void;
  load?: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: false,
  });
  
useEffect( () => {
  const loadUser = async () => {
    setState(prev => ({ ...prev, loading: true }));
  
    try {
      if (token) {
        
        const get_user = await getRequest(ENDPOINTS.user);
        const get_balance = await getRequest(ENDPOINTS.balance);
        const transaction = await TransactionsData()
      
        const user: User = {
          email: get_user.email,
          firstName: get_user.other_names,
          surname: get_user.surname,
          phone: get_user.phone,
          profilePicture: `${API_BASE}/${get_user.image}`,
          balance: get_balance.balance,
          transactions: transaction,
          pin_is_set: get_user.pin_is_set,
        };
       
        setState({
          isAuthenticated: true,
          user: user,
          loading: false,
        });
      }
       else {
        setState({
          isAuthenticated: false,
          user: null,
          loading: false,
        });
      }
    } catch (error) {
      setState(prev => ({ ...prev, loading: true }));
      console.log(error)
    }
  }
  loadUser()
       
  },[]);
  
  const login = useCallback(async (_data: LoginFormData) => {
    setState(prev => ({ ...prev, loading: true }));

    deleteCookie('access_token')
    deleteCookie('refresh_token')
    const response = await postRequest(ENDPOINTS.login,_data)
    if (response.detail === undefined) {
      // if (_data.rememberMe) {
      //   setCookie('email', _data.email)
      //   setCookie('password', _data.password)
      // }
      if (response.user.email_verified) {
         setCookie('access_token',response.access_token);
        setCookie('refresh_token', response.refresh_token); 
        
        const get_user = await getRequest(ENDPOINTS.user);
        const get_balance = await getRequest(ENDPOINTS.balance);
        const transaction = await TransactionsData()
              const user: User = {
                id:response.user.id,
                email: get_user.email,
                firstName:get_user.other_names,
                surname: get_user.surname,
                phone: get_user.phone,
                profilePicture: `${API_BASE}/${get_user.image}`,
                balance: get_balance.balance,
                transactions: transaction,
                pin_is_set: get_user.pin_is_set,
        } 
        setState({
          isAuthenticated: true,
                user: user,
          loading: true,
        });
        
        return 'Login Successful. Redirecting ...'
          } else{
         await postRequest(ENDPOINTS.sendOtp,{ email: _data.email });
          setState({
            isAuthenticated: false,
            user: null,
            loading: false,
          });
        return 'Verify Account'
         }    
    } else {
    setState({
          isAuthenticated: false,
          user: null,
          loading: false,
    });
      return response.detail
      
    }
      
  }, []);

  const signup = useCallback(async (data: SignupFormData) => {
    setState(prev => ({ ...prev, loading: true }));
    setState({
        isAuthenticated: false,
        user: null,
        loading: false,
           });
      
    const response = await postRequest(ENDPOINTS.signup, data);
    return response.state
    
  }, []);

  const logout = useCallback(() => {
    deleteCookie("access_token")
    deleteCookie("refresh_token")
    setState({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      setState(prev => ({ ...prev, loading: true }));
      const redirect_uri = `${import.meta.env.VITE_BASE_URL}/dashboard/`;
      const response = await postRequest(ENDPOINTS.oauthGoogle,{
        id_token: tokenResponse.access_token,
        redirect_uri
      });
       if (response.success) {
    
      const get_user = await getRequest(ENDPOINTS.user)
         const get_balance = await getRequest(ENDPOINTS.balance)
          const transaction = await TransactionsData()
    const user: User = {
                id:get_user.id,
                email: get_user.email,
                firstName:get_user.other_names,
                surname: get_user.surname,
                phone: get_user.phone,
                profilePicture: `${API_BASE}/${get_user.image}`,
                balance: get_balance.balance,
                transactions: transaction,
                pin_is_set: get_user.pin_is_set,
        } 
      setState({
      isAuthenticated: true,
      user: user,
      loading: true,
      });
         setCookie('refresh_token',response.refresh_token);
      setCookie('access_token',response.access_token);
    }
      
  } 
    
  })

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


