import { useState, useEffect } from 'react';

interface DeviceInfo {
  // Browser Info
  browser: string;
  browserVersion: string;
  // OS Info
  os: string;
  osVersion: string;
  // Screen Info
  screenWidth: number;
  screenHeight: number;
  screenColorDepth: number;
  screenPixelRatio: number;
  orientation: string;
  // Hardware Info
  cpuCores: number;
  deviceMemory: string;
  // Network Info
  connectionType: string;
  effectiveType: string;
  downlink: string;
  // Battery Info
  batteryLevel: string;
  batteryCharging: string;
  // Other
  language: string;
  languages: string;
  platform: string;
  userAgent: string;
  touchSupport: string;
  cookiesEnabled: string;
  doNotTrack: string;
  timezone: string;
  // WebGL Info
  gpuVendor: string;
  gpuRenderer: string;
}

function getBrowserInfo(): { name: string; version: string } {
  const ua = navigator.userAgent;
  let name = 'Unknown';
  let version = 'Unknown';

  if (ua.indexOf('Firefox') > -1) {
    name = 'Firefox';
    version = ua.split('Firefox/')[1] || 'Unknown';
  } else if (ua.indexOf('SamsungBrowser') > -1) {
    name = 'Samsung Browser';
    version = ua.split('SamsungBrowser/')[1]?.split(' ')[0] || 'Unknown';
  } else if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) {
    name = 'Opera';
    version = ua.split('OPR/')[1] || ua.split('Opera/')[1] || 'Unknown';
  } else if (ua.indexOf('Trident') > -1) {
    name = 'Internet Explorer';
    version = ua.split('rv:')[1]?.split(')')[0] || 'Unknown';
  } else if (ua.indexOf('Edg') > -1) {
    name = 'Microsoft Edge';
    version = ua.split('Edg/')[1]?.split(' ')[0] || 'Unknown';
  } else if (ua.indexOf('Chrome') > -1) {
    name = 'Chrome';
    version = ua.split('Chrome/')[1]?.split(' ')[0] || 'Unknown';
  } else if (ua.indexOf('Safari') > -1) {
    name = 'Safari';
    version = ua.split('Version/')[1]?.split(' ')[0] || 'Unknown';
  }

  return { name, version };
}

function getOSInfo(): { name: string; version: string } {
  const ua = navigator.userAgent;
  let name = 'Unknown';
  let version = 'Unknown';

  if (ua.indexOf('Android') > -1) {
    name = 'Android';
    version = ua.split('Android ')[1]?.split(';')[0] || 'Unknown';
  } else if (ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) {
    name = 'iOS';
    version = ua.split('OS ')[1]?.split(' ')[0]?.replace(/_/g, '.') || 'Unknown';
  } else if (ua.indexOf('Windows') > -1) {
    name = 'Windows';
    if (ua.indexOf('Windows NT 10') > -1) version = '10/11';
    else if (ua.indexOf('Windows NT 6.3') > -1) version = '8.1';
    else if (ua.indexOf('Windows NT 6.2') > -1) version = '8';
    else if (ua.indexOf('Windows NT 6.1') > -1) version = '7';
  } else if (ua.indexOf('Mac') > -1) {
    name = 'macOS';
    version = ua.split('Mac OS X ')[1]?.split(')')[0]?.replace(/_/g, '.') || 'Unknown';
  } else if (ua.indexOf('Linux') > -1) {
    name = 'Linux';
    version = 'Unknown';
  }

  return { name, version };
}

function getGPUInfo(): { vendor: string; renderer: string } {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl && gl instanceof WebGLRenderingContext) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        return {
          vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || 'Unknown',
          renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'Unknown',
        };
      }
    }
  } catch (e) {
    // ignore
  }
  return { vendor: 'Unknown', renderer: 'Unknown' };
}

