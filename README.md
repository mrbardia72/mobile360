# 📱 Device Info - مشخصات دستگاه

> یک وب اپلیکیشن زیبا و ریسپانسیو برای نمایش اطلاعات کامل دستگاه و مرورگر

---

## 🎯 درباره پروژه

این پروژه یک **وب اپلیکیشن** است که با **React + TypeScript + Tailwind CSS** ساخته شده و وظیفه آن نمایش اطلاعات دستگاه کاربر است.

### 💡 آیا با Dart می‌شود برنامه اندروید نوشت؟

**بله!** با زبان **Dart** و فریمورک **Flutter** می‌توان اپلیکیشن‌های موبایل (اندروید و iOS) ساخت.

برای گرفتن اطلاعات دستگاه در Flutter از پکیج زیر استفاده می‌شود:

```yaml
# pubspec.yaml
dependencies:
  device_info_plus: ^10.0.0
```

```dart
// مثال کد Flutter
import 'package:device_info_plus/device_info_plus.dart';

final deviceInfo = DeviceInfoPlugin();
final androidInfo = await deviceInfo.androidInfo;

print('مدل: ${androidInfo.model}');
print('نسخه اندروید: ${androidInfo.version.release}');
print('برند: ${androidInfo.brand}');
print('سخت‌افزار: ${androidInfo.hardware}');
```

---

## 🚀 امکانات وب اپلیکیشن

این وب اپ معادل نسخه وب `device_info_plus` است و اطلاعات زیر را نمایش می‌دهد:

### 🖥️ اطلاعات صفحه نمایش
| ویژگی | توضیحات |
|--------|----------|
| رزولوشن | عرض × ارتفاع صفحه |
| عمق رنگ | تعداد بیت رنگ |
| نسبت پیکسل | Device Pixel Ratio |
| جهت صفحه | Portrait / Landscape |

### ⚙️ سخت‌افزار و سیستم
| ویژگی | توضیحات |
|--------|----------|
| سیستم عامل | نام و نسخه OS |
| تعداد هسته CPU | Hardware Concurrency |
| حافظه دستگاه | Device Memory |
| کارت گرافیک | GPU Renderer |
| سازنده GPU | GPU Vendor |
| پشتیبانی لمسی | Touch Support |

### 🌐 شبکه و باتری
| ویژگی | توضیحات |
|--------|----------|
| نوع اتصال | WiFi / Cellular / ... |
| سرعت اتصال | 4G / 3G / ... |
| سرعت دانلود | Downlink Speed |
| سطح باتری | Battery Level |
| وضعیت شارژ | Charging Status |

### 🔍 مرورگر و تنظیمات
| ویژگی | توضیحات |
|--------|----------|
| مرورگر | نام و نسخه Browser |
| زبان | Language |
| منطقه زمانی | Timezone |
| کوکی | Cookies Enabled |
| User Agent | Full UA String |

---

## 🛠️ تکنولوژی‌های استفاده شده

| تکنولوژی | نقش |
|-----------|------|
| **React 18** | فریمورک UI |
| **TypeScript** | زبان برنامه‌نویسی |
| **Tailwind CSS** | استایل‌دهی |
| **Vite** | بیلدر و Dev Server |
| **Web APIs** | دریافت اطلاعات دستگاه |

---

## 📦 نصب و اجرا

```bash
# نصب وابستگی‌ها
npm install

# اجرای سرور توسعه
npm run dev

# بیلد برای پروداکشن
npm run build

# پیش‌نمایش بیلد
npm run preview
```

---

## 📁 ساختار پروژه

```
├── src/
│   ├── App.tsx          # کامپوننت اصلی
│   ├── main.tsx         # نقطه ورود
│   └── index.css        # استایل‌های سراسری
├── index.html           # فایل HTML اصلی
├── vite.config.ts       # تنظیمات Vite
├── tailwind.config.js   # تنظیمات Tailwind
├── tsconfig.json        # تنظیمات TypeScript
└── README.md            # این فایل
```

---

## 🌐 Web APIs استفاده شده

| API | کاربرد |
|-----|---------|
| `navigator.userAgent` | تشخیص مرورگر و OS |
| `window.screen` | اطلاعات صفحه نمایش |
| `navigator.hardwareConcurrency` | تعداد هسته CPU |
| `navigator.deviceMemory` | حافظه دستگاه |
| `navigator.getBattery()` | اطلاعات باتری |
| `navigator.connection` | اطلاعات شبکه |
| `WebGL` | اطلاعات کارت گرافیک |
| `Intl.DateTimeFormat` | منطقه زمانی |

---

## 📱 مقایسه Flutter vs Web

| ویژگی | Flutter (Dart) | Web App (React) |
|--------|----------------|-----------------|
| پلتفرم | اندروید / iOS | همه مرورگرها |
| دسترسی به سخت‌افزار | کامل ✅ | محدود ⚠️ |
| نصب | نیاز به نصب | بدون نصب |
| به‌روزرسانی | از طریق استور | آنی |
| زبان | Dart | TypeScript/JS |

---

## 📝 یادداشت‌ها

- برخی اطلاعات مانند `deviceMemory` فقط در مرورگرهای Chromium پشتیبانی می‌شوند
- Battery API ممکن است در برخی مرورگرها غیرفعال باشد
- اطلاعات GPU از طریق WebGL استخراج می‌شود
- این اپ کاملاً ریسپانسیو و راست‌چین (RTL) است

---

## 📄 لایسنس

MIT License - آزاد برای استفاده شخصی و تجاری

---

<div align="center">

**ساخته شده با ❤️**

*معادل وب اپلیکیشن پکیج `device_info_plus` در Flutter*

</div>
