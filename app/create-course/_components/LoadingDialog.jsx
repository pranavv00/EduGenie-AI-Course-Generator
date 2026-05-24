import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

function LoadingDialog({ loading }) {
  return (
    <div>
      <AlertDialog open={loading}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <VisuallyHidden>Loading Dialog</VisuallyHidden>
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="flex flex-col items-center py-8">
                <Image src={"/loader.gif"} alt="loader" width={80} height={80} />
                <h2 className="text-sm text-zinc-600 dark:text-zinc-400 mt-4">
                  Generating your course...
                </h2>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default LoadingDialog;
