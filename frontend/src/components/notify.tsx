"use client";
import { useToast } from "@/hooks/use-toast";
import { set } from "date-fns";
import React, { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const Notify = () => {
  const { toast } = useToast();

  useEffect(() => {
    const notifyUser = () => {
      setTimeout(() => {
        toast({
          variant: "notification",
          title: "Organ Match Found",
          description: "A new organ donor match is available! Please Check.",
          duration: 10000,
        });
      }, 3000);
    };

    socket.on("update_matches", notifyUser);

    // Cleanup to remove listener when component unmounts
    return () => {
      socket.off("update_matches", notifyUser);
    };
  }, [toast]);

  return <></>;
};

export default Notify;
