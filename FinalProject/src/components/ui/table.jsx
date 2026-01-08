function Table({ children, className = "" }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={`w-full text-sm ${className}`}>{children}</table>
    </div>
  );
}

function TableHeader({ children, className = "" }) {
  return <thead className={`bg-slate-50 ${className}`}>{children}</thead>;
}

function TableBody({ children, className = "" }) {
  return <tbody className={className}>{children}</tbody>;
}

function TableRow({ children, className = "" }) {
  return (
    <tr
      className={
        "border-b last:border-b-0 hover:bg-slate-50/70 transition-colors " +
        className
      }
    >
      {children}
    </tr>
  );
}

function TableHead({ children, className = "" }) {
  return (
    <th
      className={
        "h-12 px-4 text-left align-middle font-semibold text-slate-700 border-b " +
        className
      }
    >
      {children}
    </th>
  );
}

function TableCell({ children, className = "" }) {
  return (
    <td className={"px-4 py-3 align-middle text-slate-700 " + className}>
      {children}
    </td>
  );
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
