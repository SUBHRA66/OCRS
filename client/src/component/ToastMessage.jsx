export const ToastMessage = ({ message, closeToast }) => {
  return (
    <div>
      {message}
      <button
        onClick={closeToast}
        style={{
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "14px",
          marginLeft: "10px",
        }}
      >
        Close
      </button>
    </div>
  );
};
