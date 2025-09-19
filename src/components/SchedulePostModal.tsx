import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  X, 
  Calendar as CalendarIcon, 
  Upload, 
  Instagram, 
  Facebook,
  Clock
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface SchedulePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SchedulePostModal = ({ isOpen, onClose }: SchedulePostModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    detail: "",
    scheduledDate: undefined as Date | undefined,
    scheduledTime: "09:00",
    images: [] as File[],
    platforms: [] as string[]
  });

  const platforms = [
    { id: "instagram", name: "Instagram", icon: Instagram },
    { id: "facebook", name: "Facebook", icon: Facebook },
    { id: "twitter", name: "X (Twitter)", icon: () => <span className="font-bold text-sm">X</span> },
    { id: "linkedin", name: "LinkedIn", icon: () => <span className="font-bold text-sm">in</span> }
  ];

  const handlePlatformToggle = (platformId: string) => {
    if (formData.platforms.includes(platformId)) {
      setFormData({
        ...formData,
        platforms: formData.platforms.filter(p => p !== platformId)
      });
    } else {
      setFormData({
        ...formData,
        platforms: [...formData.platforms, platformId]
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setFormData({
        ...formData,
        images: [...formData.images, ...newImages]
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Scheduling post:", formData);
    onClose();
    // Reset form
    setFormData({
      title: "",
      detail: "",
      scheduledDate: undefined,
      scheduledTime: "09:00",
      images: [],
      platforms: []
    });
  };

  const handleCancel = () => {
    onClose();
    // Reset form
    setFormData({
      title: "",
      detail: "",
      scheduledDate: undefined,
      scheduledTime: "09:00",
      images: [],
      platforms: []
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Schedule New Post</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title">Post Title</Label>
            <Input 
              id="title"
              placeholder="Enter post title..."
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          {/* Detail */}
          <div>
            <Label htmlFor="detail">Post Content</Label>
            <Textarea 
              id="detail"
              placeholder="Write your post content here..."
              value={formData.detail}
              onChange={(e) => setFormData({...formData, detail: e.target.value})}
              rows={4}
            />
          </div>

          {/* Scheduled Date & Time */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Scheduled Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.scheduledDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.scheduledDate ? format(formData.scheduledDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.scheduledDate}
                    onSelect={(date) => setFormData({...formData, scheduledDate: date})}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="time">Scheduled Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="time"
                  type="time"
                  value={formData.scheduledTime}
                  onChange={(e) => setFormData({...formData, scheduledTime: e.target.value})}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <Label>Images</Label>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Drag and drop images or</p>
                <Button variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>
                  Choose Files
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              
              {formData.images.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={URL.createObjectURL(image)} 
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Social Platforms */}
          <div>
            <Label>Select Social Platforms</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {platforms.map(platform => (
                <div key={platform.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={platform.id}
                    checked={formData.platforms.includes(platform.id)}
                    onCheckedChange={() => handlePlatformToggle(platform.id)}
                  />
                  <Label htmlFor={platform.id} className="flex items-center gap-2 cursor-pointer">
                    <platform.icon className="h-4 w-4" />
                    {platform.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="btn-hero"
            disabled={!formData.title || !formData.detail || !formData.scheduledDate || formData.platforms.length === 0}
          >
            Schedule Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SchedulePostModal;