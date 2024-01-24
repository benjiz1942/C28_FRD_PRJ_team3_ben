import BarChartForRevision from "../components/BarChartForRevision";
import BarChartForExe from "../components/BarChartForExe";
import DailyTarget from "../components/DailyTarget";


export default function Dashboard() {
  return (
    <div className="">
      <div><DailyTarget /></div>
      <div className=""><BarChartForRevision /></div>
      <div className=""><BarChartForExe /></div>
    </div>
  )
}

