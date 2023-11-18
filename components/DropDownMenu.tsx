import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AvatarDemo } from "./Avatar"
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export function DropdownMenuDemo() {
    const { status } = useSession()
    if (status === 'unauthenticated') {
        redirect('/login')
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button  className="bg-transparent hover:bg-transparent pb-4 lg:p-4">
                    <AvatarDemo/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 cursor-pointer">
                <DropdownMenuItem onClick={() => signOut()} >
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
