import { FC, ReactElement } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { ThemeToggle } from "./themeToggle";
import { LinkToGithub } from "./linkToGithub";

type HeaderProps = {
  className?: string
}

export const Header: FC<HeaderProps> = ({ className }): ReactElement => {
  return (
    <header className={cn('border-b h-16', className)}>
      <div className="container flex items-center justify-between h-full">
        <h1 className="text-2xl font-semibold uppercase">video<span className="text-primary">.ai</span></h1>

        <div className="flex items-center gap-4 text-muted-foreground">
          <p>Made with 💙 by <LinkToGithub /> at Rocketseat NLW!</p>

          <Separator className="h-6" orientation="vertical" />

          <ThemeToggle />
        </div>

      </div>
    </header>
  )
}