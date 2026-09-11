import 'package:flutter/material.dart';
import 'ribaat_theme.dart';

/// Shared building blocks for the Login/Signup screens: labeled text field
/// with optional error text, password field with a show/hide toggle whose
/// tap target meets the 44pt minimum even though the glyph is smaller,
/// the brand panel for split layouts, the "أو" divider, the circular
/// social-auth row, and the primary submit button with a loading state.
/// No hover states anywhere — press/tint feedback only (touch-first/iPad).

class RibaatLabeledField extends StatelessWidget {
  final RibaatColors c;
  final String label;
  final String? hintText;
  final TextEditingController controller;
  final String? errorText;
  final TextInputType keyboardType;

  const RibaatLabeledField({
    super.key,
    required this.c,
    required this.label,
    required this.controller,
    this.hintText,
    this.errorText,
    this.keyboardType = TextInputType.text,
  });

  @override
  Widget build(BuildContext context) {
    final hasError = errorText != null;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(label, style: RibaatType.fieldLabel(c)),
        const SizedBox(height: 6),
        Container(
          constraints: const BoxConstraints(minHeight: 44),
          decoration: BoxDecoration(
            color: c.surfaceCard,
            borderRadius: BorderRadius.circular(RibaatRadii.md),
            border: Border.all(color: hasError ? c.dangerFg : c.borderDefault),
          ),
          child: TextField(
            controller: controller,
            keyboardType: keyboardType,
            style: RibaatType.body(c),
            decoration: InputDecoration(
              hintText: hintText,
              hintStyle: RibaatType.body(c).copyWith(color: c.textMuted),
              border: InputBorder.none,
              contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            ),
          ),
        ),
        if (hasError) ...[
          const SizedBox(height: 4),
          Text(errorText!, style: RibaatType.errorText(c)),
        ],
      ],
    );
  }
}

class RibaatPasswordField extends StatefulWidget {
  final RibaatColors c;
  final String label;
  final String hintText;
  final TextEditingController controller;
  final String? errorText;
  final String? helperText; // e.g. "8 أحرف على الأقل" when idle
  final Widget? trailingLabelWidget; // e.g. "نسيت كلمة المرور؟" link

  const RibaatPasswordField({
    super.key,
    required this.c,
    required this.label,
    required this.controller,
    this.hintText = '••••••••',
    this.errorText,
    this.helperText,
    this.trailingLabelWidget,
  });

  @override
  State<RibaatPasswordField> createState() => _RibaatPasswordFieldState();
}

class _RibaatPasswordFieldState extends State<RibaatPasswordField> {
  bool _visible = false;

  @override
  Widget build(BuildContext context) {
    final c = widget.c;
    final hasError = widget.errorText != null;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.baseline,
          textBaseline: TextBaseline.alphabetic,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(widget.label, style: RibaatType.fieldLabel(c)),
            if (widget.trailingLabelWidget != null) widget.trailingLabelWidget!,
          ],
        ),
        const SizedBox(height: 6),
        Container(
          constraints: const BoxConstraints(minHeight: 44),
          decoration: BoxDecoration(
            color: c.surfaceCard,
            borderRadius: BorderRadius.circular(RibaatRadii.md),
            border: Border.all(color: hasError ? c.dangerFg : c.borderDefault),
          ),
          child: Row(
            children: [
              Expanded(
                child: TextField(
                  controller: widget.controller,
                  obscureText: !_visible,
                  style: RibaatType.body(c),
                  decoration: InputDecoration(
                    hintText: widget.hintText,
                    hintStyle: RibaatType.body(c).copyWith(color: c.textMuted),
                    border: InputBorder.none,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                  ),
                ),
              ),
              // Icon is ~18px but the tap target is a full 44x44 square.
              SizedBox(
                width: 44,
                height: 44,
                child: Material(
                  color: Colors.transparent,
                  child: InkWell(
                    borderRadius: BorderRadius.circular(RibaatRadii.md),
                    onTap: () => setState(() => _visible = !_visible),
                    child: Icon(
                      _visible ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                      size: 18,
                      color: c.textMuted,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        if (hasError)
          Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Text(widget.errorText!, style: RibaatType.errorText(c)),
          )
        else if (widget.helperText != null)
          Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Text(widget.helperText!, style: RibaatType.hint(c)),
          ),
      ],
    );
  }
}

/// Calm, non-alarming inline error banner (used for wrong-credentials, etc).
class RibaatErrorBanner extends StatelessWidget {
  final RibaatColors c;
  final String message;
  const RibaatErrorBanner({super.key, required this.c, required this.message});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        color: c.dangerBg,
        borderRadius: BorderRadius.circular(RibaatRadii.md),
        border: Border.all(color: c.dangerFg),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(Icons.error_outline, size: 16, color: c.dangerFg),
          const SizedBox(width: 10),
          Expanded(
            child: Text(message, style: RibaatType.errorText(c).copyWith(fontSize: 14, height: 1.55)),
          ),
        ],
      ),
    );
  }
}

