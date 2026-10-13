import { v2 as cloudinary } from 'cloudinary';

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export { cloudinary };

export function isCloudinaryConfigured(): boolean {
  return Boolean(cloudName && apiKey && apiSecret);
}

export function generateUploadSignature(folder: string = 'solergy/products'): {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
  folder: string;
} {
  if (!apiSecret || !apiKey || !cloudName) {
    throw new Error('Cloudinary environment variables are missing');
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder,
    },
    apiSecret
  );

  return {
    timestamp,
    signature,
    apiKey,
    cloudName,
    folder,
  };
}

export async function deleteCloudinaryAsset(publicId: string, resourceType: 'image' | 'video' = 'image'): Promise<boolean> {
  if (!isCloudinaryConfigured()) return false;

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result.result === 'ok';
  } catch (err) {
    console.error('Error deleting asset from Cloudinary:', err);
    return false;
  }
}

export async function listCloudinaryAssets(options: { maxResults?: number; prefix?: string; resourceType?: 'image' | 'video' } = {}) {
  if (!isCloudinaryConfigured()) return [];

  try {
    const { maxResults = 50, prefix, resourceType = 'image' } = options;
    const query: Record<string, unknown> = {
      max_results: maxResults,
      resource_type: resourceType,
    };
    if (prefix) {
      query.prefix = prefix;
    }
    const result = await cloudinary.api.resources(query);
    return (result.resources || []).map((res: any) => ({
      id: res.asset_id || res.public_id,
      publicId: res.public_id,
      url: res.secure_url,
      type: res.resource_type || resourceType,
      name: res.public_id.split('/').pop() || res.public_id,
      format: res.format,
      bytes: res.bytes,
      width: res.width,
      height: res.height,
      createdAt: res.created_at,
    }));
  } catch (err) {
    console.error('Error listing Cloudinary assets:', err);
    return [];
  }
}

export function getOptimizedImageUrl(publicIdOrUrl: string, options: { width?: number; height?: number; quality?: string } = {}): string {
  if (!publicIdOrUrl) return '';
  if (publicIdOrUrl.startsWith('http://') || publicIdOrUrl.startsWith('https://')) {
    // If it is already a Cloudinary URL, we can return or transform it
    return publicIdOrUrl;
  }

  if (!cloudName) {
    return publicIdOrUrl;
  }

  const { width = 1200, quality = 'auto' } = options;
  return cloudinary.url(publicIdOrUrl, {
    fetch_format: 'auto',
    quality,
    width,
    crop: 'limit',
    secure: true,
  });
}
