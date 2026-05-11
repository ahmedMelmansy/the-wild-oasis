import { useQueryClient,useMutation, } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser(){
  const queryClient = useQueryClient();

const { mutate: updateUserMutation, isPending: isUpdating } = useMutation({
    mutationFn:updateCurrentUser,
  onSuccess: (user) => {
  toast.success("user updated successfully");

  queryClient.invalidateQueries({ queryKey: ["user"] });

  queryClient.setQueryData(["user"], user);
},

    onError: (err) => toast.error(err.message),
  });
  

return { updateUser: updateUserMutation, isUpdating }

}
