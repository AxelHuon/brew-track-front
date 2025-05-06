import AddDrinkForm from '@/components/organisms/Form/AddDrinkForm/AddDrinkForm.tsx';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppLayout } from '@/contexts/AppLayoutContext/AppLayoutContext.tsx';
import React from 'react';

const AddDrinkDialog: React.FC = () => {
  const { isDialogAddDrinkOpen, setIsDialogAddDrinkOpen } = useAppLayout();

  return (
    <Dialog open={isDialogAddDrinkOpen} onOpenChange={setIsDialogAddDrinkOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une boisson</DialogTitle>
        </DialogHeader>
        <AddDrinkForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddDrinkDialog;
