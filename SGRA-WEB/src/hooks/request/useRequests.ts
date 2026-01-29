import { RequestAccountService } from "@/service/requestAccountService";
import { RequestAccountDTO } from "@/tipos/DTOs/requestAccountDTO";
import { useCallback, useEffect, useState } from "react";

export function useRequest() {
  const [request, setRequest] = useState<RequestAccountDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSolicitudes = useCallback(async () => {
    try {

      setLoading(true);
      setError(null);

      const response = await RequestAccountService.list();

      setRequest(response.data.solicitudes);
      
    } catch (err) {
      setError("Error al cargar solicitudes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSolicitudes();
  }, [fetchSolicitudes]);

  return { request, loading, error, refetch: fetchSolicitudes };
}
