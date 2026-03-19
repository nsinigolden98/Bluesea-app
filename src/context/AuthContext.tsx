import React, { createContext, useContext, useState, useCallback } from 'react';
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
interface AuthContextType extends AuthState {
  login: (data: LoginFormData) => Promise<void>;
  signup: (data: SignupFormData) => Promise<void>;
  logout: () => void;
  googleLogin: ()=> void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: false,
  });

  const login = useCallback(async (_data: LoginFormData) => {
    setState(prev => ({ ...prev, loading: true }));

    deleteCookie('access_token')
    deleteCookie('refresh_token')
    const response = await postRequest(ENDPOINTS.login, '', _data)
    console.log(response);
    if (response.detail === undefined) {
      // if (_data.rememberMe) {
      //   setCookie('email', _data.email)
      //   setCookie('password', _data.password)
      // }
      if (response.user.email_verified) {
        const get_user = await getRequest(ENDPOINTS.user,response.access_token);
        const get_balance = await getRequest(ENDPOINTS.balance, response.access_token);
              const user: User = {
                id:response.user.id,
                email: get_user.email,
                firstName:get_user.other_names,
                surname: get_user.surname,
                phone: get_user.phone,
                profilePicture: `${API_BASE}/${get_user.image}`,
                balance: get_balance.balance
        } 
        setState({
          isAuthenticated: true,
                user: user,
          loading: true,
        });
        
           setCookie('access_token',response.refresh_token);
        setCookie('refresh_token', response.access_token); 
        
        return 'Login Successful. Redirecting ...'
          } else{
        await postRequest(ENDPOINTS.sendOtp, "", { email: _data.email });
          setState({
            isAuthenticated: true,
            user: null,
            loading: false,
          });
        return 'Email Already Registered'
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
    
    // const response = await postRequest(ENDPOINTS.signup, "", data);
    // console.log(response)
    // if (response.state) {
      
    //        setState({
    //     isAuthenticated: false,
    //     user: null,
    //     loading: false,
    //        });
    //    return response
    // } else {
       setState({
      isAuthenticated: false,
      user: null,
      loading: false,
       });
    //       }
      
    
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
      const response = await postRequest(ENDPOINTS.oauthGoogle, "",{
        id_token: tokenResponse.access_token,
        redirect_uri
      });
       if (response.success) {
    
    const get_user = await getRequest(ENDPOINTS.user,response.access_token)
    const get_balance = await getRequest(ENDPOINTS.balance, response.access_token)
    window.location.href = redirect_uri;
    const user: User = {
                id:get_user.id,
                email: get_user.email,
                firstName:get_user.other_names,
                surname: get_user.surname,
                phone: get_user.phone,
                profilePicture: `${API_BASE}/${get_user.image}`,
                balance: get_balance.balance
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


