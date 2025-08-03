'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface IModalControl {
  modalVisibleState: boolean;
  setModalVisibleState: (state: boolean) => void;
}

const ModalDefaultValue: IModalControl & {
  children: React.ReactNode | null;
  isVisible: boolean;
} = {
  children: null,
  isVisible: false,
  modalVisibleState: false,
  setModalVisibleState: () => {},
};

export const ModalContext = createContext(ModalDefaultValue);

export default function Modal({
  modalVisibleState,
  setModalVisibleState,
  children,
}: IModalControl & { children: React.ReactNode }) {
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (modalVisibleState) {
      setTimeout(() => {
        setIsVisible(true);
      }, 0);
    }
    setPortalElement(document.getElementById('portal'));
  }, [modalVisibleState]);

  const closeModal = (state: boolean) => {
    setIsVisible(state);
    setTimeout(() => {
      setModalVisibleState(state);
    }, 200);
  };

  return (
    <ModalContext.Provider
      value={{
        modalVisibleState,
        setModalVisibleState: (state: boolean) => closeModal(state),
        children,
        isVisible,
      }}
    >
      {modalVisibleState && portalElement
        ? createPortal(<ModalWrapper />, portalElement)
        : null}
    </ModalContext.Provider>
  );
}

function ModalWrapper() {
  return (
    <>
      <ModalBackdrop />
      <ModalContent />
    </>
  );
}

function ModalBackdrop() {
  const { isVisible, setModalVisibleState } = useContext(ModalContext);
  return (
    <div
      className={`absolute top-0 left-0 w-screen h-screen z-[1] transition-all duration-200 ease-out ${isVisible ? 'backdrop-blur-xs bg-black/30' : 'backdrop-blur-none bg-transparent'}`}
      onClick={() => setModalVisibleState(false)}
    />
  );
}

function ModalContent() {
  const { children, isVisible } = useContext(ModalContext);

  return (
    <div className="relative w-screen h-screen flex justify-center items-center z-[2] pointer-events-none">
      <div
        className={`w-fit h-fit bg-white rounded-lg pointer-events-auto transition-all duration-200 ease-out ${isVisible ? 'mb-0 opacity-100' : 'mb-4 opacity-0'}`}
      >
        {children}
      </div>
    </div>
  );
}
