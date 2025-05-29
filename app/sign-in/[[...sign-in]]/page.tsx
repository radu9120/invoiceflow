import Bounded from "@/components/ui/bounded"
import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return <main >
    <Bounded>
      <SignIn />
    </Bounded>
    
  </main>
}
