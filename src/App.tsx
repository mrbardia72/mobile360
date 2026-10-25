import { useState, useEffect } from 'react';

interface DeviceInfo {
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  screenWidth: number;
  screenHeight: number;
  screenColorDepth: number;
  screenPixelRatio: number;
  orientation: string;
  cpuCores: number;
  deviceMemory: string;
  connectionType: string;
  effectiveType: string;
  downlink: string;
  batteryLevel: string;
  batteryCharging: string;
  language: string;
  languages: string;
  platform: string;
  userAgent: string;
  touchSupport: string;
  cookiesEnabled: string;
  doNotTrack: string;
  timezone: string;
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

  const renderInfoCard = (icon: string, label: string, value: string, accentColor: string) => (
    <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-4 hover:bg-[#1f1f35] hover:border-gray-700 transition-all duration-300 hover:scale-[1.02] group">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-[#0f0f1a] border border-gray-800 group-hover:border-${accentColor}/30 transition-colors`}>
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{label}</p>
          <p className="text-gray-100 text-sm font-semibold truncate mt-0.5" title={value}>{value}</p>
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
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center" dir="ltr">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-800 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg font-bold">Fetching device information...</p>
          <p className="text-gray-600 text-sm mt-2">Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] p-4 md:p-8" dir="ltr">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>

      {/* Header */}
      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#1a1a2e] border border-gray-800 mb-4 shadow-lg shadow-emerald-500/5">
            <span className="text-4xl">📱</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Device Information</h1>
          <p className="text-gray-500 text-sm">Complete device and browser specifications</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-gray-600 text-xs">Live data from Web APIs</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10'
                  : 'bg-[#1a1a2e] text-gray-400 hover:text-gray-200 hover:bg-[#1f1f35] border border-gray-800 hover:border-gray-700'
              }`}
            >
              <span className="mr-1.5">{tab.icon}</span>
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
                <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Display Information
                </h2>
              </div>
              {renderInfoCard('📐', 'Screen Resolution', `${deviceInfo!.screenWidth} × ${deviceInfo!.screenHeight} px`, 'cyan')}
              {renderInfoCard('🎨', 'Color Depth', `${deviceInfo!.screenColorDepth} bit`, 'pink')}
              {renderInfoCard('🔍', 'Pixel Ratio', `${deviceInfo!.screenPixelRatio}x`, 'violet')}
              {renderInfoCard('🔄', 'Orientation', deviceInfo!.orientation, 'teal')}
            </>
          )}

          {/* Hardware Section */}
          {(activeTab === 'all' || activeTab === 'hardware') && (
            <>
              <div className="md:col-span-2 mt-4">
                <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Hardware & System
                </h2>
              </div>
              {renderInfoCard('💻', 'Operating System', `${deviceInfo!.os} ${deviceInfo!.osVersion}`, 'orange')}
              {renderInfoCard('🧠', 'CPU Cores', `${deviceInfo!.cpuCores} Cores`, 'red')}
              {renderInfoCard('💾', 'Device Memory', deviceInfo!.deviceMemory, 'indigo')}
              {renderInfoCard('🎮', 'GPU Renderer', deviceInfo!.gpuRenderer, 'green')}
              {renderInfoCard('🏭', 'GPU Vendor', deviceInfo!.gpuVendor, 'lime')}
              {renderInfoCard('👆', 'Touch Support', deviceInfo!.touchSupport, 'yellow')}
            </>
          )}

          {/* Network Section */}
          {(activeTab === 'all' || activeTab === 'network') && (
            <>
              <div className="md:col-span-2 mt-4">
                <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  Network & Battery
                </h2>
              </div>
              {renderInfoCard('📶', 'Connection Type', deviceInfo!.connectionType, 'green')}
              {renderInfoCard('⚡', 'Connection Speed', deviceInfo!.effectiveType, 'yellow')}
              {renderInfoCard('📡', 'Download Speed', deviceInfo!.downlink, 'blue')}
              {renderInfoCard('🔋', 'Battery Level', deviceInfo!.batteryLevel, 'emerald')}
              {renderInfoCard('🔌', 'Charging Status', deviceInfo!.batteryCharging, 'sky')}
            </>
          )}

          {/* Browser Section */}
          {(activeTab === 'all' || activeTab === 'browser') && (
            <>
              <div className="md:col-span-2 mt-4">
                <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  Browser & Settings
                </h2>
              </div>
              {renderInfoCard('🌐', 'Browser', `${deviceInfo!.browser} ${deviceInfo!.browserVersion}`, 'purple')}
              {renderInfoCard('🗣️', 'Language', deviceInfo!.language, 'fuchsia')}
              {renderInfoCard('🕐', 'Timezone', deviceInfo!.timezone, 'rose')}
              {renderInfoCard('🍪', 'Cookies Enabled', deviceInfo!.cookiesEnabled, 'amber')}
              {renderInfoCard('🚫', 'Do Not Track', deviceInfo!.doNotTrack, 'gray')}
              {renderInfoCard('🖥️', 'Platform', deviceInfo!.platform, 'indigo')}

              {/* User Agent - Full Width */}
              <div className="md:col-span-2 mt-2">
                <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-4 hover:bg-[#1f1f35] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0f0f1a] border border-gray-800 flex items-center justify-center">
                      <span className="text-lg">📋</span>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">User Agent</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs font-mono break-all leading-relaxed bg-[#0f0f1a] border border-gray-800 rounded-xl p-3">
                    {deviceInfo!.userAgent}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1a1a2e] border border-gray-800 rounded-full px-5 py-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-gray-500 text-xs">Information retrieved from browser Web APIs</span>
          </div>
          <p className="text-gray-700 text-xs mt-4">
            Web equivalent of Flutter's device_info_plus package
          </p>
        </div>
      </div>
    </div>
  );
}
