import React from "react";
import { confirmable } from "react-confirm";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type PropsDialog = {
  show?: boolean; // from confirmable. indicates if the dialog is shown or not.
  proceed?: any; // from confirmable. call to close the dialog with promise resolved.
  confirmation?: string; // arguments of your confirm function
};

const ConfirmDialog = ({ show, proceed, confirmation }: PropsDialog) => (
  <AlertDialog
    open={show}
    onOpenChange={(state) => {
      if (!state) proceed(false);
    }}
  >
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirmation</AlertDialogTitle>
        <AlertDialogDescription>
          {confirmation || "Êtes-vous sûr de vouloir exécuter cette action ?"}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <Button variant={"outline"} onClick={() => proceed(false)}>
          Cancel
        </Button>
        <Button onClick={() => proceed(true)}>Continue</Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

// confirmable HOC pass props `show`, `dismiss`, `cancel` and `proceed` to your component.
export default confirmable(ConfirmDialog);