export default function App() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'screen' | 'hardware' | 'network' | 'browser'>('all');

  useEffect(() => {
    async function fetchDeviceInfo() {
      const browserInfo = getBrowserInfo();
      const osInfo = getOSInfo();
      const gpuInfo = getGPUInfo();

      let batteryLevel = 'N/A';
      let batteryCharging = 'N/A';

      try {
        if ('getBattery' in navigator) {
          const battery = await (navigator as any).getBattery();
          batteryLevel = `${Math.round(battery.level * 100)}%`;
          batteryCharging = battery.charging ? 'Charging ⚡' : 'Not Charging 🔋';
        }
      } catch (e) {
        // Battery API not supported
      }

      let connectionType = 'N/A';
      let effectiveType = 'N/A';
      let downlink = 'N/A';

      if ('connection' in navigator) {
        const conn = (navigator as any).connection;
        connectionType = conn.type || 'N/A';
        effectiveType = conn.effectiveType || 'N/A';
        downlink = conn.downlink ? `${conn.downlink} Mbps` : 'N/A';
      }

      const info: DeviceInfo = {
        browser: browserInfo.name,
        browserVersion: browserInfo.version,
        os: osInfo.name,
        osVersion: osInfo.version,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        screenColorDepth: window.screen.colorDepth,
        screenPixelRatio: window.devicePixelRatio,
        orientation: screen.orientation?.type || 'N/A',
        cpuCores: navigator.hardwareConcurrency || 0,
        deviceMemory: (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : 'N/A',
        connectionType,
        effectiveType,
        downlink,
        batteryLevel,
        batteryCharging,
        language: navigator.language,
        languages: navigator.languages?.join(', ') || navigator.language,
        platform: navigator.platform || 'N/A',
        userAgent: navigator.userAgent,
        touchSupport: 'ontouchstart' in window ? 'Yes ✅' : 'No ❌',
        cookiesEnabled: navigator.cookieEnabled ? 'Yes ✅' : 'No ❌',
        doNotTrack: navigator.doNotTrack || 'N/A',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        gpuVendor: gpuInfo.vendor,
        gpuRenderer: gpuInfo.renderer,
      };

      setDeviceInfo(info);
      setLoading(false);
    }

    fetchDeviceInfo();
  }, []);

  const renderInfoCard = (icon: string, label: string, value: string, color: string) => (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} shadow-lg`}>
          <span className="text-white text-lg">{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white/60 text-xs font-medium">{label}</p>
          <p className="text-white text-sm font-bold truncate" title={value}>{value}</p>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'all' as const, label: 'All', icon: '📱' },
    { id: 'screen' as const, label: 'Display', icon: '🖥️' },
    { id: 'hardware' as const, label: 'Hardware', icon: '⚙️' },
    { id: 'network' as const, label: 'Network', icon: '🌐' },
    { id: 'browser' as const, label: 'Browser', icon: '🔍' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center" dir="ltr">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-bold">Fetching device information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8" dir="ltr">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
            <span className="text-4xl">📱</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Device Information</h1>
          <p className="text-white/60 text-sm">Complete device and browser specifications</p>
          <p className="text-white/40 text-xs mt-2">Built with ❤️ | Web equivalent of Flutter Device Info</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-purple-900 shadow-lg shadow-white/20'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Screen Section */}
          {(activeTab === 'all' || activeTab === 'screen') && (
            <>
              <div className="md:col-span-2">
                <h2 className="text-white/80 text-sm font-bold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  Display Information
                </h2>
              </div>
              {renderInfoCard('📐', 'Screen Resolution', `${deviceInfo!.screenWidth} × ${deviceInfo!.screenHeight} px`, 'bg-gradient-to-br from-cyan-500 to-blue-500')}
              {renderInfoCard('🎨', 'Color Depth', `${deviceInfo!.screenColorDepth} bit`, 'bg-gradient-to-br from-pink-500 to-rose-500')}
              {renderInfoCard('🔍', 'Pixel Ratio', `${deviceInfo!.screenPixelRatio}x`, 'bg-gradient-to-br from-violet-500 to-purple-500')}
              {renderInfoCard('🔄', 'Orientation', deviceInfo!.orientation, 'bg-gradient-to-br from-teal-500 to-emerald-500')}
            </>
          )}

          {/* Hardware Section */}
          {(activeTab === 'all' || activeTab === 'hardware') && (
            <>
              <div className="md:col-span-2 mt-4">
                <h2 className="text-white/80 text-sm font-bold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                  Hardware & System
                </h2>
              </div>
              {renderInfoCard('💻', 'Operating System', `${deviceInfo!.os} ${deviceInfo!.osVersion}`, 'bg-gradient-to-br from-orange-500 to-amber-500')}
              {renderInfoCard('🧠', 'CPU Cores', `${deviceInfo!.cpuCores} Cores`, 'bg-gradient-to-br from-red-500 to-pink-500')}
              {renderInfoCard('💾', 'Device Memory', deviceInfo!.deviceMemory, 'bg-gradient-to-br from-indigo-500 to-blue-500')}
              {renderInfoCard('🎮', 'GPU Renderer', deviceInfo!.gpuRenderer, 'bg-gradient-to-br from-green-500 to-emerald-500')}
              {renderInfoCard('🏭', 'GPU Vendor', deviceInfo!.gpuVendor, 'bg-gradient-to-br from-lime-500 to-green-500')}
              {renderInfoCard('👆', 'Touch Support', deviceInfo!.touchSupport, 'bg-gradient-to-br from-yellow-500 to-orange-500')}
            </>
          )}

          {/* Network Section */}
          {(activeTab === 'all' || activeTab === 'network') && (
            <>
              <div className="md:col-span-2 mt-4">
                <h2 className="text-white/80 text-sm font-bold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  Network & Battery
                </h2>
              </div>
              {renderInfoCard('📶', 'Connection Type', deviceInfo!.connectionType, 'bg-gradient-to-br from-green-500 to-teal-500')}
              {renderInfoCard('⚡', 'Connection Speed', deviceInfo!.effectiveType, 'bg-gradient-to-br from-yellow-500 to-amber-500')}
              {renderInfoCard('📡', 'Download Speed', deviceInfo!.downlink, 'bg-gradient-to-br from-blue-500 to-cyan-500')}
              {renderInfoCard('🔋', 'Battery Level', deviceInfo!.batteryLevel, 'bg-gradient-to-br from-emerald-500 to-green-500')}
              {renderInfoCard('🔌', 'Charging Status', deviceInfo!.batteryCharging, 'bg-gradient-to-br from-sky-500 to-blue-500')}
            </>
          )}

          {/* Browser Section */}
          {(activeTab === 'all' || activeTab === 'browser') && (
            <>
              <div className="md:col-span-2 mt-4">
                <h2 className="text-white/80 text-sm font-bold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  Browser & Settings
                </h2>
              </div>
              {renderInfoCard('🌐', 'Browser', `${deviceInfo!.browser} ${deviceInfo!.browserVersion}`, 'bg-gradient-to-br from-purple-500 to-violet-500')}
              {renderInfoCard('🗣️', 'Language', deviceInfo!.language, 'bg-gradient-to-br from-fuchsia-500 to-pink-500')}
              {renderInfoCard('🕐', 'Timezone', deviceInfo!.timezone, 'bg-gradient-to-br from-rose-500 to-red-500')}
              {renderInfoCard('🍪', 'Cookies Enabled', deviceInfo!.cookiesEnabled, 'bg-gradient-to-br from-amber-500 to-yellow-500')}
              {renderInfoCard('🚫', 'Do Not Track', deviceInfo!.doNotTrack, 'bg-gradient-to-br from-gray-500 to-slate-500')}
              {renderInfoCard('🖥️', 'Platform', deviceInfo!.platform, 'bg-gradient-to-br from-indigo-500 to-purple-500')}

              {/* User Agent - Full Width */}
              <div className="md:col-span-2 mt-2">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-gray-600 flex items-center justify-center shadow-lg">
                      <span className="text-white text-lg">📋</span>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-medium">User Agent</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-xs font-mono break-all leading-relaxed bg-black/20 rounded-xl p-3">
                    {deviceInfo!.userAgent}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <span className="text-white/60 text-xs">💡 This information is retrieved from browser Web APIs</span>
          </div>
          <p className="text-white/30 text-xs mt-4">
            Web equivalent of Flutter's device_info_plus package
          </p>
        </div>
      </div>
    </div>
  );
}
