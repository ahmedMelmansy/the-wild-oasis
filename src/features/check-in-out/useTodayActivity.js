import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity(){
    const { data:Activities, isLoading  } = useQuery({
     queryFn:getStaysTodayActivity,
     queryKey:['today-Activity']
    })

    return {Activities,isLoading}
}

