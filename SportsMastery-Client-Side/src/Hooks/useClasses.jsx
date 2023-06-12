import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useClasses = () => {

    const [axiosSecure] = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['instructor'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allclasses')
            return res.data;
        }
    })
    return [classes, refetch]
};

export default useClasses;