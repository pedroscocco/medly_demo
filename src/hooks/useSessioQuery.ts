import { useQuery } from "@tanstack/react-query";
import myfetch from "../api/myfetch";
import { Session } from "../types";

export default function useSessionQuery() {
    return useQuery<Session>({
        queryKey: ['questions'],
        queryFn: async () => {
            const response = await myfetch('/sessions/questions', 'GET');
            if (response.code === '200') {
                return response.data as Session;
            }
            throw new Error(response.error || 'Failed to fetch questions');
        },
    });
}