const projectId = 'tvuqvrbxusmicpmjqpus' // your supabase project id

export default function supabaseLoader({ src, width, quality }) {
  return `https://${projectId}.supabase.co/storage/v1/render/image/public/${src}?quality=${
    quality || 75
  }`
}
