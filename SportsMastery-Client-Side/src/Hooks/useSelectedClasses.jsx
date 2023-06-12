import { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthProvider';

const useSelectedClasses = () => {

    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { data: selectClasses = [], refetch } = useQuery({
        queryKey: ['selectClasses'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/selectedClasses/${user?.email}`);
            return res.data;
        }
    })
    return [selectClasses, refetch]
};

export default useSelectedClasses;