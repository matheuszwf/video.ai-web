import { Separator } from "./components/ui/separator";
import { Header } from "./components/header";
import { Prompt } from "./components/prompt";
import { UploadForm } from "./components/uploadForm";
import { ProcessForm } from "./components/ProcessForm";

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header className=""/>

      <main className="container flex flex-1 py-4 gap-6">
        <section className="flex flex-1 flex-col gap-4">
          <Prompt className="max-h-[734px]"/>

          <p className="text-sm text-muted-foreground">
            Remember: you can use the <code className="text-primary font-semibold">{'{transcription}'}</code> variable
            in your prompt to add the content of the selected video's transcription.
          </p>
        </section>
        
        <aside className="w-[306px] space-y-4">
          <UploadForm />
          <Separator />
          <ProcessForm />
        </aside>
      </main>
    </div>
  )
}
