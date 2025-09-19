import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Instagram, Twitter, Facebook, Linkedin, Calendar, User, Tag } from "lucide-react";

interface PostDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: number;
    title: string;
    status: string;
    scheduledDate: string;
    platform: string;
    revisions: number;
  } | null;
}

const PostDetailsModal = ({ isOpen, onClose, post }: PostDetailsModalProps) => {
  if (!post) return null;

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'twitter':
      case 'x':
        return <Twitter className="h-5 w-5" />;
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      default:
        return <Tag className="h-5 w-5" />;
    }
  };

  const getPlatformContent = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return {
          content: "🌟 Exciting news! Our summer campaign is officially live! ✨\n\nWe're thrilled to share our latest product innovations with you. From sleek design to cutting-edge features, this collection represents months of dedication and creativity.\n\n#SummerCampaign #Innovation #TechLife #NewProduct #Excited",
          image: "/placeholder.svg",
          style: "Instagram Post"
        };
      case 'twitter':
      case 'x':
        return {
          content: "🚀 Big announcement! Our summer campaign launches today with game-changing product features.\n\nWhat excites you most about innovation in tech? Let us know! 👇\n\n#TechInnovation #SummerLaunch #NewFeatures",
          image: "/placeholder.svg", 
          style: "Twitter Thread"
        };
      case 'linkedin':
        return {
          content: "We're proud to announce the launch of our summer campaign, showcasing breakthrough innovations that will transform how businesses approach technology.\n\nOur team has worked tirelessly to deliver solutions that not only meet current market demands but anticipate future needs. This campaign represents our commitment to excellence and continuous improvement.\n\nKey highlights:\n• Advanced feature set\n• User-centric design\n• Scalable solutions\n• 24/7 support\n\nWe invite you to explore these innovations and see how they can benefit your organization.\n\n#Innovation #BusinessTech #SummerCampaign #Solutions",
          image: "/placeholder.svg",
          style: "LinkedIn Article"
        };
      default:
        return {
          content: "Check out our latest campaign featuring innovative products and services!",
          image: "/placeholder.svg",
          style: "Social Media Post"
        };
    }
  };

  const platformContent = getPlatformContent(post.platform);
  const isInReview = post.status === 'review';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getPlatformIcon(post.platform)}
            {post.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Post Info */}
          <div className="flex items-center gap-4 p-4 bg-accent/5 rounded-lg">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{post.scheduledDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{post.platform}</span>
            </div>
            {post.revisions > 0 && (
              <Badge variant="outline">
                {post.revisions} revision{post.revisions > 1 ? 's' : ''}
              </Badge>
            )}
          </div>

          {/* Review Status Message */}
          {isInReview && (
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <p className="text-sm text-warning-foreground font-medium">
                🔍 Post is currently under review
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Our team is reviewing this content and will provide feedback shortly.
              </p>
            </div>
          )}

          {/* Platform-styled Content Preview */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              {getPlatformIcon(post.platform)}
              <span className="font-medium">{platformContent.style}</span>
            </div>
            
            {/* Content */}
            <div className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-line text-sm leading-relaxed">
                  {platformContent.content}
                </p>
              </div>
              
              {/* Mock Image */}
              <div className="relative">
                <img 
                  src={platformContent.image} 
                  alt="Post preview" 
                  className="w-full max-w-md mx-auto rounded-lg border"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  AI Generated
                </div>
              </div>
            </div>
          </Card>

          {/* Platform-specific styling note */}
          <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded">
            <strong>Note:</strong> Content is optimized for {post.platform} with appropriate hashtags, mentions, and formatting.
          </div>

          {/* Actions */}
          <div className="flex justify-end">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailsModal;