import { useRef, useState } from 'react';
import { TfiReload } from 'react-icons/tfi';
import { HiHashtag } from 'react-icons/hi';
import { PiDotsThreeBold, PiArrowsSplit } from 'react-icons/pi';
import { GoPlus } from 'react-icons/go';
import { FaBriefcase, FaUserAlt, FaGlobe, FaSmile } from 'react-icons/fa';
import { IoIosArrowDropdownCircle, IoIosArrowDown } from 'react-icons/io';
import { IoLinkOutline, IoCalendar, IoHandLeft } from 'react-icons/io5';
import { LiaRupeeSignSolid } from 'react-icons/lia';

type Job = {
  jobRequest: string;
  submitted: string;
  status: string;
  submitter: string;
  url: string;
  assigned: string;
  priority: string;
  dueDate: string;
  value: string;
};

const jobs: Job[] = [
  {
    jobRequest: 'Launch social media campaign for product',
    submitted: '15-11-2024',
    status: 'In-process',
    submitter: 'Aisha Patel',
    url: 'www.aishapatel.com',
    assigned: 'Sophie Choudhary',
    priority: 'Medium',
    dueDate: '20-11-2024',
    value: '6,200,000',
  },
  {
    jobRequest: 'Update press kit for company redesign',
    submitted: '28-10-2024',
    status: 'Need to start',
    submitter: 'Irfan Khan',
    url: 'www.irfankhan.com',
    assigned: 'Tejas Pandey',
    priority: 'High',
    dueDate: '30-10-2024',
    value: '3,500,000',
  },
  {
    jobRequest: 'Finalize user testing feedback for app',
    submitted: '05-12-2024',
    status: 'In-process',
    submitter: 'Mark Johnson',
    url: 'www.markjohnson.com',
    assigned: 'Rachel Lee',
    priority: 'Medium',
    dueDate: '10-12-2024',
    value: '4,750,000',
  },
  {
    jobRequest: 'Design new features for the website',
    submitted: '10-01-2025',
    status: 'Complete',
    submitter: 'Emily Green',
    url: 'www.emilygreen.com',
    assigned: 'Tom Wright',
    priority: 'Low',
    dueDate: '15-01-2025',
    value: '5,900,000',
  },
  {
    jobRequest: 'Prepare financial report for Q4',
    submitted: '25-01-2025',
    status: 'Blocked',
    submitter: 'Jessica Brown',
    url: 'www.jessicabrown.com',
    assigned: 'Kevin Smith',
    priority: 'Low',
    dueDate: '30-01-2025',
    value: '2,800,000',
  },
];

const emptyRows = 100;
const statusBorder = 'px-2 py-1 rounded-xl text-xs font-medium';

const getStatusColor = (status: string) => {
  const val = status.toLowerCase();
  if (val === 'in-process') return `bg-[#FFF3D6] text-[#85640B] ${statusBorder}`;
  if (val === 'need to start') return `bg-[#E2E8F0] text-[#475569] ${statusBorder}`;
  if (val === 'complete') return `bg-[#D3F2E3] text-[#0A6E3D] ${statusBorder}`;
  if (val === 'blocked') return `bg-[#FFE1DE] text-[#C22219] ${statusBorder}`;
  return 'text-gray-400';
};

const priorityStyle = 'p-2 border border-gray-200 text-center font-semibold';

const getPriorityColor = (priority: string) => {
  const val = priority.toLowerCase();
  if (val === 'high') return `text-[#EF4D44] ${priorityStyle}`;
  if (val === 'medium') return `text-[#C29210] ${priorityStyle}`;
  if (val === 'low') return `text-[#1A8CFF] ${priorityStyle}`;
  return 'text-gray-400';
};

