import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  Newspaper,
  Folders,
  CreditCard,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <Command className="bg-secondary rounded-none ">
      <CommandList>
        <CommandGroup>
          <CommandItem
            className="
            text-primary-100
            text-lg
            flex
            items-center
            justify-start
            hover:bg-primary-500
          "
          >
            <LayoutDashboard className="mr-2 h-6 w-6" />
            <Link href="/">Dashboard</Link>
          </CommandItem>

          <CommandItem
            className="
            text-primary-100
            text-lg
            flex
            items-center
            justify-start"
          >
            <User className="mr-2 h-6 w-6" />
            <Link href="/users">Users</Link>
          </CommandItem>

          <CommandItem
            className="
            text-primary-100
            text-lg
            flex
            items-center
            justify-start"
          >
            <Newspaper className="mr-2 h-6 w-6" />
            <Link href="/posts">Posts</Link>
          </CommandItem>

          <CommandItem
            className="
            text-primary-100
            text-lg
            flex
            items-center
            justify-start"
          >
            <Folders className="mr-2 h-6 w-6" />
            <Link href="/reports">Reports</Link>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
