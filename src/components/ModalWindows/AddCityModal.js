import Modal from "../ui/Modal";
import AddCityForm from "../forms/AddCityForm";

const AddCityModal = ({ zIndex, appDispatch }) => {
  return (
    <Modal
      zIndex={zIndex}
      overlayClassName="modal-overlay--add-city"
      modalClassName="add-city-modal"
      hasOverlay
    >
      <AddCityForm appDispatch={appDispatch} />
    </Modal>
  );
};

export default AddCityModal;
