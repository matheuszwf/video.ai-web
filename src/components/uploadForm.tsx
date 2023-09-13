
import { FC, ReactElement } from "react"
import { cn } from "@/lib/utils"
import { Textarea } from "./ui/textarea"
import { FileVideo, Upload } from "lucide-react"
import { Button } from "./ui/button"

type UploadFormProps = {
  className?: string
}

export const UploadForm: FC<UploadFormProps> = ({ className }): ReactElement => {
  return (
    <form className={cn('space-y-4', className)}>

      <div className="upload">
        <label
          className="flex flex-col justify-center items-center gap-2 border border-dashed 
          rounded-md aspect-video cursor-pointer text-muted-foreground text-sm 
          hover:bg-muted-foreground/5 hover:border-solid ease-linear duration-200"
          htmlFor="video"
        >
          <FileVideo className="w-4 h-4" />
          Upload video.
        </label>
        <input type="file" id="video" accept="video/mp4" className="sr-only" />
      </div>

      <div className="transcription">
        <label
          className="block mb-3"
          htmlFor="transcription-prompt"
        >
          Transcription prompt
        </label>
        <Textarea
          id="transcription-prompt"
          className="leading-relaxed resize-none"
          placeholder="Include keywords mentioned in the video separated by commas"
        />
      </div>

      <Button className="w-full">
        Send video
        <Upload className="w-4 h-4 ml-2" />
      </Button>
    </form>
  )
}
