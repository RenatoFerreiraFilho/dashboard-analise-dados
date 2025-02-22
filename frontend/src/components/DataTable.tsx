import { useEffect, useState } from "react";
import axios from "axios";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, flexRender, ColumnDef } from "@tanstack/react-table";
import "./DataTable.css"; // Arquivo para estilização

interface ImportedData {
    [key: string]: any;
}

const DataTable = () => {
    const [data, setData] = useState<ImportedData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/imported-data")
            .then((response) => {
                // Remove `_id` de cada objeto antes de atualizar o estado
                const cleanedData = response.data.map(({ _id, ...rest }) => rest);
                setData(cleanedData);
            })
            .catch((error) => console.error("Erro ao buscar dados:", error));
    }, []);

    // Criando as colunas dinamicamente com base nos dados, ignorando `_id`
    const columns: ColumnDef<ImportedData>[] = data.length
        ? Object.keys(data[0])
              .filter((key) => key !== "_id") // Remove `_id` da exibição da tabela
              .map((key) => ({
                  accessorKey: key,
                  header: key,
              }))
        : [];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="table-container">
            <h2>📊 Dados Importados</h2>

            {/* Campo de busca */}
            <input type="text" placeholder="🔍 Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />

            {/* Tabela */}
            <table className="data-table">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getIsSorted() ? (header.column.getIsSorted() === "desc" ? " 🔽" : " 🔼") : ""}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginação */}
            <div className="pagination">
                <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    ⬅ Anterior
                </button>
                <span>
                    Página{" "}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                    </strong>
                </span>
                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Próxima ➡
                </button>

                <select value={table.getState().pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
                    {[10, 20, 30, 40, 50].map((size) => (
                        <option key={size} value={size}>
                            Mostrar {size}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default DataTable;
