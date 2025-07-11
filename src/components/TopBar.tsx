import { useState } from 'react';
import profileImage from '../assets/image.png';
import { FaSearch, FaRegShareSquare } from 'react-icons/fa';
import { IoNotificationsOutline, IoFilterOutline } from 'react-icons/io5';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { BiHide } from 'react-icons/bi';
import { LuArrowUpDown, LuArrowDownToLine, LuArrowUpToLine } from 'react-icons/lu';
import { PiDotsThreeBold, PiArrowsSplit, PiSquareHalfDuotone } from 'react-icons/pi';
import { TbLayoutSidebarRightFilled, TbArrowsMoveVertical } from 'react-icons/tb';

const TopBar = () => {
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  return (
    <div>
      {/* First Topbar Row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between px-5 py-2 border-b bg-gray-50 text-[14px]">
        <div className="flex items-center gap-3">
          <TbLayoutSidebarRightFilled size="1.5em" className="text-[#618666]" />
          <p className="text-[#AFAFAF]">
            Workspace &gt; Folder 2 &gt;
            <span className="pl-1 font-semibold text-[#121212]">Spreadsheet 3</span>
          </p>
          <PiDotsThreeBold
            size="1.5em"
            className="text-[#AFAFAF] cursor-pointer"
            title="More..."
            onClick={() => console.log('Menu Options clicked')}
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#F6F6F6] p-2 rounded-md mr-10 sm:mr-0">
            <FaSearch className="text-[#AFAFAF] w-[13px] h-[13px]" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search within sheet"
              className="bg-[#F6F6F6] text-[#757575] outline-none ml-2 text-[12px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  console.log(`Search for: ${searchText}`);
                }
              }}
            />
          </div>
          <div className="relative inline-block ml-8 sm:ml-0">
            <IoNotificationsOutline
              title="Notifications"
              className="text-2xl text-[#121212] cursor-pointer"
              onClick={() => console.log('Notifications clicked')}
            />
            <div className="w-4 bg-[#4B6A47] border border-white text-white text-[9px] text-center rounded-lg absolute top-1 left-5 transform -translate-y-1/2 -translate-x-1/2">
              <span>2</span>
            </div>
          </div>
          <img
            src={profileImage}
            width="28px"
            height="28px"
            className="rounded-2xl cursor-pointer"
            title="Profile"
            onClick={() => console.log('User Profile clicked')}
          />
          <div title="Profile" className="flex-row">
            <p className="text-[12px] text-[#121212]">John Doe</p>
            <p className="text-[10px] text-[#757575] truncate max-w-[50px] overflow-hidden whitespace-nowrap">
              john.doe123@g.com
            </p>
          </div>
        </div>
      </div>

      {/* Second Topbar Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-2 border-b bg-gray-50 text-[14px] text-[#121212]">
        <div className="flex gap:1 sm:gap-5">
          <button
            className="flex items-center gap-1"
            title="Tools"
            onClick={() => {
              setToolbarVisible(!toolbarVisible);
              console.log('Toggled Toolbar');
            }}
          >
            Tool bar
            <MdKeyboardDoubleArrowRight size="1.5em" />
          </button>
          <span className="text-gray-200 text-lg">|</span>
          {toolbarVisible && (
            <div className="flex gap-5">
              <button
                className="flex items-center sm:gap-1 hover:text-gray-700"
                onClick={() => console.log('Hide Fields clicked')}
              >
                <BiHide size="1.2em" />
                Hide fields
              </button>
              <button
                className="flex items-center sm:gap-1 hover:text-gray-700"
                onClick={() => console.log('Sort clicked')}
              >
                <LuArrowUpDown size="1.2em" />
                Sort
              </button>
              <button
                className="flex items-center sm:gap-1 hover:text-gray-700"
                onClick={() => console.log('Filter clicked')}
              >
                <IoFilterOutline size="1.2em" />
                Filter
              </button>
              <button
                className="flex items-center sm:gap-1 hover:text-gray-700"
                onClick={() => console.log('Cell View clicked')}
              >
                <div className="relative flex items-center">
                  <div className="relative">
                    <PiSquareHalfDuotone size="1.1em" />
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-white" />
                  </div>
                  <TbArrowsMoveVertical size="1em" className="absolute right-0 top-0 left-1" />
                </div>
                Cell View
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-5 sm:gap-4 text-[#545454]">
          <button
            className="p-1 sm:pl-[8px] sm:pr-[12px] sm:py-[8px] flex items-center gap-2 border border-gray-200 rounded hover:bg-gray-200"
            onClick={() => console.log('Import clicked')}
          >
            <LuArrowDownToLine size="1.2em" />
            Import
          </button>
          <button
            className="p-1 sm:pl-[8px] sm:pr-[12px] sm:py-[8px] flex items-center gap-2 border border-gray-200 rounded hover:bg-gray-200"
            onClick={() => console.log('Export clicked')}
          >
            <LuArrowUpToLine size="1.2em" />
            Export
          </button>
          <button
            className="p-1 sm:pl-[8px] sm:pr-[12px] sm:py-[8px] flex items-center gap-2 border border-gray-200 rounded hover:bg-gray-200"
            onClick={() => console.log('Share clicked')}
          >
            <FaRegShareSquare size="1.2em" />
            Share
          </button>
          <button
            className="px-2 py-1 sm:px-[24px] sm:py-[8px] flex items-center gap-2 bg-[#4B6A4F] text-white rounded hover:bg-green-700"
            onClick={() => console.log('New Action clicked')}
          >
            <PiArrowsSplit size="1.2em" />
            New Action
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
