import React, { useMemo,  useState  } from 'react';
import { useTable, useFilters, useSortBy, usePagination, useGlobalFilter, useRowSelect } from 'react-table';

// ======================================================
// 🧩 TABLE COMPONENT
// ======================================================
const Table = ({
  data: propData,
  columns: propColumns,
  pageSize = 5,
  showPagination = true,
  showGlobalFilter = true,
  showColumnFilters = true,
  showRowSelection = true, // ✅ Add comma here
  onEdit,
  onDelete
}) => {

  // ======================================================
  // 🛠️ Table Configuration
  // ======================================================
  
  // Prepare data and columns with memoization for performance
  const data = useMemo(() => propData, [propData]);
  
  // Default column filter component
  function DefaultColumnFilter({
    column: { filterValue, setFilter, Header },
  }) {
    return (
      <input
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value || undefined)}
        placeholder={`Filter ${Header}`}
        className="filter-input"
      />
    );
  }

  const defaultColumn = {
    Filter: DefaultColumnFilter,
  };

  // Add selection column if enabled
  const columns = useMemo(() => {
    if (showRowSelection) {
      return [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
          ),
          disableSortBy: true,
          width: 50
        },
        ...propColumns
      ];
    }
    return propColumns;
  }, [propColumns, showRowSelection]);

  // ======================================================
  // 🔧 React-Table Hooks
  // ======================================================
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    
    // Pagination
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize: currentPageSize, globalFilter },
    
    // Filtering
    setGlobalFilter,
    
    // Row selection
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { 
        pageIndex: 0, 
        pageSize: pageSize,
        sortBy: [{ id: columns[0]?.id || 'id', desc: false }] // Default to first column
      }
    },
    useFilters,        
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Superhero Database</h2>
        
        {/* Global Filter */}
        {showGlobalFilter && (
          <div className="global-filter">
            <input
              type="text"
              value={globalFilter || ''}
              onChange={e => setGlobalFilter(e.target.value)}
              placeholder="Search all columns..."
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        )}
      </div>

      {/* Column Filters */}
      {showColumnFilters && (
        <div className="column-filters">
          {headerGroups.map(headerGroup => (
            <div {...headerGroup.getHeaderGroupProps()} className="filter-row" key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <div {...column.getHeaderProps()} className="filter-cell" key={column.id}>
                  {column.canFilter ? column.render('Filter') : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Main Table */}
      <div className="table-wrapper">
        <table {...getTableProps()} className="superhero-table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                    <div className="header-content">
                      {column.render('Header')}
                      <span className="sort-indicator">
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className={row.isSelected ? 'selected' : ''} key={row.id}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {showPagination && (
        <div className="pagination-controls">
          <div className="pagination-info">
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
            | Showing {page.length} of {data.length} records
          </div>
          
          <div className="pagination-buttons">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>{' '}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {'>>'}
            </button>{' '}
          </div>
          
          <div className="page-size-selector">
            <span>Show: </span>
            <select
              value={currentPageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 20, 30, 40, 50].map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Selected Rows Info */}
      {showRowSelection && selectedFlatRows.length > 0 && (
        <div className="selection-info">
          <strong>{selectedFlatRows.length}</strong> row(s) selected
        </div>
      )}
    </div>
  );
};

// ======================================================
// 🦸‍♂️ SUPERHEROES COMPONENT - EXAMPLE USAGE
// ======================================================
const SuperHeroes = () => {

  
  // Sample data
    const initialSuperheroes = [
    { id: 1, name: 'Spider-Man', realName: 'Peter Parker', age: 23, power: 'Wall-crawling', status: 'Active', team: 'Avengers' },
    { id: 2, name: 'Iron Man', realName: 'Tony Stark', age: 48, power: 'Powered armor suit', status: 'Deceased', team: 'Avengers' },
    { id: 3, name: 'Captain America', realName: 'Steve Rogers', age: 105, power: 'Super soldier', status: 'Retired', team: 'Avengers' },
    { id: 4, name: 'Thor', realName: 'Thor Odinson', age: 1500, power: 'God of Thunder', status: 'Active', team: 'Avengers' },
    { id: 5, name: 'Black Widow', realName: 'Natasha Romanoff', age: 35, power: 'Master spy', status: 'Deceased', team: 'Avengers' },
    { id: 6, name: 'Hulk', realName: 'Bruce Banner', age: 52, power: 'Super strength', status: 'Active', team: 'Avengers' },
    { id: 7, name: 'Doctor Strange', realName: 'Stephen Strange', age: 42, power: 'Mystic arts', status: 'Active', team: 'Defenders' },
    { id: 8, name: 'Wolverine', realName: 'Logan', age: 197, power: 'Healing factor', status: 'Active', team: 'X-Men' },
    { id: 9, name: 'Storm', realName: 'Ororo Munroe', age: 40, power: 'Weather manipulation', status: 'Active', team: 'X-Men' },
    { id: 10, name: 'Black Panther', realName: "T'Challa", age: 42, power: 'Enhanced abilities', status: 'Active', team: 'Avengers' },
  ];
  
// Use state with initial data
  const [data, setData] = useState(initialSuperheroes);  
  
  const [editingHero, setEditingHero] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Open edit modal
  const openEditModal = (hero) => {
    setEditingHero(hero);
    setIsEditModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingHero(null);
  };

  // Handle saving edits
  const handleSaveEdit = () => {
    if (editingHero) {
      handleEdit(editingHero);
      closeEditModal();
    }
  };

  // Event handlers remain the same
  const handleDelete = heroToDelete => setData(old => old.filter(h => h.id !== heroToDelete.id));
  const handleEdit = updatedHero => setData(old => old.map(h => (h.id === updatedHero.id ? updatedHero : h)));

  // Column definitions
  const columns = [
    { Header: 'Hero Name', accessor: 'name', width: 150 },
    { Header: 'Real Name', accessor: 'realName', width: 150 },
    { Header: 'Age', accessor: 'age', width: 80 },
    { Header: 'Superpower', accessor: 'power', width: 200 },
    { 
      Header: 'Status', 
      accessor: 'status',
      Cell: ({ value }) => {
        const statusClass = value.toLowerCase().replace(' ', '-');
        return <span className={`status-badge ${statusClass}`}>{value}</span>;
      },
      width: 120 
    },
    { Header: 'Team', accessor: 'team', width: 120 },
    { 
      Header: 'Actions', 
      disableSortBy: true,
      width: 150,
      Cell: ({ row }) => (
        <div className="actions">
          <button
            className="btn edit-btn"
            onClick={() => openEditModal(row.original)}
          >
            Edit
          </button>
          <button
            className="btn delete-btn"
            onClick={() => handleDelete(row.original)}
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="app">
      <h1>Marvel Superhero Database</h1>
      <div className="app-container">
        <Table 
          data={data}  
          columns={columns}
          // onEdit={handleEdit}
          // onDelete={handleDelete}
          pageSize={5}
          showGlobalFilter={true}
          showColumnFilters={true}
          showRowSelection={true}
        />
        {/* Edit Modal */}
        {isEditModalOpen && editingHero && (
          <div className="modal-overlay">
            <div className="edit-modal">
              <h3>Edit Superhero</h3>
              <div className="form-group">
                <label>Hero Name:</label>
                <input 
                  type="text" 
                  value={editingHero.name} 
                  onChange={e => setEditingHero({...editingHero, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Real Name:</label>
                <input 
                  type="text" 
                  value={editingHero.realName} 
                  onChange={e => setEditingHero({...editingHero, realName: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Age:</label>
                <input 
                  type="number" 
                  value={editingHero.age} 
                  onChange={e => setEditingHero({...editingHero, age: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="form-group">
                <label>Superpower:</label>
                <input 
                  type="text" 
                  value={editingHero.power} 
                  onChange={e => setEditingHero({...editingHero, power: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select 
                  value={editingHero.status} 
                  onChange={e => setEditingHero({...editingHero, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Deceased">Deceased</option>
                  <option value="Retired">Retired</option>
                </select>
              </div>
              <div className="form-group">
                <label>Team:</label>
                <input 
                  type="text" 
                  value={editingHero.team} 
                  onChange={e => setEditingHero({...editingHero, team: e.target.value})}
                />
              </div>
              <div className="modal-actions">
                <button className="btn cancel-btn" onClick={closeEditModal}>
                  Cancel
                </button>
                <button className="btn save-btn" onClick={handleSaveEdit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperHeroes;