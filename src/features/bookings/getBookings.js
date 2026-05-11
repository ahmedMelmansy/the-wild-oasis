import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { useEffect } from "react";

export default function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const { data, error, isLoading } = useQuery({
    queryKey: ["bookings", page],
    queryFn: () => getBookings({ page }),

    // 🔥 تمنع الوميض بين الصفحات
    keepPreviousData: true,
  });

  const bookings = data?.data ?? [];
  const count = data?.count ?? 0;

  const pageCount = Math.ceil(count / PAGE_SIZE);

  useEffect(() => {
    // ✅ Next page
    if (page < pageCount) {
      const nextPage = page + 1;

      if (!queryClient.getQueryData(["bookings", nextPage])) {
        queryClient.prefetchQuery({
          queryKey: ["bookings", nextPage],
          queryFn: () => getBookings({ page: nextPage }),
        });
      }
    }

    // ✅ Previous page
    if (page > 1) {
      const prevPage = page - 1;

      if (!queryClient.getQueryData(["bookings", prevPage])) {
        queryClient.prefetchQuery({
          queryKey: ["bookings", prevPage],
          queryFn: () => getBookings({ page: prevPage }),
        });
      }
    }
  }, [page, pageCount, queryClient]);

  return {
    bookings,
    count,
    error,
    isLoading,
  };
}