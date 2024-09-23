import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { User } from './useQueries.types'

const API_URL = 'http://localhost:3001/users';

export const useQueries = () => {
  const queryClient = useQueryClient();

  const fetchUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>(API_URL);
    return response?.data;
  };

  const addUser = useMutation<User, Error, User>({
    mutationFn: async (user) => {
      const response = await axios.post<User>(API_URL, user);
      return response?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['users']});
    },
  });

  const updateUser = useMutation<User, Error, User>({
    mutationFn: async (user) => {
      const response = await axios.put<User>(`${API_URL}/${user.id}`, user);
      return response?.data; 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['users']}); 
    },
  });

  const deleteUser = useMutation<void, Error, number>({
    mutationFn: async (id) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['users']});
    },
  });

  return {
    users: useQuery<User[], Error>({
      queryKey: ['users'],
      queryFn: fetchUsers,
    }),
    addUser,
    updateUser,
    deleteUser,
  };
};