/// Primary full-width submit button with a built-in loading state
/// (disabled + spinner replacing the label — never a bouncy spinner).
class RibaatPrimaryButton extends StatelessWidget {
  final RibaatColors c;
  final String label;
  final String loadingLabel;
  final bool isLoading;
  final VoidCallback onPressed;

  const RibaatPrimaryButton({
    super.key,
    required this.c,
    required this.label,
    required this.loadingLabel,
    required this.isLoading,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 48,
      child: ElevatedButton(
        onPressed: isLoading ? null : onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: c.brandGreen600,
          disabledBackgroundColor: c.brandGreen600.withOpacity(0.5),
          foregroundColor: c.textOnBrand,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(RibaatRadii.md)),
          elevation: 0,
        ).copyWith(
          overlayColor: MaterialStateProperty.all(c.brandGreen700.withOpacity(0.25)), // press tint, no hover
        ),
        child: isLoading
            ? Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(
                    width: 16,
                    height: 16,
                    child: CircularProgressIndicator(strokeWidth: 2.2, color: c.textOnBrand),
                  ),
                  const SizedBox(width: 8),
                  Text(loadingLabel, style: RibaatType.button()),
                ],
              )
            : Text(label, style: RibaatType.button()),
      ),
    );
  }
}

/// "أو" divider flanked by hairlines.
class RibaatOrDivider extends StatelessWidget {
  final RibaatColors c;
  const RibaatOrDivider({super.key, required this.c});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(child: Container(height: 1, color: c.borderSubtle)),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10),
          child: Text('أو', style: RibaatType.hint(c)),
        ),
        Expanded(child: Container(height: 1, color: c.borderSubtle)),
      ],
    );
  }
}

enum SocialProvider { google, apple, facebook }

/// Row of 3 circular icon-only social auth buttons, 52x52, pill-radius,
/// meeting the 44pt tap-target minimum with room to spare.
class RibaatSocialRow extends StatelessWidget {
  final RibaatColors c;
  final String accessibleActionLabel; // e.g. "تسجيل الدخول" or "إنشاء حساب"
  final void Function(SocialProvider) onTap;

  const RibaatSocialRow({
    super.key,
    required this.c,
    required this.accessibleActionLabel,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    Widget circle({required String label, required Widget icon}) {
      return Semantics(
        button: true,
        label: '$accessibleActionLabel بواسطة $label',
        child: SizedBox(
          width: 52,
          height: 52,
          child: Material(
            color: c.surfaceCard,
            shape: CircleBorder(side: BorderSide(color: c.borderDefault)),
            child: InkWell(
              customBorder: const CircleBorder(),
              onTap: () => onTap(label == 'Google'
                  ? SocialProvider.google
                  : label == 'Apple'
                      ? SocialProvider.apple
                      : SocialProvider.facebook),
              child: Center(child: icon),
            ),
          ),
        ),
      );
    }

    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        circle(label: 'Google', icon: const _GoogleMark(size: 26)),
        const SizedBox(width: 16),
        circle(label: 'Apple', icon: Icon(Icons.apple, size: 26, color: c.textPrimary)),
        const SizedBox(width: 16),
        circle(label: 'Facebook', icon: const Icon(Icons.facebook, size: 26, color: Color(0xFF1877F2))),
      ],
    );
  }
}

/// Minimal 4-color "G" mark. Swap for the official Google asset in prod.
class _GoogleMark extends StatelessWidget {
  final double size;
  const _GoogleMark({required this.size});
  @override
  Widget build(BuildContext context) => Icon(Icons.g_mobiledata, size: size, color: const Color(0xFF4285F4));
}

/// Fixed, non-scrolling brand panel for split (landscape/web) layouts —
/// mark + wordmark + a one-line description + a subject caption line.
class RibaatBrandPanel extends StatelessWidget {
  final RibaatColors c;
  const RibaatBrandPanel({super.key, required this.c});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: c.surfaceBrandStrong,
      alignment: Alignment.center,
      padding: const EdgeInsets.symmetric(horizontal: 44, vertical: 56),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.asset('assets/ribaat-mark.png', height: 160, width: 160,
              color: Colors.white, fit: BoxFit.contain),
          const SizedBox(height: 26),
          Image.asset('assets/ribaat-wordmark.png', height: 68, color: Colors.white),
          const SizedBox(height: 26),
          Container(width: 40, height: 2, color: Colors.white.withOpacity(0.35)),
          const SizedBox(height: 26),
          Text(
            'مدرسة شرعية تأصيلية لدراسة المتون العلمية على منهج السلف',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontFamily: 'Amiri',
              fontSize: 28,
              height: 1.9,
              color: Colors.white.withOpacity(0.92),
            ),
          ),
          const SizedBox(height: 26),
          Text(
            'قرآن · حديث · سيرة · فقه · عقيدة',
            style: TextStyle(
              fontFamily: 'IBMPlexSansArabic',
              fontSize: 14,
              color: Colors.white.withOpacity(0.6),
            ),
          ),
        ],
      ),
    );
  }
}
