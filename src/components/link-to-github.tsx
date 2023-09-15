
import { FC, ReactElement } from "react"
import { cn } from "@/lib/utils"

type LinkToGithubProps = {
  className?: string
}

export const LinkToGithub: FC<LinkToGithubProps> = ({ className }): ReactElement => {
  return (
    <a 
      className={cn('text-primary', className)}
      href="https://github.com/matheuszwf"
      target="_blank"
    >
      @matheuzwf
    </a>
  )
}
