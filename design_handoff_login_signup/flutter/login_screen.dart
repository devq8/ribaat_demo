import 'package:flutter/material.dart';
import 'ribaat_theme.dart';
import 'ribaat_auth_widgets.dart';

/// تسجيل الدخول — Login screen.
/// iPad portrait / narrow web: single centered column.
/// iPad landscape / wide web (width >= 900): split layout, brand panel fixed
/// on the leading (RTL) side, form column independently scrollable.
class LoginScreen extends StatefulWidget {
  final bool isDark;
  final VoidCallback onGoToSignup;
  final Future<bool> Function(String email, String password) onLogin;

  const LoginScreen({
    super.key,
    this.isDark = false,
    required this.onGoToSignup,
    required this.onLogin,
  });

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _email = TextEditingController();
  final _password = TextEditingController();
  bool _loading = false;
  bool _error = false;

  RibaatColors get _c => widget.isDark ? RibaatColors.dark : RibaatColors.light;

  Future<void> _submit() async {
    setState(() {
      _loading = true;
      _error = false;
    });
    final ok = await widget.onLogin(_email.text, _password.text);
    if (!mounted) return;
    setState(() {
      _loading = false;
      _error = !ok;
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
        Text('تسجيل الدخول', textAlign: TextAlign.center, style: RibaatType.heading(c)),
        const SizedBox(height: 6),
        Text('أهلاً بعودتك إلى رباط الحنابلة', textAlign: TextAlign.center, style: RibaatType.subheading(c)),
        const SizedBox(height: 18),
        RibaatLabeledField(
          c: c,
          label: 'البريد الإلكتروني',
          hintText: 'name@example.com',
          controller: _email,
          keyboardType: TextInputType.emailAddress,
          errorText: _error ? ' ' : null,
        ),
        const SizedBox(height: 18),
        RibaatPasswordField(
          c: c,
          label: 'كلمة المرور',
          controller: _password,
          errorText: _error ? 'تحقق من كلمة المرور' : null,
          trailingLabelWidget: GestureDetector(
            onTap: () {}, // TODO: forgot-password flow
            child: Text('نسيت كلمة المرور؟', style: RibaatType.link(c).copyWith(fontSize: 12)),
          ),
        ),
        if (_error) ...[
          const SizedBox(height: 18),
          RibaatErrorBanner(c: c, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.'),
        ],
        const SizedBox(height: 18),
        RibaatPrimaryButton(
          c: c,
          label: 'تسجيل الدخول',
          loadingLabel: 'جارٍ الدخول...',
          isLoading: _loading,
          onPressed: _submit,
        ),
        const SizedBox(height: 18),
        RibaatOrDivider(c: c),
        const SizedBox(height: 18),
        RibaatSocialRow(c: c, accessibleActionLabel: 'تسجيل الدخول', onTap: (_) {}),
        const SizedBox(height: 18),
        Center(
          child: Wrap(
            children: [
              Text('ليس لديك حساب؟ ', style: TextStyle(fontFamily: 'IBMPlexSansArabic', fontSize: 14, color: c.textSecondary)),
              GestureDetector(onTap: widget.onGoToSignup, child: Text('سجل الآن', style: RibaatType.link(c))),
            ],
          ),
        ),
      ],
    );
  }
}
