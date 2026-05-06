// Placeholder for supabase client - Direct access removed for Headless Architecture
// Replace with API Gateway calls for file uploads in the future
export const supabase = {
  storage: {
    from: (bucket: string) => ({
      upload: async (path: string, file: any) => {
        console.warn('Direct Supabase upload is disabled. Use Gateway API instead.');
        return { data: null, error: new Error('Direct upload disabled') };
      },
      getPublicUrl: (path: string) => ({
        data: { publicUrl: '' }
      })
    })
  }
};
