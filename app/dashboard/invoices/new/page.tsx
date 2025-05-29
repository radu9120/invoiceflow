import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"


const NewInvoice = async() => {
    const { userId } = await auth()
    if (!userId) redirect('/sign-in')

    return(
        <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center ">
            <article>
                <h1>Invoice Generator</h1>
            </article>

        </main>
    )
}

export default NewInvoice;