# 📱 Device Info - Device Specifications

> A beautiful and responsive web application to display complete device and browser information

---

## 🎯 About

This project is a **web application** built with **React + TypeScript + Tailwind CSS** that displays the user's device information.

### 💡 Can you write Android apps with Dart?

**Yes!** With the **Dart** language and **Flutter** framework, you can build mobile applications for Android and iOS.

To get device information in Flutter, use the following package:

```yaml
# pubspec.yaml
dependencies:
  device_info_plus: ^10.0.0
```

```dart
// Flutter code example
import 'package:device_info_plus/device_info_plus.dart';

final deviceInfo = DeviceInfoPlugin();
final androidInfo = await deviceInfo.androidInfo;

print('Model: ${androidInfo.model}');
print('Android Version: ${androidInfo.version.release}');
print('Brand: ${androidInfo.brand}');
print('Hardware: ${androidInfo.hardware}');
```

---

## 📸 Screenshots

### 🏠 All Tabs View (Overview)
![Device Info - All Tabs](https://image.qwenlm.ai/generated-images/51817837-e8d8-4d1e-a7e1-5e581a446c5b/_result.png)

### ⚙️ Hardware & System Tab
![Device Info - Hardware Tab](https://image.qwenlm.ai/generated-images/e775ddd9-634c-4eb8-9481-7a9b9209cb00/_result.png)

### 🌐 Network & Battery Tab
![Device Info - Network Tab](https://image.qwenlm.ai/generated-images/808e0400-ea64-438a-ab46-cd1c9ad75a29/_result.png)

---

## 🚀 Features

This web app is the web equivalent of `device_info_plus` and displays the following information:

### 🖥️ Display Information
| Feature | Description |
|---------|-------------|
| Resolution | Screen width × height |
| Color Depth | Number of color bits |
| Pixel Ratio | Device Pixel Ratio |
| Orientation | Portrait / Landscape |

### ⚙️ Hardware & System
| Feature | Description |
|---------|-------------|
| Operating System | OS name and version |
| CPU Cores | Hardware Concurrency |
| Device Memory | RAM amount |
| GPU | GPU Renderer |
| GPU Vendor | GPU Manufacturer |
| Touch Support | Touch capability |

### 🌐 Network & Battery
| Feature | Description |
|---------|-------------|
| Connection Type | WiFi / Cellular / ... |
| Connection Speed | 4G / 3G / ... |
| Download Speed | Downlink Speed |
| Battery Level | Current charge % |
| Charging Status | Is charging? |

### 🔍 Browser & Settings
| Feature | Description |
|---------|-------------|
| Browser | Name and version |
| Language | Preferred language |
| Timezone | System timezone |
| Cookies | Cookies enabled |
| User Agent | Full UA string |

---

## 🛠️ Tech Stack

| Technology | Role |
|------------|------|
| **React 18** | UI Framework |
| **TypeScript** | Programming Language |
| **Tailwind CSS** | Styling |
| **Vite** | Build Tool & Dev Server |
| **Web APIs** | Device Info Retrieval |

---

## 📦 Installation & Usage

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
├── src/
│   ├── App.tsx          # Main component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # Main HTML file
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── README.md            # This file
```

---

## 🌐 Web APIs Used

| API | Purpose |
|-----|---------|
| `navigator.userAgent` | Detect browser & OS |
| `window.screen` | Screen information |
| `navigator.hardwareConcurrency` | CPU core count |
| `navigator.deviceMemory` | Device memory |
| `navigator.getBattery()` | Battery information |
| `navigator.connection` | Network information |
| `WebGL` | GPU information |
| `Intl.DateTimeFormat` | Timezone detection |

---

## 📱 Flutter vs Web Comparison

| Feature | Flutter (Dart) | Web App (React) |
|---------|----------------|-----------------|
| Platform | Android / iOS | All browsers |
| Hardware Access | Full ✅ | Limited ⚠️ |
| Installation | Required | Not needed |
| Updates | Via app store | Instant |
| Language | Dart | TypeScript/JS |

---

## 📝 Notes

- Some information like `deviceMemory` is only supported in Chromium-based browsers
- Battery API may be disabled in some browsers
- GPU information is extracted via WebGL
- This app is fully responsive and supports RTL layouts

---

## 📄 License

MIT License - Free for personal and commercial use

---

<div align="center">

**Built with ❤️**

*Web equivalent of Flutter's `device_info_plus` package*

</div>
