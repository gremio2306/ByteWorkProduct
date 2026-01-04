function Table({ children, className = "" }) {
  return <table className={`w-full ${className}`}>{children}</table>;
}

function TableHeader({ children }) {
  return <thead>{children}</thead>;
}

function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

function TableRow({ children, className = "" }) {
  return <tr className={className}>{children}</tr>;
}

function TableHead({ children, className = "" }) {
  return <th className={`text-left ${className}`}>{children}</th>;
}

function TableCell({ children, className = "" }) {
  return <td className={className}>{children}</td>;
}

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
};