import { useState } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UploadSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    image: string;
    description: string;
    category: string;
  }) => void;
}

const categories = [
  "Desain Grafis",
  "Pemrograman",
  "Fotografi",
  "Videografi",
  "Penulisan",
  "Marketing",
  "Renovasi",
  "Kerajinan",
  "Katering",
  "Lainnya",
];

export default function UploadSheet({
  isOpen,
  onClose,
  onSubmit,
}: UploadSheetProps) {
  const [imagePreview, setImagePreview] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imagePreview && description.trim() && category) {
      onSubmit({
        image: imagePreview,
        description: description.trim(),
        category,
      });
      setImagePreview("");
      setDescription("");
      setCategory("");
      onClose();
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in"
        onClick={onClose}
        data-testid="overlay-upload-sheet"
      />

      <div className="pb-16 fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-2xl shadow-xl animate-in slide-in-from-bottom max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-lg" data-testid="text-upload-title">
            Unggah Pekerjaan Baru
          </h3>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            data-testid="button-close-upload"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          <div>
            <Label htmlFor="image-upload">Foto/Video Pekerjaan</Label>
            <div className="mt-2">
              {imagePreview ? (
                <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-dashed border-primary">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    data-testid="img-preview"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => setImagePreview("")}
                    data-testid="button-remove-image"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-muted-foreground/50 hover-elevate cursor-pointer"
                  data-testid="label-upload-area"
                >
                  <ImageIcon className="w-12 h-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground font-medium">
                    Klik untuk unggah
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG, atau Video
                  </p>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleImageChange}
                    data-testid="input-file"
                  />
                </label>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="category">Kategori</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-2" data-testid="select-category">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan pekerjaan yang Anda tawarkan atau cari..."
              rows={4}
              className="mt-2"
              data-testid="input-description"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!imagePreview || !description.trim() || !category}
            data-testid="button-submit-post"
          >
            <Upload className="w-4 h-4 mr-2" />
            Unggah Pekerjaan
          </Button>
        </form>
      </div>
    </>
  );
}
