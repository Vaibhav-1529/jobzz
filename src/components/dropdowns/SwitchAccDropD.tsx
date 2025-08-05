import { DeleteAccfromSwitch } from "@/HelperFun/DeleteAccformSwitch";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { EllipsisVertical } from "lucide-react";

export default function SwitchAccDropD({
  id,
  setUsersData,
}: {
  id: string;
  setUsersData: Function;
}) {
async function handledelete() {
  const res = await DeleteAccfromSwitch(id);
  if (res?.success) {
    setUsersData((prev: any[]) => prev.filter((u) => u.id !== id));
  }
}

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <EllipsisVertical />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item
          color="red"
          onClick={() => {
            handledelete();
          }}
        >
          Delete
        </DropdownMenu.Item>
        <DropdownMenu.Item>None</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
