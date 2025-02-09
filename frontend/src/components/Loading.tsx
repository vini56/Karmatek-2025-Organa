import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      <Loader2 className="h-36 w-36 animate-spin text-primary" />
    </div>
  );
};
export default Loading;
