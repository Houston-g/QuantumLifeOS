import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useCreateEvent } from "@/hooks/use-events";
import { toast } from "sonner";

export default function CreateEventDialog() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("thought");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const createEvent = useCreateEvent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createEvent.mutateAsync({
        type,
        title,
        description,
        metadata: {},
      });
      
      toast.success("Event recorded successfully");
      setOpen(false);
      setTitle("");
      setDescription("");
      setType("thought");
    } catch (error) {
      toast.error("Failed to record event");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)]"
          data-testid="button-create-event"
        >
          <Plus className="w-4 h-4 mr-2" />
          Record Event
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-background/95 backdrop-blur-xl border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold font-mono">
            <span className="text-primary">CAPTURE</span> MOMENT
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type" className="text-xs font-mono uppercase text-muted-foreground">Event Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="type" data-testid="select-event-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="biometric">Biometric</SelectItem>
                <SelectItem value="location">Location</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="thought">Thought</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="media">Media</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title" className="text-xs font-mono uppercase text-muted-foreground">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What happened?"
              required
              className="bg-background/50"
              data-testid="input-event-title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-xs font-mono uppercase text-muted-foreground">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details..."
              required
              className="bg-background/50 min-h-[100px]"
              data-testid="textarea-event-description"
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setOpen(false)}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={createEvent.isPending}
              data-testid="button-submit-event"
            >
              {createEvent.isPending ? "Recording..." : "Record Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
