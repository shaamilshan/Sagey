import { Button } from "@/components/ui/button";  // Adjust according to your UI library
import { Modal } from "@/components/ui/modal";    // Adjust according to your modal component

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  headerText,
  descriptionText,
  confirmButtonText,
  cancelButtonText,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">{headerText}</h2>
      <p className="mb-6">{descriptionText}</p>
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onClose}>
          {cancelButtonText}
        </Button>
        <Button onClick={onConfirm} className="bg-[#166272]  px-3 lg:px-12 py-3 rounded-sm hover:bg-white hover:outline hover:outline-[#166272] hover:text-[#166272] ">
          {confirmButtonText}
        </Button>
      </div>
    </Modal>
  );
}
