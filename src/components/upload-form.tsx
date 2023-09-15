
import { ChangeEvent, FC, FormEvent, ReactElement, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Textarea } from "./ui/textarea"
import { FileVideo, Upload, CheckCircle, CircleSlash, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { convertVideoToAudio } from "@/utils/convert-video-to-audio"
import { api } from "@/lib/axios"

type Status = 'waiting' | 'converting' | 'uploading' | 'generating' | 'success' | 'error'

const statusMessages: Record<Status, string> = {
  waiting: 'Send video',
  converting: 'Converting...',
  uploading: 'Uploading...',
  generating: 'Generating transcriptions...',
  success: 'Success!',
  error: 'Error!'
}

const statusIcons: Record<Status, ReactElement> = {
  waiting: <Upload className="w-4 h-4" />,
  converting: <Loader2 className="w-5 h-5 animate-spin" />,
  uploading: <Loader2 className="w-5 h-5 animate-spin" />,
  generating: <Loader2 className="w-5 h-5 animate-spin" />,
  success: <CheckCircle className="w-5 h-5" />,
  error: <CircleSlash className="w-5 h-5" />
}

type UploadFormProps = {
  className?: string
}

export const UploadForm: FC<UploadFormProps> = ({ className }): ReactElement => {
  const [status, setStatus] = useState<Status>('waiting')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  
  const promptInputRef = useRef<HTMLTextAreaElement>(null)

  const handleVideoSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget

    setStatus('waiting')
    setVideoFile(null)

    if (!files) return

    const selectedFile = files[0]
    setVideoFile(selectedFile)
  }

  const convertToAudio = async (videoFile: File): Promise<File> => {
    setStatus('converting')
    
    return await convertVideoToAudio(videoFile)
  }

  const uploadAudio = async (audioFile: File): Promise<string> => {
    setStatus('uploading')

    const data = new FormData()
    data.append('file', audioFile)
    const response = await api.post('/audio', data)

    return response.data.uploadedFile.id
  } 

  const generateTranscription = async (audioId: string, prompt: string): Promise<string> => {
    setStatus('generating')

    const response = await api.post(`/audio/${audioId}/transcription`, {
      prompt
    })

    return response.data?.transcription
  }

  const handleVideoUpload = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      const prompt = promptInputRef.current?.value

      if (!videoFile) return
    
      const audioFile = await convertToAudio(videoFile)
      const audioId = await uploadAudio(audioFile)
      const transcription = await generateTranscription(audioId, prompt || '')

      if(transcription){
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  const previewURL = useMemo(() => {
    if (!videoFile) return null

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <form className={cn('space-y-4', className)} onSubmit={handleVideoUpload}>
      <div className="upload">
        <label
          className={`
            relative flex flex-col justify-center items-center gap-2 border border-dashed 
            rounded-md aspect-video text-muted-foreground text-sm overflow-hidden
            hover:bg-muted-foreground/5 ease-linear duration-200 border 
            ${previewURL && 'border-transparent'}
            ${status === "waiting" ? 'cursor-pointer' : 'cursor-not-allowed'}
          `}
          htmlFor="video"
        >
          {
            previewURL
              ? <video
                src={previewURL}
                className="pointer-events-none absolute inset-0"
                controls={false}
              />
              : <>
                <FileVideo className="w-4 h-4" />
                Upload video.
              </>
          }
        </label>
        <input
          type="file"
          id="video"
          accept="video/mp4"
          className="sr-only"
          onChange={handleVideoSelection}
          disabled={status !== "waiting" && status !== "error" && status !== "success"}
        />
      </div>

      <div className="transcription">
        <label
          className="block mb-3"
          htmlFor="transcription-prompt"
        >
          Transcription prompt
        </label>
        <Textarea
          ref={promptInputRef}
          id="transcription-prompt"
          className="leading-relaxed resize-none"
          placeholder="Include keywords mentioned in the video separated by commas."
          disabled={status !== "waiting"}
        />
      </div>

      <Button
        data-success={status === "success"}
        data-error={status === "error"}
        className="w-full gap-2 data-[success=true]:bg-green-600 data-[success=true]:dark:bg-green-800 data-[success=true]:opacity-100 data-[error=true]:bg-destructive data-[error=true]:opacity-100"
        disabled={!videoFile || status !== "waiting"}
      >
        {statusMessages[status]}
        {statusIcons[status]}
      </Button>
    </form>
  )
}
