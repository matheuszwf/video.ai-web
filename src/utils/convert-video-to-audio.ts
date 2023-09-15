import { getFFmpeg } from "@/lib/ffmpeg"
import { fetchFile } from "@ffmpeg/util"

export const convertVideoToAudio = async (video: File) => {
  const ffmpeg = await getFFmpeg()
  const fetch = await fetchFile(video)

  await ffmpeg.writeFile('video.mp4', fetch)
  await ffmpeg.exec([
    '-i',
    'video.mp4',
    '-map',
    '0:a',
    '-b:a',
    '20K',
    '-acodec',
    'libmp3lame',
    'audio.mp3'
  ])

  const data = await ffmpeg.readFile('audio.mp3')
  const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })
  const audioFile = new File([audioFileBlob], 'audio.mp3', { type: 'audio/mpeg' })

  return audioFile
}