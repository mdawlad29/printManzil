import dynamic from "next/dynamic";
const UserTable = dynamic(() => import("@/components/UserTable"));
const ImageUpload = dynamic(() => import("@/components/ImageUpload"));

export default function Home() {
  return (
    <>
      <UserTable />
      <ImageUpload />
    </>
  );
}
