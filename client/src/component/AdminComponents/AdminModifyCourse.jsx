import Modal from 'react-modal';

Modal.setAppElement('#root');

<Modal
  isOpen={showModal}
  onRequestClose={() => setShowModal(false)}
  contentLabel="Modify Course"
>
  <h2>Modify Course</h2>
  <p>{selectedCourse?.ccode}</p>
  <button onClick={() => setShowModal(false)}>Close</button>
</Modal>
