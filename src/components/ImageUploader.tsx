import { useRef, useState } from 'react';
import { ImagePlus, Loader2, Star, X } from 'lucide-react';
import { mediaService } from '@/services/mediaService';
import { resolveImageUrl } from '@/services/api';

interface ImageUploaderProps {
  // First image is the product's main image
  value: string[];
  onChange: (urls: string[]) => void;
  // Only one image; a new upload replaces it
  single?: boolean;
}

const ImageUploader = ({ value, onChange, single = false }: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState('');

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setError('');
    setUploading(files.length);
    const results = await Promise.allSettled(Array.from(files).map((file) => mediaService.upload(file)));
    const uploaded = results.flatMap((r) => (r.status === 'fulfilled' ? [r.value] : []));
    const failed = results.length - uploaded.length;
    if (failed) setError(`${failed} image(s) failed to upload. Use JPEG, PNG or WebP under 5 MB.`);
    if (single) {
      if (uploaded.length) onChange([uploaded[0]]);
    } else {
      onChange([...value, ...uploaded]);
    }
    setUploading(0);
    if (inputRef.current) inputRef.current.value = '';
  };

  const remove = (index: number) => onChange(value.filter((_, i) => i !== index));
  const makeMain = (index: number) => onChange([value[index], ...value.filter((_, i) => i !== index)]);

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {value.map((url, index) => (
          <div key={url + index} className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 group">
            <img src={resolveImageUrl(url)} alt="" className="w-full h-full object-cover" />
            {single ? null : index === 0 ? (
              <span className="absolute top-1.5 left-1.5 bg-primary-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                Main
              </span>
            ) : (
              <button
                type="button"
                onClick={() => makeMain(index)}
                title="Set as main image"
                className="absolute top-1.5 left-1.5 w-6 h-6 rounded-full bg-white/90 text-gray-600 hover:text-primary-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              >
                <Star className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => remove(index)}
              title="Remove"
              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 text-gray-600 hover:text-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading > 0}
          className="aspect-[3/4] rounded-xl border-2 border-dashed border-gray-300 hover:border-primary-400 hover:bg-primary-50 text-gray-500 hover:text-primary-600 flex flex-col items-center justify-center gap-1 transition disabled:opacity-60"
        >
          {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <ImagePlus className="w-6 h-6" />}
          <span className="text-xs font-body font-semibold">
            {uploading ? `Uploading ${uploading}…` : single ? (value.length ? 'Replace image' : 'Add image') : 'Add images'}
          </span>
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple={!single}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {error && <p className="text-sm text-red-600 mt-2 font-body">{error}</p>}
    </div>
  );
};

export default ImageUploader;
