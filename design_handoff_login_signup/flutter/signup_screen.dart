import 'package:flutter/material.dart';
import 'ribaat_theme.dart';
import 'ribaat_auth_widgets.dart';

/// تسجيل حساب جديد — Signup screen. Same breakpoint/split behavior as Login.
class SignupScreen extends StatefulWidget {
  final bool isDark;
  final VoidCallback onGoToLogin;
  /// Returns an error message key: null = success, 'email' = already
  /// registered, 'password' = too short. Extend as needed.
  final Future<String?> Function(String name, String email, String password, String confirm) onSignup;

  const SignupScreen({
    super.key,
    this.isDark = false,
    required this.onGoToLogin,
    required this.onSignup,
  });

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final _name = TextEditingController();
  final _email = TextEditingController();
  final _password = TextEditingController();
  final _confirm = TextEditingController();
  bool _agreed = false;
  bool _loading = false;
  String? _errorField; // 'email' | 'password' | 'confirm' | null

  RibaatColors get _c => widget.isDark ? RibaatColors.dark : RibaatColors.light;

  Future<void> _submit() async {
    if (_password.text != _confirm.text) {
      setState(() => _errorField = 'confirm');
      return;
    }
    setState(() {
      _loading = true;
      _errorField = null;
    });
    final err = await widget.onSignup(_name.text, _email.text, _password.text, _confirm.text);
    if (!mounted) return;
    setState(() {
      _loading = false;
      _errorField = err;
    });
  }

  @override
  Widget build(BuildContext context) {
    final c = _c;
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        backgroundColor: c.surfacePage,
        body: LayoutBuilder(
          builder: (context, constraints) {
            final isSplit = constraints.maxWidth >= 900;
            final form = _buildForm(c, showMarkAbove: !isSplit);
            if (!isSplit) {
              return SafeArea(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 48),
                  child: Center(child: ConstrainedBox(constraints: const BoxConstraints(maxWidth: 400), child: form)),
                ),
              );
            }
            return Row(
              children: [
                Expanded(flex: 1, child: RibaatBrandPanel(c: c)),
                Expanded(
                  flex: 1,
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.symmetric(horizontal: 64, vertical: 56),
                    child: Center(child: ConstrainedBox(constraints: const BoxConstraints(maxWidth: 400), child: form)),
                  ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }

  Widget _buildForm(RibaatColors c, {required bool showMarkAbove}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        if (showMarkAbove) ...[
          Center(child: Image.asset('assets/ribaat-mark.png', height: 44, width: 44)),
          const SizedBox(height: 10),
        ],
        Text('تسجيل حساب جديد', textAlign: TextAlign.center, style: RibaatType.heading(c)),
        const SizedBox(height: 6),
        Text('أنشئ حسابك للبدء في رحلتك العلمية', textAlign: TextAlign.center, style: RibaatType.subheading(c)),
        const SizedBox(height: 18),
        RibaatLabeledField(c: c, label: 'الاسم الكامل', hintText: 'الاسم كما سيظهر في الشهادة', controller: _name),
        const SizedBox(height: 18),
        RibaatLabeledField(
          c: c,
          label: 'البريد الإلكتروني',
          hintText: 'name@example.com',
          controller: _email,
          keyboardType: TextInputType.emailAddress,
          errorText: _errorField == 'email' ? 'هذا البريد الإلكتروني مسجل بالفعل' : null,
        ),
        const SizedBox(height: 18),
        RibaatPasswordField(
          c: c,
          label: 'كلمة المرور',
          hintText: '8 أحرف على الأقل',
          controller: _password,
          errorText: _errorField == 'password' ? 'يجب ألا تقل كلمة المرور عن 8 أحرف' : null,
          helperText: _errorField == 'password' ? null : '8 أحرف على الأقل',
        ),
        const SizedBox(height: 18),
        RibaatPasswordField(
          c: c,
          label: 'تأكيد كلمة المرور',
          hintText: 'أعد إدخال كلمة المرور',
          controller: _confirm,
          errorText: _errorField == 'confirm' ? 'كلمتا المرور غير متطابقتين' : null,
        ),
        const SizedBox(height: 12),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(
              width: 24,
              height: 24,
              child: Checkbox(
                value: _agreed,
                onChanged: (v) => setState(() => _agreed = v ?? false),
                activeColor: c.brandGreen600,
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Text('أوافق على الشروط وسياسة الخصوصية', style: RibaatType.body(c).copyWith(fontSize: 14)),
            ),
          ],
        ),
        const SizedBox(height: 18),
        RibaatPrimaryButton(
          c: c,
          label: 'تسجيل',
          loadingLabel: 'جارٍ إنشاء الحساب...',
          isLoading: _loading,
          onPressed: _agreed ? _submit : () {},
        ),
        const SizedBox(height: 18),
        RibaatOrDivider(c: c),
        const SizedBox(height: 18),
        RibaatSocialRow(c: c, accessibleActionLabel: 'إنشاء حساب', onTap: (_) {}),
        const SizedBox(height: 18),
        Center(
          child: Wrap(
            children: [
              Text('لديك حساب بالفعل؟ ', style: TextStyle(fontFamily: 'IBMPlexSansArabic', fontSize: 14, color: c.textSecondary)),
              GestureDetector(onTap: widget.onGoToLogin, child: Text('سجل الدخول', style: RibaatType.link(c))),
            ],
          ),
        ),
      ],
    );
  }
}
