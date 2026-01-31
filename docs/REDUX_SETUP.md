# Redux & RTK Query Setup Guide

## Architecture Overview

The application uses Redux Toolkit (RTK) with RTK Query for state management and API integration.

### File Structure

\`\`\`
lib/
├── redux/
│   ├── store.ts                 # Redux store configuration
│   ├── hooks.ts                 # Typed Redux hooks
│   ├── api/
│   │   ├── apiSlice.ts          # Base RTK Query configuration
│   │   ├── authApi.ts           # Authentication endpoints
│   │   ├── videosApi.ts         # Video management endpoints
│   │   ├── categoriesApi.ts     # Category endpoints
│   │   ├── recipesApi.ts        # Recipe endpoints
│   │   ├── subscriptionsApi.ts  # Subscription endpoints
│   │   ├── analyticsApi.ts      # Analytics endpoints
│   │   └── usersApi.ts          # User management endpoints
│   └── features/
│       └── auth/
│           └── authSlice.ts     # Auth state management
└── types/
    └── index.ts                 # Shared TypeScript types
\`\`\`

## Key Features

### 1. RTK Query Setup
- Base API with automatic token injection
- Automatic cache invalidation with tags
- Type-safe endpoints with TypeScript
- Optimistic updates support

### 2. Authentication Flow
- JWT token storage in Redux state
- Automatic auth header injection
- Login/logout/register mutations
- Protected routes with role-based access

### 3. Protected Routes
- User routes: `/dashboard/*`
- Admin routes: `/admin/*`
- Automatic redirect on unauthorized access

### 4. API Slices
Each slice includes:
- GET queries for fetching data
- POST/PUT/DELETE mutations for modifications
- Automatic cache tags for invalidation
- TypeScript interfaces for all data

## Usage Examples

### Using API Endpoints in Components

\`\`\`tsx
'use client'

import { useGetVideosQuery } from '@/lib/redux/api/videosApi'

export function VideoList() {
  const { data, isLoading, error } = useGetVideosQuery({ 
    category: 'beginner',
    gender: 'men' 
  })
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading videos</div>
  
  return (
    <div>
      {data?.videos.map(video => (
        <div key={video.id}>{video.title}</div>
      ))}
    </div>
  )
}
\`\`\`

### Using Mutations

\`\`\`tsx
'use client'

import { useLoginMutation } from '@/lib/redux/api/authApi'
import { useAppDispatch } from '@/lib/redux/hooks'
import { setCredentials } from '@/lib/redux/features/auth/authSlice'

export function LoginForm() {
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useAppDispatch()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await login({ email, password }).unwrap()
      dispatch(setCredentials(result))
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }
  
  return <form onSubmit={handleSubmit}>...</form>
}
\`\`\`

### Accessing Auth State

\`\`\`tsx
'use client'

import { useAppSelector } from '@/lib/redux/hooks'

export function UserProfile() {
  const { user, isAuthenticated } = useAppSelector(state => state.auth)
  
  if (!isAuthenticated) return null
  
  return <div>Welcome, {user?.name}</div>
}
\`\`\`

## Adding New Endpoints

When backend provides new endpoints:

1. Add the endpoint to the appropriate API slice:

\`\`\`typescript
// lib/redux/api/videosApi.ts
export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Add new endpoint here
    getRelatedVideos: builder.query<Video[], string>({
      query: (videoId) => `/videos/${videoId}/related`,
      providesTags: ['Video'],
    }),
  }),
})

// Export the generated hook
export const { useGetRelatedVideosQuery } = videosApi
\`\`\`

2. Use the generated hook in your component:

\`\`\`tsx
const { data: relatedVideos } = useGetRelatedVideosQuery(videoId)
\`\`\`

## Environment Variables

Add to your `.env.local`:

\`\`\`
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
\`\`\`

## Next Steps

1. Replace mock data with actual API calls
2. Implement token persistence (localStorage/cookies)
3. Add refresh token logic
4. Implement error handling middleware
5. Add loading states throughout the app
