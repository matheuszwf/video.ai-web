
import { FC, ReactElement } from "react"
import { cn } from "@/lib/utils"
import { Wand2 } from "lucide-react"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

type ProcessFormProps = {
  className?: string
}

export const ProcessForm: FC<ProcessFormProps> = ({ className }): ReactElement => {
  return (
    <form className={cn('space-y-4', className)}>
      <div>
        <label className="block mb-3">Model</label>
        <Select defaultValue="gpt3.5">
          <SelectTrigger>
            <SelectValue placeholder="Select a model..." />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
            <SelectItem value="coming-soon" disabled>New options coming soon</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block mb-3">Prompt</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a predefined prompt..." />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="title">Video title</SelectItem>
            <SelectItem value="description">Video description</SelectItem>
            <SelectItem value="captions">Video captions</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block  mb-3">Creativity</label>

        <Slider step={0.1} min={0} max={1} defaultValue={[.3]} />

        <span className="block text-sm text-muted-foreground mt-4">
          Higher values tend to generate more creative but also more incoherent results.
        </span>
      </div>

      <Button className="w-full">
        Process
        <Wand2 className="w-4 h-4 ml-2" />
      </Button>
    </form>
  )
}
