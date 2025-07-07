import TopBar from './components/TopBar';
import SpreadsheetTable from './components/SpreadsheetTable';
import BottomTabs from './components/BottomTabs';

function App() {
  return (
    <div className="h-screen flex flex-col font-sans bg-white text-gray-900">
      <TopBar />
      <div className="flex-grow overflow-y-auto bottom-0">
        <SpreadsheetTable />
      </div>
      <BottomTabs />
    </div>
  );
}

export default App;
