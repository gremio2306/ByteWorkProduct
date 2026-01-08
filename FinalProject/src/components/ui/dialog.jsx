import * as React from "react";

const DialogContext = React.createContext(null);

function Dialog({ children }) {
  const [open, setOpen] = React.useState(false);
  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

function DialogTrigger({ asChild, children }) {
  const { setOpen } = React.useContext(DialogContext);
  const child = React.Children.only(children);

  return React.cloneElement(child, {
    onClick: (e) => {
      child.props?.onClick?.(e);
      setOpen(true);
    },
  });
}

function DialogClose({ asChild, children }) {
  const { setOpen } = React.useContext(DialogContext);
  const child = React.Children.only(children);

  return React.cloneElement(child, {
    onClick: (e) => {
      child.props?.onClick?.(e);
      setOpen(false);
    },
  });
}

function DialogContent({ children }) {
  const { open, setOpen } = React.useContext(DialogContext);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Dialog panel */}
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
        {/* Close button */}
        <button
          className="absolute right-3 top-3 rounded-xl px-2 py-1 text-slate-500 hover:bg-slate-100 transition"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}

function DialogHeader({ children }) {
  return <div className="mb-3 space-y-1">{children}</div>;
}

function DialogTitle({ children }) {
  return (
    <h3 className="text-lg font-semibold text-slate-900">{children}</h3>
  );
}

function DialogDescription({ children }) {
  return <p className="text-sm text-slate-500">{children}</p>;
}

function DialogFooter({ children }) {
  return (
    <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
      {children}
    </div>
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
};
