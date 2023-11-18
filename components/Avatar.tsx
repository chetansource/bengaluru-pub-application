import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";

export function AvatarDemo() {
  const { data } = useSession();
  const [userImage, setUserImage] = useState(String || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data?.user?.image) {
      setUserImage(data.user.image);
      setLoading(false);
    }
  }, [data]);
  return (
    <Avatar>
      {loading ? (
        <ReactLoading type="spin" color="#3a82f5" height={48} width={48} />
      ) : userImage ? (
        <AvatarImage src={userImage} alt="User Avatar" />
      ) : (
        <AvatarFallback>YOU</AvatarFallback>
      )}
    </Avatar>
  );
}
