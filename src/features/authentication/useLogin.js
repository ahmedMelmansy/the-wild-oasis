import {useMutation, useQueryClient} from '@tanstack/react-query'
import{useNavigate} from 'react-router-dom'
import { login as loginApi} from '../../services/apiAuth'
import toast from 'react-hot-toast'
export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading: isLoadingLogin } = useMutation({
    mutationFn: loginApi,

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.data?.user);   // data.user مش user.user

        
      navigate("/dashboard", { replace: true });
    },

    onError: (err) => {
      console.error("Login Error:", err);   // ← مهم
      toast.error(err.message || "Login failed");
},
  });

  return { login, isLoadingLogin };
}