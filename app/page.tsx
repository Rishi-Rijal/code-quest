import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { onBoardUser } from "@/modules/auth";
export default async function Home() {
  const user = await onBoardUser()
  console.log(user)
  return (
    <>
    <div> Hello  I am rishi!</div>
    <Button> Click here</Button>
    <UserButton />
    </>
  );
}