const SpreadsheetTable = () => {
  const [tableData, setTableData] = useState(jobs);
  const [emptyRowsData, setEmptyRowsData] = useState(
    Array.from({ length: emptyRows }, () => ({
      status: '',
      priority: '',
      url: '',
    })),
  );
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number } | null>(null);

  // Keyboard Navigation
  const cellRefs = useRef<HTMLTableCellElement[][]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableCellElement>) => {
    const row = Number(e.currentTarget.getAttribute('data-row'));
    const col = Number(e.currentTarget.getAttribute('data-col'));

    const selection = window.getSelection();
    const caretPosition = selection?.anchorOffset ?? 0;
    const contentLength = e.currentTarget.innerText.length;

    if (
      (e.key === 'ArrowLeft' && caretPosition > 0) ||
      (e.key === 'ArrowRight' && caretPosition < contentLength)
    ) {
      return;
    }

    let nextRow = row;
    let nextCol = col;

    switch (e.key) {
      case 'ArrowDown':
        nextRow = row + 1;
        break;
      case 'ArrowUp':
        nextRow = row - 1;
        break;
      case 'ArrowRight':
        nextCol = col + 1;
        break;
      case 'ArrowLeft':
        nextCol = col - 1;
        break;
      default:
        return;
    }

    e.preventDefault();

    const nextCell = cellRefs.current?.[nextRow]?.[nextCol];
    if (nextCell) {
      nextCell.focus();
    }
  };

  const getCellProps = (rowIndex: number, colIndex: number) => {
    return {
      tabIndex: 0,
      'data-row': rowIndex,
      'data-col': colIndex,
      ref: (el: HTMLTableCellElement | null) => {
        if (!cellRefs.current[rowIndex]) {
          cellRefs.current[rowIndex] = [];
        }

        if (el) {
          cellRefs.current[rowIndex][colIndex] = el;
        }
      },
      onKeyDown: handleKeyDown,
      onFocus: () => setFocusedCell({ row: rowIndex, col: colIndex }),
      onBlur: () => setFocusedCell(null),
    };
  };

  return (
    <div className="overflow-auto text-sm">
      <table className="border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="w-[32px] border border-gray-200">&nbsp;</th>
            <th
              colSpan={4}
              className="w-[631px] sm:p-2 bg-[#E2E2E2] text-[#545454] border border-gray-200"
            >
              <div className="flex items-center gap-2">
                <span className="p-1 bg-[#EEEEEE] rounded flex items-center gap-2">
                  <IoLinkOutline
                    size="1.2em"
                    className="text-[#1A8CFF] cursor-pointer"
                    onClick={() => console.log('Clicked: Q3 Financial Overview label')}
                  />
                  Q3 Financial Overview
                </span>
                <TfiReload
                  className="transform rotate-90 text-[#FA6736] cursor-pointer"
                  title="Reload"
                  onClick={() => console.log('Clicked Reload')}
                />
              </div>
            </th>
            <th className="w-[124px] sm:p-2 border border-gray-200 text-left">&nbsp;</th>
            <th className="w-[124px] sm:p-2 bg-[#D2E0D4] text-[#505450] border border-gray-200">
              <div className="flex justify-center items-center gap-2">
                <PiArrowsSplit
                  size="1.2em"
                  className="text-[#A3ACA3] cursor-pointer"
                  onClick={() => console.log('Clicked split icon')}
                />
                ABC
                <PiDotsThreeBold
                  size="1.2em"
                  className="text-[#AFAFAF] cursor-pointer"
                  onClick={() => console.log('Clicked column menu')}
                />
              </div>
            </th>
            <th
              colSpan={2}
              className="w-[251px] sm:p-2 bg-[#DCCFFC] text-[#463E59] border border-gray-200"
            >
              <div className="flex justify-center items-center gap-2">
                <PiArrowsSplit
                  size="1.2em"
                  className="text-[#FFFFFF] cursor-pointer"
                  onClick={() => console.log('Clicked split icon')}
                />
                Answer a question
                <PiDotsThreeBold
                  size="1.2em"
                  className="text-[#AFAFAF] cursor-pointer"
                  onClick={() => console.log('Clicked column menu')}
                />
              </div>
            </th>
            <th className="w-[124px] sm:p-2 bg-[#FAC2AF] text-[#695149] border border-gray-200">
              <div className="flex justify-center items-center gap-2">
                <PiArrowsSplit
                  size="1.2em"
                  className="text-[#FFFFFF] cursor-pointer"
                  onClick={() => console.log('Clicked split icon')}
                />
                Extract
                <PiDotsThreeBold
                  size="1.2em"
                  className="text-[#AFAFAF] cursor-pointer"
                  onClick={() => console.log('Clicked column menu')}
                />
              </div>
            </th>
            <th className="w-[124px] p-0 bg-[#EEEEEE] border border-gray-200 text-[#04071E]">
              <div className="h-full w-full flex justify-center items-center py-2">
                <GoPlus
                  size="1.5em"
                  className="cursor-pointer"
                  title="Add new column"
                  onClick={() => console.log('Add new column clicked')}
                />
              </div>
            </th>
          </tr>

          <tr className="bg-[#EEEEEE] text-[#AFAFAF]">
            <th className="w-[32px] p-0 border border-gray-200">
              <div className="h-full w-full flex justify-center items-center py-2">
                <HiHashtag size="1.2em" className="text-gray-400" />
              </div>
            </th>
            <th className="w-[256px] sm:p-2 border border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FaBriefcase />
                  Job Request
                </div>
                <IoIosArrowDown
                  className="cursor-pointer"
                  title="Sort Column"
                  onClick={() => console.log('Sort clicked for: Job Request')}
                />
              </div>
            </th>
            <th className="w-[125px] sm:p-2 border border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <IoCalendar />
                  Submitted
                </div>
                <IoIosArrowDown
                  className="cursor-pointer"
                  title="Sort Column"
                  onClick={() => console.log('Sort clicked for: Submitted')}
                />
              </div>
            </th>
            <th className="w-[125px] sm:p-2 border border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <IoIosArrowDropdownCircle className="text-lg" />
                  Status
                </div>
                <IoIosArrowDown
                  className="cursor-pointer"
                  title="Sort Column"
                  onClick={() => console.log('Sort clicked for: Status')}
                />
              </div>
            </th>
            <th className="w-[125px] sm:p-2 border border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FaUserAlt />
                  Submitter
                </div>
                <IoIosArrowDown
                  className="cursor-pointer"
                  title="Sort Column"
                  onClick={() => console.log('Sort clicked for: Submitter')}
                />
              </div>
            </th>
            <th className="w-[124px] sm:p-2 border border-gray-200 text-left">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FaGlobe />
                  URL
                </div>
                <IoIosArrowDown
                  className="cursor-pointer"
                  title="Sort Column"
                  onClick={() => console.log('Sort clicked for: URL')}
                />
              </div>
            </th>
            <th className="w-[124px] sm:p-2 bg-[#E8F0E9] text-[#666C66] border border-gray-200 text-left">
              <div className="flex items-center gap-2">
                <div className="pl-1 relative inline-block">
                  <FaSmile size="12px" className="mt-1 text-[#83A588]" />
                  <IoHandLeft
                    size="12px"
                    className="text-[#83A588] absolute left-1 top-1 transform -translate-y-1/2 -translate-x-1/2"
                  />
                </div>
                Assigned
              </div>
            </th>
            <th className="w-[125px] sm:p-2 bg-[#EAE3FC] text-[#655C80] border border-gray-200 text-left">
              Priority
            </th>
            <th className="w-[126px] sm:p-2 bg-[#EAE3FC] text-[#655C80] border border-gray-200 text-left">
              Due Date
            </th>
            <th className="w-[124px] sm:p-2 bg-[#FFE9E0] text-[#8C6C62] border border-gray-200 text-left">
              Est. Value
            </th>
            <th className="w-[124px] sm:p-2 bg-gray-50 border border-gray-200">&nbsp;</th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((job, i) => (
            <tr key={i} className="hover: bg-gray-50">
              <td className="sm:p-2 border border-gray-200 text-center text-[#757575]">{i + 1}</td>
              <td
                contentEditable
                suppressContentEditableWarning
                {...getCellProps(i, 0)}
                onBlur={(e) => {
                  const updated = [...tableData];
                  updated[i].jobRequest = e.currentTarget.innerText.trim();
                  setTableData(updated);
                }}
                className="sm:p-2 border border-gray-200 focus:outline-none focus:border-green-700 truncate max-w-[100px] overflow-hidden whitespace-nowrap"
              >
                {job.jobRequest}
              </td>
              <td
                contentEditable
                suppressContentEditableWarning
                {...getCellProps(i, 1)}
                onBlur={(e) => {
                  const updated = [...tableData];
                  updated[i].submitted = e.currentTarget.innerText.trim();
                  setTableData(updated);
                }}
                className="sm:p-2 border border-gray-200 text-right focus:outline-none focus:border-green-700"
              >
                {job.submitted}
              </td>
              <td className="sm:p-2 border border-gray-200 text-center">
                <span
                  contentEditable
                  suppressContentEditableWarning
                  {...getCellProps(i, 2)}
                  onBlur={(e) => {
                    const updated = [...tableData];
                    updated[i].status = e.currentTarget.innerText.trim();
                    setTableData(updated);
                  }}
                  className={`focus:outline-none ${getStatusColor(job.status)} focus:border-green-700`}
                >
                  {job.status}
                </span>
              </td>
              <td
                contentEditable
                suppressContentEditableWarning
                {...getCellProps(i, 3)}
                onBlur={(e) => {
                  const updated = [...tableData];
                  updated[i].submitter = e.currentTarget.innerText.trim();
                  setTableData(updated);
                }}
                className="sm:p-2 border border-gray-200 focus:outline-none focus:border-green-700 truncate max-w-[100px] overflow-hidden whitespace-nowrap"
              >
                {job.submitter}
              </td>
              <td
                contentEditable
                suppressContentEditableWarning
                {...getCellProps(i, 4)}
                onBlur={(e) => {
                  const updated = [...tableData];
                  updated[i].url = e.currentTarget.innerText.trim();
                  setTableData(updated);
                }}
                className="sm:p-2 border border-gray-200 focus:outline-none focus:border-green-700 underline text-black-500 truncate max-w-[100px] overflow-hidden whitespace-nowrap"
              >
                {job.url}
              </td>
              <td
                contentEditable
                suppressContentEditableWarning
                {...getCellProps(i, 5)}
                onBlur={(e) => {
                  const updated = [...tableData];
                  updated[i].assigned = e.currentTarget.innerText.trim();
                  setTableData(updated);
                }}
                className="sm:p-2 border border-gray-200 focus:outline-none focus:border-green-700 truncate max-w-[100px] overflow-hidden whitespace-nowrap"
              >
                {job.assigned}
              </td>
              <td
                contentEditable
                suppressContentEditableWarning
                {...getCellProps(i, 6)}
                onBlur={(e) => {
                  const updated = [...tableData];
                  updated[i].priority = e.currentTarget.innerText.trim();
                  setTableData(updated);
                }}
                className={`focus:outline-none ${getPriorityColor(job.priority)} focus:border-green-700`}
              >
                {job.priority}
              </td>
              <td
                contentEditable
                suppressContentEditableWarning
                {...getCellProps(i, 7)}
                onBlur={(e) => {
                  const updated = [...tableData];
                  updated[i].dueDate = e.currentTarget.innerText.trim();
                  setTableData(updated);
                }}
                className="sm:p-2 border border-gray-200 text-right focus:outline-none focus:border-green-700"
              >
                {job.dueDate}
              </td>
              <td
                contentEditable
                suppressContentEditableWarning
                {...getCellProps(i, 8)}
                onBlur={(e) => {
                  const updated = [...tableData];
                  updated[i].value = e.currentTarget.innerText.trim();
                  setTableData(updated);
                }}
                className="p-0 border border-gray-200 focus:outline-none focus:border-green-700"
              >
                <div className="h-full w-full flex justify-end items-center sm:p-2">
                  {job.value}
                  <LiaRupeeSignSolid className="text-[#AFAFAF]" />
                </div>
              </td>
              <td className="sm:p-2 border border-gray-200">&nbsp;</td>
            </tr>
          ))}

          {/* Empty rows to match the spreadsheet */}
          {Array.from({ length: emptyRows }).map((_, i) => (
            <tr key={`empty-${i}`} className="h-10 hover:bg-gray-50">
              <td className="sm:p-2 border border-gray-200 text-center text-[#757575]">
                {tableData.length + i + 1}
              </td>

              {Array.from({ length: 10 }).map((_, colId) => {
                const isFocused = focusedCell?.row === i && focusedCell?.col === colId;
                const truncateClass = isFocused
                  ? ''
                  : 'truncate max-w-[100px] overflow-hidden whitespace-nowrap';
                const commonClass = `border sm:p-2 focus:outline-none focus:border-green-700 ${truncateClass}`;
                let alignClass = '';
                let colorClass = '';
                let statusCol = '';
                const rowData = emptyRowsData[i];

                // right aligned columns
                if ([1, 7, 8].includes(colId)) alignClass = 'text-right';
                // center aligned columns
                if ([2, 6].includes(colId)) alignClass = 'text-center';
                // Status
                if (colId === 2) statusCol = getStatusColor(rowData.status);
                // Priority
                if (colId === 6) colorClass = getPriorityColor(rowData.priority);
                // underline to url column
                const underlineClass = colId === 4 && rowData.url ? 'underline' : '';

                // last column
                if (colId === 9) {
                  return (
                    <td key={colId} className={`border border-gray-200 ${commonClass}`}>
                      &nbsp;
                    </td>
                  );
                }

                return (
                  <td
                    key={colId}
                    {...getCellProps(tableData.length + i, colId)}
                    contentEditable
                    suppressContentEditableWarning
                    onFocus={() => setFocusedCell({ row: tableData.length + i, col: colId })}
                    onBlur={(e) => {
                      const value = e.currentTarget.innerText.trim();
                      const updatedRows = [...emptyRowsData];

                      if (colId === 2) updatedRows[i].status = value;
                      if (colId === 4) updatedRows[i].url = value;
                      if (colId === 6) updatedRows[i].priority = value;

                      setEmptyRowsData(updatedRows);
                      setFocusedCell(null);
                    }}
                    className={`border border-gray-200 ${commonClass} ${alignClass} ${colorClass} ${underlineClass}`}
                  >
                    {colId === 2 && rowData.status ? (
                      <span className={statusCol}>{rowData.status}</span>
                    ) : (
                      '\u00A0'
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpreadsheetTable;
