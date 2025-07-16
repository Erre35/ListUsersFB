import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { container } from '../../di/container';
import { User } from '../../domain/entities/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      queryFn: async () => {
        try {
          const users = await container.getUserUseCases().getAllUsers();
          return { data: users };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ['User'],
    }),
    getUserById: builder.query({
      queryFn: async (userId: string) => {
        try {
          const user = await container.getUserUseCases().getUserDetails(userId);
          if (!user) throw new Error('User not found');
          return { data: user };
        } catch (error: any) {
          return { error: error.message };
        }
      },
    }),
    createUser: builder.mutation({
      queryFn: async (userData: Omit<User, 'id'>) => {
        try {
          const user = await container.getUserUseCases().createUser(userData);
          return { data: user };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, useCreateUserMutation } = userApi;