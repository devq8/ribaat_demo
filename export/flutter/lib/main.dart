import 'package:flutter/material.dart';

import 'screens/student_dashboard_screen.dart';
import 'theme/ribaat_theme.dart';

void main() => runApp(const RibaatApp());

class RibaatApp extends StatelessWidget {
  const RibaatApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'رباط الحنابلة',
      debugShowCheckedModeBanner: false,
      theme: RibaatTheme.light(),
      darkTheme: RibaatTheme.dark(),
      locale: const Locale('ar'),
      supportedLocales: const [Locale('ar')],
      builder: (context, child) => Directionality(
        textDirection: TextDirection.rtl,
        child: child!,
      ),
      home: const StudentDashboardScreen(),
    );
  }
}
