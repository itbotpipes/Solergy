export interface MediaItem {
  id: string;
  publicId: string;
  secureUrl: string;
  resourceType: 'image' | 'video';
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  createdAt: number;
  folder?: string;
}
