import { Theme, ThemeContext } from "@/contexts/Theme"
import { FC, ReactElement, useContext } from "react"
import { Button } from "./ui/button"
import { Lightbulb, LightbulbOff } from "lucide-react"
import { cn } from "@/lib/utils"

type ThemeToggleProps = {
  className?: string,
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' 
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ className, variant = 'outline' }): ReactElement => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <Button
      className={cn('p-0 w-10 h-10', className)}
      onClick={toggleTheme}
      variant={variant}
    >
      {
        theme === Theme.dark
          ? <LightbulbOff className="h-4 w-4" />
          : <Lightbulb className="h-4 w-4" />
      }
    </Button>
  )
}
