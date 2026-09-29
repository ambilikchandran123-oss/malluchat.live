import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:permission_handler/permission_handler.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MalluChatApp());
}

class MalluChatApp extends StatelessWidget {
  const MalluChatApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MalluChat',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF0F1115),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF10B981),
          brightness: Brightness.dark,
          surface: const Color(0xFF0F1115),
        ),
      ),
      home: const WebViewScreen(),
    );
  }
}

class WebViewScreen extends StatefulWidget {
  const WebViewScreen({super.key});

  @override
  State<WebViewScreen> createState() => _WebViewScreenState();
}

class _WebViewScreenState extends State<WebViewScreen> {
  final GlobalKey webViewKey = GlobalKey();
  InAppWebViewController? webViewController;
  PullToRefreshController? pullToRefreshController;
  double progress = 0;

  final InAppWebViewSettings settings = InAppWebViewSettings(
    userAgent:
        "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36 MalluChatApp",
    mediaPlaybackRequiresUserGesture: false,
    allowsInlineMediaPlayback: true,
    iframeAllowFullscreen: true,
    javaScriptEnabled: true,
    supportZoom: false,
    builtInZoomControls: false,
    displayZoomControls: false,
    domStorageEnabled: true,
    databaseEnabled: true,
    cacheEnabled: true,
    allowFileAccess: true,
    allowContentAccess: true,
    geolocationEnabled: true,
    useHybridComposition: true,
    mixedContentMode: MixedContentMode.MIXED_CONTENT_ALWAYS_ALLOW,
  );

  @override
  void initState() {
    super.initState();
    pullToRefreshController = PullToRefreshController(
      settings: PullToRefreshSettings(
        color: const Color(0xFF10B981),
        backgroundColor: const Color(0xFF1A1D24),
      ),
      onRefresh: () async {
        webViewController?.reload();
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F1115),
      body: SafeArea(
        child: PopScope(
          canPop: false,
          onPopInvokedWithResult: (didPop, result) async {
            if (didPop) return;
            if (webViewController != null && await webViewController!.canGoBack()) {
              await webViewController!.goBack();
            }
          },
          child: Stack(
            children: [
              InAppWebView(
                key: webViewKey,
                initialUrlRequest: URLRequest(url: WebUri("https://malluchat.live")),
                initialSettings: settings,
                pullToRefreshController: pullToRefreshController,
                onWebViewCreated: (controller) {
                  webViewController = controller;
                },
                onLoadStop: (controller, url) async {
                  pullToRefreshController?.endRefreshing();
                },
                onProgressChanged: (controller, prog) {
                  if (prog == 100) {
                    pullToRefreshController?.endRefreshing();
                  }
                  setState(() {
                    progress = prog / 100;
                  });
                },
                onPermissionRequest: (controller, request) async {
                  // Request camera, microphone, photos, storage and location on Android
                  await [
                    Permission.camera,
                    Permission.microphone,
                    Permission.photos,
                    Permission.storage,
                    Permission.locationWhenInUse,
                  ].request();

                  return PermissionResponse(
                    resources: request.resources,
                    action: PermissionResponseAction.GRANT,
                  );
                },
                onGeolocationPermissionsShowPrompt: (controller, origin) async {
                  await Permission.locationWhenInUse.request();
                  return GeolocationPermissionShowPromptResponse(
                    origin: origin,
                    allow: true,
                    retain: true,
                  );
                },
              ),
              if (progress < 1.0)
                LinearProgressIndicator(
                  value: progress,
                  backgroundColor: Colors.transparent,
                  valueColor:
                      const AlwaysStoppedAnimation<Color>(Color(0xFF10B981)),
                  minHeight: 2.5,
                ),
            ],
          ),
        ),
      ),
    );
  }
}
