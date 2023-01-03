import { useCallback, useState } from "react";

type ReturnTypes = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleToggle: () => void;
};

const useOpen = (initialState = false): ReturnTypes => {
  const [open, setOpen] = useState(initialState);

  const handleOpen = useCallback(() => setOpen(true), []);

  const handleClose = useCallback(() => setOpen(false), []);

  const handleToggle = useCallback(() => setOpen(!open), [open]);

  return {
    open,
    handleOpen,
    handleClose,
    handleToggle,
  };
};

export default useOpen;
