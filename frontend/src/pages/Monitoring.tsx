import './Monitoring.css';

export default function Monitoring() {
  return (
    <div id="webcrumbs">
      <div className="w-[1200px] min-h-screen bg-white p-8">
        <div className="w-full">
          <div className="mb-8">
            <h1 className="text-2xl font-light">Monitoring</h1>
            <p className="text-gray-500 text-sm">Current System Status</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Soil Moisture</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  45%
                </span>
              </div>
              <p className="text-sm text-gray-500">Current soil moisture level</p>
            </div>

            <div className="bg-gray-50 p-6 rounded">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Pump Status</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  OFF
                </span>
              </div>
              <p className="text-sm text-gray-500">Water pump current state</p>
            </div>

            <div className="bg-gray-50 p-6 rounded">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Manual Control</h3>
                <button className="bg-primary-500 px-6 py-3 text-white rounded hover:text-primary-700 transition-colors">
                  Water Now
                </button>
              </div>
              <p className="text-sm text-gray-500">Manually activate watering</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded">
            <h2 className="text-xl font-light mb-6">Recent Events</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="material-symbols-outlined text-green-500 mr-3">check_circle</span>
                <div>
                  <p className="text-sm">Scheduled watering completed</p>
                  <p className="text-xs text-gray-500">Today, 06:00</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="material-symbols-outlined text-yellow-500 mr-3">warning</span>
                <div>
                  <p className="text-sm">Soil moisture below threshold</p>
                  <p className="text-xs text-gray-500">Yesterday, 18:00</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="material-symbols-outlined text-green-500 mr-3">check_circle</span>
                <div>
                  <p className="text-sm">Manual watering triggered</p>
                  <p className="text-xs text-gray-500">Yesterday, 12:00</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
